import BottomNav from "./BottomNav.jsx";
import TopBar from "./TopBar.jsx";

export default function AppShell({ title, showRefresh = false, withBottomNav = false, backTo = "", confirmOnBack = false, children }) {
  return (
    <main className="phone-frame" data-clarity-unmask="true">
      <TopBar title={title} showRefresh={showRefresh} backTo={backTo} confirmOnBack={confirmOnBack} />
      <section className={withBottomNav ? "screen screen-with-nav" : "screen"}>
        {children}
      </section>
      {withBottomNav ? <BottomNav /> : null}
    </main>
  );
}
