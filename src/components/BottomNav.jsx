const items = [
  { label: "홈", icon: "⌂" },
  { label: "혜택·정기권", icon: "%" },
  { label: "여행상품·패스", icon: "▣" },
  { label: "나의 티켓", icon: "▱" },
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
          <span className="bottom-nav-icon" aria-hidden="true">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
