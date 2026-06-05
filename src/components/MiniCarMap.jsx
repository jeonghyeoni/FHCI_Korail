import { getSeatsForCarriage, getCarriage } from "../data/experiment.js";
import miniSeatSvg from "../assets/icons/mini_seat.svg?raw";

function groupSeatsByRow(seats) {
  return seats.reduce((rows, seat) => {
    rows[seat.row] = rows[seat.row] || {};
    rows[seat.row][seat.column] = seat;
    return rows;
  }, {});
}

export default function MiniCarMap({ carriageNo, displayRemaining, onOpen }) {
  const seats = getSeatsForCarriage(carriageNo);
  const carriage = getCarriage(carriageNo);
  const seatsByRow = groupSeatsByRow(seats);
  const rowNumbers = Object.keys(seatsByRow).map(Number).sort((a, b) => a - b);
  const seatRows = ["A", "B", "C", "D"].map((column) =>
    rowNumbers.map((row) => seatsByRow[row][column]).filter(Boolean)
  );
  const gridStyle = { "--mini-cols": rowNumbers.length };
  const directionArrowCount = Math.ceil(rowNumbers.length / 2);

  function renderMiniSeat(seat) {
    return (
      <span
        key={seat.id}
        className={[
          "mini-seat",
          seat.isAvailable ? "is-free" : "is-used",
          seat.direction === "reverse" ? "is-reverse-direction" : "",
        ].filter(Boolean).join(" ")}
        dangerouslySetInnerHTML={{ __html: miniSeatSvg }}
      />
    );
  }

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
        <span>{displayRemaining ?? carriage.remaining}석 / {carriage.total}석</span>
        {carriageNo === 8 ? <em>유아동반석</em> : null}
        {carriage.note ? <em>{carriage.note}</em> : null}
      </span>
      <span className="mini-seat-layout" aria-hidden="true">
        {seatRows.slice(0, 2).map((row, rowIndex) => (
          <span className="mini-seat-row" key={`top-${rowIndex}`} style={gridStyle}>
            {row.map(renderMiniSeat)}
          </span>
        ))}
        <span className="mini-direction-row" style={{ "--mini-direction-cols": directionArrowCount }}>
          {Array.from({ length: directionArrowCount }, (_, index) => (
            <i key={`direction-${index}`} />
          ))}
        </span>
        {seatRows.slice(2).map((row, rowIndex) => (
          <span className="mini-seat-row" key={`bottom-${rowIndex}`} style={gridStyle}>
            {row.map(renderMiniSeat)}
          </span>
        ))}
      </span>
      <span className="mini-arrow" aria-hidden="true">›</span>
    </button>
  );
}
