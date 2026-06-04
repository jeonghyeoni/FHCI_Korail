import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import { useExperiment } from "../context/ExperimentContext.jsx";
import { TRAIN } from "../data/experiment.js";

export default function TicketConfirmPage() {
  const navigate = useNavigate();
  const { state, actions } = useExperiment();
  const seatText = state.selectedSeat
    ? `${state.selectedSeat.carriageNo}호차 ${state.selectedSeat.label}`
    : "좌석 미선택";

  function handlePayment(event) {
    actions.completeTask({ x: event.clientX, y: event.clientY });
    navigate("/complete");
  }

  return (
    <AppShell title="승차권 정보 확인">
      <section className="ticket-summary">
        <div className="ticket-date-line">
          <strong>{TRAIN.date}</strong>
          <span>1매</span>
        </div>
        <h2>[{TRAIN.displayName}] {TRAIN.origin} {TRAIN.departureTime} → {TRAIN.destination} {TRAIN.arrivalTime}</h2>
        <p>{TRAIN.className} {seatText}<em>(역방향)</em></p>
        <div className="deadline">
          <strong>결제기한</strong>
          <span>2026.05.28(목) 16:20</span>
        </div>
        <div className="ticket-actions">
          <button type="button" data-track-label="confirm:cancel" data-clickable="true">예약취소</button>
          <button type="button" data-track-label="confirm:cart" data-clickable="true">장바구니</button>
        </div>
      </section>

      <p className="notice-line">· 결제하지 않으면 예약이 취소됩니다.</p>

      <section className="terms-section">
        <h2>꼭 알아두세요!</h2>
        <p>· 승차권을 사진 촬영하거나 캡처하여 열차에 탑승하는 것은 부정승차 행위로 부가운임 부과 대상</p>
        <p>· 할인 승차권을 구매하신 고객님은 열차 탑승 시 신분증 또는 증명서 휴대</p>
        <p>· 승차권 전달하기 서비스 제외</p>
        <p>· 반려동물 동반 등으로 좌석이 추가 필요한 경우 어른 승차권 구매 이용</p>
        <button type="button" data-track-label="confirm:refund-rule" data-clickable="true">▶ 승차권 환불 위약금 확인하기</button>
        <button type="button" data-track-label="confirm:baggage-rule" data-clickable="true">▶ 열차 내 물품 휴대기준 확인하기</button>
      </section>

      <button
        className="fixed-action"
        type="button"
        data-track-label="confirm:payment"
        data-clickable="true"
       
        onClick={handlePayment}
      >
        결제하기
      </button>
    </AppShell>
  );
}
