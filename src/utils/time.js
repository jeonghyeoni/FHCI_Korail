export function toKstISOString(date = new Date()) {
  const kstOffsetMs = 9 * 60 * 60 * 1000;
  const kstDate = new Date(date.getTime() + kstOffsetMs);
  return kstDate.toISOString().replace("Z", "+09:00");
}

export function toKstTimestampText(date = new Date()) {
  const kstOffsetMs = 9 * 60 * 60 * 1000;
  const kstDate = new Date(date.getTime() + kstOffsetMs);
  const [datePart, timePart] = kstDate.toISOString().split("T");
  return `${datePart} ${timePart.slice(0, 8)} KST`;
}
