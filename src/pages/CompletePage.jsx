import { Component, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadEvents, loadSummary } from "../analytics/storage.js";
import { buildSubmissionPayload, submitExperimentData } from "../analytics/submission.js";
import aCarSelectDropdownImage from "../assets/survey/a-car-select-dropdown.png";
import aTrainAfterSelectImage from "../assets/survey/a-train-after-select.png";
import aTrainAfterSelectReserveHighlightImage from "../assets/survey/a-train-after-select-reserve-highlight.png";
import bSeatSelectionCar1Image from "../assets/survey/b-seat-selection-car-1.png";
import bTrainAfterSelectImage from "../assets/survey/b-train-after-select.png";
import bTrainAfterSelectAutoHighlightImage from "../assets/survey/b-train-after-select-auto-highlight.png";
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
    case "test_mode":
      return "테스트 모드: 데이터 전송 안 함";
    default:
      return "";
  }
}

const LIKERT_EASY = ["매우 어렵다", "어렵다", "약간 어렵다", "약간 쉽다", "쉽다", "매우 쉽다"];
const LIKERT_SATISFACTION = ["매우 불만족", "불만족", "약간 불만족", "약간 만족", "만족", "매우 만족"];
const LIKERT_AGREE = ["매우 그렇지 않다", "그렇지 않다", "약간 그렇지 않다", "약간 그렇다", "그렇다", "매우 그렇다"];
const YES_NO = ["그렇다", "그렇지 않다"];
const UI_PREFERENCE = ["A", "B", "잘 모르겠다"];

function getCommonTaskSurveyQuestions(taskId) {
  return [
    { name: `task${taskId}_a_difficulty`, type: "scale", label: "A에서 예매 과정의 난이도는 어땠나요?", options: LIKERT_EASY },
    { name: `task${taskId}_a_intuitive`, type: "scale", label: "A에서 예매 과정의 UI는 충분히 직관적이었나요?", options: LIKERT_SATISFACTION },
    { name: `task${taskId}_a_goal_selection`, type: "choice_text", label: "A의 좌석 선택에서 목표 좌석을 빠르고 정확하게 선택할 수 있었나요? 그 이유는 무엇인가요?", options: YES_NO },
    { name: `task${taskId}_b_difficulty`, type: "scale", label: "B에서 예매 과정의 난이도는 어땠나요?", options: LIKERT_EASY },
    { name: `task${taskId}_b_intuitive`, type: "scale", label: "B의 예매 과정에서 UI는 충분히 직관적이었나요?", options: LIKERT_SATISFACTION },
    { name: `task${taskId}_b_goal_selection`, type: "choice_text", label: "B의 좌석 선택에서 목표 좌석을 빠르고 정확하게 선택할 수 있었나요? 그 이유는 무엇인가요?", options: YES_NO },
  ];
}

