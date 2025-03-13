import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./main.css";

const reactRoot = createRoot(document.getElementById("root")!);

reactRoot.render(
  // <React.StrictMode> //개발할때만 주석, 배포시 꼭 주석풀기!
    <App />
  // </React.StrictMode>
);
