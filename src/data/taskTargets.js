export const TASK1_TARGET = {
  carriageNo: 5,
  label: "4B",
};

export const TASK2_TARGET = {
  carriageNo: 7,
  label: "2C",
};

export function isSameSeatTarget(seat, target) {
  return Boolean(seat) && seat.carriageNo === target.carriageNo && seat.label === target.label;
}
