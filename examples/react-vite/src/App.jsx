import { Footer, Header } from "brand-shell";
import "brand-shell/default.css";

import contract from "../../shared/brand-contract.json";

const { details, theme } = contract;

export default function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header details={details} theme={theme} />
      <main style={{ flex: 1, maxWidth: "72rem", width: "100%", margin: "0 auto", padding: "2rem 1rem" }}>
        <h1 style={{ marginTop: 0 }}>React Demo</h1>
        <p>
          This app uses the React adapter and the shared contract from
          <code> examples/shared/brand-contract.json</code>.
        </p>
      </main>
      <Footer details={details} theme={theme} />
    </div>
  );
}
