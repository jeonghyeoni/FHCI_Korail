const items = [
  { label: "홈", key: "home" },
  { label: "혜택·정기권", key: "benefit" },
  { label: "여행상품·패스", key: "bag" },
  { label: "나의 티켓", key: "ticket" },
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
          <span className={`bottom-nav-icon bottom-nav-icon-${item.key}`} aria-hidden="true" />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
