import React from "react";

function Question(props) {
  return (
    <div>
      <p>
        {props.i + 1}/{props.questionsNumber}
      </p>
      <p>{props.points}</p>
      <progress value={props.i + Number(props.selectedAnswer !== null)} max={props.questionsNumber}></progress>
      <h4>{props.activeQuestion.question}</h4>
      <div className="options">
        {props.activeQuestion.options.map((item, index) => (
          <button
            className={`btn btn-option ${
              props.selectedAnswer === index ? "answer" : ""
            } ${
              props.selectedAnswer !== null
                ? index === props.activeQuestion.correctOption
                  ? "correct"
                  : props.selectedAnswer === index
                  ? ""
                  : "wrong"
                : ""
            } `}
            key={index}
            onClick={() => {
              props.answer(
                index === props.activeQuestion.correctOption
                  ? props.activeQuestion.points
                  : 0,
                index
              );
            }}
            disabled={props.selectedAnswer !== null}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="btn-parent">
        {props.i + 1 >= props.questionsNumber ? (
          <button onClick={props.finish} className="btn">
            Finish Quiz
          </button>
        ) : (
          <button onClick={props.nextQuestion} className="btn">
            Next
          </button>
        )}
      </div>
    </div>
  );
}
export default Question;
