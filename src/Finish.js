import React from "react";

function Finish(props) {
  return (
    <div>
      <p className="result">
        You scored <strong>{props.points}</strong>
      </p>
      <button onClick={props.restartQuiz} className="btn btn-ui">Restart Quiz</button>
    </div>
  );
}

export default Finish;
