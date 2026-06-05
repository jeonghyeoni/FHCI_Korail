import { useNavigate } from "react-router-dom";
import { useExperiment } from "../context/ExperimentContext.jsx";
import { TASKS, TRAIN } from "../data/experiment.js";

export default function IntroPage() {
  const navigate = useNavigate();
  const { state, actions } = useExperiment();
  const task = TASKS[state.taskId];

  function handleStart() {
    actions.startTask();
    navigate("/train");
  }

  return (
    <main className="phone-frame intro-frame" data-clarity-unmask="true">
      <section className="screen intro-screen task-intro-screen">
        <p className="eyebrow">코레일 좌석 예매 A/B 테스트</p>
        <div className="task-identity">
          <span>{task.title}</span>
          <span>Variant {state.variant}</span>
        </div>

        <section className="task-panel task-goal-panel" data-track-label="intro:task-panel">
          <span className="task-panel-label">목표</span>
          <h1>{task.description}</h1>
          <p>성공 조건: {task.successText}</p>
        </section>

        <section className="task-context-panel">
          <span>{TRAIN.displayName}</span>
          <span>{TRAIN.date}</span>
          <span>{TRAIN.origin} {TRAIN.departureTime} → {TRAIN.destination} {TRAIN.arrivalTime}</span>
        </section>

        <button
          className="primary-button"
          type="button"
          data-track-label="intro:start"
          data-clickable="true"
         
          onClick={handleStart}
        >
          시작하기
        </button>
      </section>
    </main>
  );
}
