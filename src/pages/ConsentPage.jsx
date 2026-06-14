import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExperiment } from "../context/ExperimentContext.jsx";
import { TASKS } from "../data/experiment.js";
import { EXPERIMENT_SEQUENCE, TEST_MODE, acceptConsent, buildConditionUrl } from "../utils/experimentSequence.js";

function buildTestSurveyUrl(condition, participantId, surveyStep = "task") {
  const params = new URLSearchParams({
    mode: TEST_MODE,
    variant: condition.variant,
    task: condition.taskId,
    pid: participantId,
    survey: surveyStep,
  });

  return `/complete?${params.toString()}`;
}

function isKakaoInAppBrowser() {
  if (typeof navigator === "undefined") return false;
  return /KAKAOTALK|KakaoTalk/i.test(navigator.userAgent);
}

export default function ConsentPage() {
  const navigate = useNavigate();
  const { state } = useExperiment();
  const [isChecked, setIsChecked] = useState(false);
  const showKakaoWarning = isKakaoInAppBrowser();

  function openTestUrl(url) {
    window.location.assign(url);
  }

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
        {showKakaoWarning ? (
          <aside className="kakao-browser-warning" aria-label="카카오톡 인앱 브라우저 안내">
            <strong>Chrome 또는 Safari 등 외부 브라우저에서 진행해 주세요.</strong>
            <p>
              카카오톡 내부 브라우저에서는 일부 기능이 정상적으로 작동하지 않을 수 있습니다.
            </p>
            <dl>
              <div>
                <dt>Android</dt>
                <dd>우측 상단 메뉴(⋯) -&gt; 외부 브라우저로 열기</dd>
              </div>
              <div>
                <dt>iPhone</dt>
                <dd>우측 하단 공유 -&gt; Safari로 열기</dd>
              </div>
            </dl>
            <p>불편을 드려 죄송합니다.</p>
          </aside>
        ) : null}

        {state.isTestMode ? (
          <section className="test-quick-nav" aria-label="테스트 모드 빠른 이동">
            <h2>테스트 빠른 이동</h2>
            <div className="test-quick-grid">
              {EXPERIMENT_SEQUENCE.flatMap((condition) => [
                <button
                  type="button"
                  key={`${condition.taskId}-${condition.variant}-task`}
                  onClick={() => openTestUrl(buildConditionUrl(condition, state.participantId, { mode: state.mode }))}
                >
                  Task{condition.taskId}-{condition.variant}
                </button>,
                <button
                  type="button"
                  key={`${condition.taskId}-${condition.variant}-survey`}
                  onClick={() => openTestUrl(buildTestSurveyUrl(condition, state.participantId))}
                >
                  Task{condition.taskId}-{condition.variant}-설문
                </button>,
              ])}
              <button
                type="button"
                onClick={() => openTestUrl(buildTestSurveyUrl(EXPERIMENT_SEQUENCE[EXPERIMENT_SEQUENCE.length - 1], state.participantId, "final"))}
              >
                종합 설문
              </button>
            </div>
          </section>
        ) : null}

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
            각 Task의 A안과 B안 수행이 끝날 때마다 짧은 설문을 작성하며, 마지막에는 전체 경험에 대한 종합 설문을 작성합니다.
            전체 실험과 설문에는 약 5분 정도 소요됩니다.
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
          <p className="consent-note">
            각 과제는 A안과 B안으로 한 번씩 진행되며, 총 6개의 테스트와 Task별 설문 6회, 마지막 종합 설문 1회를 수행합니다.
          </p>
        </section>

          <section className="consent-card">
            <h2>연구 윤리</h2>
            <p>
              본 프로토타입은 개인정보 입력을 필수로 요구하지 않습니다.
              마지막 종합 설문에서 전화번호를 선택적으로 기재할 수 있으며,
              이 정보는 필요 시 추가 설문 연락 및 기프티콘 지급 안내 목적으로만 사용됩니다.
              수집 데이터는 FHCI 수업 내 사용성 분석 목적으로만 사용되며,
              참가자는 원하지 않을 경우 실험 참여를 중단할 수 있습니다.
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

        <p className="consent-caution">
          ※ 과제 수행과 관련 없는 메뉴 탐색이나 임의의 조작은 결과에 영향을 줄 수 있으므로 가급적 자제 부탁드립니다.
        </p>

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
