import "../style.css";
const Hero = (props) => {
  return (
    <div className='hero'>
      <h1 className='hero--title'>Welcome to Trivia</h1>
      <p className='hero--text'>Let's test your knowledge of Trivia</p>
      <button className='btn hero--btn' onClick={props.startQuiz}>
        Start Quiz
      </button>
    </div>
  );
};
export default Hero;
