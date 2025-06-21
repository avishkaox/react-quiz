import { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";

function App() {
  useEffect(function () {
    async function getData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        if (!res.ok) throw new Error("something happened");
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.error(err.message);
      }
    }
    getData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}

export default App;
