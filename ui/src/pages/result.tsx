import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { roundState, scoreState } from "../state";

export const Result = () => {
  const { state } = useLocation();
  const score = useRecoilValue(scoreState);
  const [round, setRound] = useRecoilState(roundState);
  useEffect(() => {
    setRound(0);
  }, []);

  return (
    <>
      {score && (
        <div className="mb-10 text-4xl font-bold">{`Congratulation! You got  ${score} out of 5 correct.`}</div>
      )}

      <Link to="/play" className="text-5xl font-bold">
        play again
      </Link>
    </>
  );
};
