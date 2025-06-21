
function StartScreen(props) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{props.questionsNumber} question to test your React mastery</h3>
      <button onClick={props.onClick} className="btn btn-ui">Let's Start</button>
    </div>
  );
}
export default StartScreen;
