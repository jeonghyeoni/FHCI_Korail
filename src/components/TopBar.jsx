export default function TopBar({ title, showRefresh = false }) {
  return (
    <header className="top-bar">
      <div className="status-bar" aria-hidden="true">
        <span className="status-time">4:10</span>
        <span className="status-icons">
          <i className="signal-icon" />
          <i className="wifi-icon" />
          <i className="battery-icon">50</i>
        </span>
      </div>
      <div className="app-bar">
        <button className="icon-button back-button" type="button" data-track-label="top:back" data-clickable="true" aria-label="뒤로가기">
          <span aria-hidden="true" />
        </button>
        <h1>{title}</h1>
        <div className="top-actions">
          {showRefresh ? (
            <button className="icon-button refresh-button" type="button" data-track-label="top:refresh" data-clickable="true" aria-label="새로고침">
              <span aria-hidden="true" />
            </button>
          ) : (
            <button className="icon-button timer-button" type="button" data-track-label="top:timer" data-clickable="true" aria-label="타이머">
              <span aria-hidden="true" />
            </button>
          )}
          <button className="icon-button menu-button" type="button" data-track-label="top:menu" data-clickable="true" aria-label="메뉴">
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
