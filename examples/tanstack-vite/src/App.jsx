import { createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from "@tanstack/react-router";
import { Footer, Header } from "brand-shell";
import "brand-shell/default.css";

import contract from "../../shared/brand-contract.json";

const { details, theme } = contract;

function ShellLayout() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header details={details} theme={theme} />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer details={details} theme={theme} />
    </div>
  );
}

function HomePage() {
  return (
    <section style={{ maxWidth: "72rem", margin: "0 auto", padding: "2rem 1rem" }}>
      <h1 style={{ marginTop: 0 }}>TanStack Demo</h1>
      <p>
        This app uses TanStack Router with the React adapter and the shared contract from
        <code> examples/shared/brand-contract.json</code>.
      </p>
    </section>
  );
}

const rootRoute = createRootRoute({ component: ShellLayout });
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const routeTree = rootRoute.addChildren([indexRoute]);
const router = createRouter({ routeTree });

export default function App() {
  return <RouterProvider router={router} />;
}
