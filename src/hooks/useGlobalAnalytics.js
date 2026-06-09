import { useEffect, useRef } from "react";
import { useExperiment } from "../context/ExperimentContext.jsx";

function getTrackTarget(target) {
  return target instanceof Element ? target.closest("[data-track-label]") : null;
}

function getTrackLabel(target) {
  const tracked = getTrackTarget(target);
  return tracked?.getAttribute("data-track-label") || "non_clickable_area";
}

function isClickable(target) {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest('[data-clickable="true"]') ||
      target.closest("button") ||
      target.closest("a") ||
      target.closest("input") ||
      target.closest("select") ||
      target.closest('[role="button"]'),
  );
}

function isDisabled(target) {
  if (!(target instanceof Element)) return false;
  const tracked = getTrackTarget(target);
  return Boolean(
    tracked?.getAttribute("data-disabled") === "true" ||
      target.closest('[aria-disabled="true"]') ||
      target.closest("[disabled]"),
  );
}

export function useGlobalAnalytics() {
  const { actions: { logEvent } } = useExperiment();
  const tapHistoryRef = useRef(new Map());

  useEffect(() => {
    function handleClick(event) {
      if (window.location.pathname === "/complete") {
        return;
      }

      const label = getTrackLabel(event.target);
      const x = event.clientX;
      const y = event.clientY;
      const now = Date.now();

      logEvent({
        eventType: "click",
        eventLabel: label,
        xCoordinate: x,
        yCoordinate: y,
      });

      const taps = (tapHistoryRef.current.get(label) || []).filter((time) => now - time <= 1000);
      taps.push(now);
      tapHistoryRef.current.set(label, taps);

      if (taps.length === 3) {
        logEvent({
          eventType: "rough_tap",
          eventLabel: label,
          xCoordinate: x,
          yCoordinate: y,
          metadata: { threshold: "3_clicks_within_1_second" },
        });
      }

      if (isDisabled(event.target)) {
        logEvent({
          eventType: "misclick",
          eventLabel: `disabled:${label}`,
          xCoordinate: x,
          yCoordinate: y,
          metadata: { reason: "inactive_button_or_control" },
        });
        return;
      }

      if (!isClickable(event.target)) {
        logEvent({
          eventType: "misclick",
          eventLabel: label,
          xCoordinate: x,
          yCoordinate: y,
          metadata: { reason: "non_clickable_area" },
        });
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [logEvent]);
}
