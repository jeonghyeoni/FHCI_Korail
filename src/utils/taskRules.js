const TASK2_TARGET = {
  carriageNo: 5,
  label: "4B",
};

export function isTargetSeat(taskId, seat) {
  if (!seat) return false;
  if (taskId === "1") return true;
  if (taskId === "2") return seat.carriageNo === TASK2_TARGET.carriageNo && seat.label === TASK2_TARGET.label;
  if (taskId === "3") return seat.isWindow;
  return false;
}

export function getSeatMisclickReason(taskId, seat) {
  if (!seat) return "seat_missing";
  if (!seat.isAvailable) return "inactive_seat";
  if (taskId === "2" && !(seat.carriageNo === TASK2_TARGET.carriageNo && seat.label === TASK2_TARGET.label)) {
    return "task2_wrong_seat";
  }
  if (taskId === "3" && !seat.isWindow) {
    return "task3_non_window_seat";
  }
  return "";
}

export function getAutoSeat(taskId, seats) {
  const availableSeats = seats.filter((seat) => seat.isAvailable);
  if (taskId === "2") {
    return availableSeats.find((seat) => seat.carriageNo === TASK2_TARGET.carriageNo && seat.label === TASK2_TARGET.label) || availableSeats[0];
  }
  if (taskId === "3") {
    return availableSeats.find((seat) => seat.isWindow) || availableSeats[0];
  }
  return availableSeats[0];
}
