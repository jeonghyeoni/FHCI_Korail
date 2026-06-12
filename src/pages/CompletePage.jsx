import { Component, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadEvents, loadSummary } from "../analytics/storage.js";
import { buildSubmissionPayload, buildSurveySubmissionPayload, submitExperimentData, submitSurveyData } from "../analytics/submission.js";
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
    case "survey_submitting":
      return "설문 데이터 저장 중...";
    case "survey_success":
      return "설문 데이터 저장 완료";
    case "survey_failed":
      return "설문 데이터 저장 실패: 관리자에게 알려주세요";
    default:
      return "";
  }
}

const LIKERT_AGREE = ["매우 그렇지 않다", "그렇지 않다", "약간 그렇지 않다", "약간 그렇다", "그렇다", "매우 그렇다"];
const LEGACY_LIKERT_EASY = ["매우 어렵다", "어렵다", "약간 어렵다", "약간 쉽다", "쉽다", "매우 쉽다"];
const LEGACY_LIKERT_SATISFACTION = ["매우 불만족", "불만족", "약간 불만족", "약간 만족", "만족", "매우 만족"];
const YES_NO = ["그렇다", "그렇지 않다"];
const UI_PREFERENCE = ["A", "B", "잘 모르겠다"];

function getTaskSurveyQuestions(taskId) {
  const taskSurveys = {
    "1": [
      { name: "task1_error_prevention_1", type: "scale", label: "원치 않는 좌석을 잘못 선택할 가능성이 적었다.", options: LIKERT_AGREE },
      { name: "task1_error_prevention_2", type: "scale", label: "다음 단계에서 어떤 일이 일어날지 예측하기 쉬웠다.", options: LIKERT_AGREE },
      { name: "task1_error_prevention_3", type: "scale", label: "의도하지 않은 방식으로 예매가 진행될 가능성이 적었다.", options: LIKERT_AGREE },
      { name: "task1_error_prevention_4", type: "scale", label: "예매 화면이 원하는 좌석을 예매하기 위한 올바른 경로를 명확하게 제시해 준다고 느껴졌다.", options: LIKERT_AGREE },
    ],
    "2": [
      { name: "task2_controllability_1", type: "scale", label: "예매 과정이 나의 의도에 맞게 흘러갔다.", options: LIKERT_AGREE },
      { name: "task2_controllability_2", type: "scale", label: "어떤 버튼을 눌러야 좌석이 자동으로 배정될지 쉽게 예측할 수 있었다.", options: LIKERT_AGREE },
      { name: "task2_controllability_3", type: "scale", label: "예매 과정에서 내가 직접 선택과 진행을 통제하고 있다고 느껴졌다.", options: LIKERT_AGREE },
    ],
    "3": [
      { name: "task3_recognition_1", type: "scale", label: "원하는 좌석을 찾기 위해 이전에 본 정보를 기억할 필요가 적었다.", options: LIKERT_AGREE },
      { name: "task3_recognition_2", type: "scale", label: "원하는 좌석을 직관적으로 찾을 수 있었다.", options: LIKERT_AGREE },
      { name: "task3_recognition_3", type: "scale", label: "여러 좌석을 한눈에 비교할 수 있었다.", options: LIKERT_AGREE },
      { name: "task3_visibility_4", type: "scale", label: "어떤 좌석이 예약 가능한지 명확하게 알 수 있었다.", options: LIKERT_AGREE },
      { name: "task3_visibility_5", type: "scale", label: "창가 좌석의 현황을 쉽게 파악할 수 있었다.", options: LIKERT_AGREE },
      { name: "task3_visibility_6", type: "scale", label: "원하는 좌석을 찾기 위해 필요한 정보가 명확하게 제공되었다.", options: LIKERT_AGREE },
    ],
  };

  return taskSurveys[taskId] || [];
}

