import { Footer, Header } from "brand-shell";
import "brand-shell/default.css";

import contract from "../../shared/brand-contract.json";

const { details, theme } = contract;

export default function App() {
  return (
    <div className="demo-app">
      <Header details={details} theme={theme} />
      <main className="demo-main demo-layout-main">
        <h1>React Demo</h1>
        <p>
          This app uses the React adapter and the shared contract from
          <code> examples/shared/brand-contract.json</code>.
        </p>
      </main>
      <Footer details={details} theme={theme} />
    </div>
  );
}
