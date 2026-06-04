import seatIconSvg from "../assets/icons/seat.svg?raw";

export default function Seat({ seat, selected, onClick }) {
  const isAisle = seat.column === "B" || seat.column === "C";

  return (
    <button
      className={[
        "seat",
        seat.isAvailable ? "seat-available" : "seat-unavailable",
        selected ? "seat-selected" : "",
        seat.isWindow ? "seat-window" : "",
        isAisle ? "seat-aisle" : "",
      ].filter(Boolean).join(" ")}
      type="button"
      data-track-label={`seat:${seat.id}`}
      data-clickable="true"
      data-disabled={seat.isAvailable ? "false" : "true"}
      aria-disabled={seat.isAvailable ? "false" : "true"}
      onClick={onClick}
    >
      <span className="seat-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: seatIconSvg }} />
      <span className="seat-label">{seat.label}</span>
    </button>
  );
}
