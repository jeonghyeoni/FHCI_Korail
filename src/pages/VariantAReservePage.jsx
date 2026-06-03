import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import { useExperiment } from "../context/ExperimentContext.jsx";
import { formatWon, TRAIN } from "../data/experiment.js";

export default function VariantAReservePage({ pageKey }) {
  const navigate = useNavigate();
  const { state } = useExperiment();
  const hasSeat = Boolean(state.selectedSeat);

  function handleReserve() {
    navigate(hasSeat || pageKey === "A-3-4" ? "/confirm" : "/variant-a/3-1");
  }

  return (
    <AppShell title="열차 조회" showRefresh withBottomNav>
      <div className="route-band">{TRAIN.origin} <span>→</span> {TRAIN.destination}</div>
      <section className="search-controls compact">
        <div className="date-row">
          <button type="button" data-track-label="a-reserve:prev-day" data-clickable="true">이전날</button>
          <strong>{TRAIN.date}</strong>
          <button type="button" data-track-label="a-reserve:next-day" data-clickable="true">다음날</button>
        </div>
        <div className="filter-row">
          {["전체", "일반석", "직통"].map((filter) => (
            <button className="select-like" type="button" key={filter} data-track-label={`a-reserve:filter:${filter}`} data-clickable="true">
              {filter} <span>▾</span>
            </button>
          ))}
        </div>
      </section>

      <article className="train-row selected-train">
        <span><b>KTX</b><b>001</b></span>
        <span><b>05:13</b><b>서울</b></span>
        <span><b>07:50</b><b>부산</b></span>
        <button className="fare-button is-selected" type="button" data-track-label="a-reserve:selected-general" data-clickable="true">
          {formatWon(TRAIN.price)}
          <small>M 5%적립</small>
        </button>
        <button className="fare-button" type="button" data-track-label="a-reserve:premium" data-clickable="true">
          83,700원
          <small>M 5%적립</small>
        </button>
      </article>

      <section className="reserve-sheet">
        <button className="sheet-handle" type="button" data-track-label="a-reserve:sheet-handle" data-clickable="true">⌄</button>
        <button className="sheet-close" type="button" data-track-label="a-reserve:sheet-close" data-clickable="true">×</button>
        <p><strong>일반실</strong> {TRAIN.duration} 소요</p>
        <div className="sheet-tabs">
          <span>열차시각</span>
          <span>운임요금</span>
          <span>좌석선택</span>
        </div>
        {hasSeat ? <p className="selected-seat-note">선택 좌석: {state.selectedSeat.carriageNo}호차 {state.selectedSeat.label}</p> : null}
      </section>

      <button
        className="fixed-action"
        type="button"
        data-track-label={hasSeat ? "a-reserve:confirm-ticket" : "a-reserve:open-seat-selection"}
        data-clickable="true"
        onClick={handleReserve}
      >
        예매
      </button>
    </AppShell>
  );
}
