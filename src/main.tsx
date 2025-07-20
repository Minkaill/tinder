import ReactDOM from "react-dom/client";
import { AppProviders } from "@/app/main";
import { AppRouter } from "./app/router/root";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProviders>
    <AppRouter />
  </AppProviders>
);
