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
      <section className="screen intro-screen">
        <p className="eyebrow">FHCI 사용성 평가</p>
        <h1>코레일 좌석 예매 A/B 테스트</h1>
        <div className="intro-meta">
          <span>참가자 {state.participantId}</span>
          <span>Variant {state.variant}</span>
          <span>{task.title}</span>
        </div>

        <section className="task-panel" data-track-label="intro:task-panel">
          <h2>현재 과제</h2>
          <p>{task.description}</p>
          <small>성공 조건: {task.successText}</small>
        </section>

        <section className="train-summary">
          <h2>{TRAIN.displayName}</h2>
          <p>{TRAIN.date}</p>
          <strong>{TRAIN.origin} {TRAIN.departureTime} → {TRAIN.destination} {TRAIN.arrivalTime}</strong>
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
