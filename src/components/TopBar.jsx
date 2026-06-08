import { useNavigate } from "react-router-dom";
import { useExperiment } from "../context/ExperimentContext.jsx";

const TASK_GOAL_LABELS = {
  "1": "아무 좌석",
  "2": "5호차 4B",
  "3": "창가 좌석",
};

export default function TopBar({ title, showRefresh = false, backTo = "" }) {
  const navigate = useNavigate();
  const { state } = useExperiment();
  const goalLabel = TASK_GOAL_LABELS[state.taskId] || "목표";

  function handleBack() {
    if (backTo) {
      navigate(backTo);
      return;
    }

    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
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
          <div className="top-goal-badge" aria-label={`목표 좌석 ${goalLabel}`}>
            <span>목표 좌석</span>
            <strong>{goalLabel}</strong>
          </div>
        </div>
      </div>
    </header>
  );
}
