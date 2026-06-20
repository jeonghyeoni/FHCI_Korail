import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { flushQueuedTaskSummaryBackups, sendQueuedTaskSummaryBackupsBeacon } from "./analytics/submission.js";
import { loadSummary } from "./analytics/storage.js";
import { ExperimentProvider, useExperiment } from "./context/ExperimentContext.jsx";
import { useGlobalAnalytics } from "./hooks/useGlobalAnalytics.js";
import { usePageTracking } from "./hooks/usePageTracking.js";
import { TASKS } from "./data/experiment.js";
import { buildConditionUrl, buildRouteUrl, hasAcceptedConsent } from "./utils/experimentSequence.js";
import ConsentPage from "./pages/ConsentPage.jsx";
import CompletePage from "./pages/CompletePage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import IntroPage from "./pages/IntroPage.jsx";
import ThankYouPage from "./pages/ThankYouPage.jsx";
import TicketConfirmPage from "./pages/TicketConfirmPage.jsx";
import TrainSearchPage from "./pages/TrainSearchPage.jsx";
import VariantAReservePage from "./pages/VariantAReservePage.jsx";
import VariantASeatPage from "./pages/VariantASeatPage.jsx";
import VariantBOverviewPage from "./pages/VariantBOverviewPage.jsx";
import VariantBSeatPage from "./pages/VariantBSeatPage.jsx";

function AnalyticsRuntime() {
  usePageTracking();
  useGlobalAnalytics();
  return null;
}

function SubmissionRecoveryRuntime() {
  const { state } = useExperiment();

  useEffect(() => {
    if (!state.isValid || state.isTestMode) return undefined;

    flushQueuedTaskSummaryBackups();

    const sendQueuedBackups = () => {
      sendQueuedTaskSummaryBackupsBeacon();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendQueuedBackups();
      }
    };

    window.addEventListener("pagehide", sendQueuedBackups);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("pagehide", sendQueuedBackups);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [state.isValid, state.isTestMode]);

  return null;
}

const TASK_EXECUTION_PATHS = new Set([
  "/train",
  "/confirm",
  "/variant-a/3",
  "/variant-a/3-1",
  "/variant-a/3-2",
  "/variant-a/3-3",
  "/variant-a/3-4",
  "/variant-b/3",
  "/variant-b/3-1",
  "/variant-b/3-2",
]);

function isTaskExecutionPath(pathname) {
  return TASK_EXECUTION_PATHS.has(pathname);
}

function isSameCondition(record, state) {
  return Boolean(
    record &&
      record.participantId === state.participantId &&
      String(record.taskId) === String(state.taskId) &&
      record.variant === state.variant
  );
}

function isCompletedSummary(summary) {
  return Boolean(summary?.completedAt || summary?.taskEndTime || summary?.success || summary?.taskSuccess);
}

function currentConditionUrl(state) {
  return buildConditionUrl({ taskId: state.taskId, variant: state.variant }, state.participantId, { mode: state.mode });
}

function TaskNavigationGuard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, actions } = useExperiment();
  const reloadHandledRef = useRef(false);
  const isTaskPath = isTaskExecutionPath(location.pathname);
  const hasTaskStartIntent = Boolean(location.state?.taskStarted);
  const shouldWarnBeforeUnload = isTaskPath && state.taskStarted && !state.taskEndTime;

  useEffect(() => {
    if (!state.isValid) return;

    const navigationEntry = performance.getEntriesByType("navigation")[0];
    const isUnhandledReload = navigationEntry?.type === "reload" && !reloadHandledRef.current;
    if (isUnhandledReload && !isTaskPath) {
      reloadHandledRef.current = true;
    }

    const summary = loadSummary({ inMemory: state.isTestMode });
    const routeCondition = location.state?.condition;
    const isRouteConditionMismatch = Boolean(
      routeCondition &&
        (String(routeCondition.taskId) !== String(state.taskId) || routeCondition.variant !== state.variant)
    );

    if (location.pathname === "/complete") {
      if (state.isTestMode && !summary) return;
      if (!summary || !isSameCondition(summary, state)) {
        navigate(state.sequenceComplete ? buildRouteUrl("/thanks", state) : currentConditionUrl(state), { replace: true });
      }
      return;
    }

    if (!isTaskPath) return;

    if (isRouteConditionMismatch) {
      navigate(currentConditionUrl(state), { replace: true });
      return;
    }

    if (isSameCondition(summary, state) && isCompletedSummary(summary)) {
      navigate(buildRouteUrl("/complete", state), { replace: true });
      return;
    }

    if (isUnhandledReload) {
      reloadHandledRef.current = true;
      actions.resetTask();
      navigate(buildRouteUrl("/intro", state), { replace: true });
      return;
    }

    if (!state.taskStarted) {
      if (hasTaskStartIntent) return;
      actions.resetTask();
      navigate(buildRouteUrl("/intro", state), { replace: true });
    }
  }, [actions, hasTaskStartIntent, isTaskPath, location.pathname, location.state, navigate, state]);

  useEffect(() => {
    if (!shouldWarnBeforeUnload) return undefined;

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [shouldWarnBeforeUnload]);

  return null;
}

