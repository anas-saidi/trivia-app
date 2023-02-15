import "../style.css";
import Hero from "./Hero";
import Quiz from "./Quiz";
import React from "react";
import data from "../questions.json";

const App = () => {
  const [gameState, setGameState] = React.useState({
    state: "not started",
    score: 0,
  });
  const [questions, setQuestions] = React.useState([]);
  // get questions from API ( use setData inside of the async function )
  React.useEffect(() => {
    const getQuestion = async () => {
      const result = await fetch("https://the-trivia-api.com/api/questions");
      const questions = await result.json();
      setQuestions(
        questions.map((question) => {
          return { ...question, answer: "" };
        })
      );
    };
    if (gameState.state === "started") {
      getQuestion();
    }
  }, [gameState.state]);
  // select answer from options
  const selectAnswer = (id, answer) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, answer: answer } : question
      )
    );
  };
  // check all answers at the end of the game
  const checkAnswer = () => {
    const game = questions.every((question) => {
      return (
        question.answer !== "" && question.answer === question.correctAnswer
      );
    })
      ? "won"
      : "lost";
    setGameState({ ...gameState, state: game });
  };

  // map data to JSX elements
  const questionElements = questions.map((question) => {
    return (
      <Quiz
        id={question.id}
        key={question.id}
        question={question.question}
        answer={question.correctAnswer}
        selectAnswer={selectAnswer}
        options={[...question.incorrectAnswers, question.correctAnswer]}
        gamestate={gameState.state}
      />
    );
  });
  // start the game
  const startQuiz = () => {
    setGameState({ state: "started", score: 0 });
  };
  let mainElement;
  switch (gameState.state) {
    case "not started":
      mainElement = <Hero startQuiz={startQuiz} />;
      break;
    case "started":
      mainElement = (
        <div className='question--section'>
          {questionElements}
          <button className='btn btn--check' onClick={checkAnswer}>
            Check answers
          </button>
        </div>
      );
      break;
    case "won":
      mainElement = <h1 className='winning-msg'>You have won 🎊🎉 </h1>;
      break;
    case "lost":
      mainElement = (
        <div className='question--section'>
          {questionElements}
          <button className='btn btn--check' onClick={startQuiz}>
            New Game
          </button>
        </div>
      );
      break;
  }
  // render elements conditionally
  return <div className='container flex'>{mainElement}</div>;
};
export default App;
