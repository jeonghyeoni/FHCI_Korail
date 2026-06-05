import { useExperiment } from "../context/ExperimentContext.jsx";

export default function ErrorPage({ notFound = false }) {
  const { state } = useExperiment();

  return (
    <main className="phone-frame" data-clarity-unmask="true">
      <section className="screen centered-screen">
        <h1>{notFound ? "페이지를 찾을 수 없습니다" : "실험 URL을 확인해주세요"}</h1>
        {!notFound ? (
          <>
            <p>기본 실험 링크로 접속하면 참가자 번호와 테스트 순서가 자동으로 설정됩니다.</p>
            <div className="example-url">/</div>
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