// Legacy survey set kept for future small-sample reruns.
function getLegacyCommonTaskSurveyQuestions(taskId) {
  return [
    { name: `task${taskId}_a_difficulty`, type: "scale", label: "A에서 예매 과정의 난이도는 어땠나요?", options: LEGACY_LIKERT_EASY },
    { name: `task${taskId}_a_intuitive`, type: "scale", label: "A에서 예매 과정의 UI는 충분히 직관적이었나요?", options: LEGACY_LIKERT_SATISFACTION },
    { name: `task${taskId}_a_goal_selection`, type: "choice_text", label: "A의 좌석 선택에서 목표 좌석을 빠르고 정확하게 선택할 수 있었나요? 그 이유는 무엇인가요?", options: YES_NO },
    { name: `task${taskId}_b_difficulty`, type: "scale", label: "B에서 예매 과정의 난이도는 어땠나요?", options: LEGACY_LIKERT_EASY },
    { name: `task${taskId}_b_intuitive`, type: "scale", label: "B의 예매 과정에서 UI는 충분히 직관적이었나요?", options: LEGACY_LIKERT_SATISFACTION },
    { name: `task${taskId}_b_goal_selection`, type: "choice_text", label: "B의 좌석 선택에서 목표 좌석을 빠르고 정확하게 선택할 수 있었나요? 그 이유는 무엇인가요?", options: YES_NO },
  ];
}

const LEGACY_TASK_SURVEY_DETAILS = {
  "1": [
    { name: "task1_status_helpful", type: "scale", label: "B에서 특정 좌석을 예매하기 위해 호차를 선택할 때 좌석 현황 창이 도움이 되었나요?", options: LIKERT_AGREE },
    { name: "task1_b_car_button_used", type: "choice", label: "B에서 호차 변경 버튼을 이용했나요? (9번 질문에 첨부된 사진 참고)", options: YES_NO },
    { name: "task1_car_selector_preference", type: "choice", label: "호차 변경 버튼의 경우 A(선택박스형)와 B(카드형) 중 어느 쪽을 더 선호하나요?", options: UI_PREFERENCE },
    { name: "task1_entry_preference", type: "choice", label: "A는 열차 선택 시 좌석 선택과 예매 버튼이 있는 추가 팝업 창이 뜨는 반면, B는 바로 좌석 선택 화면으로 이동합니다. 본 Task를 수행하는 데 있어서 어느 쪽을 선호하나요?", options: UI_PREFERENCE },
  ],
  "2": [
    { name: "task2_a_auto_awareness", type: "choice", label: "A에서 '예매'를 누르면 좌석이 자동으로 배정된다는 사실을 인지하고 있었나요?", options: YES_NO },
    { name: "task2_a_auto_used", type: "choice", label: "A에서 아무 좌석이나 예매할 때 '좌석 선택' 버튼 대신 '예매' 버튼을 이용했나요?", options: YES_NO },
    { name: "task2_a_auto_helpful", type: "scale", label: "A에서 아무 좌석이나 예매할 때 '예매' 버튼은 도움이 되었나요?", options: LIKERT_AGREE, showIf: { name: "task2_a_auto_used", value: "그렇다" } },
    { name: "task2_b_auto_used", type: "choice", label: "B에서 아무 좌석이나 예매할 때 '좌석 자동배정' 버튼을 이용했나요?", options: YES_NO },
    { name: "task2_b_auto_helpful", type: "scale", label: "B에서 아무 좌석이나 예매할 때 '좌석 자동배정' 버튼은 도움이 되었나요?", options: LIKERT_AGREE, showIf: { name: "task2_b_auto_used", value: "그렇다" } },
    { name: "task2_entry_preference", type: "choice", label: "A는 열차 선택 시 좌석 선택과 예매 버튼이 있는 추가 팝업 창이 뜨는 반면, B는 바로 좌석 선택 화면으로 이동합니다. 본 Task를 수행하는 데 있어서 어느 쪽을 선호하나요?", options: UI_PREFERENCE },
  ],
  "3": [
    { name: "task3_a_window_difficulty", type: "scale", label: "A에서 창가 자리를 찾는 과정의 난이도는 어떠했나요?", options: LEGACY_LIKERT_EASY },
    { name: "task3_b_window_difficulty", type: "scale", label: "B에서 창가 자리를 찾는 과정의 난이도는 어떠했나요?", options: LEGACY_LIKERT_EASY },
    { name: "task3_b_status_used", type: "choice", label: "B에서 창가 자리를 찾을 때 좌석 현황 창을 활용했나요?", options: YES_NO },
    { name: "task3_b_status_helpful", type: "choice", label: "B에서 좌석 현황 창은 창가 자리를 예매하는 데 도움이 되었나요?", options: YES_NO, showIf: { name: "task3_b_status_used", value: "그렇다" } },
    { name: "task3_b_available_intuitive", type: "choice", label: "B의 좌석 현황 창에서 예약 가능한 좌석과 예약 불가능한 좌석의 구분이 충분히 직관적이었나요?", options: YES_NO },
    { name: "task3_b_window_intuitive", type: "choice", label: "B의 좌석 현황 창에서 창가 좌석과 안쪽 좌석의 구분이 충분히 직관적이었나요?", options: YES_NO },
    { name: "task3_window_preference", type: "choice", label: "창가 좌석을 예매하는 과정에 있어서 A와 B 중 어느 쪽을 선호하나요?", options: UI_PREFERENCE },
  ],
};

