import { renderToString } from "react-dom/server";
import { expect, test } from "vite-plus/test";
import App from "./App";

test("renders the app", () => {
  expect(renderToString(<App />)).toContain("Hello, starter");
});
