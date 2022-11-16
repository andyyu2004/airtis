import { Link, useLocation } from "react-router-dom";

export const Result = () => {
  const { state } = useLocation();

  return (
    <>
      {state && (
        <div className="mb-10 text-4xl font-bold">{`You ${state.result}`}</div>
      )}
      <Link to="/play" className="text-5xl font-bold">
        play again
      </Link>
    </>
  );
};