const FINAL_SURVEY_QUESTIONS = [
  {
    name: "final_ui_preference",
    type: "choice",
    label: "전체적으로 어느 UI를 더 선호하나요?",
    options: ["A", "B", "차이를 느끼지 못함"],
    scoreMap: { A: -1, B: 1, "차이를 느끼지 못함": 0 },
  },
  { name: "final_gender", type: "choice", label: "성별이 무엇인가요?", options: ["여성", "남성"] },
  {
    name: "final_age",
    type: "choice",
    label: "나이대가 어떻게 되나요?",
    options: ["10대", "20대", "30대", "40대", "50대", "60대 이상"],
    scoreMap: { "10대": 10, "20대": 20, "30대": 30, "40대": 40, "50대": 50, "60대 이상": 60 },
  },
  {
    name: "final_korailtalk_used",
    type: "choice",
    label: "기존에 KTX 예매를 위해 코레일톡을 사용해본 적이 있나요?",
    options: YES_NO,
    scoreMap: { "그렇지 않다": 0, 그렇다: 1 },
  },
  {
    name: "final_followup_phone",
    type: "text",
    label:
      "전화번호를 기재해주시면 필요에 따라 추가 설문을 위한 연락이 갈 수 있습니다. 추가 설문에 참여해주시면 소정의 기프티콘을 드립니다. 많은 참여 부탁드립니다.",
    placeholder: "전화번호 입력 (선택)",
    required: false,
    scoreByPresence: true,
  },
];

function getLegacyTaskSurveyQuestions(taskId) {
  return [...getLegacyCommonTaskSurveyQuestions(taskId), ...(LEGACY_TASK_SURVEY_DETAILS[taskId] || [])];
}

function isQuestionVisible(question, answers) {
  if (!question.showIf) return true;
  return answers[question.showIf.name] === question.showIf.value;
}

