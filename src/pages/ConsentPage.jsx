import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExperiment } from "../context/ExperimentContext.jsx";
import { TASKS } from "../data/experiment.js";
import { acceptConsent, buildConditionUrl } from "../utils/experimentSequence.js";

export default function ConsentPage() {
  const navigate = useNavigate();
  const { state } = useExperiment();
  const [isChecked, setIsChecked] = useState(false);

  function handleStart() {
    if (!isChecked) return;
    if (!state.isTestMode) {
      acceptConsent();
    }
    navigate(buildConditionUrl(
      { taskId: state.taskId, variant: state.variant },
      state.participantId,
      { mode: state.mode },
    ));
  }

  return (
    <main className="phone-frame intro-frame" data-clarity-unmask="true">
      <section className="screen consent-screen">
        <div className="consent-hero">
          <p className="eyebrow">서강대학교 아트앤테크놀로지학과</p>
          <h1>Foundations of Human-Computer Interaction</h1>
          <p>Team 1 기말 프로젝트</p>
        </div>

        <section className="consent-card">
          <h2>연구 목적</h2>
          <p>
            본 실험은 코레일 앱의 기존 좌석 예매 UI와 개선 UI를 비교하여, 좌석 선택 과정의 사용성 차이를 분석하기 위한 수업 프로젝트입니다.
          </p>
        </section>

        <section className="consent-card">
          <h2>연구 내용</h2>
          <p>
            참가자는 KTX 001 서울-부산 열차의 좌석 예매 과제를 수행합니다. 앱은 완료 시간, 클릭 수, 오클릭, 호차 변경, 좌석 선택 등의 행동 데이터를 자동 기록합니다.
            각 Task의 A/B 수행이 끝난 뒤 짧은 설문을 작성하며, 전체 실험과 설문에는 약 10분 정도 소요됩니다.
          </p>
        </section>

        <section className="consent-card">
          <h2>수행 과제</h2>
          <ol className="task-list">
            {Object.values(TASKS).map((task) => (
              <li key={task.title}>
                <span className="task-list-title">{task.title}</span>
                <span>{task.description}</span>
              </li>
            ))}
          </ol>
          <p className="consent-note">각 과제는 A안과 B안으로 한 번씩 진행되며, 총 6개의 테스트와 Task별 설문 3회, 마지막 종합 설문 1회를 수행합니다.</p>
        </section>

        <section className="consent-card">
          <h2>연구 윤리</h2>
          <p>
            본 프로토타입은 개인정보 입력을 요구하지 않습니다. 수집 데이터는 FHCI 수업 내 사용성 분석 목적으로만 사용되며, 참가자는 원하지 않을 경우 실험 참여를 중단할 수 있습니다.
          </p>
        </section>

        <label className="consent-check">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(event) => setIsChecked(event.target.checked)}
          />
          <span>위 내용을 확인했으며 실험 참여에 동의합니다.</span>
        </label>

        <button
          className="primary-button"
          type="button"
          data-track-label="consent:start"
          data-clickable="true"
          data-disabled={isChecked ? "false" : "true"}
          disabled={!isChecked}
          onClick={handleStart}
        >
          테스트 시작
        </button>
      </section>
    </main>
  );
}
