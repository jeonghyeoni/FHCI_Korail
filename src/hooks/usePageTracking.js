import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PAGE_NAMES } from "../data/experiment.js";
import { useExperiment } from "../context/ExperimentContext.jsx";

export function usePageTracking() {
  const location = useLocation();
  const { actions: { logEvent } } = useExperiment();

  useEffect(() => {
    const pageName = PAGE_NAMES[location.pathname] || "unknown";
    document.body.dataset.pageName = pageName;
    logEvent({
      eventType: "page_view",
      eventLabel: pageName,
      pageName,
      metadata: {
        pathname: location.pathname,
        search: location.search,
      },
    });
  }, [logEvent, location.pathname, location.search]);
}
