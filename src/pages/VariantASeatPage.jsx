import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import SeatMap from "../components/SeatMap.jsx";
import { useExperiment } from "../context/ExperimentContext.jsx";
import { CARRIAGES, getCarriage, TRAIN } from "../data/experiment.js";

const A_CARRIAGE_OPTIONS = CARRIAGES.filter((item) => [1, 5, 6, 7, 8, 9].includes(item.no));

export default function VariantASeatPage({ mode }) {
  const navigate = useNavigate();
  const { state, actions } = useExperiment();
  const carriage = getCarriage(state.currentCarriage);
  const showDropdown = mode === "dropdown";
  const dropdownTopCarriage = showDropdown ? A_CARRIAGE_OPTIONS[0] : carriage;
  const dropdownOptions = showDropdown ? A_CARRIAGE_OPTIONS.slice(1) : A_CARRIAGE_OPTIONS;
  const currentCarriageIndex = A_CARRIAGE_OPTIONS.findIndex((item) => item.no === state.currentCarriage);
  const previousCarriage = currentCarriageIndex > 0 ? A_CARRIAGE_OPTIONS[currentCarriageIndex - 1] : null;
  const nextCarriage = currentCarriageIndex >= 0 && currentCarriageIndex < A_CARRIAGE_OPTIONS.length - 1
    ? A_CARRIAGE_OPTIONS[currentCarriageIndex + 1]
    : null;

  useEffect(() => {
    if (mode === "selected" && !state.selectedSeat) {
      navigate("/variant-a/3-1", { replace: true });
    }
  }, [mode, navigate, state.selectedSeat]);

  function handleToggleDropdown() {
    navigate(showDropdown ? "/variant-a/3-1" : "/variant-a/3-2");
  }

  function handleDropdownHeaderClick(event) {
    if (showDropdown) {
      handleCarriageChange(event, dropdownTopCarriage.no);
      return;
    }

    handleToggleDropdown();
  }

  function handleCarriageChange(event, carriageNo) {
    actions.selectCarriage(carriageNo, { x: event.clientX, y: event.clientY });
    navigate("/variant-a/3-1");
  }

  function handleSeatSelected() {
    navigate("/variant-a/3-3");
  }

  function handleDone() {
    navigate("/variant-a/3-4");
  }

  return (
    <AppShell title={`${state.currentCarriage}호차 좌석 선택`}>
      <section className="seat-selector-panel">
        <button
          className={showDropdown && state.currentCarriage === dropdownTopCarriage.no ? "car-dropdown-button is-active" : "car-dropdown-button"}
          type="button"
          data-track-label="a-seat:car-dropdown"
          data-clickable="true"
          onClick={handleDropdownHeaderClick}
        >
          {dropdownTopCarriage.no}호차 ({dropdownTopCarriage.remaining}석) <span>{showDropdown ? "▴" : "▾"}</span>
        </button>
        {showDropdown ? (
          <div className="car-dropdown-list">
            {dropdownOptions.map((item) => (
              <button
                type="button"
                key={item.no}
                className={item.no === state.currentCarriage ? "car-option is-active" : "car-option"}
                data-track-label={`a-seat:car-option:${item.no}`}
                data-clickable="true"
                onClick={(event) => handleCarriageChange(event, item.no)}
              >
                <span>{item.no}호차 ({item.remaining}석)</span>
                {item.note ? <strong>{item.note}</strong> : null}
              </button>
            ))}
          </div>
        ) : null}

        {!showDropdown ? (
          <>
            <section className="seat-train-info">
              <div className="car-side-action car-side-action-left">
                {previousCarriage ? (
                  <button
                    className="outline-pill"
                    type="button"
                    data-track-label={`a-seat:quick-car-${previousCarriage.no}`}
                    data-clickable="true"
                    onClick={(event) => handleCarriageChange(event, previousCarriage.no)}
                  >
                    {previousCarriage.no}호차
                  </button>
                ) : null}
              </div>
              <div>
                <h2>{TRAIN.displayName} ({TRAIN.className})</h2>
                <p>잔여 {carriage.remaining}석 / 전체 {carriage.total}석</p>
              </div>
              <div className="car-side-action car-side-action-right">
                {nextCarriage ? (
                  <button
                    className="outline-pill"
                    type="button"
                    data-track-label={`a-seat:quick-car-${nextCarriage.no}`}
                    data-clickable="true"
                    onClick={(event) => handleCarriageChange(event, nextCarriage.no)}
                  >
                    {nextCarriage.no}호차
                  </button>
                ) : null}
              </div>
            </section>

            <button className="vr-banner" type="button" data-track-label="a-seat:vr-preview" data-clickable="true">
              열차 내 미리보기(VR)
            </button>

            <div className="legend-row">
              <span><i className="dot dot-unavailable" />선택 불가</span>
              <span><i className="dot dot-available" />선택 가능</span>
              <span>∪ 순방향</span>
              <span>∩ 역방향</span>
            </div>
          </>
        ) : null}

        <SeatMap carriageNo={state.currentCarriage} onSelected={handleSeatSelected} />
      </section>

      <section className={state.selectedSeat ? "seat-bottom-sheet seat-bottom-sheet-selected" : "seat-bottom-sheet"}>
        <p>선택 좌석</p>
        {state.selectedSeat ? (
          <>
            <strong>1명 좌석 선택 / 총 1명</strong>
            <span>{state.selectedSeat.carriageNo}호차 {state.selectedSeat.label}</span>
          </>
        ) : (
          <strong>0명 좌석 선택 / 총 1명</strong>
        )}
      </section>

      {state.selectedSeat ? (
        <button
          className="fixed-action"
          type="button"
          data-track-label="a-seat:selection-complete"
          data-clickable="true"
          onClick={handleDone}
        >
          선택 완료
        </button>
      ) : null}
    </AppShell>
  );
}
