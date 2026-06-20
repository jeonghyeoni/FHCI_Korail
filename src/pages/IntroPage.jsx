import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExperiment } from "../context/ExperimentContext.jsx";
import { TASKS, TRAIN } from "../data/experiment.js";
import { buildNavigationState, buildRouteUrl } from "../utils/experimentSequence.js";

export default function IntroPage() {
  const navigate = useNavigate();
  const { state, actions } = useExperiment();
  const [hasConfirmedTask, setHasConfirmedTask] = useState(false);
  const isStartingRef = useRef(false);
  const task = TASKS[state.taskId];

  useEffect(() => {
    if (isStartingRef.current) return;

    if (state.taskStarted && !state.taskEndTime) {
      actions.resetTask();
      setHasConfirmedTask(false);
    }
  }, [actions, state.taskEndTime, state.taskStarted]);

  function handleStart() {
    if (!hasConfirmedTask) return;
    isStartingRef.current = true;
    actions.startTask();
    navigate(buildRouteUrl("/train", state), { state: buildNavigationState(state, { taskStarted: true }) });
  }

  return (
    <main className="phone-frame intro-frame" data-clarity-unmask="true">
      <section className="screen intro-screen task-intro-screen">
        <p className="eyebrow">코레일 좌석 예매 A/B 테스트</p>
        <div className="task-identity">
          {task.title} - {state.variant}
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

        <label className="task-confirm-check">
          <input
            type="checkbox"
            checked={hasConfirmedTask}
            onChange={(event) => setHasConfirmedTask(event.target.checked)}
          />
          <span>Task 내용을 확인했습니다.</span>
        </label>

        <button
          className="primary-button"
          type="button"
          data-track-label="intro:start"
          data-clickable="true"
          data-disabled={hasConfirmedTask ? "false" : "true"}
          disabled={!hasConfirmedTask}
          onClick={handleStart}
        >
          시작하기
        </button>
      </section>
    </main>
  );
}
