import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PAGE_NAMES } from "../data/experiment.js";
import { useExperiment } from "../context/ExperimentContext.jsx";

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

export function usePageTracking() {
  const location = useLocation();
  const { state, actions: { logEvent } } = useExperiment();

  useEffect(() => {
    const pageName = PAGE_NAMES[location.pathname] || "unknown";
    document.body.dataset.pageName = pageName;

    if (TASK_EXECUTION_PATHS.has(location.pathname) && (!state.taskStarted || state.taskEndTime)) {
      return;
    }

    logEvent({
      eventType: "page_view",
      eventLabel: pageName,
      pageName,
      metadata: {
        pathname: location.pathname,
        search: location.search,
      },
    });
  }, [logEvent, location.pathname, location.search, state.taskEndTime, state.taskStarted]);
}