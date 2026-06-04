import { useNavigate } from "react-router-dom";

export default function TopBar({ title, showRefresh = false, backTo = "" }) {
  const navigate = useNavigate();

  function handleBack() {
    if (backTo) {
      navigate(backTo);
      return;
    }

    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  }

  return (
    <header className="top-bar">
      <div className="app-bar">
        <button
          className="icon-button back-button"
          type="button"
          data-track-label="top:back"
          data-clickable="true"
          aria-label="뒤로가기"
          onClick={handleBack}
        >
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
