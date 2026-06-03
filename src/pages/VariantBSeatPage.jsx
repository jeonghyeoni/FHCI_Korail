import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import SeatMap from "../components/SeatMap.jsx";
import { useExperiment } from "../context/ExperimentContext.jsx";
import { CARRIAGES, formatWon, getCarriage, TRAIN } from "../data/experiment.js";

export default function VariantBSeatPage() {
  const navigate = useNavigate();
  const { state, actions } = useExperiment();
  const carriage = getCarriage(state.currentCarriage);

  function handleCarTab(event, carriageNo) {
    actions.selectCarriage(carriageNo, { x: event.clientX, y: event.clientY });
  }

  function handleSeatSelected() {
    navigate("/variant-b/3-2");
  }

  function handleAutoSelect(event) {
    const result = actions.autoSelectSeat({ x: event.clientX, y: event.clientY });
    if (result.selected) navigate("/variant-b/3-2");
  }

  function handlePay() {
    navigate("/confirm");
  }

  return (
    <AppShell title="좌석 선택">
      <section className="car-tab-strip" aria-label="호차 선택">
        {CARRIAGES.filter((item) => item.no <= 6).map((item) => (
          <button
            className={item.no === state.currentCarriage ? "car-tab is-active" : "car-tab"}
            type="button"
            key={item.no}
            data-track-label={`b-seat:car-tab:${item.no}`}
            data-clickable="true"
            onClick={(event) => handleCarTab(event, item.no)}
          >
            <strong>{item.no}호차</strong>
            <span>{item.remaining}석 / {item.total}석</span>
            {item.note ? <small>{item.note}</small> : null}
          </button>
        ))}
      </section>

      <div className="legend-row b-seat-legend">
        <span><i className="dot dot-unavailable" />선택 불가</span>
        <span><i className="dot dot-available" />선택 가능</span>
        <span>∪ 순방향</span>
        <span>∩ 역방향</span>
      </div>

      <SeatMap carriageNo={state.currentCarriage} onSelected={handleSeatSelected} />

      <section className="seat-payment-bar">
        {state.selectedSeat ? (
          <div>
            <span>{state.selectedSeat.carriageNo}호차 · {state.selectedSeat.label}</span>
            <strong>{formatWon(TRAIN.price)}</strong>
          </div>
        ) : (
          <div>
            <strong>{carriage.no}호차</strong>
            <span>좌석을 선택해주세요.</span>
          </div>
        )}
        {state.selectedSeat ? (
          <button
            type="button"
            data-track-label="b-seat:pay"
            data-clickable="true"
            onClick={handlePay}
          >
            결제하기
          </button>
        ) : (
          <button
            type="button"
            data-track-label="b-seat:auto-select"
            data-clickable="true"
            onClick={handleAutoSelect}
          >
            좌석 자동선택
          </button>
        )}
      </section>
    </AppShell>
  );
}
