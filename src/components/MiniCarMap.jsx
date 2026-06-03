import { getSeatsForCarriage, getCarriage } from "../data/experiment.js";

export default function MiniCarMap({ carriageNo, onOpen }) {
  const seats = getSeatsForCarriage(carriageNo);
  const carriage = getCarriage(carriageNo);

  return (
    <button
      className="mini-car"
      type="button"
      data-track-label={`mini-car:${carriageNo}`}
      data-clickable="true"
      onClick={onOpen}
    >
      <span className="mini-car-meta">
        <strong>{carriageNo}호차</strong>
        <span>{carriage.remaining}석 / {carriage.total}석</span>
        {carriage.note ? <em>{carriage.note}</em> : null}
      </span>
      <span className="mini-seat-grid" aria-hidden="true">
        {seats.slice(0, 56).map((seat) => (
          <span
            key={seat.id}
            className={seat.isAvailable ? "mini-seat is-free" : "mini-seat is-used"}
          />
        ))}
      </span>
      <span className="mini-arrow" aria-hidden="true">›</span>
    </button>
  );
}