const TASK_SURVEY_DETAILS = {
  "1": [
    { name: "task1_a_auto_awareness", type: "choice", label: "A에서 '예매'를 누르면 좌석이 자동으로 배정된다는 사실을 인지하고 있었나요?", options: YES_NO },
    { name: "task1_a_auto_used", type: "choice", label: "A에서 아무 좌석이나 예매할 때 '좌석 선택' 버튼 대신 '예매' 버튼을 이용했나요?", options: YES_NO },
    { name: "task1_a_auto_helpful", type: "scale", label: "A에서 아무 좌석이나 예매할 때 '예매' 버튼은 도움이 되었나요?", options: LIKERT_AGREE, showIf: { name: "task1_a_auto_used", value: "그렇다" } },
    { name: "task1_b_auto_used", type: "choice", label: "B에서 아무 좌석이나 예매할 때 '좌석 자동배정' 버튼을 이용했나요?", options: YES_NO },
    { name: "task1_b_auto_helpful", type: "scale", label: "B에서 아무 좌석이나 예매할 때 '좌석 자동배정' 버튼은 도움이 되었나요?", options: LIKERT_AGREE, showIf: { name: "task1_b_auto_used", value: "그렇다" } },
    { name: "task1_entry_preference", type: "choice", label: "A는 열차 선택 시 좌석 선택과 예매 버튼이 있는 추가 팝업 창이 뜨는 반면, B는 바로 좌석 선택 화면으로 이동합니다. 본 Task를 수행하는 데 있어서 어느 쪽을 선호하나요?", options: UI_PREFERENCE },
  ],
  "2": [
    { name: "task2_status_helpful", type: "scale", label: "B에서 특정 좌석을 예매하기 위해 호차를 선택할 때 좌석 현황 창이 도움이 되었나요?", options: LIKERT_AGREE },
    { name: "task2_b_car_button_used", type: "choice", label: "B에서 호차 변경 버튼을 이용했나요? (9번 질문에 첨부된 사진 참고)", options: YES_NO },
    { name: "task2_car_selector_preference", type: "choice", label: "호차 변경 버튼의 경우 A(선택박스형)와 B(카드형) 중 어느 쪽을 더 선호하나요?", options: UI_PREFERENCE },
    { name: "task2_entry_preference", type: "choice", label: "A는 열차 선택 시 좌석 선택과 예매 버튼이 있는 추가 팝업 창이 뜨는 반면, B는 바로 좌석 선택 화면으로 이동합니다. 본 Task를 수행하는 데 있어서 어느 쪽을 선호하나요?", options: UI_PREFERENCE },
  ],
  "3": [
    { name: "task3_a_window_difficulty", type: "scale", label: "A에서 창가 자리를 찾는 과정의 난이도는 어떠했나요?", options: LIKERT_EASY },
    { name: "task3_b_window_difficulty", type: "scale", label: "B에서 창가 자리를 찾는 과정의 난이도는 어떠했나요?", options: LIKERT_EASY },
    { name: "task3_b_status_used", type: "choice", label: "B에서 창가 자리를 찾을 때 좌석 현황 창을 활용했나요?", options: YES_NO },
    { name: "task3_b_status_helpful", type: "choice", label: "B에서 좌석 현황 창은 창가 자리를 예매하는 데 도움이 되었나요?", options: YES_NO, showIf: { name: "task3_b_status_used", value: "그렇다" } },
    { name: "task3_b_available_intuitive", type: "choice", label: "B의 좌석 현황 창에서 예약 가능한 좌석과 예약 불가능한 좌석의 구분이 충분히 직관적이었나요?", options: YES_NO },
    { name: "task3_b_window_intuitive", type: "choice", label: "B의 좌석 현황 창에서 창가 좌석과 안쪽 좌석의 구분이 충분히 직관적이었나요?", options: YES_NO },
    { name: "task3_window_preference", type: "choice", label: "창가 좌석을 예매하는 과정에 있어서 A와 B 중 어느 쪽을 선호하나요?", options: UI_PREFERENCE },
  ],
};

const FINAL_SURVEY_QUESTIONS = [
  { name: "final_a_control", type: "scale", label: "A의 예매 과정에서 내가 직접 선택과 진행을 통제하고 있다고 느꼈나요?", options: LIKERT_AGREE },
  { name: "final_a_error_safe", type: "scale", label: "A의 예매 과정에서 실수하거나 잘못된 선택을 할 가능성이 적다고 느꼈나요?", options: LIKERT_AGREE },
  { name: "final_a_status_clear", type: "scale", label: "A의 예매 과정에서 현재 어떤 상태에 있는지 쉽게 이해할 수 있었나요?", options: LIKERT_AGREE },
  { name: "final_b_control", type: "scale", label: "B의 예매 과정에서 내가 직접 선택과 진행을 통제하고 있다고 느꼈나요?", options: LIKERT_AGREE },
  { name: "final_b_error_safe", type: "scale", label: "B의 예매 과정에서 실수하거나 잘못된 선택을 할 가능성이 적다고 느꼈나요?", options: LIKERT_AGREE },
  { name: "final_b_status_clear", type: "scale", label: "B의 예매 과정에서 현재 어떤 상태에 있는지 쉽게 이해할 수 있었나요?", options: LIKERT_AGREE },
  { name: "final_ui_preference", type: "choice", label: "전체적으로 어느 UI를 더 선호하나요?", options: ["A", "B", "차이를 느끼지 못함"] },
  { name: "final_gender", type: "choice", label: "성별이 무엇인가요?", options: ["여성", "남성"] },
  { name: "final_age", type: "choice", label: "나이대가 어떻게 되나요?", options: ["10대", "20대", "30대", "40대", "50대", "60대 이상"] },
  { name: "final_korailtalk_used", type: "choice", label: "기존에 KTX 예매를 위해 코레일톡을 사용해본 적이 있나요?", options: YES_NO },
];

function getTaskSurveyQuestions(taskId) {
  return [...getCommonTaskSurveyQuestions(taskId), ...(TASK_SURVEY_DETAILS[taskId] || [])];
}

function isQuestionVisible(question, answers) {
  if (!question.showIf) return true;
  return answers[question.showIf.name] === question.showIf.value;
}

