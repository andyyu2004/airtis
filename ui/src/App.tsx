import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { Game, Home, Result } from "./pages";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef, useState } from "react";

const queryClient = new QueryClient();

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/play",
      element: <Game />,
    },
    {
      path: "/result",
      element: <Result />,
    },
  ]);

  const [playing, setPlaying] = useState(false);

  return (
    <RecoilRoot>
      <button
        style={{
          width: "100px",
          position: "fixed",
          bottom: 0,
          right: 0,
          backgroundColor: "transparent",
        }}
        onClick={() => {
          let ref = audioRef.current;
          if (!ref) return;
          setPlaying(ref.paused);
          if (ref.paused) ref.play();
          else ref.pause();
        }}
      >
        <img
          src={
            playing
              ? "https://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg"
              : "https://upload.wikimedia.org/wikipedia/commons/3/3f/Mute_Icon.svg"
          }
        ></img>
      </button>
      <audio
        autoPlay
        loop
        ref={audioRef}
        src="https://vgmsite.com/soundtracks/kahoot-soundtrack/zhcpjslrzb/Ghost%20Mode%20Lobby%20Music.mp3"
      />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
