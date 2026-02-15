import { Footer, Header } from "brand-shell";

import contract from "../../shared/brand-contract.json";

const { details, theme } = contract;

export default function HomePage() {
  return (
    <div className="demo-app">
      <Header details={details} theme={theme} />
      <main className="demo-main">
        <h1>Next Demo</h1>
        <p>
          This app uses Next.js App Router with the React adapter and the shared contract from
          <code> examples/shared/brand-contract.json</code>.
        </p>
      </main>
      <Footer details={details} theme={theme} />
    </div>
  );
}
