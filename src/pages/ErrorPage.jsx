import { useExperiment } from "../context/ExperimentContext.jsx";

export default function ErrorPage({ notFound = false }) {
  const { state } = useExperiment();

  return (
    <main className="phone-frame">
      <section className="screen centered-screen">
        <h1>{notFound ? "페이지를 찾을 수 없습니다" : "실험 URL을 확인해주세요"}</h1>
        {!notFound ? (
          <>
            <p>앱은 시작 시 URL에서 variant, task, pid를 읽습니다.</p>
            <div className="example-url">?variant=B&amp;task=2&amp;pid=P013</div>
            {state.errors?.length ? (
              <ul className="error-list">
                {state.errors.map((error) => <li key={error}>{error}</li>)}
              </ul>
            ) : null}
          </>
        ) : (
          <p>실험 링크의 경로가 올바른지 확인해주세요.</p>
        )}
      </section>
    </main>
  );
}
