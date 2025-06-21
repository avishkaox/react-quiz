import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Finish from "./Finish";

const initialState = {
  questions: [],
  //'loading' , 'error' , 'ready' , 'active' , 'finished'
  status: "loading",
  index: 0,
  points: 0,
  selectedAnswer: null,
};
function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "Api didnt fetch data correctly" };
    case "startQuiz":
      return { ...state, status: "active" };
    case "indexInc":
      return { ...state, index: state.index++, selectedAnswer: null };
    case "selectAnswer":
      return {
        ...state,
        points: state.points + action.payload.pointForCorrectAnswer,
        selectedAnswer: action.payload.selected,
      };
    case "finishQuiz":
      return { ...state, status: "finished" };
    case "restartQuiz":
      return {
        ...state,
        status: "ready",
        points: 0,
        selectAnswer: null,
        index: 0,
      };
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [{ questions, status, index, points, selectedAnswer }, dispatch] =
    useReducer(reducer, initialState);

  const numberOfQuestions = questions.length;

  useEffect(function () {
    async function getData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        if (!res.ok) throw new Error("something happened");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
        console.log(data);
      } catch (err) {
        console.error(err.message);
        dispatch({ type: "dataFailed" });
      }
    }
    getData();
  }, []);

  function selectAnswer(pointForCorrectAnswer, selected) {
    dispatch({
      type: "selectAnswer",
      payload: { pointForCorrectAnswer, selected },
    });
  }

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            questionsNumber={numberOfQuestions}
            onClick={() => {
              dispatch({ type: "startQuiz" });
            }}
          />
        )}
        {status === "active" && (
          <Question
            questionsNumber={numberOfQuestions}
            activeQuestion={questions[index]}
            i={index}
            nextQuestion={() => {
              dispatch({ type: "indexInc" });
            }}
            points={points}
            answer={selectAnswer}
            selectedAnswer={selectedAnswer}
            finish={() => {
              dispatch({ type: "finishQuiz" });
            }}
          />
        )}
        {status === "finished" && (
          <Finish
            restartQuiz={() => {
              dispatch({ type: "restartQuiz" });
            }}
            points={points}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
