import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import { useExperiment } from "../context/ExperimentContext.jsx";
import { formatWon, TRAIN } from "../data/experiment.js";

export const trainRows = [
  { train: "KTX\n001", depart: "05:13\n서울", arrive: "07:50\n부산", general: "target", premium: "매진", enabled: true },
  { train: "KTX\n003", depart: "05:27\n서울", arrive: "08:16\n부산", general: "매진", premium: "매진", enabled: false, muted: true },
  { train: "SRT\n301", depart: "05:30\n수서", arrive: "08:06\n부산", general: "매진", premium: "매진", enabled: false, muted: true },
  { train: "KTX-이음\n701", depart: "05:40\n청량리", arrive: "09:24\n부전", general: "매진", premium: "매진", enabled: false, muted: true },
  { train: "ITX-새마을\n1001", depart: "05:54\n서울", arrive: "11:14\n부산", general: "매진", premium: "-", enabled: false },
  { train: "KTX\n005", depart: "05:58\n서울", arrive: "08:43\n부산", general: "매진", premium: "매진", enabled: false },
];

const SHOW_TRAIN_SEARCH_BOTTOM_NAV = true;

export default function TrainSearchPage() {
  const navigate = useNavigate();
  const { state } = useExperiment();

  function handleGeneralFare() {
    navigate(state.variant === "A" ? "/variant-a/3" : "/variant-b/3");
  }

  return (
    <AppShell title="열차 조회" showRefresh withBottomNav={SHOW_TRAIN_SEARCH_BOTTOM_NAV} backTo="/">
      <div className="route-band">{TRAIN.origin} <span>→</span> {TRAIN.destination}</div>
      <section className="search-controls">
        <div className="date-row">
          <button type="button" data-track-label="train:prev-day" data-clickable="true">이전날</button>
          <strong>{TRAIN.date}</strong>
          <button type="button" data-track-label="train:next-day" data-clickable="true">다음날</button>
        </div>
        <div className="filter-row">
          {["전체", "일반석", "직통"].map((filter) => (
            <button
              type="button"
              key={filter}
              className="select-like"
              data-track-label={`train:filter:${filter}`}
              data-clickable="true"
             
            >
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

      <section className="train-list">
        {trainRows.map((row, index) => (
          <article className={index === 0 ? "train-row" : "train-row train-row-muted"} key={`${row.train}-${index}`}>
            <span>{row.train.split("\n").map((line) => <b key={line}>{line}</b>)}</span>
            <span>{row.depart.split("\n").map((line) => <b key={line}>{line}</b>)}</span>
            <span>{row.arrive.split("\n").map((line) => <b key={line}>{line}</b>)}</span>
            {index === 0 ? (
              <button
                className="fare-button"
                type="button"
                data-track-label="train:KTX001:general-fare"
                data-clickable="true"
               
                onClick={handleGeneralFare}
              >
                {formatWon(TRAIN.price)}
                <small><span className="reward-badge">M</span>5%적립</small>
              </button>
            ) : (
              <button
                className="fare-button fare-disabled"
                type="button"
              data-track-label={`train:${index}:general-fare`}
              data-clickable="true"
             
              data-disabled="true"
                aria-disabled="true"
              >
                {row.general.split("\n").map((line) => <span className="fare-line" key={line}>{line}</span>)}
              </button>
            )}
            <button
              className="fare-button fare-disabled"
              type="button"
              data-track-label={`train:${index}:premium-fare`}
              data-clickable="true"
             
              data-disabled="true"
              aria-disabled="true"
            >
              매진
            </button>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