function ProtectedRoute({ children }) {
  const { state } = useExperiment();
  if (!state.isValid) {
    return <Navigate to="/invalid" replace />;
  }
  return children;
}

function DesktopTaskRail() {
  const location = useLocation();
  const { state } = useExperiment();
  const task = TASKS[state.taskId];
  const hiddenPaths = new Set(["/", "/test", "/invalid", "/thanks"]);

  if (!task || hiddenPaths.has(location.pathname)) return null;

  return (
    <aside className="desktop-task-rail" aria-label="현재 Task 목표">
      <span>{task.title} - {state.variant}</span>
      <strong>{task.description}</strong>
    </aside>
  );
}

function ConsentRoute() {
  const { state } = useExperiment();
  if (state.sequenceComplete) {
    return <Navigate to="/complete" replace />;
  }

  if (state.isTestMode) {
    return <ConsentPage />;
  }

  if (hasAcceptedConsent()) {
    return <Navigate to={buildConditionUrl({ taskId: state.taskId, variant: state.variant }, state.participantId)} replace />;
  }

  return <ConsentPage />;
}

function IntroRoute() {
  const { state } = useExperiment();
  if (state.sequenceComplete) {
    return <Navigate to="/complete" replace />;
  }

  if (!state.isTestMode && !hasAcceptedConsent()) {
    return <Navigate to="/" replace />;
  }

  return <IntroPage />;
}

function AppRoutes() {
  return (
    <>
      <TaskNavigationGuard />
      <AnalyticsRuntime />
      <SubmissionRecoveryRuntime />
      <DesktopTaskRail />
      <Routes>
        <Route path="/invalid" element={<ErrorPage />} />
        <Route path="/" element={<ProtectedRoute><ConsentRoute /></ProtectedRoute>} />
        <Route path="/test" element={<ProtectedRoute><ConsentRoute /></ProtectedRoute>} />
        <Route path="/intro" element={<ProtectedRoute><IntroRoute /></ProtectedRoute>} />
        <Route path="/train" element={<ProtectedRoute><TrainSearchPage /></ProtectedRoute>} />
        <Route path="/variant-a/3" element={<ProtectedRoute><VariantAReservePage pageKey="A-3" /></ProtectedRoute>} />
        <Route path="/variant-a/3-1" element={<ProtectedRoute><VariantASeatPage mode="seat" /></ProtectedRoute>} />
        <Route path="/variant-a/3-2" element={<ProtectedRoute><VariantASeatPage mode="dropdown" /></ProtectedRoute>} />
        <Route path="/variant-a/3-3" element={<ProtectedRoute><VariantASeatPage mode="selected" /></ProtectedRoute>} />
        <Route path="/variant-a/3-4" element={<ProtectedRoute><VariantAReservePage pageKey="A-3-4" /></ProtectedRoute>} />
        <Route path="/variant-b/3" element={<ProtectedRoute><VariantBOverviewPage /></ProtectedRoute>} />
        <Route path="/variant-b/3-1" element={<ProtectedRoute><VariantBSeatPage /></ProtectedRoute>} />
        <Route path="/variant-b/3-2" element={<ProtectedRoute><VariantBSeatPage /></ProtectedRoute>} />
        <Route path="/confirm" element={<ProtectedRoute><TicketConfirmPage /></ProtectedRoute>} />
        <Route path="/complete" element={<ProtectedRoute><CompletePage /></ProtectedRoute>} />
        <Route path="/thanks" element={<ProtectedRoute><ThankYouPage /></ProtectedRoute>} />
        <Route path="*" element={<ErrorPage notFound />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ExperimentProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ExperimentProvider>
  );
}
