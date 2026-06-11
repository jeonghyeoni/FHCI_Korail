import { TASK1_TARGET, TASK2_TARGET, isSameSeatTarget } from "../data/taskTargets.js";

export function isTargetSeat(taskId, seat) {
  if (!seat) return false;
  if (taskId === "1") return isSameSeatTarget(seat, TASK1_TARGET);
  if (taskId === "2") return isSameSeatTarget(seat, TASK2_TARGET);
  if (taskId === "3") return seat.isWindow;
  return false;
}

export function getSeatMisclickReason(taskId, seat) {
  if (!seat) return "seat_missing";
  if (!seat.isAvailable) return "inactive_seat";
  if (taskId === "1" && !isSameSeatTarget(seat, TASK1_TARGET)) {
    return "task1_wrong_seat";
  }
  if (taskId === "2" && !isSameSeatTarget(seat, TASK2_TARGET)) {
    return "task2_wrong_seat";
  }
  if (taskId === "3" && !seat.isWindow) {
    return "task3_non_window_seat";
  }
  return "";
}

export function getAutoSeat(taskId, seats) {
  const availableSeats = seats.filter((seat) => seat.isAvailable);
  if (taskId === "1") {
    return availableSeats.find((seat) => isSameSeatTarget(seat, TASK1_TARGET)) || availableSeats[0];
  }
  if (taskId === "2") {
    return availableSeats.find((seat) => isSameSeatTarget(seat, TASK2_TARGET)) || availableSeats[0];
  }
  if (taskId === "3") {
    return availableSeats.find((seat) => seat.isWindow) || availableSeats[0];
  }
  return availableSeats[0];
}
