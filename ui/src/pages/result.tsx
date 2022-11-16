import { Link, useLocation, useNavigate } from "react-router-dom";

export const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) navigate("/");

  return (
    <>
      <div className="mb-10 text-4xl font-bold">{`Congratulations! You got ${state.correctGuesses} out of ${state.numRounds} with a score of ${state.score}`}</div>
      <Link to="/play" className="text-5xl font-bold">
        Play again
      </Link>
    </>
  );
};
