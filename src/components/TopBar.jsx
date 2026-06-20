import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useExperiment } from "../context/ExperimentContext.jsx";
import { buildNavigationState, buildRouteUrl } from "../utils/experimentSequence.js";

const TASK_GOAL_LABELS = {
  "1": "5호차 4B",
  "2": "마지막 좌석",
  "3": "창가 좌석",
};

export default function TopBar({ title, showRefresh = false, backTo = "", confirmOnBack = false }) {
  const navigate = useNavigate();
  const { state } = useExperiment();
  const [isGoalHighlighted, setIsGoalHighlighted] = useState(false);
  const goalLabel = TASK_GOAL_LABELS[state.taskId] || "목표";

  useEffect(() => {
    let timerId;
    function handleGoalHighlight() {
      setIsGoalHighlighted(true);
      window.clearTimeout(timerId);
      timerId = window.setTimeout(() => setIsGoalHighlighted(false), 950);
    }

    window.addEventListener("fhci:highlight-goal", handleGoalHighlight);
    return () => {
      window.clearTimeout(timerId);
      window.removeEventListener("fhci:highlight-goal", handleGoalHighlight);
    };
  }, []);

  function handleBack() {
    if (confirmOnBack && !window.confirm("페이지를 나가시겠습니까? 현재 Task를 처음부터 다시 시작해야 할 수 있습니다.")) {
      return;
    }

    if (backTo) {
      navigate(buildRouteUrl(backTo, state), { replace: confirmOnBack, state: buildNavigationState(state) });
      return;
    }

    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(buildRouteUrl("/", state));
  }

  return (
    <header className="top-bar">
      <div className="app-bar">
        <button
          className="icon-button back-button"
          type="button"
          data-track-label="top:back"
          data-clickable="true"
          aria-label="뒤로가기"
          onClick={handleBack}
        >
          <span aria-hidden="true" />
        </button>
        <h1>{title}</h1>
        <div className="top-actions">
          <div className={`top-goal-badge${isGoalHighlighted ? " top-goal-badge-alert" : ""}`} aria-label={`목표 좌석 ${goalLabel}`}>
            <span>목표 좌석</span>
            <strong>{goalLabel}</strong>
          </div>
        </div>
      </div>
    </header>
  );
}
