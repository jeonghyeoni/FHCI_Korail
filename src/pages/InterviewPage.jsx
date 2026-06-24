import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { buildInterviewSubmissionPayload, submitInterviewData } from "../analytics/submission.js";

function formatCompletionTime(value) {
  return Number.isFinite(Number(value)) ? `${(Number(value) / 1000).toFixed(3)}초` : "-";
}

function metricValue(value) {
  return value === null || value === undefined || value === "" ? "-" : value;
}

function getConditionTitle(condition) {
  if (condition === "final") return "종합 설문";
  const [taskId, variant] = String(condition).split("-");
  return `Task ${taskId} - ${variant}`;
}

function getQuestionKey(question, index, prefix) {
  return question.id || `${prefix}:${question.group || "group"}:${question.number || index + 1}:${question.label || "question"}`;
}

const CONDITION_ORDER = ["1-A", "1-B", "2-A", "2-B", "3-A", "3-B"];
const OPTIONAL_COMMON_QUESTION_NUMBER = "3";

function getGroupConditions(group = "") {
  return CONDITION_ORDER.filter((condition) => group.includes(`Task ${condition}`));
}

function mentionsVariant(text, variant) {
  const particles = ["의", "에서", "가", "는", "를", "보다", "중", "방식", "화면"];
  return particles.some((particle) => text.includes(`${variant}${particle}`) || text.includes(`${variant} ${particle}`)) ||
    text.includes(`${variant}와`) ||
    text.includes(`${variant}와 `);
}

function getQuestionCondition(question) {
  const contentText = [
    question.label,
    ...(question.prompts || []),
  ].filter(Boolean).join(" ");
  const exactContentMatches = CONDITION_ORDER.filter((condition) => contentText.includes(`Task ${condition}`));

  if (exactContentMatches.length === 1) return exactContentMatches[0];

  const groupConditions = getGroupConditions(question.group);
  if (groupConditions.length) {
    const taskId = groupConditions[0].split("-")[0];
    const mentionsA = mentionsVariant(contentText, "A");
    const mentionsB = mentionsVariant(contentText, "B");

    if (mentionsB) return `${taskId}-B`;
    if (mentionsA) return `${taskId}-A`;
    if (contentText.includes("좌석 현황")) return `${taskId}-B`;
    if (exactContentMatches.length > 1) return exactContentMatches[exactContentMatches.length - 1];

    return groupConditions[groupConditions.length - 1];
  }

  return exactContentMatches.length ? exactContentMatches[exactContentMatches.length - 1] : null;
}

function getFinalPreference(interview) {
  return interview?.surveyResponses?.final?.find((response) => response.questionName === "final_ui_preference")?.answer || "A/B";
}

function customizeCommonQuestion(question, interview) {
  if (String(question.number) !== "2") return question;

  return {
    ...question,
    label: question.label.replace("“A/B”", `“${getFinalPreference(interview)}”`),
  };
}

function isRequiredInterviewQuestion(question) {
  return !(question.group === "공통 질문" && String(question.number) === OPTIONAL_COMMON_QUESTION_NUMBER);
}

function useInterviewData(code) {
  const [state, setState] = useState({ status: "loading", interview: null, error: "" });

  useEffect(() => {
    let ignore = false;

    if (!code) {
      setState({ status: "error", interview: null, error: "invalid_interview_code" });
      return () => {
        ignore = true;
      };
    }

    setState({ status: "loading", interview: null, error: "" });

    fetch(`/api/interview/${encodeURIComponent(code)}`, { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json().catch(() => null);
        if (!response.ok || data?.ok === false) {
          throw new Error(data?.error || "invalid_interview_code");
        }
        return data.interview;
      })
      .then((interview) => {
        if (!ignore) setState({ status: "success", interview, error: "" });
      })
      .catch((error) => {
        if (!ignore) setState({ status: "error", interview: null, error: String(error.message || error) });
      });

    return () => {
      ignore = true;
    };
  }, [code]);

  return state;
}

function MetricGrid({ task }) {
  const metrics = [
    ["Time", formatCompletionTime(task.completionTimeMs)],
    ["Click", metricValue(task.clickCount)],
    ["Misclick", metricValue(task.misclickCount)],
    ["Page", metricValue(task.pageTransitionCount)],
  ];

  return (
    <div className="interview-metric-grid">
      {metrics.map(([label, value]) => (
        <span key={label}><b>{label}</b>{value}</span>
      ))}
    </div>
  );
}

function ReadOnlyScale({ response }) {
  const score = Number(response.score);
  const options = [1, 2, 3, 4, 5, 6];

  return (
    <div className="interview-scale-readonly" aria-label={`기존 응답 ${response.answer}`}>
      {options.map((option) => (
        <span key={option} className={score === option ? "is-selected" : ""}>{option}</span>
      ))}
    </div>
  );
}

