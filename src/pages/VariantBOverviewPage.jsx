import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import MiniCarMap from "../components/MiniCarMap.jsx";
import { useExperiment } from "../context/ExperimentContext.jsx";
import { CARRIAGES, TRAIN } from "../data/experiment.js";

export default function VariantBOverviewPage() {
  const navigate = useNavigate();
  const { actions } = useExperiment();
  const visibleCars = CARRIAGES.filter((carriage) => [1, 5, 6, 7].includes(carriage.no));

  function openCarriage(event, carriageNo) {
    actions.selectCarriage(carriageNo, { x: event.clientX, y: event.clientY });
    navigate("/variant-b/3-1");
  }

  function handleAutoSelect(event) {
    const result = actions.autoSelectSeat({ x: event.clientX, y: event.clientY });
    if (result.selected) {
      navigate("/variant-b/3-2");
    }
  }

  return (
    <AppShell title="좌석 선택">
      <section className="b-train-card">
        <h2>{TRAIN.displayName}</h2>
        <div className="b-route-grid">
          <span>{TRAIN.origin}<small>{TRAIN.departureTime}</small></span>
          <strong>→</strong>
          <span>{TRAIN.destination}<small>{TRAIN.arrivalTime}</small></span>
        </div>
        <div className="b-legend">
          <span>▶ 열차진행방향</span>
          <span><i className="mini-seat is-free" />선택가능</span>
          <span><i className="mini-seat is-used" />선택불가</span>
          <span>유아동반석</span>
        </div>
      </section>

      <section className="mini-car-list">
        {visibleCars.map((carriage) => (
          <MiniCarMap
            key={carriage.no}
            carriageNo={carriage.no}
            onOpen={(event) => openCarriage(event, carriage.no)}
          />
        ))}
      </section>

      <section className="seat-payment-bar">
        <div>
          <strong>호차</strong>
          <span>좌석을 선택해주세요.</span>
        </div>
        <button
          type="button"
          data-track-label="b-overview:auto-select"
          data-clickable="true"
          onClick={handleAutoSelect}
        >
          좌석 자동선택
        </button>
      </section>
    </AppShell>
  );
}
