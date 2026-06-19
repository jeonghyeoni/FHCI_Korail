import { useEffect } from "react";
import { flushQueuedTaskSummaryBackups } from "../analytics/submission.js";
import { useExperiment } from "../context/ExperimentContext.jsx";

export default function ThankYouPage() {
  const { state } = useExperiment();

  useEffect(() => {
    if (state.isTestMode) return;
    flushQueuedTaskSummaryBackups({ force: true });
  }, [state.isTestMode]);

  return (
    <main className="phone-frame" data-clarity-unmask="true">
      <section className="screen centered-screen thank-you-screen">
        <p className="eyebrow">실험 종료</p>
        <h1>감사합니다</h1>
        <p>
          연구에 관해 궁금한 사항이나 건의할 사항이 있다면 아래 이메일로 문의해주세요.
        </p>
        <a href="mailto:minjh0117@sogang.ac.kr">minjh0117@sogang.ac.kr</a>
      </section>
    </main>
  );
}
