import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./main.css";

const reactRoot = createRoot(document.getElementById("root")!);

reactRoot.render(
    <App />
);
