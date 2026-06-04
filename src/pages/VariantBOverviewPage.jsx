import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import MiniCarMap from "../components/MiniCarMap.jsx";
import { useExperiment } from "../context/ExperimentContext.jsx";
import { CARRIAGES, formatWon, TRAIN } from "../data/experiment.js";

export default function VariantBOverviewPage() {
  const navigate = useNavigate();
  const { state, actions } = useExperiment();
  const visibleCars = CARRIAGES.filter((carriage) => [1, 5, 6, 7, 8, 9].includes(carriage.no));
  const bOverviewRemaining = {
    1: 30,
    5: 33,
    6: 29,
    7: 30,
    8: 13,
    9: 2,
  };

  function openCarriage(event, carriageNo) {
    actions.selectCarriage(carriageNo, { x: event.clientX, y: event.clientY });
    navigate("/variant-b/3-1");
  }

  function handleAutoSelect(event) {
    const result = actions.autoSelectSeat({ x: event.clientX, y: event.clientY });
    if (result.selected) {
      navigate("/confirm");
    }
  }

  function handlePay() {
    navigate("/confirm");
  }

  return (
    <AppShell title="좌석 선택">
      <section className="b-train-card">
        <h2>KTX 001</h2>
        <div className="b-route-grid">
          <span>{TRAIN.origin}<small>{TRAIN.departureTime}</small></span>
          <strong>→</strong>
          <span>{TRAIN.destination}<small>{TRAIN.arrivalTime}</small></span>
        </div>
        <div className="b-legend">
          <span><i className="b-direction-icon" />열차진행방향</span>
          <span><i className="b-legend-seat is-free" />선택가능</span>
          <span><i className="b-legend-seat is-used" />선택불가</span>
        </div>
      </section>

      <section className="mini-car-list">
        {visibleCars.map((carriage) => (
          <MiniCarMap
            key={carriage.no}
            carriageNo={carriage.no}
            displayRemaining={bOverviewRemaining[carriage.no]}
            onOpen={(event) => openCarriage(event, carriage.no)}
          />
        ))}
      </section>

      <section className="seat-payment-bar">
        {state.selectedSeat ? (
          <div>
            <span>{state.selectedSeat.carriageNo}호차 · {state.selectedSeat.label}</span>
            <strong>{formatWon(TRAIN.price)}</strong>
          </div>
        ) : (
          <div>
            <span>- 호차</span>
            <span>좌석을 선택해주세요.</span>
          </div>
        )}
        {state.selectedSeat ? (
          <button
            type="button"
            data-track-label="b-overview:pay"
            data-clickable="true"
           
            onClick={handlePay}
          >
            결제하기
          </button>
        ) : (
          <button
            type="button"
            data-track-label="b-overview:auto-select"
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
