import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import { useExperiment } from "../context/ExperimentContext.jsx";
import { formatWon, TRAIN } from "../data/experiment.js";
import { trainRows } from "./TrainSearchPage.jsx";

const SHOW_VARIANT_A_RESERVE_BOTTOM_NAV = true;

export default function VariantAReservePage({ pageKey }) {
  const navigate = useNavigate();
  const { state, actions } = useExperiment();
  const hasSeat = Boolean(state.selectedSeat);

  function handleReserve(event) {
    if (!hasSeat && pageKey !== "A-3-4") {
      actions.autoSelectRandomSeat({ x: event.clientX, y: event.clientY });
    }
    navigate("/confirm");
  }

  function handleSeatSelection(event) {
    if (pageKey === "A-3-4") {
      actions.clearSelectedSeat({ x: event.clientX, y: event.clientY });
    }
    navigate("/variant-a/3-1");
  }

  return (
    <AppShell title="열차 조회" showRefresh withBottomNav={SHOW_VARIANT_A_RESERVE_BOTTOM_NAV} backTo="/">
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

      <div className="train-table-header">
        <span>열차</span>
        <span>출발</span>
        <span>도착</span>
        <span>일반실<br />(운임)</span>
        <span>특/우등<br />(운임+요금)</span>
      </div>

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

      <section className="train-list a-reserve-list" aria-label="선택된 열차 이후 목록">
        {trainRows.slice(1).map((row, index) => (
          <article className={row.muted ? "train-row train-row-muted" : "train-row"} key={`${row.train}-a-${index}`}>
            <span>{row.train.split("\n").map((line) => <b key={line}>{line}</b>)}</span>
            <span>{row.depart.split("\n").map((line) => <b key={line}>{line}</b>)}</span>
            <span>{row.arrive.split("\n").map((line) => <b key={line}>{line}</b>)}</span>
            <button
              className={row.priceLike ? "fare-button fare-secondary" : "fare-button fare-disabled"}
              type="button"
              data-track-label={`a-reserve:visible-row:${index}:general`}
              data-clickable="true"
             
              data-disabled="true"
              aria-disabled="true"
            >
              {row.priceLike ? (
                <>
                  {row.general}
                  <small><span className="reward-badge">M</span>5%적립</small>
                </>
              ) : (
                row.general.split("\n").map((line) => <span className="fare-line" key={line}>{line}</span>)
              )}
            </button>
            <button
              className={[
                "fare-button",
                row.priceLike ? "fare-secondary has-hourglass" : "fare-disabled",
              ].filter(Boolean).join(" ")}
              type="button"
              data-track-label={`a-reserve:visible-row:${index}:premium`}
              data-clickable="true"
             
              data-disabled="true"
              aria-disabled="true"
            >
              {row.premium}
              {row.priceLike ? <small><span className="reward-badge">M</span>5%적립</small> : null}
            </button>
          </article>
        ))}
      </section>

      <section className="reserve-sheet">
        <button className="sheet-handle" type="button" data-track-label="a-reserve:sheet-handle" data-clickable="true">⌄</button>
        <button className="sheet-close" type="button" data-track-label="a-reserve:sheet-close" data-clickable="true">×</button>
        <p><strong>일반실</strong> {TRAIN.duration} 소요</p>
        <div className="sheet-tabs">
          <span>열차시각</span>
          <span>운임요금</span>
          <button
            type="button"
            data-track-label={pageKey === "A-3-4" ? "a-reserve:reselect-seat" : "a-reserve:open-seat-selection-tab"}
            data-clickable="true"
           
            onClick={handleSeatSelection}
          >
            좌석선택
          </button>
        </div>
      </section>

      <button
        className="fixed-action"
        type="button"
        data-track-label={hasSeat ? "a-reserve:confirm-ticket" : "a-reserve:auto-select-and-confirm"}
        data-clickable="true"
       
        onClick={handleReserve}
      >
        예매
      </button>
    </AppShell>
  );
}
