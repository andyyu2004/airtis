import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Play, Result } from "./pages";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
    {
      path: "/result",
      element: <Result />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
