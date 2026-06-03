import { loadSummary } from "../analytics/storage.js";
import { useExperiment } from "../context/ExperimentContext.jsx";

export default function CompletePage() {
  const { state } = useExperiment();
  const summary = loadSummary();

  return (
    <main className="phone-frame">
      <section className="screen centered-screen complete-screen">
        <p className="eyebrow">테스트 완료</p>
        <h1>참가자 번호</h1>
        <div className="pid-display">{state.participantId}</div>
        <p>아래 참가자 번호를 복사하여 설문에 입력해주세요.</p>
        <button
          className="primary-button"
          type="button"
          data-track-label="complete:survey"
          data-clickable="true"
          data-disabled="true"
          aria-disabled="true"
        >
          설문 작성하기
        </button>
        {summary ? (
          <section className="summary-panel">
            <span>성공 여부: {summary.success ? "성공" : "실패"}</span>
            <span>Completion Time: {summary.completionTimeMs ? `${(summary.completionTimeMs / 1000).toFixed(1)}초` : "-"}</span>
            <span>Click Count: {summary.clickCount}</span>
            <span>Misclick Count: {summary.misclickCount}</span>
          </section>
        ) : null}
      </section>
    </main>
  );
}
