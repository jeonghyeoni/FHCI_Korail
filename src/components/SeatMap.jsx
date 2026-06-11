import { getSeatsForCarriage } from "../data/experiment.js";
import { useExperiment } from "../context/ExperimentContext.jsx";
import Seat from "./Seat.jsx";

function groupSeatsByRow(seats) {
  return seats.reduce((rows, seat) => {
    rows[seat.row] = rows[seat.row] || {};
    rows[seat.row][seat.column] = seat;
    return rows;
  }, {});
}

function SeatButton({ seat, selected, onSelected }) {
  const { actions } = useExperiment();

  function handleClick(event) {
    const result = actions.selectSeat(seat, { x: event.clientX, y: event.clientY });
    if (result.selected) {
      onSelected?.(seat);
    }
  }

  return <Seat seat={seat} selected={selected} onClick={handleClick} />;
}

export default function SeatMap({ carriageNo, onSelected }) {
  const { state } = useExperiment();
  const seats = getSeatsForCarriage(carriageNo, state.taskId);
  const rows = groupSeatsByRow(seats);
  const rowNumbers = Object.keys(rows).map(Number).sort((a, b) => b - a);

  return (
    <div className="seat-map" data-track-label={`seat-map:${carriageNo}`}>
      <div className="train-window-rails" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="seat-side-labels" aria-hidden="true">
        <span>창측</span>
        <span>내측</span>
        <span>내측</span>
        <span>창측</span>
      </div>
      {rowNumbers.map((row) => (
        <div className="seat-row" key={row}>
          <SeatButton seat={rows[row].A} selected={state.selectedSeat?.id === rows[row].A.id} onSelected={onSelected} />
          <SeatButton seat={rows[row].B} selected={state.selectedSeat?.id === rows[row].B.id} onSelected={onSelected} />
          <span className="aisle-arrow" aria-hidden="true">▲</span>
          <SeatButton seat={rows[row].C} selected={state.selectedSeat?.id === rows[row].C.id} onSelected={onSelected} />
          <SeatButton seat={rows[row].D} selected={state.selectedSeat?.id === rows[row].D.id} onSelected={onSelected} />
        </div>
      ))}
    </div>
  );
}