function ReadOnlySurveyResponse({ response }) {
  return (
    <article className="interview-survey-response">
      <div className="interview-survey-question">
        <span>{response.questionNumber}.</span>
        <p>{response.questionLabel}</p>
      </div>
      {response.questionType === "scale" ? <ReadOnlyScale response={response} /> : null}
      <div className="interview-answer-box">
        <span>기존 응답</span>
        <strong>{response.answer || "-"}</strong>
        {response.reason ? <p>{response.reason}</p> : null}
      </div>
    </article>
  );
}

function QuestionTextarea({ question, index, prefix, value, onChange, showGroup = true }) {
  const key = getQuestionKey(question, index, prefix);
  const required = isRequiredInterviewQuestion(question);

  return (
    <label className="interview-question">
      {showGroup ? <span className="interview-question-group">{question.group}</span> : null}
      <strong>
        {question.number}. {question.label}
        {required ? <em aria-label="필수">*</em> : <small>선택</small>}
      </strong>
      {question.prompts?.length ? (
        <ul>
          {question.prompts.map((prompt) => <li key={prompt}>{prompt}</li>)}
        </ul>
      ) : null}
      <textarea
        rows={4}
        value={value || ""}
        onChange={(event) => onChange(key, event.currentTarget.value)}
        placeholder="답변을 입력해주세요."
      />
    </label>
  );
}

