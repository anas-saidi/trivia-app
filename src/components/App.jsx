import "../style.css";
import Hero from "./Hero";
import Quiz from "./Quiz";
import React from "react";
import data from "../questions.json";
import ReactLoading from "react-loading";

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
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
      setIsLoading(false);
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
    questions.forEach((question) => {
      if (question.answer === question.correctAnswer) {
        setGameState((prevGame) => {
          return { ...prevGame, score: prevGame.score + 1 };
        });
      }
    });
    const game = questions.every((question) => {
      return (
        question.answer !== "" && question.answer === question.correctAnswer
      );
    })
      ? "won"
      : "lost";
    setGameState((prevGame) => {
      return { ...prevGame, state: game };
    });
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
    setIsLoading(true);
  };
  let mainElement;
  switch (gameState.state) {
    case "not started":
      mainElement = <Hero startQuiz={startQuiz} />;
      break;
    case "started":
      mainElement = (
        <div className='question--section'>
          {isLoading && (
            <div className='loading'>
              <ReactLoading type={"spin"} color={"blue"} />
            </div>
          )}
          {questionElements}
          <button className='btn btn--check' onClick={checkAnswer}>
            Check answers
          </button>
        </div>
      );
      break;
    case "won":
      mainElement = (
        <div className='question--section'>
          {questionElements}
          <h1 className='result'>{`Your current score is ${gameState.score}/${questions.length}`}</h1>
          <button className='btn btn--check' onClick={startQuiz}>
            New Game
          </button>
        </div>
      );
      break;
    case "lost":
      mainElement = (
        <div className='question--section'>
          {questionElements}
          <h1 className='result'>{`Your current score is ${gameState.score}/${questions.length}`}</h1>
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
