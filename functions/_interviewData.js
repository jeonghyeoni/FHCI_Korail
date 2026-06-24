// Generated from FHCI data.xlsx and pasted interview questions.
// Server-only data for Cloudflare Pages Functions. Do not import this module from client code.
export const INTERVIEW_DATA_BY_CODE = {
  "Y7M4QK2R8VLA": {
    "interviewCode": "Y7M4QK2R8VLA",
    "intervieweeLabel": "P5",
    "participantId": "P30GF9DCE",
    "clarityUrl": "https://clarity.microsoft.com/shared/recording/bb124577-65f7-4a45-965f-fcdc2ed7e2c1",
    "commonQuestions": [
      {
        "group": "공통 질문",
        "number": "1",
        "label": "평소에 코레일 앱이나 기차 예매 앱을 사용해본 경험이 얼마나 있으신가요?"
      },
      {
        "group": "공통 질문",
        "number": "2",
        "label": "저번 설문에서 전체적으로 선호하는 UI는 “A/B”라고 하셨는데, 그 이유는 무엇인가요?"
      },
      {
        "group": "공통 질문",
        "number": "3",
        "label": "실험 중 가장 헷갈렸던 화면이나 버튼이 있었다면 무엇이었나요?"
      }
    ],
    "customQuestions": [
      {
        "group": "Task 1-A",
        "number": "1",
        "label": "Task 1-A에서 처음에 ‘예매’ 버튼을 눌렀을 때, 어떤 결과가 일어날 것이라고 예상하셨나요?"
      },
      {
        "group": "Task 1-A",
        "number": "2",
        "label": "결제 화면까지 이동한 뒤 다시 뒤로 돌아가셨는데, 그때 “내가 원하는 방식으로 예매가 진행되지 않았다”고 느끼셨나요?"
      },
      {
        "group": "Task 1-A",
        "number": "3",
        "label": "‘예매’ 버튼과 ‘좌석 선택’ 버튼의 차이가 명확하게 느껴졌나요?"
      },
      {
        "group": "Task 1-A",
        "number": "4",
        "label": "Task 1-A에서 실제로는 여러 번 돌아가고 다시 시도하는 과정이 있었는데, 설문에서는 모든 항목에 높은 점수를 주셨습니다. 그 이유가 무엇인가요?",
        "prompts": [
          "예매에 성공했기 때문에 좋게 평가하신 건가요?",
          "아니면 과정 자체도 크게 불편하지 않았나요?"
        ]
      },
      {
        "group": "Task 3-A / Task 3-B",
        "number": "1",
        "label": "Task 3-A에서 창가 좌석을 예매해야 하는 상황이었는데 바로 ‘예매’ 버튼을 누르셨습니다. 이유가 무엇인가요?",
        "prompts": [
          "예매 버튼을 누르면 아무 좌석이나 자동으로 배정될 것이라는 걸 예상하셨나요?",
          "예매 버튼을 통해 창가 좌석 탐색 절차가 생략돼었는데, 만약 자동으로 배정된 좌석이 창가 좌석이 아니였다면 어땠을 것 같나요?"
        ]
      },
      {
        "group": "Task 3-A / Task 3-B",
        "number": "2",
        "label": "Task 3-B에서 좌석 현황 화면을 자세히 보기보다는 바로 호차로 들어가서 탐색하셨는데, 좌석 현황 화면의 정보가 충분히 눈에 들어오지 않았나요?"
      },
      {
        "group": "Task 3-A / Task 3-B",
        "number": "3",
        "label": "Task 3-B에서 상단 호차 카드 버튼을 이용해 창가 좌석을 찾는 과정은 편했나요? 불편한 점이 있었다면 무엇인가요?"
      }
    ],
    "tasks": [
      {
        "condition": "1-A",
        "label": "Task 1 - A",
        "taskId": "1",
        "variant": "A",
        "taskDescription": "KTX001 일반실 5호차 4B 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "5-4B",
          "carriageNo": 5,
          "row": 4,
          "column": "B",
          "label": "4B",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "5호차 4B",
        "selectedCar": 5,
        "completionTimeMs": 50485,
        "clickCount": 17,
        "misclickCount": 3,
        "roughTapCount": 0,
        "pageTransitionCount": 12,
        "carriageChangeCount": 2,
        "seatSelectionCount": 2,
        "startedAt": "2026-06-15 16:30:08 KST",
        "completedAt": "2026-06-15 16:30:58 KST"
      },
      {
        "condition": "1-B",
        "label": "Task 1 - B",
        "taskId": "1",
        "variant": "B",
        "taskDescription": "KTX001 일반실 5호차 4B 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "5-4B",
          "carriageNo": 5,
          "row": 4,
          "column": "B",
          "label": "4B",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "5호차 4B",
        "selectedCar": 5,
        "completionTimeMs": 11035,
        "clickCount": 5,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 5,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-15 16:31:21 KST",
        "completedAt": "2026-06-15 16:31:32 KST"
      },
      {
        "condition": "2-A",
        "label": "Task 2 - A",
        "taskId": "2",
        "variant": "A",
        "taskDescription": "KTX001 일반실 마지막 남은 한 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "7-2C",
          "carriageNo": 7,
          "row": 2,
          "column": "C",
          "label": "2C",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "7호차 2C",
        "selectedCar": 7,
        "completionTimeMs": 5145,
        "clickCount": 3,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 3,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-15 16:31:51 KST",
        "completedAt": "2026-06-15 16:31:56 KST"
      },
      {
        "condition": "2-B",
        "label": "Task 2 - B",
        "taskId": "2",
        "variant": "B",
        "taskDescription": "KTX001 일반실 마지막 남은 한 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "7-2C",
          "carriageNo": 7,
          "row": 2,
          "column": "C",
          "label": "2C",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "7호차 2C",
        "selectedCar": 7,
        "completionTimeMs": 3518,
        "clickCount": 4,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 3,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-15 16:32:20 KST",
        "completedAt": "2026-06-15 16:32:24 KST"
      },
      {
        "condition": "3-A",
        "label": "Task 3 - A",
        "taskId": "3",
        "variant": "A",
        "taskDescription": "KTX001 일반실 창가 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "3-4A",
          "carriageNo": 3,
          "row": 4,
          "column": "A",
          "label": "4A",
          "isWindow": true,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "3호차 4A",
        "selectedCar": 3,
        "completionTimeMs": 4956,
        "clickCount": 3,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 3,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-15 16:32:40 KST",
        "completedAt": "2026-06-15 16:32:45 KST"
      },
      {
        "condition": "3-B",
        "label": "Task 3 - B",
        "taskId": "3",
        "variant": "B",
        "taskDescription": "KTX001 일반실 창가 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "6-14A",
          "carriageNo": 6,
          "row": 14,
          "column": "A",
          "label": "14A",
          "isWindow": true,
          "isAvailable": true,
          "direction": "reverse"
        },
        "selectedSeatLabel": "6호차 14A",
        "selectedCar": 6,
        "completionTimeMs": 11300,
        "clickCount": 7,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 7,
        "carriageChangeCount": 3,
        "seatSelectionCount": 1,
        "startedAt": "recovered",
        "completedAt": "recovered"
      }
    ],
    "surveyResponses": {
      "1-A": [
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task1_error_prevention_1",
          "questionLabel": "원치 않는 좌석을 잘못 선택할 가능성이 적었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task1_error_prevention_2",
          "questionLabel": "다음 단계에서 어떤 일이 일어날지 예측하기 쉬웠다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task1_error_prevention_3",
          "questionLabel": "의도하지 않은 방식으로 예매가 진행될 가능성이 적었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task1_error_prevention_4",
          "questionLabel": "예매 화면이 원하는 좌석을 예매하기 위한 올바른 경로를 명확하게 제시해 준다고 느껴졌다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        }
      ],
      "1-B": [
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task1_error_prevention_1",
          "questionLabel": "원치 않는 좌석을 잘못 선택할 가능성이 적었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task1_error_prevention_2",
          "questionLabel": "다음 단계에서 어떤 일이 일어날지 예측하기 쉬웠다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task1_error_prevention_3",
          "questionLabel": "의도하지 않은 방식으로 예매가 진행될 가능성이 적었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task1_error_prevention_4",
          "questionLabel": "예매 화면이 원하는 좌석을 예매하기 위한 올바른 경로를 명확하게 제시해 준다고 느껴졌다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        }
      ],
      "2-A": [
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task2_controllability_1",
          "questionLabel": "예매 과정이 나의 의도에 맞게 흘러갔다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task2_controllability_2",
          "questionLabel": "어떤 버튼을 눌러야 좌석이 자동으로 배정될지 쉽게 예측할 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task2_controllability_3",
          "questionLabel": "예매 과정에서 내가 직접 선택과 진행을 통제하고 있다고 느껴졌다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        }
      ],
      "2-B": [
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task2_controllability_1",
          "questionLabel": "예매 과정이 나의 의도에 맞게 흘러갔다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task2_controllability_2",
          "questionLabel": "어떤 버튼을 눌러야 좌석이 자동으로 배정될지 쉽게 예측할 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task2_controllability_3",
          "questionLabel": "예매 과정에서 내가 직접 선택과 진행을 통제하고 있다고 느껴졌다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        }
      ],
      "3-A": [
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task3_recognition_1",
          "questionLabel": "원하는 좌석을 찾기 위해 이전에 본 정보를 기억할 필요가 적었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task3_recognition_2",
          "questionLabel": "원하는 좌석을 직관적으로 찾을 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task3_recognition_3",
          "questionLabel": "여러 좌석을 한눈에 비교할 수 있었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task3_visibility_4",
          "questionLabel": "어떤 좌석이 예약 가능한지 명확하게 알 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 5,
          "questionName": "task3_visibility_5",
          "questionLabel": "창가 좌석의 현황을 쉽게 파악할 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 6,
          "questionName": "task3_visibility_6",
          "questionLabel": "원하는 좌석을 찾기 위해 필요한 정보가 명확하게 제공되었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        }
      ],
      "3-B": [
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task3_recognition_1",
          "questionLabel": "원하는 좌석을 찾기 위해 이전에 본 정보를 기억할 필요가 적었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task3_recognition_2",
          "questionLabel": "원하는 좌석을 직관적으로 찾을 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task3_recognition_3",
          "questionLabel": "여러 좌석을 한눈에 비교할 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task3_visibility_4",
          "questionLabel": "어떤 좌석이 예약 가능한지 명확하게 알 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 5,
          "questionName": "task3_visibility_5",
          "questionLabel": "창가 좌석의 현황을 쉽게 파악할 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 6,
          "questionName": "task3_visibility_6",
          "questionLabel": "원하는 좌석을 찾기 위해 필요한 정보가 명확하게 제공되었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        }
      ],
      "final": [
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 1,
          "questionName": "final_ui_preference",
          "questionLabel": "전체적으로 어느 UI를 더 선호하나요?",
          "questionType": "choice",
          "answer": "B",
          "score": 1,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 2,
          "questionName": "final_gender",
          "questionLabel": "성별이 무엇인가요?",
          "questionType": "choice",
          "answer": "남성",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 3,
          "questionName": "final_age",
          "questionLabel": "나이대가 어떻게 되나요?",
          "questionType": "choice",
          "answer": "20대",
          "score": 20,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 4,
          "questionName": "final_korailtalk_used",
          "questionLabel": "기존에 KTX 예매를 위해 코레일톡을 사용해본 적이 있나요?",
          "questionType": "choice",
          "answer": "그렇다",
          "score": 1,
          "reason": ""
        }
      ]
    }
  },
  "N6R2XQ8L5TKA": {
    "interviewCode": "N6R2XQ8L5TKA",
    "intervieweeLabel": "P9",
    "participantId": "P8J79DAMX",
    "clarityUrl": "https://clarity.microsoft.com/shared/recording/f40153be-bf23-466b-a9cb-3b11326e7924",
    "commonQuestions": [
      {
        "group": "공통 질문",
        "number": "1",
        "label": "평소에 코레일 앱이나 기차 예매 앱을 사용해본 경험이 얼마나 있으신가요?"
      },
      {
        "group": "공통 질문",
        "number": "2",
        "label": "저번 설문에서 전체적으로 선호하는 UI는 “A/B”라고 하셨는데, 그 이유는 무엇인가요?"
      },
      {
        "group": "공통 질문",
        "number": "3",
        "label": "실험 중 가장 헷갈렸던 화면이나 버튼이 있었다면 무엇이었나요?"
      }
    ],
    "customQuestions": [
      {
        "group": "Task 1-A",
        "number": "1",
        "label": "Task 1-A에서 처음에 ‘예매’ 버튼을 눌렀다가 바로 돌아오셨는데, 처음에 ‘예매’ 버튼이 어떤 기능이라고 생각하셨나요?"
      },
      {
        "group": "Task 1-A",
        "number": "2",
        "label": "\"다음 단계에서 어떤 일이 일어날지 예측하기 쉬웠다.\"라는 질문에 \"매우 그렇다\"라고 답하셨는데, 그 이유가 무엇인가요?"
      },
      {
        "group": "Task 2-A / Task 2-B",
        "number": "1",
        "label": "Task 2-A에서 ‘예매’ 버튼을 사용해서 마지막 남은 좌석을 예매하셨습니다. 이때 ‘예매’ 버튼을 좌석 자동 선택 기능으로 이해하고 누르신 건가요, 아니면 다른 의도로 누르신 건가요?"
      },
      {
        "group": "Task 2-A / Task 2-B",
        "number": "2",
        "label": "Task 2-B에서는 ‘좌석 자동선택’ 버튼을 사용하셨는데, 이 버튼의 의미는 명확하게 느껴졌나요?"
      },
      {
        "group": "Task 2-A / Task 2-B",
        "number": "3",
        "label": "Task 2-B에서 실제 수행은 잘 되었지만 설문 점수는 비교적 낮은 편이었습니다. 어떤 부분이 아쉽거나 불편했나요?"
      },
      {
        "group": "Task 3-A / Task 3-B",
        "number": "1",
        "label": "Task 3-A에서 자동으로 선택된 좌석이 창가 좌석이었는데, 처음에는 그 사실을 바로 인지하셨나요?"
      },
      {
        "group": "Task 3-A / Task 3-B",
        "number": "2",
        "label": "Task 3-B에서 좌석 현황 화면을 몇 초간 보신 뒤 창가 좌석이 매진된 호차로 들어가셨습니다. 좌석 현황 화면에서 어떤 정보를 읽으셨나요?"
      },
      {
        "group": "Task 3-A / Task 3-B",
        "number": "3",
        "label": "좌석 현황 화면에서 창가 좌석과 예약 가능 좌석의 구분이 충분히 명확했나요? 헷갈린 부분이 있었다면 무엇인가요?"
      }
    ],
    "tasks": [
      {
        "condition": "1-A",
        "label": "Task 1 - A",
        "taskId": "1",
        "variant": "A",
        "taskDescription": "KTX001 일반실 5호차 4B 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "5-4B",
          "carriageNo": 5,
          "row": 4,
          "column": "B",
          "label": "4B",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "5호차 4B",
        "selectedCar": 5,
        "completionTimeMs": 29878,
        "clickCount": 13,
        "misclickCount": 6,
        "roughTapCount": 0,
        "pageTransitionCount": 8,
        "carriageChangeCount": 2,
        "seatSelectionCount": 2,
        "startedAt": "2026-06-15 19:08:01 KST",
        "completedAt": "2026-06-15 19:08:31 KST"
      },
      {
        "condition": "1-B",
        "label": "Task 1 - B",
        "taskId": "1",
        "variant": "B",
        "taskDescription": "KTX001 일반실 5호차 4B 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "5-4B",
          "carriageNo": 5,
          "row": 4,
          "column": "B",
          "label": "4B",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "5호차 4B",
        "selectedCar": 5,
        "completionTimeMs": 9474,
        "clickCount": 5,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 5,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-15 19:09:02 KST",
        "completedAt": "2026-06-15 19:09:11 KST"
      },
      {
        "condition": "2-A",
        "label": "Task 2 - A",
        "taskId": "2",
        "variant": "A",
        "taskDescription": "KTX001 일반실 마지막 남은 한 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "7-2C",
          "carriageNo": 7,
          "row": 2,
          "column": "C",
          "label": "2C",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "7호차 2C",
        "selectedCar": 7,
        "completionTimeMs": 4359,
        "clickCount": 3,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 3,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-15 19:09:26 KST",
        "completedAt": "2026-06-15 19:09:30 KST"
      },
      {
        "condition": "2-B",
        "label": "Task 2 - B",
        "taskId": "2",
        "variant": "B",
        "taskDescription": "KTX001 일반실 마지막 남은 한 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "7-2C",
          "carriageNo": 7,
          "row": 2,
          "column": "C",
          "label": "2C",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "7호차 2C",
        "selectedCar": 7,
        "completionTimeMs": 2064,
        "clickCount": 3,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 3,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-15 19:09:44 KST",
        "completedAt": "2026-06-15 19:09:46 KST"
      },
      {
        "condition": "3-A",
        "label": "Task 3 - A",
        "taskId": "3",
        "variant": "A",
        "taskDescription": "KTX001 일반실 창가 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "2-14D",
          "carriageNo": 2,
          "row": 14,
          "column": "D",
          "label": "14D",
          "isWindow": true,
          "isAvailable": true,
          "direction": "reverse"
        },
        "selectedSeatLabel": "2호차 14D",
        "selectedCar": 2,
        "completionTimeMs": 8090,
        "clickCount": 9,
        "misclickCount": 1,
        "roughTapCount": 0,
        "pageTransitionCount": 7,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-15 19:10:02 KST",
        "completedAt": "2026-06-15 19:10:10 KST"
      },
      {
        "condition": "3-B",
        "label": "Task 3 - B",
        "taskId": "3",
        "variant": "B",
        "taskDescription": "KTX001 일반실 창가 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "6-14A",
          "carriageNo": 6,
          "row": 14,
          "column": "A",
          "label": "14A",
          "isWindow": true,
          "isAvailable": true,
          "direction": "reverse"
        },
        "selectedSeatLabel": "6호차 14A",
        "selectedCar": 6,
        "completionTimeMs": 10452,
        "clickCount": 9,
        "misclickCount": 3,
        "roughTapCount": 0,
        "pageTransitionCount": 5,
        "carriageChangeCount": 2,
        "seatSelectionCount": 4,
        "startedAt": "2026-06-15 19:10:31 KST",
        "completedAt": "2026-06-15 19:10:41 KST"
      }
    ],
    "surveyResponses": {
      "1-A": [
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task1_error_prevention_1",
          "questionLabel": "원치 않는 좌석을 잘못 선택할 가능성이 적었다.",
          "questionType": "scale",
          "answer": "약간 그렇지 않다",
          "score": 3,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task1_error_prevention_2",
          "questionLabel": "다음 단계에서 어떤 일이 일어날지 예측하기 쉬웠다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task1_error_prevention_3",
          "questionLabel": "의도하지 않은 방식으로 예매가 진행될 가능성이 적었다.",
          "questionType": "scale",
          "answer": "약간 그렇지 않다",
          "score": 3,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task1_error_prevention_4",
          "questionLabel": "예매 화면이 원하는 좌석을 예매하기 위한 올바른 경로를 명확하게 제시해 준다고 느껴졌다.",
          "questionType": "scale",
          "answer": "약간 그렇지 않다",
          "score": 3,
          "reason": ""
        }
      ],
      "1-B": [
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task1_error_prevention_1",
          "questionLabel": "원치 않는 좌석을 잘못 선택할 가능성이 적었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task1_error_prevention_2",
          "questionLabel": "다음 단계에서 어떤 일이 일어날지 예측하기 쉬웠다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task1_error_prevention_3",
          "questionLabel": "의도하지 않은 방식으로 예매가 진행될 가능성이 적었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task1_error_prevention_4",
          "questionLabel": "예매 화면이 원하는 좌석을 예매하기 위한 올바른 경로를 명확하게 제시해 준다고 느껴졌다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        }
      ],
      "2-A": [
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task2_controllability_1",
          "questionLabel": "예매 과정이 나의 의도에 맞게 흘러갔다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task2_controllability_2",
          "questionLabel": "어떤 버튼을 눌러야 좌석이 자동으로 배정될지 쉽게 예측할 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task2_controllability_3",
          "questionLabel": "예매 과정에서 내가 직접 선택과 진행을 통제하고 있다고 느껴졌다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        }
      ],
      "2-B": [
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task2_controllability_1",
          "questionLabel": "예매 과정이 나의 의도에 맞게 흘러갔다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task2_controllability_2",
          "questionLabel": "어떤 버튼을 눌러야 좌석이 자동으로 배정될지 쉽게 예측할 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task2_controllability_3",
          "questionLabel": "예매 과정에서 내가 직접 선택과 진행을 통제하고 있다고 느껴졌다.",
          "questionType": "scale",
          "answer": "약간 그렇지 않다",
          "score": 3,
          "reason": ""
        }
      ],
      "3-A": [
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task3_recognition_1",
          "questionLabel": "원하는 좌석을 찾기 위해 이전에 본 정보를 기억할 필요가 적었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task3_recognition_2",
          "questionLabel": "원하는 좌석을 직관적으로 찾을 수 있었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task3_recognition_3",
          "questionLabel": "여러 좌석을 한눈에 비교할 수 있었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task3_visibility_4",
          "questionLabel": "어떤 좌석이 예약 가능한지 명확하게 알 수 있었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 5,
          "questionName": "task3_visibility_5",
          "questionLabel": "창가 좌석의 현황을 쉽게 파악할 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 6,
          "questionName": "task3_visibility_6",
          "questionLabel": "원하는 좌석을 찾기 위해 필요한 정보가 명확하게 제공되었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        }
      ],
      "3-B": [
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task3_recognition_1",
          "questionLabel": "원하는 좌석을 찾기 위해 이전에 본 정보를 기억할 필요가 적었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task3_recognition_2",
          "questionLabel": "원하는 좌석을 직관적으로 찾을 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task3_recognition_3",
          "questionLabel": "여러 좌석을 한눈에 비교할 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task3_visibility_4",
          "questionLabel": "어떤 좌석이 예약 가능한지 명확하게 알 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 5,
          "questionName": "task3_visibility_5",
          "questionLabel": "창가 좌석의 현황을 쉽게 파악할 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 6,
          "questionName": "task3_visibility_6",
          "questionLabel": "원하는 좌석을 찾기 위해 필요한 정보가 명확하게 제공되었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        }
      ],
      "final": [
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 1,
          "questionName": "final_ui_preference",
          "questionLabel": "전체적으로 어느 UI를 더 선호하나요?",
          "questionType": "choice",
          "answer": "B",
          "score": 1,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 2,
          "questionName": "final_gender",
          "questionLabel": "성별이 무엇인가요?",
          "questionType": "choice",
          "answer": "남성",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 3,
          "questionName": "final_age",
          "questionLabel": "나이대가 어떻게 되나요?",
          "questionType": "choice",
          "answer": "20대",
          "score": 20,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 4,
          "questionName": "final_korailtalk_used",
          "questionLabel": "기존에 KTX 예매를 위해 코레일톡을 사용해본 적이 있나요?",
          "questionType": "choice",
          "answer": "그렇다",
          "score": 1,
          "reason": ""
        }
      ]
    }
  },
  "K4V9LM7Q2RXP": {
    "interviewCode": "K4V9LM7Q2RXP",
    "intervieweeLabel": "P10",
    "participantId": "P8P27NREY",
    "clarityUrl": "https://clarity.microsoft.com/shared/recording/180d1acf-021c-4e7c-9511-fd1210303196",
    "commonQuestions": [
      {
        "group": "공통 질문",
        "number": "1",
        "label": "평소에 코레일 앱이나 기차 예매 앱을 사용해본 경험이 얼마나 있으신가요?"
      },
      {
        "group": "공통 질문",
        "number": "2",
        "label": "저번 설문에서 전체적으로 선호하는 UI는 “A/B”라고 하셨는데, 그 이유는 무엇인가요?"
      },
      {
        "group": "공통 질문",
        "number": "3",
        "label": "실험 중 가장 헷갈렸던 화면이나 버튼이 있었다면 무엇이었나요?"
      }
    ],
    "customQuestions": [
      {
        "group": "Task 1-A",
        "number": "1",
        "label": "Task 1-A에서 처음 ‘예매’ 버튼을 눌렀을 때, 어떤 결과를 기대하셨나요?"
      },
      {
        "group": "Task 1-A",
        "number": "2",
        "label": "결제 화면이나 장바구니 버튼 등을 여러 번 눌러보셨는데, 그때 어떤 부분을 확인하려고 하셨나요?"
      },
      {
        "group": "Task 1-A",
        "number": "3",
        "label": "실험 중 작동하지 않는 버튼이나 영역을 여러 번 눌러보신 이유가 있었나요?",
        "prompts": [
          "기능이 있을 것 같아서였나요?",
          "화면이 반응하지 않는다고 느껴져서였나요?",
          "단순히 탐색해보고 싶어서였나요?"
        ]
      },
      {
        "group": "Task 1-A",
        "number": "4",
        "label": "Task 1-A에서 가장 헷갈렸던 지점은 무엇이었나요?"
      },
      {
        "group": "Task 1-B",
        "number": "1",
        "label": "Task 1-B는 비교적 순조롭게 진행하셨는데 설문 점수는 평균적으로 낮았습니다. B 화면에서 어떤 점이 불편하거나 마음에 들지 않았나요?"
      },
      {
        "group": "Task 1-B",
        "number": "2",
        "label": "B의 ‘좌석 자동선택’ 버튼은 충분히 눈에 띄고 이해하기 쉬웠나요?"
      },
      {
        "group": "Task 3-B",
        "number": "1",
        "label": "Task 3-B는 큰 문제 없이 진행하셨지만 설문 점수가 모두 중간 정도였습니다. 창가 좌석을 찾는 과정에서 어떤 점이 아쉬웠나요?"
      },
      {
        "group": "Task 3-B",
        "number": "2",
        "label": "B의 전체 좌석 현황 화면이 도움이 되었나요, 아니면 정보가 많아서 부담스럽게 느껴졌나요?"
      }
    ],
    "tasks": [
      {
        "condition": "1-A",
        "label": "Task 1 - A",
        "taskId": "1",
        "variant": "A",
        "taskDescription": "KTX001 일반실 5호차 4B 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "5-4B",
          "carriageNo": 5,
          "row": 4,
          "column": "B",
          "label": "4B",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "5호차 4B",
        "selectedCar": 5,
        "completionTimeMs": 40327,
        "clickCount": 64,
        "misclickCount": 17,
        "roughTapCount": 9,
        "pageTransitionCount": 10,
        "carriageChangeCount": 2,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-20 21:40:05 KST",
        "completedAt": "2026-06-20 21:40:45 KST"
      },
      {
        "condition": "1-B",
        "label": "Task 1 - B",
        "taskId": "1",
        "variant": "B",
        "taskDescription": "KTX001 일반실 5호차 4B 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "5-4B",
          "carriageNo": 5,
          "row": 4,
          "column": "B",
          "label": "4B",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "5호차 4B",
        "selectedCar": 5,
        "completionTimeMs": 17801,
        "clickCount": 10,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 6,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-20 21:41:27 KST",
        "completedAt": "2026-06-20 21:41:45 KST"
      },
      {
        "condition": "2-A",
        "label": "Task 2 - A",
        "taskId": "2",
        "variant": "A",
        "taskDescription": "KTX001 일반실 마지막 남은 한 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "7-2C",
          "carriageNo": 7,
          "row": 2,
          "column": "C",
          "label": "2C",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "7호차 2C",
        "selectedCar": 7,
        "completionTimeMs": 2543,
        "clickCount": 3,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 4,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-20 21:42:14 KST",
        "completedAt": "2026-06-20 21:42:16 KST"
      },
      {
        "condition": "2-B",
        "label": "Task 2 - B",
        "taskId": "2",
        "variant": "B",
        "taskDescription": "KTX001 일반실 마지막 남은 한 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "7-2C",
          "carriageNo": 7,
          "row": 2,
          "column": "C",
          "label": "2C",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "7호차 2C",
        "selectedCar": 7,
        "completionTimeMs": 2664,
        "clickCount": 3,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 4,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-20 21:42:39 KST",
        "completedAt": "2026-06-20 21:42:42 KST"
      },
      {
        "condition": "3-A",
        "label": "Task 3 - A",
        "taskId": "3",
        "variant": "A",
        "taskDescription": "KTX001 일반실 창가 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "2-12A",
          "carriageNo": 2,
          "row": 12,
          "column": "A",
          "label": "12A",
          "isWindow": true,
          "isAvailable": true,
          "direction": "reverse"
        },
        "selectedSeatLabel": "2호차 12A",
        "selectedCar": 2,
        "completionTimeMs": 11113,
        "clickCount": 9,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 9,
        "carriageChangeCount": 1,
        "seatSelectionCount": 2,
        "startedAt": "2026-06-20 21:43:06 KST",
        "completedAt": "2026-06-20 21:43:18 KST"
      },
      {
        "condition": "3-B",
        "label": "Task 3 - B",
        "taskId": "3",
        "variant": "B",
        "taskDescription": "KTX001 일반실 창가 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "6-3A",
          "carriageNo": 6,
          "row": 3,
          "column": "A",
          "label": "3A",
          "isWindow": true,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "6호차 3A",
        "selectedCar": 6,
        "completionTimeMs": 9521,
        "clickCount": 5,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 6,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-20 21:43:53 KST",
        "completedAt": "2026-06-20 21:44:03 KST"
      }
    ],
    "surveyResponses": {
      "1-A": [
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task1_error_prevention_1",
          "questionLabel": "원치 않는 좌석을 잘못 선택할 가능성이 적었다.",
          "questionType": "scale",
          "answer": "약간 그렇지 않다",
          "score": 3,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task1_error_prevention_2",
          "questionLabel": "다음 단계에서 어떤 일이 일어날지 예측하기 쉬웠다.",
          "questionType": "scale",
          "answer": "그렇지 않다",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task1_error_prevention_3",
          "questionLabel": "의도하지 않은 방식으로 예매가 진행될 가능성이 적었다.",
          "questionType": "scale",
          "answer": "그렇지 않다",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task1_error_prevention_4",
          "questionLabel": "예매 화면이 원하는 좌석을 예매하기 위한 올바른 경로를 명확하게 제시해 준다고 느껴졌다.",
          "questionType": "scale",
          "answer": "그렇지 않다",
          "score": 2,
          "reason": ""
        }
      ],
      "1-B": [
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task1_error_prevention_1",
          "questionLabel": "원치 않는 좌석을 잘못 선택할 가능성이 적었다.",
          "questionType": "scale",
          "answer": "약간 그렇지 않다",
          "score": 3,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task1_error_prevention_2",
          "questionLabel": "다음 단계에서 어떤 일이 일어날지 예측하기 쉬웠다.",
          "questionType": "scale",
          "answer": "그렇지 않다",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task1_error_prevention_3",
          "questionLabel": "의도하지 않은 방식으로 예매가 진행될 가능성이 적었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task1_error_prevention_4",
          "questionLabel": "예매 화면이 원하는 좌석을 예매하기 위한 올바른 경로를 명확하게 제시해 준다고 느껴졌다.",
          "questionType": "scale",
          "answer": "약간 그렇지 않다",
          "score": 3,
          "reason": ""
        }
      ],
      "2-A": [
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task2_controllability_1",
          "questionLabel": "예매 과정이 나의 의도에 맞게 흘러갔다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task2_controllability_2",
          "questionLabel": "어떤 버튼을 눌러야 좌석이 자동으로 배정될지 쉽게 예측할 수 있었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task2_controllability_3",
          "questionLabel": "예매 과정에서 내가 직접 선택과 진행을 통제하고 있다고 느껴졌다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        }
      ],
      "2-B": [
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task2_controllability_1",
          "questionLabel": "예매 과정이 나의 의도에 맞게 흘러갔다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task2_controllability_2",
          "questionLabel": "어떤 버튼을 눌러야 좌석이 자동으로 배정될지 쉽게 예측할 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task2_controllability_3",
          "questionLabel": "예매 과정에서 내가 직접 선택과 진행을 통제하고 있다고 느껴졌다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        }
      ],
      "3-A": [
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task3_recognition_1",
          "questionLabel": "원하는 좌석을 찾기 위해 이전에 본 정보를 기억할 필요가 적었다.",
          "questionType": "scale",
          "answer": "그렇지 않다",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task3_recognition_2",
          "questionLabel": "원하는 좌석을 직관적으로 찾을 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task3_recognition_3",
          "questionLabel": "여러 좌석을 한눈에 비교할 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇지 않다",
          "score": 3,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task3_visibility_4",
          "questionLabel": "어떤 좌석이 예약 가능한지 명확하게 알 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇지 않다",
          "score": 3,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 5,
          "questionName": "task3_visibility_5",
          "questionLabel": "창가 좌석의 현황을 쉽게 파악할 수 있었다.",
          "questionType": "scale",
          "answer": "그렇지 않다",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 6,
          "questionName": "task3_visibility_6",
          "questionLabel": "원하는 좌석을 찾기 위해 필요한 정보가 명확하게 제공되었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        }
      ],
      "3-B": [
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task3_recognition_1",
          "questionLabel": "원하는 좌석을 찾기 위해 이전에 본 정보를 기억할 필요가 적었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task3_recognition_2",
          "questionLabel": "원하는 좌석을 직관적으로 찾을 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task3_recognition_3",
          "questionLabel": "여러 좌석을 한눈에 비교할 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task3_visibility_4",
          "questionLabel": "어떤 좌석이 예약 가능한지 명확하게 알 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 5,
          "questionName": "task3_visibility_5",
          "questionLabel": "창가 좌석의 현황을 쉽게 파악할 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 6,
          "questionName": "task3_visibility_6",
          "questionLabel": "원하는 좌석을 찾기 위해 필요한 정보가 명확하게 제공되었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        }
      ],
      "final": [
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 1,
          "questionName": "final_ui_preference",
          "questionLabel": "전체적으로 어느 UI를 더 선호하나요?",
          "questionType": "choice",
          "answer": "B",
          "score": 1,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 2,
          "questionName": "final_gender",
          "questionLabel": "성별이 무엇인가요?",
          "questionType": "choice",
          "answer": "남성",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 3,
          "questionName": "final_age",
          "questionLabel": "나이대가 어떻게 되나요?",
          "questionType": "choice",
          "answer": "20대",
          "score": 20,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 4,
          "questionName": "final_korailtalk_used",
          "questionLabel": "기존에 KTX 예매를 위해 코레일톡을 사용해본 적이 있나요?",
          "questionType": "choice",
          "answer": "그렇다",
          "score": 1,
          "reason": ""
        }
      ]
    }
  },
  "T8Q3RML6XKVA": {
    "interviewCode": "T8Q3RML6XKVA",
    "intervieweeLabel": "P14",
    "participantId": "PBWP8UE0A",
    "clarityUrl": "",
    "commonQuestions": [
      {
        "group": "공통 질문",
        "number": "1",
        "label": "평소에 코레일 앱이나 기차 예매 앱을 사용해본 경험이 얼마나 있으신가요?"
      },
      {
        "group": "공통 질문",
        "number": "2",
        "label": "저번 설문에서 전체적으로 선호하는 UI는 “A/B”라고 하셨는데, 그 이유는 무엇인가요?"
      },
      {
        "group": "공통 질문",
        "number": "3",
        "label": "실험 중 가장 헷갈렸던 화면이나 버튼이 있었다면 무엇이었나요?"
      }
    ],
    "customQuestions": [
      {
        "group": "General",
        "number": "1",
        "label": "전체 설문에서는 A와 B 각각에 대해 점수가 비교적 일관되게 나타났는데, 마지막 선호도 조사에서는 A를 선택하셨습니다. 최종적으로 A를 더 선호한 이유는 무엇인가요?"
      },
      {
        "group": "General",
        "number": "2",
        "label": "혹시 기존 코레일 앱이나 비슷한 예매 앱에 익숙해서 A 방식이 더 자연스럽게 느껴졌나요?"
      },
      {
        "group": "Task 1-B",
        "number": "1",
        "label": "Task 1-B에서 시간이 오래 걸리고 클릭 횟수가 많았습니다. 그때 어떤 부분에서 시간이 걸렸는지 기억나시나요?"
      },
      {
        "group": "Task 1-B",
        "number": "2",
        "label": "B 화면에서 원하는 기능이나 버튼을 찾기 어려웠던 부분이 있었나요?"
      },
      {
        "group": "Task 1-B",
        "number": "3",
        "label": "B의 좌석 현황 화면이나 좌석 선택 방식이 처음 봤을 때 직관적이었나요, 아니면 적응이 필요했나요?"
      },
      {
        "group": "Final Preference",
        "number": "1",
        "label": "A와 B 중 더 선호하는 UI는 A라고 답하셨는데, B가 개선되려면 어떤 부분이 바뀌어야 한다고 생각하시나요?"
      }
    ],
    "tasks": [
      {
        "condition": "1-A",
        "label": "Task 1 - A",
        "taskId": "1",
        "variant": "A",
        "taskDescription": "KTX001 일반실 5호차 4B 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "5-4B",
          "carriageNo": 5,
          "row": 4,
          "column": "B",
          "label": "4B",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "5호차 4B",
        "selectedCar": 5,
        "completionTimeMs": 9517,
        "clickCount": 8,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 9,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-22 08:56:28 KST",
        "completedAt": "2026-06-22 08:56:37 KST"
      },
      {
        "condition": "1-B",
        "label": "Task 1 - B",
        "taskId": "1",
        "variant": "B",
        "taskDescription": "KTX001 일반실 5호차 4B 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "5-4B",
          "carriageNo": 5,
          "row": 4,
          "column": "B",
          "label": "4B",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "5호차 4B",
        "selectedCar": 5,
        "completionTimeMs": 18075,
        "clickCount": 13,
        "misclickCount": 1,
        "roughTapCount": 1,
        "pageTransitionCount": 8,
        "carriageChangeCount": 2,
        "seatSelectionCount": 2,
        "startedAt": "2026-06-22 08:56:59 KST",
        "completedAt": "2026-06-22 08:57:17 KST"
      },
      {
        "condition": "2-A",
        "label": "Task 2 - A",
        "taskId": "2",
        "variant": "A",
        "taskDescription": "KTX001 일반실 마지막 남은 한 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "7-2C",
          "carriageNo": 7,
          "row": 2,
          "column": "C",
          "label": "2C",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "7호차 2C",
        "selectedCar": 7,
        "completionTimeMs": 3858,
        "clickCount": 4,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 4,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-22 08:57:38 KST",
        "completedAt": "2026-06-22 08:57:42 KST"
      },
      {
        "condition": "2-B",
        "label": "Task 2 - B",
        "taskId": "2",
        "variant": "B",
        "taskDescription": "KTX001 일반실 마지막 남은 한 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "7-2C",
          "carriageNo": 7,
          "row": 2,
          "column": "C",
          "label": "2C",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "7호차 2C",
        "selectedCar": 7,
        "completionTimeMs": 2363,
        "clickCount": 4,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 4,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-22 08:58:01 KST",
        "completedAt": "2026-06-22 08:58:04 KST"
      },
      {
        "condition": "3-A",
        "label": "Task 3 - A",
        "taskId": "3",
        "variant": "A",
        "taskDescription": "KTX001 일반실 창가 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "6-14A",
          "carriageNo": 6,
          "row": 14,
          "column": "A",
          "label": "14A",
          "isWindow": true,
          "isAvailable": true,
          "direction": "reverse"
        },
        "selectedSeatLabel": "6호차 14A",
        "selectedCar": 6,
        "completionTimeMs": 13148,
        "clickCount": 11,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 11,
        "carriageChangeCount": 2,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-22 08:58:21 KST",
        "completedAt": "2026-06-22 08:58:34 KST"
      },
      {
        "condition": "3-B",
        "label": "Task 3 - B",
        "taskId": "3",
        "variant": "B",
        "taskDescription": "KTX001 일반실 창가 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "6-14A",
          "carriageNo": 6,
          "row": 14,
          "column": "A",
          "label": "14A",
          "isWindow": true,
          "isAvailable": true,
          "direction": "reverse"
        },
        "selectedSeatLabel": "6호차 14A",
        "selectedCar": 6,
        "completionTimeMs": 12886,
        "clickCount": 6,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 6,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-22 08:59:03 KST",
        "completedAt": "2026-06-22 08:59:16 KST"
      }
    ],
    "surveyResponses": {
      "1-A": [
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task1_error_prevention_1",
          "questionLabel": "원치 않는 좌석을 잘못 선택할 가능성이 적었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task1_error_prevention_2",
          "questionLabel": "다음 단계에서 어떤 일이 일어날지 예측하기 쉬웠다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task1_error_prevention_3",
          "questionLabel": "의도하지 않은 방식으로 예매가 진행될 가능성이 적었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task1_error_prevention_4",
          "questionLabel": "예매 화면이 원하는 좌석을 예매하기 위한 올바른 경로를 명확하게 제시해 준다고 느껴졌다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        }
      ],
      "1-B": [
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task1_error_prevention_1",
          "questionLabel": "원치 않는 좌석을 잘못 선택할 가능성이 적었다.",
          "questionType": "scale",
          "answer": "그렇지 않다",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task1_error_prevention_2",
          "questionLabel": "다음 단계에서 어떤 일이 일어날지 예측하기 쉬웠다.",
          "questionType": "scale",
          "answer": "그렇지 않다",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task1_error_prevention_3",
          "questionLabel": "의도하지 않은 방식으로 예매가 진행될 가능성이 적었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task1_error_prevention_4",
          "questionLabel": "예매 화면이 원하는 좌석을 예매하기 위한 올바른 경로를 명확하게 제시해 준다고 느껴졌다.",
          "questionType": "scale",
          "answer": "그렇지 않다",
          "score": 2,
          "reason": ""
        }
      ],
      "2-A": [
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task2_controllability_1",
          "questionLabel": "예매 과정이 나의 의도에 맞게 흘러갔다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task2_controllability_2",
          "questionLabel": "어떤 버튼을 눌러야 좌석이 자동으로 배정될지 쉽게 예측할 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇지 않다",
          "score": 3,
          "reason": ""
        },
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task2_controllability_3",
          "questionLabel": "예매 과정에서 내가 직접 선택과 진행을 통제하고 있다고 느껴졌다.",
          "questionType": "scale",
          "answer": "그렇지 않다",
          "score": 2,
          "reason": ""
        }
      ],
      "2-B": [
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task2_controllability_1",
          "questionLabel": "예매 과정이 나의 의도에 맞게 흘러갔다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task2_controllability_2",
          "questionLabel": "어떤 버튼을 눌러야 좌석이 자동으로 배정될지 쉽게 예측할 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task2_controllability_3",
          "questionLabel": "예매 과정에서 내가 직접 선택과 진행을 통제하고 있다고 느껴졌다.",
          "questionType": "scale",
          "answer": "약간 그렇지 않다",
          "score": 3,
          "reason": ""
        }
      ],
      "3-A": [
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task3_recognition_1",
          "questionLabel": "원하는 좌석을 찾기 위해 이전에 본 정보를 기억할 필요가 적었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task3_recognition_2",
          "questionLabel": "원하는 좌석을 직관적으로 찾을 수 있었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task3_recognition_3",
          "questionLabel": "여러 좌석을 한눈에 비교할 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇지 않다",
          "score": 1,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task3_visibility_4",
          "questionLabel": "어떤 좌석이 예약 가능한지 명확하게 알 수 있었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 5,
          "questionName": "task3_visibility_5",
          "questionLabel": "창가 좌석의 현황을 쉽게 파악할 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇지 않다",
          "score": 1,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 6,
          "questionName": "task3_visibility_6",
          "questionLabel": "원하는 좌석을 찾기 위해 필요한 정보가 명확하게 제공되었다.",
          "questionType": "scale",
          "answer": "그렇지 않다",
          "score": 2,
          "reason": ""
        }
      ],
      "3-B": [
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task3_recognition_1",
          "questionLabel": "원하는 좌석을 찾기 위해 이전에 본 정보를 기억할 필요가 적었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task3_recognition_2",
          "questionLabel": "원하는 좌석을 직관적으로 찾을 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task3_recognition_3",
          "questionLabel": "여러 좌석을 한눈에 비교할 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task3_visibility_4",
          "questionLabel": "어떤 좌석이 예약 가능한지 명확하게 알 수 있었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 5,
          "questionName": "task3_visibility_5",
          "questionLabel": "창가 좌석의 현황을 쉽게 파악할 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 6,
          "questionName": "task3_visibility_6",
          "questionLabel": "원하는 좌석을 찾기 위해 필요한 정보가 명확하게 제공되었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        }
      ],
      "final": [
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 1,
          "questionName": "final_ui_preference",
          "questionLabel": "전체적으로 어느 UI를 더 선호하나요?",
          "questionType": "choice",
          "answer": "A",
          "score": -1,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 2,
          "questionName": "final_gender",
          "questionLabel": "성별이 무엇인가요?",
          "questionType": "choice",
          "answer": "남성",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 3,
          "questionName": "final_age",
          "questionLabel": "나이대가 어떻게 되나요?",
          "questionType": "choice",
          "answer": "30대",
          "score": 30,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 4,
          "questionName": "final_korailtalk_used",
          "questionLabel": "기존에 KTX 예매를 위해 코레일톡을 사용해본 적이 있나요?",
          "questionType": "choice",
          "answer": "그렇다",
          "score": 1,
          "reason": ""
        }
      ]
    }
  },
  "L5X8VQ2K9RMA": {
    "interviewCode": "L5X8VQ2K9RMA",
    "intervieweeLabel": "P25",
    "participantId": "PMDGQF6V3",
    "clarityUrl": "https://clarity.microsoft.com/shared/recording/b91070da-00c5-4d09-aab4-0222f34b3ff6",
    "commonQuestions": [
      {
        "group": "공통 질문",
        "number": "1",
        "label": "평소에 코레일 앱이나 기차 예매 앱을 사용해본 경험이 얼마나 있으신가요?"
      },
      {
        "group": "공통 질문",
        "number": "2",
        "label": "저번 설문에서 전체적으로 선호하는 UI는 “A/B”라고 하셨는데, 그 이유는 무엇인가요?"
      },
      {
        "group": "공통 질문",
        "number": "3",
        "label": "실험 중 가장 헷갈렸던 화면이나 버튼이 있었다면 무엇이었나요?"
      }
    ],
    "customQuestions": [
      {
        "group": "Task 1-A",
        "number": "1",
        "label": "Task 1-A에서 처음에 ‘예매’ 버튼을 눌렀을 때, 어떤 결과가 나올 것이라고 예상하셨나요?"
      },
      {
        "group": "Task 1-A",
        "number": "2",
        "label": "화면을 여러 번 누르거나 뒤로 돌아가는 과정이 있었는데, 그때 가장 헷갈렸던 부분은 무엇이었나요?"
      },
      {
        "group": "Task 1-A",
        "number": "3",
        "label": "‘좌석 선택’ 버튼을 발견하기 전까지, 좌석을 직접 고르는 방법이 명확하지 않았나요?"
      },
      {
        "group": "Task 1-A",
        "number": "4",
        "label": "마지막에 목표 좌석을 성공적으로 선택한 후에 결제 안내 화면에서 다시 뒤돌아가신 이유는 무엇인가요? 결제하기 버튼이 한 번에 잘 눌리지 않은 것처럼 보였는데, 맞나요?"
      },
      {
        "group": "Survey Score Mismatch",
        "number": "1",
        "label": "Task 1-A에서 실제로는 시행착오가 있었지만, 일부 설문 문항에는 높은 점수를 주셨습니다. 높은 점수를 준 이유는 무엇인가요?"
      },
      {
        "group": "Survey Score Mismatch",
        "number": "2",
        "label": "반면 “올바른 경로를 명확하게 제시했다” 문항에는 낮은 점수를 주셨습니다. 이 문항에서 특히 어떤 경로가 명확하지 않다고 느끼셨나요?"
      },
      {
        "group": "Survey Score Mismatch",
        "number": "3",
        "label": "‘원치 않는 좌석을 잘못 선택할 가능성’과 ‘예매 경로가 명확한지’를 서로 다르게 평가하신 이유가 있나요?"
      }
    ],
    "tasks": [
      {
        "condition": "1-A",
        "label": "Task 1 - A",
        "taskId": "1",
        "variant": "A",
        "taskDescription": "KTX001 일반실 5호차 4B 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "5-4B",
          "carriageNo": 5,
          "row": 4,
          "column": "B",
          "label": "4B",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "5호차 4B",
        "selectedCar": 5,
        "completionTimeMs": 80913,
        "clickCount": 75,
        "misclickCount": 36,
        "roughTapCount": 7,
        "pageTransitionCount": 22,
        "carriageChangeCount": 3,
        "seatSelectionCount": 3,
        "startedAt": "2026-06-21 17:01:14 KST",
        "completedAt": "2026-06-21 17:02:34 KST"
      },
      {
        "condition": "1-B",
        "label": "Task 1 - B",
        "taskId": "1",
        "variant": "B",
        "taskDescription": "KTX001 일반실 5호차 4B 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "5-4B",
          "carriageNo": 5,
          "row": 4,
          "column": "B",
          "label": "4B",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "5호차 4B",
        "selectedCar": 5,
        "completionTimeMs": 29832,
        "clickCount": 7,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 7,
        "carriageChangeCount": 2,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-21 17:03:08 KST",
        "completedAt": "2026-06-21 17:03:38 KST"
      },
      {
        "condition": "2-A",
        "label": "Task 2 - A",
        "taskId": "2",
        "variant": "A",
        "taskDescription": "KTX001 일반실 마지막 남은 한 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "7-2C",
          "carriageNo": 7,
          "row": 2,
          "column": "C",
          "label": "2C",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "7호차 2C",
        "selectedCar": 7,
        "completionTimeMs": 3831,
        "clickCount": 3,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 4,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-21 17:04:11 KST",
        "completedAt": "2026-06-21 17:04:14 KST"
      },
      {
        "condition": "2-B",
        "label": "Task 2 - B",
        "taskId": "2",
        "variant": "B",
        "taskDescription": "KTX001 일반실 마지막 남은 한 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "7-2C",
          "carriageNo": 7,
          "row": 2,
          "column": "C",
          "label": "2C",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "7호차 2C",
        "selectedCar": 7,
        "completionTimeMs": 6040,
        "clickCount": 5,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 6,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-21 17:04:34 KST",
        "completedAt": "2026-06-21 17:04:40 KST"
      },
      {
        "condition": "3-A",
        "label": "Task 3 - A",
        "taskId": "3",
        "variant": "A",
        "taskDescription": "KTX001 일반실 창가 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "6-12A",
          "carriageNo": 6,
          "row": 12,
          "column": "A",
          "label": "12A",
          "isWindow": true,
          "isAvailable": true,
          "direction": "reverse"
        },
        "selectedSeatLabel": "6호차 12A",
        "selectedCar": 6,
        "completionTimeMs": 12048,
        "clickCount": 12,
        "misclickCount": 2,
        "roughTapCount": 0,
        "pageTransitionCount": 11,
        "carriageChangeCount": 2,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-21 17:04:51 KST",
        "completedAt": "2026-06-21 17:05:03 KST"
      },
      {
        "condition": "3-B",
        "label": "Task 3 - B",
        "taskId": "3",
        "variant": "B",
        "taskDescription": "KTX001 일반실 창가 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "6-9D",
          "carriageNo": 6,
          "row": 9,
          "column": "D",
          "label": "9D",
          "isWindow": true,
          "isAvailable": true,
          "direction": "reverse"
        },
        "selectedSeatLabel": "6호차 9D",
        "selectedCar": 6,
        "completionTimeMs": 8857,
        "clickCount": 5,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 6,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-21 17:05:17 KST",
        "completedAt": "2026-06-21 17:05:26 KST"
      }
    ],
    "surveyResponses": {
      "1-A": [
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task1_error_prevention_1",
          "questionLabel": "원치 않는 좌석을 잘못 선택할 가능성이 적었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task1_error_prevention_2",
          "questionLabel": "다음 단계에서 어떤 일이 일어날지 예측하기 쉬웠다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task1_error_prevention_3",
          "questionLabel": "의도하지 않은 방식으로 예매가 진행될 가능성이 적었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task1_error_prevention_4",
          "questionLabel": "예매 화면이 원하는 좌석을 예매하기 위한 올바른 경로를 명확하게 제시해 준다고 느껴졌다.",
          "questionType": "scale",
          "answer": "그렇지 않다",
          "score": 2,
          "reason": ""
        }
      ],
      "1-B": [
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task1_error_prevention_1",
          "questionLabel": "원치 않는 좌석을 잘못 선택할 가능성이 적었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task1_error_prevention_2",
          "questionLabel": "다음 단계에서 어떤 일이 일어날지 예측하기 쉬웠다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task1_error_prevention_3",
          "questionLabel": "의도하지 않은 방식으로 예매가 진행될 가능성이 적었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task1_error_prevention_4",
          "questionLabel": "예매 화면이 원하는 좌석을 예매하기 위한 올바른 경로를 명확하게 제시해 준다고 느껴졌다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        }
      ],
      "2-A": [
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task2_controllability_1",
          "questionLabel": "예매 과정이 나의 의도에 맞게 흘러갔다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task2_controllability_2",
          "questionLabel": "어떤 버튼을 눌러야 좌석이 자동으로 배정될지 쉽게 예측할 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task2_controllability_3",
          "questionLabel": "예매 과정에서 내가 직접 선택과 진행을 통제하고 있다고 느껴졌다.",
          "questionType": "scale",
          "answer": "그렇지 않다",
          "score": 2,
          "reason": ""
        }
      ],
      "2-B": [
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task2_controllability_1",
          "questionLabel": "예매 과정이 나의 의도에 맞게 흘러갔다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task2_controllability_2",
          "questionLabel": "어떤 버튼을 눌러야 좌석이 자동으로 배정될지 쉽게 예측할 수 있었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task2_controllability_3",
          "questionLabel": "예매 과정에서 내가 직접 선택과 진행을 통제하고 있다고 느껴졌다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        }
      ],
      "3-A": [
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task3_recognition_1",
          "questionLabel": "원하는 좌석을 찾기 위해 이전에 본 정보를 기억할 필요가 적었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task3_recognition_2",
          "questionLabel": "원하는 좌석을 직관적으로 찾을 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task3_recognition_3",
          "questionLabel": "여러 좌석을 한눈에 비교할 수 있었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task3_visibility_4",
          "questionLabel": "어떤 좌석이 예약 가능한지 명확하게 알 수 있었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 5,
          "questionName": "task3_visibility_5",
          "questionLabel": "창가 좌석의 현황을 쉽게 파악할 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 6,
          "questionName": "task3_visibility_6",
          "questionLabel": "원하는 좌석을 찾기 위해 필요한 정보가 명확하게 제공되었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        }
      ],
      "3-B": [
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task3_recognition_1",
          "questionLabel": "원하는 좌석을 찾기 위해 이전에 본 정보를 기억할 필요가 적었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task3_recognition_2",
          "questionLabel": "원하는 좌석을 직관적으로 찾을 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task3_recognition_3",
          "questionLabel": "여러 좌석을 한눈에 비교할 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task3_visibility_4",
          "questionLabel": "어떤 좌석이 예약 가능한지 명확하게 알 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 5,
          "questionName": "task3_visibility_5",
          "questionLabel": "창가 좌석의 현황을 쉽게 파악할 수 있었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 6,
          "questionName": "task3_visibility_6",
          "questionLabel": "원하는 좌석을 찾기 위해 필요한 정보가 명확하게 제공되었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        }
      ],
      "final": [
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 1,
          "questionName": "final_ui_preference",
          "questionLabel": "전체적으로 어느 UI를 더 선호하나요?",
          "questionType": "choice",
          "answer": "B",
          "score": 1,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 2,
          "questionName": "final_gender",
          "questionLabel": "성별이 무엇인가요?",
          "questionType": "choice",
          "answer": "남성",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 3,
          "questionName": "final_age",
          "questionLabel": "나이대가 어떻게 되나요?",
          "questionType": "choice",
          "answer": "20대",
          "score": 20,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 4,
          "questionName": "final_korailtalk_used",
          "questionLabel": "기존에 KTX 예매를 위해 코레일톡을 사용해본 적이 있나요?",
          "questionType": "choice",
          "answer": "그렇지 않다",
          "score": 0,
          "reason": ""
        }
      ]
    }
  },
  "R9K2MVA7XQL5": {
    "interviewCode": "R9K2MVA7XQL5",
    "intervieweeLabel": "P27",
    "participantId": "PO0YWX23G",
    "clarityUrl": "https://clarity.microsoft.com/shared/recording/a4be559e-668d-4293-912d-282b82784497",
    "commonQuestions": [
      {
        "group": "공통 질문",
        "number": "1",
        "label": "평소에 코레일 앱이나 기차 예매 앱을 사용해본 경험이 얼마나 있으신가요?"
      },
      {
        "group": "공통 질문",
        "number": "2",
        "label": "저번 설문에서 전체적으로 선호하는 UI는 “A/B”라고 하셨는데, 그 이유는 무엇인가요?"
      },
      {
        "group": "공통 질문",
        "number": "3",
        "label": "실험 중 가장 헷갈렸던 화면이나 버튼이 있었다면 무엇이었나요?"
      }
    ],
    "customQuestions": [
      {
        "group": "Task 1-A / Task 1-B",
        "number": "1",
        "label": "Task 1-A에서는 바로 ‘좌석 선택’ 버튼을 눌러 비교적 순조롭게 진행하셨는데, “원치 않는 좌석을 잘못 선택할 가능성이 적었다” 문항에는 낮은 점수를 주셨습니다. 어떤 부분에서 잘못 선택할 가능성이 있다고 느끼셨나요?"
      },
      {
        "group": "Task 1-A / Task 1-B",
        "number": "2",
        "label": "Task 1-B도 수행 자체는 순조로웠지만 설문 점수가 낮았습니다. B 화면에서 어떤 부분이 불편하거나 불안하게 느껴졌나요?"
      },
      {
        "group": "Task 1-A / Task 1-B",
        "number": "3",
        "label": "B에서 “의도하지 않은 방식으로 예매가 진행될 가능성”은 낮다고 보셨지만, 다른 문항은 낮게 평가하셨습니다. B 화면에서 통제감은 있었지만 직관성은 낮았다고 느끼신 건가요?"
      },
      {
        "group": "Task 3-B",
        "number": "1",
        "label": "Task 3-B에서 6호차를 선택한 뒤 ‘좌석 자동선택’ 버튼을 눌러 창가 좌석이 선택되었습니다. 이때 창가 좌석이 자동으로 선택될 것이라고 예상하셨나요?"
      },
      {
        "group": "Task 3-B",
        "number": "2",
        "label": "Task 3-B 설문에서 “여러 좌석을 한눈에 비교할 수 있었다”는 높게 평가하셨지만, “직관적으로 찾을 수 있었다”와 “창가 좌석 현황을 쉽게 파악할 수 있었다”는 낮게 평가하셨습니다. 좌석은 많이 보였지만 창가 좌석을 구분하기는 어려웠다고 느끼신 건가요?"
      },
      {
        "group": "Task 3-B",
        "number": "3",
        "label": "B의 좌석 현황 화면에서 가장 헷갈렸던 정보는 무엇이었나요?",
        "prompts": [
          "호차별 좌석 수",
          "창가 좌석 여부",
          "예약 가능/불가능 구분",
          "좌석 자동선택 버튼",
          "기타"
        ]
      },
      {
        "group": "Final Preference",
        "number": "1",
        "label": "전체적으로 A를 더 선호하셨는데, B보다 A가 더 낫다고 느낀 가장 큰 이유는 무엇인가요?"
      },
      {
        "group": "Final Preference",
        "number": "2",
        "label": "B가 더 좋아지려면 어떤 부분이 바뀌어야 한다고 생각하시나요?"
      }
    ],
    "tasks": [
      {
        "condition": "1-A",
        "label": "Task 1 - A",
        "taskId": "1",
        "variant": "A",
        "taskDescription": "KTX001 일반실 5호차 4B 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "5-4B",
          "carriageNo": 5,
          "row": 4,
          "column": "B",
          "label": "4B",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "5호차 4B",
        "selectedCar": 5,
        "completionTimeMs": 7961,
        "clickCount": 9,
        "misclickCount": 1,
        "roughTapCount": 0,
        "pageTransitionCount": 9,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-21 00:31:44 KST",
        "completedAt": "2026-06-21 00:31:52 KST"
      },
      {
        "condition": "1-B",
        "label": "Task 1 - B",
        "taskId": "1",
        "variant": "B",
        "taskDescription": "KTX001 일반실 5호차 4B 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "5-4B",
          "carriageNo": 5,
          "row": 4,
          "column": "B",
          "label": "4B",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "5호차 4B",
        "selectedCar": 5,
        "completionTimeMs": 6142,
        "clickCount": 7,
        "misclickCount": 1,
        "roughTapCount": 0,
        "pageTransitionCount": 6,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-21 00:32:12 KST",
        "completedAt": "2026-06-21 00:32:18 KST"
      },
      {
        "condition": "2-A",
        "label": "Task 2 - A",
        "taskId": "2",
        "variant": "A",
        "taskDescription": "KTX001 일반실 마지막 남은 한 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "7-2C",
          "carriageNo": 7,
          "row": 2,
          "column": "C",
          "label": "2C",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "7호차 2C",
        "selectedCar": 7,
        "completionTimeMs": 2229,
        "clickCount": 3,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 4,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-21 00:32:34 KST",
        "completedAt": "2026-06-21 00:32:36 KST"
      },
      {
        "condition": "2-B",
        "label": "Task 2 - B",
        "taskId": "2",
        "variant": "B",
        "taskDescription": "KTX001 일반실 마지막 남은 한 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "7-2C",
          "carriageNo": 7,
          "row": 2,
          "column": "C",
          "label": "2C",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "7호차 2C",
        "selectedCar": 7,
        "completionTimeMs": 1611,
        "clickCount": 4,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 4,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-21 00:32:54 KST",
        "completedAt": "2026-06-21 00:32:56 KST"
      },
      {
        "condition": "3-A",
        "label": "Task 3 - A",
        "taskId": "3",
        "variant": "A",
        "taskDescription": "KTX001 일반실 창가 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "7-14D",
          "carriageNo": 7,
          "row": 14,
          "column": "D",
          "label": "14D",
          "isWindow": true,
          "isAvailable": true,
          "direction": "reverse"
        },
        "selectedSeatLabel": "7호차 14D",
        "selectedCar": 7,
        "completionTimeMs": 11055,
        "clickCount": 12,
        "misclickCount": 1,
        "roughTapCount": 0,
        "pageTransitionCount": 11,
        "carriageChangeCount": 2,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-21 00:33:09 KST",
        "completedAt": "2026-06-21 00:33:20 KST"
      },
      {
        "condition": "3-B",
        "label": "Task 3 - B",
        "taskId": "3",
        "variant": "B",
        "taskDescription": "KTX001 일반실 창가 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "6-14A",
          "carriageNo": 6,
          "row": 14,
          "column": "A",
          "label": "14A",
          "isWindow": true,
          "isAvailable": true,
          "direction": "reverse"
        },
        "selectedSeatLabel": "6호차 14A",
        "selectedCar": 6,
        "completionTimeMs": 5849,
        "clickCount": 5,
        "misclickCount": 1,
        "roughTapCount": 0,
        "pageTransitionCount": 5,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-21 00:33:41 KST",
        "completedAt": "2026-06-21 00:33:47 KST"
      }
    ],
    "surveyResponses": {
      "1-A": [
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task1_error_prevention_1",
          "questionLabel": "원치 않는 좌석을 잘못 선택할 가능성이 적었다.",
          "questionType": "scale",
          "answer": "그렇지 않다",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task1_error_prevention_2",
          "questionLabel": "다음 단계에서 어떤 일이 일어날지 예측하기 쉬웠다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task1_error_prevention_3",
          "questionLabel": "의도하지 않은 방식으로 예매가 진행될 가능성이 적었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task1_error_prevention_4",
          "questionLabel": "예매 화면이 원하는 좌석을 예매하기 위한 올바른 경로를 명확하게 제시해 준다고 느껴졌다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        }
      ],
      "1-B": [
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task1_error_prevention_1",
          "questionLabel": "원치 않는 좌석을 잘못 선택할 가능성이 적었다.",
          "questionType": "scale",
          "answer": "매우 그렇지 않다",
          "score": 1,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task1_error_prevention_2",
          "questionLabel": "다음 단계에서 어떤 일이 일어날지 예측하기 쉬웠다.",
          "questionType": "scale",
          "answer": "그렇지 않다",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task1_error_prevention_3",
          "questionLabel": "의도하지 않은 방식으로 예매가 진행될 가능성이 적었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task1_error_prevention_4",
          "questionLabel": "예매 화면이 원하는 좌석을 예매하기 위한 올바른 경로를 명확하게 제시해 준다고 느껴졌다.",
          "questionType": "scale",
          "answer": "약간 그렇지 않다",
          "score": 3,
          "reason": ""
        }
      ],
      "2-A": [
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task2_controllability_1",
          "questionLabel": "예매 과정이 나의 의도에 맞게 흘러갔다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task2_controllability_2",
          "questionLabel": "어떤 버튼을 눌러야 좌석이 자동으로 배정될지 쉽게 예측할 수 있었다.",
          "questionType": "scale",
          "answer": "그렇지 않다",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task2_controllability_3",
          "questionLabel": "예매 과정에서 내가 직접 선택과 진행을 통제하고 있다고 느껴졌다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        }
      ],
      "2-B": [
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task2_controllability_1",
          "questionLabel": "예매 과정이 나의 의도에 맞게 흘러갔다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task2_controllability_2",
          "questionLabel": "어떤 버튼을 눌러야 좌석이 자동으로 배정될지 쉽게 예측할 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task2_controllability_3",
          "questionLabel": "예매 과정에서 내가 직접 선택과 진행을 통제하고 있다고 느껴졌다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        }
      ],
      "3-A": [
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task3_recognition_1",
          "questionLabel": "원하는 좌석을 찾기 위해 이전에 본 정보를 기억할 필요가 적었다.",
          "questionType": "scale",
          "answer": "그렇지 않다",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task3_recognition_2",
          "questionLabel": "원하는 좌석을 직관적으로 찾을 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇지 않다",
          "score": 1,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task3_recognition_3",
          "questionLabel": "여러 좌석을 한눈에 비교할 수 있었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task3_visibility_4",
          "questionLabel": "어떤 좌석이 예약 가능한지 명확하게 알 수 있었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 5,
          "questionName": "task3_visibility_5",
          "questionLabel": "창가 좌석의 현황을 쉽게 파악할 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇지 않다",
          "score": 1,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 6,
          "questionName": "task3_visibility_6",
          "questionLabel": "원하는 좌석을 찾기 위해 필요한 정보가 명확하게 제공되었다.",
          "questionType": "scale",
          "answer": "약간 그렇다",
          "score": 4,
          "reason": ""
        }
      ],
      "3-B": [
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task3_recognition_1",
          "questionLabel": "원하는 좌석을 찾기 위해 이전에 본 정보를 기억할 필요가 적었다.",
          "questionType": "scale",
          "answer": "그렇지 않다",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task3_recognition_2",
          "questionLabel": "원하는 좌석을 직관적으로 찾을 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇지 않다",
          "score": 1,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task3_recognition_3",
          "questionLabel": "여러 좌석을 한눈에 비교할 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task3_visibility_4",
          "questionLabel": "어떤 좌석이 예약 가능한지 명확하게 알 수 있었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 5,
          "questionName": "task3_visibility_5",
          "questionLabel": "창가 좌석의 현황을 쉽게 파악할 수 있었다.",
          "questionType": "scale",
          "answer": "그렇지 않다",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 6,
          "questionName": "task3_visibility_6",
          "questionLabel": "원하는 좌석을 찾기 위해 필요한 정보가 명확하게 제공되었다.",
          "questionType": "scale",
          "answer": "약간 그렇지 않다",
          "score": 3,
          "reason": ""
        }
      ],
      "final": [
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 1,
          "questionName": "final_ui_preference",
          "questionLabel": "전체적으로 어느 UI를 더 선호하나요?",
          "questionType": "choice",
          "answer": "A",
          "score": -1,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 2,
          "questionName": "final_gender",
          "questionLabel": "성별이 무엇인가요?",
          "questionType": "choice",
          "answer": "남성",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 3,
          "questionName": "final_age",
          "questionLabel": "나이대가 어떻게 되나요?",
          "questionType": "choice",
          "answer": "20대",
          "score": 20,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 4,
          "questionName": "final_korailtalk_used",
          "questionLabel": "기존에 KTX 예매를 위해 코레일톡을 사용해본 적이 있나요?",
          "questionType": "choice",
          "answer": "그렇다",
          "score": 1,
          "reason": ""
        }
      ]
    }
  },
  "Q6L8XK3R2VMT": {
    "interviewCode": "Q6L8XK3R2VMT",
    "intervieweeLabel": "P31",
    "participantId": "PRL17E7I2",
    "clarityUrl": "https://clarity.microsoft.com/shared/recording/8072ef83-5996-4b11-875a-c82ae3bb69a6?t=95244",
    "commonQuestions": [
      {
        "group": "공통 질문",
        "number": "1",
        "label": "평소에 코레일 앱이나 기차 예매 앱을 사용해본 경험이 얼마나 있으신가요?"
      },
      {
        "group": "공통 질문",
        "number": "2",
        "label": "저번 설문에서 전체적으로 선호하는 UI는 “A/B”라고 하셨는데, 그 이유는 무엇인가요?"
      },
      {
        "group": "공통 질문",
        "number": "3",
        "label": "실험 중 가장 헷갈렸던 화면이나 버튼이 있었다면 무엇이었나요?"
      }
    ],
    "customQuestions": [
      {
        "group": "General",
        "number": "1",
        "label": "기존 코레일 앱이나 기차 예매 앱을 자주 사용하시는 편인가요?"
      },
      {
        "group": "General",
        "number": "2",
        "label": "전체적으로 A를 더 선호하셨는데, A 방식이 더 익숙하거나 예측 가능하게 느껴졌나요?"
      },
      {
        "group": "Task 2-B",
        "number": "1",
        "label": "Task 2-B에서 좌석 현황 화면에서 7호차로 들어간 뒤 ‘좌석 자동선택’ 버튼을 누르셨습니다. 이때 어떤 좌석이 선택될 것이라고 예상하셨나요?"
      },
      {
        "group": "Task 2-B",
        "number": "2",
        "label": "결제 화면으로 갔다가 다시 돌아와 선택된 좌석을 확인하는 과정을 반복하셨는데, 왜 다시 확인해야 한다고 느끼셨나요?"
      },
      {
        "group": "Task 2-B",
        "number": "3",
        "label": "“어떤 버튼을 눌러야 좌석이 자동으로 배정될지 쉽게 예측할 수 있었다” 문항에는 낮은 점수를 주셨지만, “예매 과정이 나의 의도에 맞게 흘러갔다”와 “통제하고 있다고 느껴졌다”에는 높은 점수를 주셨습니다. 자동선택 기능 자체는 불확실했지만, 전체 과정은 통제 가능하다고 느끼셨던 건가요?"
      },
      {
        "group": "Task 2-B",
        "number": "4",
        "label": "B의 ‘좌석 자동선택’ 버튼이 현재 선택한 호차 안에서 배정되는지, 전체 열차에서 배정되는지 명확하게 느껴졌나요?"
      },
      {
        "group": "Task 3-A / Task 3-B",
        "number": "1",
        "label": "Task 3-A에서 처음에는 ‘예매’ 버튼을 눌렀다가 다시 돌아와 창가 좌석을 선택하셨습니다. 그때 자동 배정 좌석이 원하는 조건에 맞는지 확인하기 어려웠나요?"
      },
      {
        "group": "Task 3-A / Task 3-B",
        "number": "2",
        "label": "Task 3에서 A와 B 중 어느 쪽이 창가 좌석을 찾기 더 쉬웠나요? 최종 선호도에서 A를 선택한 이유와도 관련이 있나요?"
      },
      {
        "group": "Task 3-A / Task 3-B",
        "number": "3",
        "label": "B의 좌석 현황 화면이 실제로 도움이 되었나요, 아니면 기존 방식처럼 호차를 직접 들어가서 확인하는 방식이 더 편했나요?"
      }
    ],
    "tasks": [
      {
        "condition": "1-A",
        "label": "Task 1 - A",
        "taskId": "1",
        "variant": "A",
        "taskDescription": "KTX001 일반실 5호차 4B 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "5-4B",
          "carriageNo": 5,
          "row": 4,
          "column": "B",
          "label": "4B",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "5호차 4B",
        "selectedCar": 5,
        "completionTimeMs": 17560,
        "clickCount": 16,
        "misclickCount": 7,
        "roughTapCount": 2,
        "pageTransitionCount": 8,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-15 18:20:57 KST",
        "completedAt": "2026-06-15 18:21:15 KST"
      },
      {
        "condition": "1-B",
        "label": "Task 1 - B",
        "taskId": "1",
        "variant": "B",
        "taskDescription": "KTX001 일반실 5호차 4B 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "5-4B",
          "carriageNo": 5,
          "row": 4,
          "column": "B",
          "label": "4B",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "5호차 4B",
        "selectedCar": 5,
        "completionTimeMs": 9043,
        "clickCount": 5,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 5,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-15 18:21:59 KST",
        "completedAt": "2026-06-15 18:22:08 KST"
      },
      {
        "condition": "2-A",
        "label": "Task 2 - A",
        "taskId": "2",
        "variant": "A",
        "taskDescription": "KTX001 일반실 마지막 남은 한 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "7-2C",
          "carriageNo": 7,
          "row": 2,
          "column": "C",
          "label": "2C",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "7호차 2C",
        "selectedCar": 7,
        "completionTimeMs": 2569,
        "clickCount": 4,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 3,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-15 18:22:31 KST",
        "completedAt": "2026-06-15 18:22:33 KST"
      },
      {
        "condition": "2-B",
        "label": "Task 2 - B",
        "taskId": "2",
        "variant": "B",
        "taskDescription": "KTX001 일반실 마지막 남은 한 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "7-2C",
          "carriageNo": 7,
          "row": 2,
          "column": "C",
          "label": "2C",
          "isWindow": false,
          "isAvailable": true,
          "direction": "forward"
        },
        "selectedSeatLabel": "7호차 2C",
        "selectedCar": 7,
        "completionTimeMs": 19297,
        "clickCount": 11,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 10,
        "carriageChangeCount": 2,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-15 18:22:52 KST",
        "completedAt": "2026-06-15 18:23:12 KST"
      },
      {
        "condition": "3-A",
        "label": "Task 3 - A",
        "taskId": "3",
        "variant": "A",
        "taskDescription": "KTX001 일반실 창가 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "7-14A",
          "carriageNo": 7,
          "row": 14,
          "column": "A",
          "label": "14A",
          "isWindow": true,
          "isAvailable": true,
          "direction": "reverse"
        },
        "selectedSeatLabel": "7호차 14A",
        "selectedCar": 7,
        "completionTimeMs": 7303,
        "clickCount": 8,
        "misclickCount": 1,
        "roughTapCount": 0,
        "pageTransitionCount": 8,
        "carriageChangeCount": 1,
        "seatSelectionCount": 2,
        "startedAt": "2026-06-15 18:23:28 KST",
        "completedAt": "2026-06-15 18:23:36 KST"
      },
      {
        "condition": "3-B",
        "label": "Task 3 - B",
        "taskId": "3",
        "variant": "B",
        "taskDescription": "KTX001 일반실 창가 좌석 예매",
        "taskSuccess": true,
        "selectedSeat": {
          "id": "6-14A",
          "carriageNo": 6,
          "row": 14,
          "column": "A",
          "label": "14A",
          "isWindow": true,
          "isAvailable": true,
          "direction": "reverse"
        },
        "selectedSeatLabel": "6호차 14A",
        "selectedCar": 6,
        "completionTimeMs": 7205,
        "clickCount": 5,
        "misclickCount": 0,
        "roughTapCount": 0,
        "pageTransitionCount": 5,
        "carriageChangeCount": 1,
        "seatSelectionCount": 1,
        "startedAt": "2026-06-15 18:24:03 KST",
        "completedAt": "2026-06-15 18:24:10 KST"
      }
    ],
    "surveyResponses": {
      "1-A": [
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task1_error_prevention_1",
          "questionLabel": "원치 않는 좌석을 잘못 선택할 가능성이 적었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task1_error_prevention_2",
          "questionLabel": "다음 단계에서 어떤 일이 일어날지 예측하기 쉬웠다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task1_error_prevention_3",
          "questionLabel": "의도하지 않은 방식으로 예매가 진행될 가능성이 적었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "1-A",
          "variant": "A",
          "taskId": "1",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task1_error_prevention_4",
          "questionLabel": "예매 화면이 원하는 좌석을 예매하기 위한 올바른 경로를 명확하게 제시해 준다고 느껴졌다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        }
      ],
      "1-B": [
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task1_error_prevention_1",
          "questionLabel": "원치 않는 좌석을 잘못 선택할 가능성이 적었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task1_error_prevention_2",
          "questionLabel": "다음 단계에서 어떤 일이 일어날지 예측하기 쉬웠다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task1_error_prevention_3",
          "questionLabel": "의도하지 않은 방식으로 예매가 진행될 가능성이 적었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "1-B",
          "variant": "B",
          "taskId": "1",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task1_error_prevention_4",
          "questionLabel": "예매 화면이 원하는 좌석을 예매하기 위한 올바른 경로를 명확하게 제시해 준다고 느껴졌다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        }
      ],
      "2-A": [
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task2_controllability_1",
          "questionLabel": "예매 과정이 나의 의도에 맞게 흘러갔다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task2_controllability_2",
          "questionLabel": "어떤 버튼을 눌러야 좌석이 자동으로 배정될지 쉽게 예측할 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "2-A",
          "variant": "A",
          "taskId": "2",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task2_controllability_3",
          "questionLabel": "예매 과정에서 내가 직접 선택과 진행을 통제하고 있다고 느껴졌다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        }
      ],
      "2-B": [
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task2_controllability_1",
          "questionLabel": "예매 과정이 나의 의도에 맞게 흘러갔다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task2_controllability_2",
          "questionLabel": "어떤 버튼을 눌러야 좌석이 자동으로 배정될지 쉽게 예측할 수 있었다.",
          "questionType": "scale",
          "answer": "그렇지 않다",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "2-B",
          "variant": "B",
          "taskId": "2",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task2_controllability_3",
          "questionLabel": "예매 과정에서 내가 직접 선택과 진행을 통제하고 있다고 느껴졌다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        }
      ],
      "3-A": [
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task3_recognition_1",
          "questionLabel": "원하는 좌석을 찾기 위해 이전에 본 정보를 기억할 필요가 적었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task3_recognition_2",
          "questionLabel": "원하는 좌석을 직관적으로 찾을 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task3_recognition_3",
          "questionLabel": "여러 좌석을 한눈에 비교할 수 있었다.",
          "questionType": "scale",
          "answer": "약간 그렇지 않다",
          "score": 3,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task3_visibility_4",
          "questionLabel": "어떤 좌석이 예약 가능한지 명확하게 알 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 5,
          "questionName": "task3_visibility_5",
          "questionLabel": "창가 좌석의 현황을 쉽게 파악할 수 있었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "3-A",
          "variant": "A",
          "taskId": "3",
          "section": "task",
          "questionNumber": 6,
          "questionName": "task3_visibility_6",
          "questionLabel": "원하는 좌석을 찾기 위해 필요한 정보가 명확하게 제공되었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        }
      ],
      "3-B": [
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 1,
          "questionName": "task3_recognition_1",
          "questionLabel": "원하는 좌석을 찾기 위해 이전에 본 정보를 기억할 필요가 적었다.",
          "questionType": "scale",
          "answer": "그렇다",
          "score": 5,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 2,
          "questionName": "task3_recognition_2",
          "questionLabel": "원하는 좌석을 직관적으로 찾을 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 3,
          "questionName": "task3_recognition_3",
          "questionLabel": "여러 좌석을 한눈에 비교할 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 4,
          "questionName": "task3_visibility_4",
          "questionLabel": "어떤 좌석이 예약 가능한지 명확하게 알 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 5,
          "questionName": "task3_visibility_5",
          "questionLabel": "창가 좌석의 현황을 쉽게 파악할 수 있었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        },
        {
          "condition": "3-B",
          "variant": "B",
          "taskId": "3",
          "section": "task",
          "questionNumber": 6,
          "questionName": "task3_visibility_6",
          "questionLabel": "원하는 좌석을 찾기 위해 필요한 정보가 명확하게 제공되었다.",
          "questionType": "scale",
          "answer": "매우 그렇다",
          "score": 6,
          "reason": ""
        }
      ],
      "final": [
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 1,
          "questionName": "final_ui_preference",
          "questionLabel": "전체적으로 어느 UI를 더 선호하나요?",
          "questionType": "choice",
          "answer": "A",
          "score": -1,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 2,
          "questionName": "final_gender",
          "questionLabel": "성별이 무엇인가요?",
          "questionType": "choice",
          "answer": "남성",
          "score": 2,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 3,
          "questionName": "final_age",
          "questionLabel": "나이대가 어떻게 되나요?",
          "questionType": "choice",
          "answer": "20대",
          "score": 20,
          "reason": ""
        },
        {
          "condition": "final",
          "variant": "FINAL",
          "taskId": "final",
          "section": "final",
          "questionNumber": 4,
          "questionName": "final_korailtalk_used",
          "questionLabel": "기존에 KTX 예매를 위해 코레일톡을 사용해본 적이 있나요?",
          "questionType": "choice",
          "answer": "그렇다",
          "score": 1,
          "reason": ""
        }
      ]
    }
  }
};

export const INTERVIEW_LINK_MANIFEST = [
  {
    "label": "P5",
    "code": "Y7M4QK2R8VLA",
    "participantId": "P30GF9DCE"
  },
  {
    "label": "P9",
    "code": "N6R2XQ8L5TKA",
    "participantId": "P8J79DAMX"
  },
  {
    "label": "P10",
    "code": "K4V9LM7Q2RXP",
    "participantId": "P8P27NREY"
  },
  {
    "label": "P14",
    "code": "T8Q3RML6XKVA",
    "participantId": "PBWP8UE0A"
  },
  {
    "label": "P25",
    "code": "L5X8VQ2K9RMA",
    "participantId": "PMDGQF6V3"
  },
  {
    "label": "P27",
    "code": "R9K2MVA7XQL5",
    "participantId": "PO0YWX23G"
  },
  {
    "label": "P31",
    "code": "Q6L8XK3R2VMT",
    "participantId": "PRL17E7I2"
  }
];
