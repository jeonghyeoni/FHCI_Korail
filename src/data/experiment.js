export const TRAIN = {
  id: "KTX001",
  displayName: "KTX 001",
  date: "2026년 5월 30일 (토)",
  dateShort: "2026.05.30",
  origin: "서울",
  destination: "부산",
  departureTime: "05:13",
  arrivalTime: "07:50",
  duration: "2시간 37분",
  className: "일반실",
  price: 59800,
};

export const TASKS = {
  "1": {
    title: "Task 1",
    description: "KTX001 일반실 아무 좌석이나 가능한 빨리 예매",
    successText: "어떤 좌석이든 예약 완료",
  },
  "2": {
    title: "Task 2",
    description: "KTX001 일반실 5호차 8D 좌석을 가능한 빨리 예매",
    successText: "5호차 8D 예약 완료",
  },
  "3": {
    title: "Task 3",
    description: "KTX001 일반실 창가 좌석을 가능한 빨리 예매",
    successText: "창가 좌석 예약 완료",
  },
};

export const CARRIAGES = [
  { no: 1, remaining: 22, total: 56, note: "" },
  { no: 2, remaining: 29, total: 50, note: "" },
  { no: 3, remaining: 29, total: 50, note: "" },
  { no: 4, remaining: 29, total: 50, note: "" },
  { no: 5, remaining: 6, total: 56, note: "" },
  { no: 6, remaining: 16, total: 56, note: "" },
  { no: 7, remaining: 14, total: 56, note: "" },
  { no: 8, remaining: 13, total: 56, note: "" },
  { no: 9, remaining: 2, total: 56, note: "" },
];

const unavailableByCarriage = {
  1: ["14A", "14C", "14D", "13A", "13D", "12A", "12D", "11C", "11D", "10D", "9A", "9B", "8A", "8B", "8D"],
  2: ["14A", "13A", "12D", "11C", "9A", "9B", "8A", "8B"],
  3: ["14D", "13D", "12A", "12D", "10D", "9C", "8C"],
  4: ["14A", "14D", "13C", "12C", "11D", "10A", "9A"],
  5: ["15A", "15D", "14A", "14B", "14C", "14D", "13A", "13B", "13C", "13D", "12A", "12B", "12C", "12D", "11A", "11C", "11D", "10A", "10B", "10C", "10D", "9A", "9B", "9C", "9D"],
  6: ["14D", "13A", "13D", "12D", "11C", "10A", "9D", "8A"],
  7: ["14C", "14D", "13D", "12A", "11C", "10D", "9A", "8B"],
  8: ["14A", "14B", "13A", "12C", "11D", "10D", "9A", "8C"],
  9: ["15A", "15B", "15C", "15D", "14A", "14B", "14C", "14D", "13A", "13B", "13C", "13D", "12A", "12B", "12C", "12D", "11A", "11C", "11D", "10A", "10B", "10C", "10D", "9A", "9B", "9D", "8A", "8B", "8D"],
};

export const PAGE_NAMES = {
  "/": "consent",
  "/intro": "experiment_intro",
  "/train": "2",
  "/variant-a/3": "A-3",
  "/variant-a/3-1": "A-3-1",
  "/variant-a/3-2": "A-3-2",
  "/variant-a/3-3": "A-3-3",
  "/variant-a/3-4": "A-3-4",
  "/variant-b/3": "B-3",
  "/variant-b/3-1": "B-3-1",
  "/variant-b/3-2": "B-3-2",
  "/confirm": "4",
  "/complete": "test_complete",
  "/invalid": "invalid_params",
};

export function getCarriage(no) {
  return CARRIAGES.find((carriage) => carriage.no === Number(no)) || CARRIAGES[0];
}

export function getSeatsForCarriage(carriageNo) {
  const no = Number(carriageNo);
  const rows = no === 5 || no === 9
    ? [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    : [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const unavailable = new Set(unavailableByCarriage[no] || []);

  return rows.flatMap((row) =>
    ["A", "B", "C", "D"].map((column) => {
      const label = `${row}${column}`;
      return {
        id: `${no}-${label}`,
        carriageNo: no,
        row,
        column,
        label,
        isWindow: column === "A" || column === "D",
        isAvailable: !unavailable.has(label),
        direction: row >= 9 ? "reverse" : "forward",
      };
    }),
  );
}

export function formatWon(value) {
  return `${value.toLocaleString("ko-KR")}원`;
}