function InterviewQuestionList({ questions, prefix, answers, onChange, showEmpty = false, hideCommonGroup = false }) {
  if (!questions.length && !showEmpty) return null;

  return (
    <div className="interview-inline-question-section">
      <h3>{questions.length ? "추가 인터뷰 질문" : "추가 인터뷰 질문 없음"}</h3>
      {questions.length ? (
        <div className="interview-question-list">
          {questions.map((question, index) => (
            <QuestionTextarea
              key={getQuestionKey(question, index, prefix)}
              question={question}
              index={index}
              prefix={prefix}
              value={answers[getQuestionKey(question, index, prefix)]}
              onChange={onChange}
              showGroup={!(hideCommonGroup && question.group === "공통 질문")}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function TaskSection({ task, surveyResponses, interviewQuestions, answers, onAnswerChange }) {
  return (
    <section className="interview-card">
      <div className="interview-card-heading">
        <div>
          <p>{task.taskDescription}</p>
          <h2>{task.label}</h2>
        </div>
        <span>{task.taskSuccess ? "성공" : "실패"}</span>
      </div>
      <MetricGrid task={task} />
      {surveyResponses?.length ? (
        <details className="interview-survey-details">
          <summary>기존 설문 응답 보기</summary>
          <div className="interview-survey-list">
            {surveyResponses.map((response) => (
              <ReadOnlySurveyResponse key={`${response.questionName}-${response.questionNumber}`} response={response} />
            ))}
          </div>
        </details>
      ) : null}
      <InterviewQuestionList
        questions={interviewQuestions}
        prefix="custom"
        answers={answers}
        onChange={onAnswerChange}
        showEmpty
      />
    </section>
  );
}

export default function InterviewPage() {
  const { interviewCode = "" } = useParams();
  const { status, interview, error } = useInterviewData(interviewCode);
  const [answers, setAnswers] = useState({});
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");

  const interviewQuestionLayout = useMemo(() => {
    const emptyLayout = {
      commonQuestions: [],
      customQuestions: [],
      questionsByCondition: {},
      finalQuestions: [],
      allQuestions: [],
    };
    if (!interview) return emptyLayout;

    const commonQuestions = (interview.commonQuestions || []).map((question, index) => ({
      ...customizeCommonQuestion(question, interview),
      id: getQuestionKey(question, index, "common"),
    }));
    const customQuestions = (interview.customQuestions || []).map((question, index) => {
      const withId = {
        ...question,
        id: getQuestionKey(question, index, "custom"),
      };
      const condition = getQuestionCondition(withId);

      return condition ? { ...withId, group: `Task ${condition}` } : withId;
    });
    const questionsByCondition = Object.fromEntries(CONDITION_ORDER.map((condition) => [condition, []]));
    const finalCustomQuestions = [];

    customQuestions.forEach((question) => {
      const condition = getQuestionCondition(question);
      if (condition) {
        questionsByCondition[condition].push(question);
      } else {
        finalCustomQuestions.push(question);
      }
    });

    return {
      commonQuestions,
      customQuestions,
      questionsByCondition,
      finalQuestions: [...commonQuestions, ...finalCustomQuestions],
      allQuestions: [...commonQuestions, ...customQuestions],
    };
  }, [interview]);

  const { allQuestions, questionsByCondition, finalQuestions, commonQuestions, customQuestions } = interviewQuestionLayout;
  const requiredQuestions = allQuestions.filter(isRequiredInterviewQuestion);
  const hasAllAnswers = requiredQuestions.length > 0 && requiredQuestions.every((question) => (answers[question.id] || "").trim());
  const isSubmitted = submitStatus === "success";
  const isSubmitting = submitStatus === "submitting";

  function updateAnswer(key, value) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit() {
    if (!interview || !hasAllAnswers || isSubmitting || isSubmitted) return;

    setSubmitStatus("submitting");
    setSubmitError("");

    const interviewWithQuestionIds = {
      ...interview,
      commonQuestions,
      customQuestions,
    };
    const payload = buildInterviewSubmissionPayload({ interview: interviewWithQuestionIds, answers });
    const result = await submitInterviewData(payload);

    if (result.status === "success") {
      setSubmitStatus("success");
      return;
    }

    setSubmitStatus("failed");
    setSubmitError(result.status === "missing_endpoint" ? "저장 URL이 설정되어 있지 않습니다." : "응답 저장에 실패했습니다. 관리자에게 알려주세요.");
  }

  if (status === "loading") {
    return (
      <main className="phone-frame" data-clarity-unmask="true">
        <section className="screen centered-screen interview-screen">
          <p className="eyebrow">인터뷰 설문</p>
          <h1>인터뷰 페이지를 불러오는 중입니다</h1>
        </section>
      </main>
    );
  }

  if (status === "error" || !interview) {
    return (
      <main className="phone-frame" data-clarity-unmask="true">
        <section className="screen centered-screen interview-screen">
          <p className="eyebrow">인터뷰 설문</p>
          <h1>유효하지 않은 인터뷰 링크입니다</h1>
          <p>{error || "링크를 다시 확인해주세요."}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="phone-frame" data-clarity-unmask="true">
      <section className="screen interview-screen">
        <p className="eyebrow">FHCI 후속 인터뷰</p>
        <h1>{interview.intervieweeLabel} 인터뷰 설문</h1>
        <p className="interview-subtitle">지난 실험 기록과 본인의 기존 설문 응답을 확인한 뒤, 아래 주관식 질문에 답변해주세요.</p>

        {interview.clarityUrl ? (
          <section className="interview-clarity-card">
            <span>Clarity 녹화본</span>
            <p>아래 녹화본을 보면서 당시 상황을 떠올린 뒤 답변해주세요. 화면에서 어떤 점을 보고 판단했는지 최대한 구체적으로 적어주시면 좋습니다.</p>
            <a href={interview.clarityUrl} target="_blank" rel="noreferrer">녹화본 새 탭에서 보기</a>
          </section>
        ) : null}

        <section className="interview-section-heading">
          <h2>Task별 수행 기록과 기존 설문</h2>
          <p>각 Task 카드를 펼치면 기존 설문 응답을 볼 수 있습니다.</p>
        </section>

        <div className="interview-task-list">
          {(interview.tasks || []).map((task) => (
            <TaskSection
              key={task.condition}
              task={task}
              surveyResponses={interview.surveyResponses?.[task.condition] || []}
              interviewQuestions={questionsByCondition[task.condition] || []}
              answers={answers}
              onAnswerChange={updateAnswer}
            />
          ))}
        </div>

        {interview.surveyResponses?.final?.length ? (
          <section className="interview-card interview-final-card">
            <div className="interview-card-heading">
              <div>
                <p>최종 선호도 및 배경 질문</p>
                <h2>종합 설문</h2>
              </div>
            </div>
            <div className="interview-survey-list">
              {interview.surveyResponses.final.map((response) => (
                <ReadOnlySurveyResponse key={`${response.questionName}-${response.questionNumber}`} response={response} />
              ))}
            </div>
            <InterviewQuestionList
              questions={finalQuestions}
              prefix="final"
              answers={answers}
              onChange={updateAnswer}
              hideCommonGroup
            />
          </section>
        ) : null}

        {submitError ? <p className="interview-submit-status interview-submit-status-error">{submitError}</p> : null}
        {isSubmitted ? <p className="interview-submit-status">응답이 저장되었습니다. 참여해주셔서 감사합니다.</p> : null}

        <button
          className="primary-button interview-submit-button"
          type="button"
          disabled={!hasAllAnswers || isSubmitting || isSubmitted}
          data-disabled={!hasAllAnswers || isSubmitting || isSubmitted ? "true" : "false"}
          data-clickable="true"
          onClick={handleSubmit}
        >
          {isSubmitting ? "저장 중..." : isSubmitted ? "저장 완료" : "인터뷰 응답 제출"}
        </button>
      </section>
    </main>
  );
}