function isSurveyComplete(questions, answers) {
  return questions.every((question) => {
    if (!isQuestionVisible(question, answers)) return true;
    if (question.required === false) return true;
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

function getSurveyQuestionScore(question, answer, optionIndex) {
  if (question.type === "scale" && optionIndex >= 0) return optionIndex + 1;
  if (question.scoreMap && Object.prototype.hasOwnProperty.call(question.scoreMap, answer)) return question.scoreMap[answer];
  if ((question.type === "choice" || question.type === "choice_text") && optionIndex >= 0) return optionIndex + 1;
  if (question.type === "text" && question.scoreByPresence) return answer.trim() ? 1 : 0;
  return "";
}

function buildSurveyResponses(questions, answers, section) {
  return getNumberedSurveyQuestions(questions, answers).map((question) => {
    const answer = answers[question.name] || "";
    const optionIndex = Array.isArray(question.options) ? question.options.findIndex((option) => option === answer) : -1;
    const score = getSurveyQuestionScore(question, answer, optionIndex);

    return {
      section,
      questionName: question.name,
      questionNumber: question.number,
      questionLabel: question.label,
      questionType: question.type,
      answer,
      score,
      reason: question.type === "choice_text" ? answers[`${question.name}_reason`] || "" : "",
    };
  });
}

function shouldShowTrainScreenComparison(question) {
  return question.name === "task1_entry_preference" || question.name === "task2_entry_preference";
}

function shouldShowCarSelectorComparison(question) {
  return question.name === "task1_car_selector_preference";
}

function shouldShowBOverviewImage(question) {
  return question.name === "task3_b_status_used";
}

function shouldShowTask2BStatusImage(question) {
  return question.name === "task1_status_helpful";
}

function getAutoActionImage(question) {
  if (question.name === "task2_a_auto_used") {
    return {
      src: aTrainAfterSelectReserveHighlightImage,
      alt: "A의 열차 선택 후 화면에서 예매 버튼이 강조된 화면",
      caption: "A의 예매 버튼 (빨간색 강조 표시)",
    };
  }

  if (question.name === "task2_b_auto_used") {
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
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [isSubmittingOnClick, setIsSubmittingOnClick] = useState(false);
  const [surveySubmissionStatus, setSurveySubmissionStatus] = useState("idle");
  const submitAttemptedRef = useRef(false);
  const nextCondition = getNextCondition(state.taskId, state.variant);
  const isFinalTest = !nextCondition;
  const shouldShowTaskSurvey = true;
  const taskSurveyQuestions = getTaskSurveyQuestions(state.taskId);
  const activeSurveyQuestions = shouldShowTaskSurvey
    ? surveyStep === "final"
      ? FINAL_SURVEY_QUESTIONS
      : taskSurveyQuestions
    : [];
  const numberedSurveyQuestions = getNumberedSurveyQuestions(activeSurveyQuestions, surveyAnswers);
  const task = TASKS[state.taskId];
  const activeSurveyComplete = !shouldShowTaskSurvey || isSurveyComplete(activeSurveyQuestions, surveyAnswers);
  const shouldAutoSubmitExperimentData = Boolean(summary);

  function getSurveySubmissionData() {
    if (!shouldShowTaskSurvey) {
      return { surveyAnswers: null, surveyResponses: [], taskSurveyResponses: [], finalSurveyResponses: [] };
    }

    const taskSurveyResponses = buildSurveyResponses(taskSurveyQuestions, surveyAnswers, "task");
    const finalSurveyResponses = isFinalTest && surveyStep === "final"
      ? buildSurveyResponses(FINAL_SURVEY_QUESTIONS, surveyAnswers, "final")
      : [];

    return {
      surveyAnswers,
      surveyResponses: [...taskSurveyResponses, ...finalSurveyResponses],
      taskSurveyResponses,
      finalSurveyResponses,
    };
  }

  useEffect(() => {
    if (state.isTestMode) {
      setSubmissionStatus("test_mode");
      return undefined;
    }

    if (!shouldAutoSubmitExperimentData || submitAttemptedRef.current) return undefined;

    let ignore = false;
    submitAttemptedRef.current = true;
    setSubmissionStatus("submitting");

    const payload = buildSubmissionPayload({
      summary,
      state,
      eventLogs: loadEvents({ inMemory: state.isTestMode }),
    });

    submitExperimentData(payload).then((result) => {
      if (!ignore) {
        setSubmissionStatus(result.status);
      }
    });

    return () => {
      ignore = true;
    };
  }, [state, summary, shouldAutoSubmitExperimentData, shouldShowTaskSurvey]);

  const statusForDisplay = surveySubmissionStatus !== "idle" ? surveySubmissionStatus : submissionStatus;
  const submissionStatusText = getSubmissionStatusText(statusForDisplay);
  const isSubmissionComplete = submissionStatus === "success" || submissionStatus === "test_mode";
  const canOpenSurvey = shouldShowTaskSurvey && !isSurveyOpen && isSubmissionComplete;
  const canMoveToFinalSurvey = shouldShowTaskSurvey && isSurveyOpen && isFinalTest && surveyStep === "task" && activeSurveyComplete;
  const canSubmitSurvey = shouldShowTaskSurvey && isSurveyOpen && activeSurveyComplete && !isSubmittingOnClick;
  const canProceed = canOpenSurvey || canMoveToFinalSurvey || canSubmitSurvey || (!shouldShowTaskSurvey && isSubmissionComplete);
  const actionLabel = (() => {
    if (isSubmittingOnClick) return "잠시만 기다려주세요";
    if (shouldShowTaskSurvey && !isSurveyOpen) return isSubmissionComplete ? "설문 하러가기" : "잠시만 기다려주세요";
    if (!activeSurveyComplete) return shouldShowTaskSurvey ? "설문을 완료해주세요" : "다음 테스트 준비 중";
    if (canMoveToFinalSurvey) return "종합 설문으로 이동";
    if (shouldShowTaskSurvey) return "설문 제출";
    if (!isSubmissionComplete) return "잠시만 기다려주세요";
    return isFinalTest ? "제출하기" : "다음 테스트 시작";
  })();

  const updateSurveyAnswer = (name, value) => {
    setSurveyAnswers((current) => ({ ...current, [name]: value }));
  };

  const handlePrimaryAction = () => {
    if (!canProceed || isSubmittingOnClick) return;
    if (shouldShowTaskSurvey && !isSurveyOpen) {
      setIsSurveyOpen(true);
      return;
    }

    if (shouldShowTaskSurvey && isFinalTest && surveyStep === "task") {
      setSurveyStep("final");
      requestAnimationFrame(() => {
        document.querySelector(".complete-survey-screen")?.scrollTo({ top: 0, behavior: "smooth" });
      });
      return;
    }

    if (shouldShowTaskSurvey) {
      if (state.isTestMode) {
        if (nextCondition) {
          window.location.assign(buildConditionUrl(nextCondition, state.participantId, { mode: state.mode }));
          return;
        }
        navigate("/thanks?mode=test");
        return;
      }

      if (!summary) return;

      setIsSubmittingOnClick(true);
      setSurveySubmissionStatus("survey_submitting");
      const surveySubmissionData = getSurveySubmissionData();
      const payload = buildSurveySubmissionPayload({
        summary,
        state,
        surveyAnswers: surveySubmissionData.surveyAnswers,
        surveyResponses: surveySubmissionData.taskSurveyResponses,
      });

      const submitPromise = isFinalTest && surveyStep === "final"
        ? submitSurveyData(payload).then((taskSurveyResult) => {
          if (taskSurveyResult.status !== "success") return taskSurveyResult;

          const finalPayload = buildSurveySubmissionPayload({
            summary,
            state,
            surveyAnswers: surveySubmissionData.surveyAnswers,
            surveyResponses: surveySubmissionData.finalSurveyResponses,
            identity: {
              variant: "FINAL",
              taskId: "final",
              keySuffix: "final-survey",
            },
          });

          return submitSurveyData(finalPayload);
        })
        : submitSurveyData(payload);

      submitPromise.then((result) => {
        setSurveySubmissionStatus(result.status === "success" ? "survey_success" : result.status === "failed" ? "survey_failed" : result.status);

        if (result.status === "success") {
          markConditionComplete(state.taskId, state.variant);
          if (nextCondition) {
            window.location.assign(buildConditionUrl(nextCondition, state.participantId, { mode: state.mode }));
            return;
          }
          navigate("/thanks");
          return;
        }

        setIsSubmittingOnClick(false);
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
    if (!question) return null;
    if (!isQuestionVisible(question, surveyAnswers)) return null;
    const autoActionImage = getAutoActionImage(question);

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
          {question.required === false ? null : (
            <span className="survey-required-mark" aria-label="필수">
              *
            </span>
          )}
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
        ) : question.type === "text" ? (
          <textarea
            className="survey-textarea"
            value={surveyAnswers[question.name] || ""}
            onChange={(event) => updateSurveyAnswer(question.name, event.currentTarget.value)}
            placeholder={question.placeholder || "입력해주세요."}
            rows={3}
          />
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
        {autoActionImage ? (
          <div className="survey-screen-comparison survey-screen-comparison-single" aria-label={autoActionImage.caption}>
            <figure>
              <img src={autoActionImage.src} alt={autoActionImage.alt} />
              <figcaption>{autoActionImage.caption}</figcaption>
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
            ? !isSurveyOpen
              ? "실험 데이터 저장이 완료되면 설문으로 이동할 수 있습니다."
              : surveyStep === "final"
                ? "마지막 종합 설문을 작성해주세요."
                : "테스트가 끝났습니다. 아래 설문을 작성해주세요."
            : "데이터 저장이 완료되면 다음 테스트로 진행해주세요."}
        </p>
        {submissionStatusText ? (
          <p className={`submission-status submission-status-${statusForDisplay}`} aria-live="polite">
            {submissionStatusText}
          </p>
        ) : null}

        {shouldShowTaskSurvey && isSurveyOpen ? (
          <section className="post-task-survey" aria-label={surveyStep === "final" ? "종합 설문" : "Task별 설문"}>
            <h2>{surveyStep === "final" ? "종합 설문" : `${task?.title} 설문`}</h2>
            <p className="survey-help">필수 문항을 모두 선택해주세요.</p>
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
          disabled={!canProceed || isSubmittingOnClick}
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
