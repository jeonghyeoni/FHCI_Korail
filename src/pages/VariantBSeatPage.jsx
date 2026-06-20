import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import SeatMap from "../components/SeatMap.jsx";
import { useExperiment } from "../context/ExperimentContext.jsx";
import { CARRIAGES, formatWon, getCarriage, TRAIN } from "../data/experiment.js";
import { buildNavigationState, buildRouteUrl } from "../utils/experimentSequence.js";
import seatIconSvg from "../assets/icons/seat.svg?raw";
import babyIconSvg from "../assets/icons/baby.svg?raw";

export default function VariantBSeatPage() {
  const navigate = useNavigate();
  const { state, actions } = useExperiment();
  const seatMapScrollRef = useRef(null);
  const visibleCars = CARRIAGES
    .filter((item) => [1, 5, 6, 7, 8, 9].includes(item.no))
    .map((item) => getCarriage(item.no, state.taskId));

  useEffect(() => {
    if (seatMapScrollRef.current) {
      seatMapScrollRef.current.scrollTop = 0;
    }
  }, [state.currentCarriage]);

  function handleCarTab(event, carriageNo) {
    actions.selectCarriage(carriageNo, { x: event.clientX, y: event.clientY });
  }

  function handleSeatSelected() {
    navigate(buildRouteUrl("/variant-b/3-2", state), { state: buildNavigationState(state) });
  }

  function handleAutoSelect(event) {
    const result = actions.autoSelectSeat({ x: event.clientX, y: event.clientY });
    if (result.selected) navigate(buildRouteUrl("/confirm", state), { state: buildNavigationState(state) });
  }

  function handlePay() {
    navigate(buildRouteUrl("/confirm", state), { state: buildNavigationState(state) });
  }

  function renderDirectionIcon(direction) {
    return (
      <i
        className={`legend-seat-direction legend-seat-direction-${direction}`}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: seatIconSvg }}
      />
    );
  }

  return (
    <AppShell title="좌석 선택">
      <section className="b-seat-page">
        <section className="car-tab-strip" aria-label="호차 선택">
          {visibleCars.map((item) => (
            <button
              className={item.no === state.currentCarriage ? "car-tab is-active" : "car-tab"}
              type="button"
              key={item.no}
              data-track-label={`b-seat:car-tab:${item.no}`}
              data-clickable="true"
             
              onClick={(event) => handleCarTab(event, item.no)}
            >
            <div className="car-tab-title">
              <strong>{item.no}호차</strong>
              {item.no === 8 ? (
                <i
                  className="car-tab-baby-icon"
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: babyIconSvg }}
                />
              ) : null}
            </div>
            <span className="car-tab-count">
              <span className="car-tab-remaining">{item.remaining}석</span>
              <span className="car-tab-divider"> / </span>
              <span className="car-tab-total">{item.total}석</span>
            </span>
            {item.note ? <small>{item.note}</small> : null}
          </button>
          ))}
        </section>

        <div className="legend-row b-seat-legend">
          <span><i className="dot dot-unavailable" />선택 불가</span>
          <span><i className="dot dot-available" />선택 가능</span>
          <span>{renderDirectionIcon("forward")}순방향</span>
          <span>{renderDirectionIcon("reverse")}역방향</span>
        </div>

        <div className="seat-map-scroll" ref={seatMapScrollRef}>
          <SeatMap carriageNo={state.currentCarriage} onSelected={handleSeatSelected} />
        </div>
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
