import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/style.scss";
import reportWebVitals from "./reportWebVitals";
import { todayStr } from "./utils/days";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { RecordsProvider } from "./contexts/RecordsContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={`/${todayStr}`} />,
  },
  {
    path: "/:dateStr",
    element: (
      <RecordsProvider>
        <MainPage />
      </RecordsProvider>
    ),
  },
  {
    path: "/404",
    element: <NotFoundPage />,
  },
  {
    path: "/*",
    element: <Navigate to="/404" />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
