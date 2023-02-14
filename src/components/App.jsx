import "../style.css";
import Hero from "./Hero";
import Quiz from "./Quiz";
import React from "react";
import data from "../questions.json";

const App = () => {
  const [gameState, setGameState] = React.useState("not started");
  const [questions, setQuestions] = React.useState(() => {
    return data.map((question) => {
      return { ...question, answer: "" };
    });
  });
  const selectAnswer = (id, answer) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, answer: answer } : question
      )
    );
  };
  const checkAnswer = () => {
    const game = questions.every(
      (question) =>
        question.answer !== "" && question.answer === question.correctAnswer
    )
      ? "won"
      : "lost";
    setGameState(game);
  };
  // map data to JSX elements
  const questionElements = questions.map((question) => {
    console.log(question.answer);
    return (
      <Quiz
        id={question.id}
        key={question.id}
        question={question.question}
        answer={question.correctAnswer}
        selectAnswer={selectAnswer}
        options={[...question.incorrectAnswers, question.correctAnswer]}
      />
    );
  });
  const startQuiz = () => {
    setGameState("started");
  };
  let mainElement;
  switch (gameState) {
    case "not started":
      mainElement = <Hero startQuiz={startQuiz} />;
      break;
    case "started":
      mainElement = (
        <div>
          {questionElements}
          <button className='btn btn--check' onClick={checkAnswer}>
            Check answers
          </button>
        </div>
      );
      break;
    case "won":
      mainElement = <h1>You have won</h1>;
      break;
    case "lost":
      mainElement = <h1>You have lost</h1>;
      break;
  }
  return <div className='container flex'>{mainElement}</div>;
};
export default App;