function isSurveyComplete(questions, answers) {
  return questions.every((question) => {
    if (!isQuestionVisible(question, answers)) return true;
    if (question.type === "choice_text") {
      return Boolean(answers[question.name]);
    }
    return Boolean(answers[question.name]);
  });
}

function getNumberedSurveyQuestions(questions, answers) {
  const numberByName = {};
  const childCountByParent = {};
  let baseNumber = 0;

  return questions.reduce((items, question) => {
    if (!isQuestionVisible(question, answers)) return items;

    let number;
    if (question.showIf) {
      const parentNumber = numberByName[question.showIf.name] || String(baseNumber);
      childCountByParent[question.showIf.name] = (childCountByParent[question.showIf.name] || 0) + 1;
      number = `${parentNumber}-${childCountByParent[question.showIf.name]}`;
    } else {
      baseNumber += 1;
      number = String(baseNumber);
    }

    numberByName[question.name] = number;
    items.push({ ...question, number });
    return items;
  }, []);
}

function buildSurveyResponses(questions, answers, section) {
  return getNumberedSurveyQuestions(questions, answers).map((question) => {
    const answer = answers[question.name] || "";
    const optionIndex = question.options.findIndex((option) => option === answer);

    return {
      section,
      questionName: question.name,
      questionNumber: question.number,
      questionLabel: question.label,
      questionType: question.type,
      answer,
      score: question.type === "scale" && optionIndex >= 0 ? optionIndex + 1 : "",
      reason: question.type === "choice_text" ? answers[`${question.name}_reason`] || "" : "",
    };
  });
}

function shouldShowTrainScreenComparison(question) {
  return question.name === "task1_entry_preference" || question.name === "task2_entry_preference";
}

function shouldShowCarSelectorComparison(question) {
  return question.name === "task2_car_selector_preference";
}

function shouldShowBOverviewImage(question) {
  return question.name === "task3_b_status_used";
}

function shouldShowTask2BStatusImage(question) {
  return question.name === "task2_status_helpful";
}

function getTask1AutoActionImage(question) {
  if (question.name === "task1_a_auto_used") {
    return {
      src: aTrainAfterSelectReserveHighlightImage,
      alt: "A의 열차 선택 후 화면에서 예매 버튼이 강조된 화면",
      caption: "A의 예매 버튼 (빨간색 강조 표시)",
    };
  }

  if (question.name === "task1_b_auto_used") {
    return {
      src: bTrainAfterSelectAutoHighlightImage,
      alt: "B의 열차 선택 후 화면에서 좌석 자동선택 버튼이 강조된 화면",
      caption: "B의 좌석 자동선택 버튼 (빨간색 강조 표시)",
    };
  }

  return null;
}

class CompletePageErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Complete page render failed.", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="phone-frame" data-clarity-unmask="true">
          <section className="screen complete-screen complete-survey-screen">
            <p className="eyebrow">설문 오류</p>
            <h1>화면을 다시 불러와주세요</h1>
            <p>설문 화면 표시 중 오류가 발생했습니다. 새로고침 후 다시 진행해주세요.</p>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default function CompletePage() {
  const navigate = useNavigate();
  const { state } = useExperiment();
  const [summary] = useState(() => loadSummary({ inMemory: state.isTestMode }));
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [surveyAnswers, setSurveyAnswers] = useState({});
  const [surveyStep, setSurveyStep] = useState("task");
  const submitAttemptedRef = useRef(false);
  const nextCondition = getNextCondition(state.taskId, state.variant);
  const isFinalTest = !nextCondition;
  const shouldShowTaskSurvey = state.variant === "B";
  const taskSurveyQuestions = getTaskSurveyQuestions(state.taskId);
  const activeSurveyQuestions = shouldShowTaskSurvey
    ? surveyStep === "final"
      ? FINAL_SURVEY_QUESTIONS
      : taskSurveyQuestions
    : [];
  const numberedSurveyQuestions = getNumberedSurveyQuestions(activeSurveyQuestions, surveyAnswers);
  const task = TASKS[state.taskId];
  const activeSurveyComplete = !shouldShowTaskSurvey || isSurveyComplete(activeSurveyQuestions, surveyAnswers);
  const shouldSubmitExperimentData = Boolean(summary) && (
    !shouldShowTaskSurvey ||
    (!isFinalTest && activeSurveyComplete) ||
    (isFinalTest && surveyStep === "final" && activeSurveyComplete)
  );

  function getSurveySubmissionData() {
    if (!shouldShowTaskSurvey) {
      return { surveyAnswers: null, surveyResponses: [] };
    }

    const surveyResponses = buildSurveyResponses(taskSurveyQuestions, surveyAnswers, "task");

    if (isFinalTest && surveyStep === "final") {
      surveyResponses.push(...buildSurveyResponses(FINAL_SURVEY_QUESTIONS, surveyAnswers, "final"));
    }

    return {
      surveyAnswers,
      surveyResponses,
    };
  }

  useEffect(() => {
    if (state.isTestMode) {
      setSubmissionStatus("test_mode");
      return undefined;
    }

    if (!shouldSubmitExperimentData || submitAttemptedRef.current) return undefined;

    let ignore = false;
    submitAttemptedRef.current = true;
    setSubmissionStatus("submitting");
    const surveySubmissionData = getSurveySubmissionData();

    const payload = buildSubmissionPayload({
      summary,
      state,
      eventLogs: loadEvents({ inMemory: state.isTestMode }),
      surveyAnswers: surveySubmissionData.surveyAnswers,
      surveyResponses: surveySubmissionData.surveyResponses,
    });

    submitExperimentData(payload).then((result) => {
      if (!ignore) {
        if (result.status === "success" && !state.isTestMode) {
          markConditionComplete(state.taskId, state.variant);
        }
        setSubmissionStatus(result.status);
      }
    });

    return () => {
      ignore = true;
    };
  }, [state, summary, shouldSubmitExperimentData, surveyAnswers, surveyStep]);

  const submissionStatusText = getSubmissionStatusText(submissionStatus);
  const isSubmissionComplete = submissionStatus === "success" || submissionStatus === "test_mode";
  const canMoveToFinalSurvey = shouldShowTaskSurvey && isFinalTest && surveyStep === "task" && activeSurveyComplete;
  const canProceed = canMoveToFinalSurvey || (isSubmissionComplete && activeSurveyComplete);
  const actionLabel = (() => {
    if (!activeSurveyComplete) return shouldShowTaskSurvey ? "설문을 완료해주세요" : "다음 테스트 준비 중";
    if (canMoveToFinalSurvey) return "종합 설문으로 이동";
    if (!isSubmissionComplete) return "잠시만 기다려주세요";
    if (isFinalTest) return "제출하기";
    return "다음 테스트 시작";
  })();

  const updateSurveyAnswer = (name, value) => {
    setSurveyAnswers((current) => ({ ...current, [name]: value }));
  };

  const handlePrimaryAction = () => {
    if (!canProceed) return;
    if (shouldShowTaskSurvey && isFinalTest && surveyStep === "task") {
      setSurveyStep("final");
      requestAnimationFrame(() => {
        document.querySelector(".complete-survey-screen")?.scrollTo({ top: 0, behavior: "smooth" });
      });
      return;
    }
    if (nextCondition) {
      window.location.assign(buildConditionUrl(nextCondition, state.participantId, { mode: state.mode }));
      return;
    }
    navigate(state.isTestMode ? "/thanks?mode=test" : "/thanks");
  };

  function renderSurveyQuestion(question) {
    if (!question || !Array.isArray(question.options)) return null;
    if (!isQuestionVisible(question, surveyAnswers)) return null;
    const task1AutoActionImage = getTask1AutoActionImage(question);

    return (
      <div
        className={`survey-question survey-question-${question.type === "scale" ? "scale" : "choice"}`}
        key={question.name}
        role="group"
        aria-labelledby={`${question.name}-label`}
      >
        <div className="survey-question-title" id={`${question.name}-label`}>
          <span className="survey-question-number">{question.number}.</span>
          <span>{question.label}</span>
          <span className="survey-required-mark" aria-label="필수">
            *
          </span>
        </div>
        {question.type === "scale" ? (
          <div className="survey-scale-row">
            <span className="survey-scale-end-label">{question.options[0]}</span>
            <div className="survey-scale-control">
              <div className="survey-scale-numbers" aria-hidden="true">
                {question.options.map((option, index) => (
                  <span key={option}>{index + 1}</span>
                ))}
              </div>
              <div className="survey-scale-radios">
                {question.options.map((option, index) => (
                  <label key={option} className="survey-scale-option">
                    <input
                      type="radio"
                      name={question.name}
                      value={option}
                      checked={surveyAnswers[question.name] === option}
                      onChange={(event) => updateSurveyAnswer(question.name, event.currentTarget.value)}
                    />
                    <span aria-label={`${index + 1}. ${option}`} />
                  </label>
                ))}
              </div>
            </div>
            <span className="survey-scale-end-label">{question.options[question.options.length - 1]}</span>
          </div>
        ) : (
          <div className="survey-choice-list">
            {question.options.map((option) => (
              <label key={option} className="survey-choice-option">
                <input
                  type="radio"
                  name={question.name}
                  value={option}
                  checked={surveyAnswers[question.name] === option}
                  onChange={(event) => updateSurveyAnswer(question.name, event.currentTarget.value)}
                />
                <span className="survey-choice-marker" aria-hidden="true" />
                <span className="survey-choice-label">{option}</span>
              </label>
            ))}
          </div>
        )}
        {question.type === "choice_text" ? (
          <textarea
            className="survey-textarea"
            value={surveyAnswers[`${question.name}_reason`] || ""}
            onChange={(event) => updateSurveyAnswer(`${question.name}_reason`, event.currentTarget.value)}
            placeholder="이유를 입력해주세요. (선택)"
            rows={3}
          />
        ) : null}
        {shouldShowTrainScreenComparison(question) ? (
          <div className="survey-screen-comparison" aria-label="A/B 열차 선택 후 화면 비교">
            <figure>
              <img src={aTrainAfterSelectImage} alt="A의 열차 선택 후 화면" />
              <figcaption>A의 열차 선택 후 화면</figcaption>
            </figure>
            <figure>
              <img src={bTrainAfterSelectImage} alt="B의 열차 선택 후 화면" />
              <figcaption>B의 열차 선택 후 화면</figcaption>
            </figure>
          </div>
        ) : null}
        {shouldShowCarSelectorComparison(question) ? (
          <div className="survey-screen-comparison" aria-label="A/B 호차 변경 방식 비교">
            <figure>
              <img src={aCarSelectDropdownImage} alt="A의 호차 선택박스 화면" />
              <figcaption>A의 호차 선택박스 화면</figcaption>
            </figure>
            <figure>
              <img src={bSeatSelectionCar1Image} alt="B의 호차 카드형 선택 화면" />
              <figcaption>B의 호차 카드형 선택 화면</figcaption>
            </figure>
          </div>
        ) : null}
        {shouldShowBOverviewImage(question) ? (
          <div className="survey-screen-comparison survey-screen-comparison-single" aria-label="B 좌석 현황 창 화면">
            <figure>
              <img src={bTrainAfterSelectImage} alt="B의 좌석 현황 창 화면" />
              <figcaption>B의 좌석 현황 창 화면</figcaption>
            </figure>
          </div>
        ) : null}
        {shouldShowTask2BStatusImage(question) ? (
          <div className="survey-screen-comparison survey-screen-comparison-single" aria-label="B의 좌석 현황 창">
            <figure>
              <img src={bTrainAfterSelectImage} alt="B의 좌석 현황 창" />
              <figcaption>B의 좌석 현황 창</figcaption>
            </figure>
          </div>
        ) : null}
        {task1AutoActionImage ? (
          <div className="survey-screen-comparison survey-screen-comparison-single" aria-label={task1AutoActionImage.caption}>
            <figure>
              <img src={task1AutoActionImage.src} alt={task1AutoActionImage.alt} />
              <figcaption>{task1AutoActionImage.caption}</figcaption>
            </figure>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <CompletePageErrorBoundary>
      <main className="phone-frame" data-clarity-unmask="true">
      <section className="screen complete-screen complete-survey-screen">
        <p className="eyebrow">테스트 완료</p>
        <h1>{task?.title} - {state.variant}</h1>
        <div className="pid-display">{state.participantId}</div>
        <p>
          {shouldShowTaskSurvey
            ? surveyStep === "final"
              ? "마지막 종합 설문을 작성해주세요."
            : "A/B 테스트 쌍이 끝났습니다. 아래 Task 설문을 작성해주세요."
            : "데이터 저장이 완료되면 다음 테스트로 진행해주세요."}
        </p>
        {submissionStatusText ? (
          <p className={`submission-status submission-status-${submissionStatus}`} aria-live="polite">
            {submissionStatusText}
          </p>
        ) : null}

        {shouldShowTaskSurvey ? (
          <section className="post-task-survey" aria-label={surveyStep === "final" ? "종합 설문" : "Task별 설문"}>
            <h2>{surveyStep === "final" ? "종합 설문" : `${task?.title} 설문`}</h2>
            <p className="survey-help">필수 문항을 선택하고, 이유 입력란은 필요한 경우에만 작성해주세요.</p>
            {numberedSurveyQuestions.map(renderSurveyQuestion)}
          </section>
        ) : null}

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
    </CompletePageErrorBoundary>
  );
}
