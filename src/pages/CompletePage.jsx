import { useEffect, useRef, useState } from "react";
import { loadEvents, loadSummary } from "../analytics/storage.js";
import { buildSubmissionPayload, submitExperimentData } from "../analytics/submission.js";
import { useExperiment } from "../context/ExperimentContext.jsx";

function getSubmissionStatusText(status) {
  switch (status) {
    case "submitting":
      return "실험 데이터 저장 중...";
    case "success":
      return "실험 데이터 저장 완료";
    case "failed":
      return "데이터 저장 실패: 관리자에게 알려주세요";
    case "missing_endpoint":
      return "데이터 저장 URL 미설정";
    default:
      return "";
  }
}

export default function CompletePage() {
  const { state } = useExperiment();
  const [summary] = useState(() => loadSummary());
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const submitAttemptedRef = useRef(false);

  useEffect(() => {
    if (!summary || submitAttemptedRef.current) return undefined;

    let ignore = false;
    submitAttemptedRef.current = true;
    setSubmissionStatus("submitting");

    const payload = buildSubmissionPayload({
      summary,
      state,
      eventLogs: loadEvents(),
    });

    submitExperimentData(payload).then((result) => {
      if (!ignore) {
        setSubmissionStatus(result.status);
      }
    });

    return () => {
      ignore = true;
    };
  }, [state, summary]);

  const submissionStatusText = getSubmissionStatusText(submissionStatus);

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
        {submissionStatusText ? (
          <p className={`submission-status submission-status-${submissionStatus}`} aria-live="polite">
            {submissionStatusText}
          </p>
        ) : null}
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
