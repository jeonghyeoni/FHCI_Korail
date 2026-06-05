import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadEvents, loadSummary } from "../analytics/storage.js";
import { buildSubmissionPayload, submitExperimentData } from "../analytics/submission.js";
import { useExperiment } from "../context/ExperimentContext.jsx";
import { TASKS } from "../data/experiment.js";
import { buildConditionUrl, getNextCondition, markConditionComplete } from "../utils/experimentSequence.js";

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
  const navigate = useNavigate();
  const { state } = useExperiment();
  const [summary] = useState(() => loadSummary());
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [surveyAnswers, setSurveyAnswers] = useState({
    difficulty: "",
    confidence: "",
    speed: "",
    satisfaction: "",
  });
  const submitAttemptedRef = useRef(false);
  const nextCondition = getNextCondition(state.taskId, state.variant);
  const isFinalTest = !nextCondition;
  const task = TASKS[state.taskId];

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
        if (result.status === "success") {
          markConditionComplete(state.taskId, state.variant);
        }
        setSubmissionStatus(result.status);
      }
    });

    return () => {
      ignore = true;
    };
  }, [state, summary]);

  const submissionStatusText = getSubmissionStatusText(submissionStatus);
  const isSubmissionComplete = submissionStatus === "success";
  const isSurveyComplete = Object.values(surveyAnswers).every(Boolean);
  const canProceed = isSubmissionComplete && isSurveyComplete;
  const actionLabel = !isSubmissionComplete
    ? "잠시만 기다려주세요"
    : !isSurveyComplete
      ? "설문을 완료해주세요"
      : isFinalTest
        ? "제출하기"
        : "다음 테스트 시작";

  const updateSurveyAnswer = (name, value) => {
    setSurveyAnswers((current) => ({ ...current, [name]: value }));
  };

  const handlePrimaryAction = () => {
    if (!canProceed) return;
    if (nextCondition) {
      window.location.assign(buildConditionUrl(nextCondition, state.participantId));
      return;
    }
    navigate("/thanks");
  };

  const surveyQuestions = [
    {
      name: "difficulty",
      label: "이번 좌석 예매 과정은 얼마나 어려웠나요?",
      low: "매우 쉬움",
      high: "매우 어려움",
    },
    {
      name: "confidence",
      label: "목표 좌석을 올바르게 선택했다고 얼마나 확신하나요?",
      low: "전혀 아님",
      high: "매우 확신",
    },
    {
      name: "speed",
      label: "이번 화면에서 좌석을 빠르게 찾을 수 있었나요?",
      low: "전혀 아님",
      high: "매우 그럼",
    },
    {
      name: "satisfaction",
      label: "이번 좌석 선택 UI에 전반적으로 만족하나요?",
      low: "매우 불만족",
      high: "매우 만족",
    },
  ];

  return (
    <main className="phone-frame" data-clarity-unmask="true">
      <section className="screen complete-screen complete-survey-screen">
        <p className="eyebrow">테스트 완료</p>
        <h1>{task?.title} - Variant {state.variant}</h1>
        <div className="pid-display">{state.participantId}</div>
        <p>{isFinalTest ? "마지막 테스트 설문을 작성해주세요." : "아래 설문을 작성한 뒤 다음 테스트로 진행해주세요."}</p>
        {submissionStatusText ? (
          <p className={`submission-status submission-status-${submissionStatus}`} aria-live="polite">
            {submissionStatusText}
          </p>
        ) : null}

        <section className="post-task-survey" aria-label="사후 설문">
          <h2>사후 설문</h2>
          <p className="survey-help">각 문항에 대해 1점부터 5점까지 선택해주세요.</p>
          {surveyQuestions.map((question) => (
            <fieldset className="survey-question" key={question.name}>
              <legend>{question.label}</legend>
              <div className="survey-scale-labels">
                <span>{question.low}</span>
                <span>{question.high}</span>
              </div>
              <div className="survey-options">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className="survey-option">
                    <input
                      type="radio"
                      name={question.name}
                      value={value}
                      checked={surveyAnswers[question.name] === String(value)}
                      onChange={(event) => updateSurveyAnswer(question.name, event.target.value)}
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </section>

        <button
          className="primary-button"
          type="button"
          data-track-label={isFinalTest ? "complete:finish" : "complete:next-test"}
          data-clickable="true"
          data-disabled={canProceed ? "false" : "true"}
          aria-disabled={canProceed ? "false" : "true"}
          disabled={!canProceed}
          onClick={handlePrimaryAction}
        >
          {actionLabel}
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
