import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";

const initialState = {
  questions: [],

  //'loading' , 'error' , 'ready' , 'active' , 'finished'
  status: "loading",
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
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

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
        {status === "active" && <p>active</p>}
      </Main>
    </div>
  );
}

export default App;
