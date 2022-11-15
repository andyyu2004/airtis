import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Play from "./pages/play";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/play",
      element: <Play />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
