import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { ExperimentProvider, useExperiment } from "./context/ExperimentContext.jsx";
import { useGlobalAnalytics } from "./hooks/useGlobalAnalytics.js";
import { usePageTracking } from "./hooks/usePageTracking.js";
import { buildConditionUrl, hasAcceptedConsent } from "./utils/experimentSequence.js";
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

function ReloadReset() {
  useEffect(() => {
    const navigationEntry = performance.getEntriesByType("navigation")[0];
    if (navigationEntry?.type === "reload" && window.location.pathname !== "/") {
      window.location.replace("/");
    }
  }, []);

  return null;
}

function ProtectedRoute({ children }) {
  const { state } = useExperiment();
  if (!state.isValid) {
    return <Navigate to="/invalid" replace />;
  }
  return children;
}

function ConsentRoute() {
  const { state } = useExperiment();
  if (state.sequenceComplete) {
    return <Navigate to="/complete" replace />;
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

  if (!hasAcceptedConsent()) {
    return <Navigate to="/" replace />;
  }

  return <IntroPage />;
}

function AppRoutes() {
  return (
    <>
      <ReloadReset />
      <AnalyticsRuntime />
      <Routes>
        <Route path="/invalid" element={<ErrorPage />} />
        <Route path="/" element={<ProtectedRoute><ConsentRoute /></ProtectedRoute>} />
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
