import { todayStr, tomorrowStr } from "./utils/days";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useRoutes, Navigate } from "react-router-dom";
import { RecordsProvider } from "./contexts/RecordsContext";
const App = () => {
  const router = useRoutes([
    {
      path: "/",
      element: <Navigate to="/today" />,
    },
    {
      path: "/today",
      element: <Navigate to={`/${todayStr}`} />,
    },
    {
      path: "/tomorrow",
      element: <Navigate to={`/${tomorrowStr}`} />,
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
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return router;
};

export default App;
