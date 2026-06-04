import BottomNav from "./BottomNav.jsx";
import TopBar from "./TopBar.jsx";

export default function AppShell({ title, showRefresh = false, withBottomNav = false, backTo = "", children }) {
  return (
    <main className="phone-frame">
      <TopBar title={title} showRefresh={showRefresh} backTo={backTo} />
      <section className={withBottomNav ? "screen screen-with-nav" : "screen"}>
        {children}
      </section>
      {withBottomNav ? <BottomNav /> : null}
    </main>
  );
}
