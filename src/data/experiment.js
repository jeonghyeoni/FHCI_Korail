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
    description: "KTX001 일반실 5호차 4B 좌석을 예매",
    successText: "5호차 4B 예약 완료",
  },
  "2": {
    title: "Task 2",
    description: "KTX001 일반실 아무 좌석이나 가능한 빨리 예매",
    successText: "어떤 좌석이든 예약 완료",
  },
  "3": {
    title: "Task 3",
    description: "KTX001 일반실 창가 좌석을 예매",
    successText: "창가 좌석 예약 완료",
  },
};

export const CARRIAGES = [
  { no: 1, remaining: 17, total: 56, note: "" },
  { no: 2, remaining: 29, total: 50, note: "" },
  { no: 3, remaining: 29, total: 50, note: "" },
  { no: 4, remaining: 29, total: 50, note: "" },
  { no: 5, remaining: 3, total: 56, note: "" },
  { no: 6, remaining: 39, total: 56, note: "" },
  { no: 7, remaining: 40, total: 56, note: "" },
  { no: 8, remaining: 19, total: 56, note: "" },
  { no: 9, remaining: 20, total: 56, note: "" },
];

const columns = ["A", "B", "C", "D"];
const rowsByCarriage = {
  5: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  9: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
};

function getRowsForCarriage(no) {
  return rowsByCarriage[no] || [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
}

function makeSeatLabels(rows = [], seatColumns = columns) {
  return rows.flatMap((row) => seatColumns.map((column) => `${row}${column}`));
}

const carriage5AvailableSeats = new Set(["11B", "8C", "4B"]);

const unavailableByCarriage = {
  1: [
    "14A", "14B", "14D",
    "13A", "13D",
    "12A", "12B", "12D",
    "11A", "11C", "11D",
    "10A", "10D",
    "9A", "9B", "9D",
    "8A", "8B", "8D",
    "7A", "7B", "7D",
    "6A", "6C", "6D",
    "5A", "5C", "5D",
    "4A", "4B", "4D",
    "3A", "3C", "3D",
    "2A", "2B", "2D",
    "1A", "1D",
  ],
  2: ["14A", "13A", "12D", "11C", "9A", "9B", "8A", "8B"],
  3: ["14D", "13D", "12A", "12D", "10D", "9C", "8C"],
  4: ["14A", "14D", "13C", "12C", "11D", "10A", "9A"],
  5: makeSeatLabels(getRowsForCarriage(5)).filter((label) => !carriage5AvailableSeats.has(label)),
  6: ["8A", "8D", "7A", "7B", "6C", "6D", "5A", "5D", "4A", "4B", "4D", "3C", "3D", "2A", "1A", "1B", "1D"],
  7: ["8A", "8C", "8D", "7D", "6A", "6B", "5A", "5C", "5D", "4A", "3D", "2A", "2B", "1A", "1C", "1D"],
  8: [
    ...makeSeatLabels(getRowsForCarriage(8), ["A", "D"]),
    "8B", "7C", "6B", "6C", "5B", "4C", "3B", "2B", "2C",
  ],
  9: [
    ...makeSeatLabels(getRowsForCarriage(9), ["A", "D"]),
    "8B", "7B", "6B", "6C", "5C", "4C", "3B", "2B", "2C", "1B",
  ],
};

export const PAGE_NAMES = {
  "/": "consent",
  "/test": "consent_test",
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
  "/thanks": "thanks",
  "/invalid": "invalid_params",
};

export function getCarriage(no) {
  return CARRIAGES.find((carriage) => carriage.no === Number(no)) || CARRIAGES[0];
}

export function getSeatsForCarriage(carriageNo) {
  const no = Number(carriageNo);
  const rows = getRowsForCarriage(no);
  const unavailable = new Set(unavailableByCarriage[no] || []);

  return rows.flatMap((row) =>
    columns.map((column) => {
      const label = `${row}${column}`;
      return {
        id: `${no}-${label}`,
        carriageNo: no,
        row,
        column,
        label,
        isWindow: column === "A" || column === "D",
        isAvailable: !unavailable.has(label),
        direction: no === 5 ? "forward" : row >= 9 ? "reverse" : "forward",
      };
    }),
  );
}

export function formatWon(value) {
  return `${value.toLocaleString("ko-KR")}원`;
}
