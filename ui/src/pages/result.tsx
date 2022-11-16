import { Link, useLocation, useNavigate } from "react-router-dom";

export const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/");
  }

  return (
    <>
      {state.score && (
        <div className="mb-10 text-4xl font-bold">{`Congratulations! You got  ${state.score} out of ${state.numRounds} correct.`}</div>
      )}

      <Link to="/play" className="text-5xl font-bold">
        Play again
      </Link>
    </>
  );
};
