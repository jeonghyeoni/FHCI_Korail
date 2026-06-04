import bagIcon from "../assets/icons/bag.svg";
import benefitIcon from "../assets/icons/benefit.svg";
import homeIcon from "../assets/icons/home.svg";
import ticketIcon from "../assets/icons/ticket.svg";

const items = [
  { label: "홈", key: "home", icon: homeIcon },
  { label: "혜택·정기권", key: "benefit", icon: benefitIcon },
  { label: "여행상품·패스", key: "bag", icon: bagIcon },
  { label: "나의 티켓", key: "ticket", icon: ticketIcon },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="하단 메뉴">
      {items.map((item) => (
        <button
          className="bottom-nav-item"
          type="button"
          key={item.label}
          data-track-label={`bottom-nav:${item.label}`}
          data-clickable="true"
        >
          <img className={`bottom-nav-icon bottom-nav-icon-${item.key}`} src={item.icon} alt="" aria-hidden="true" />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
