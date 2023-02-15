import "../style.css";
import React from "react";

const Quiz = (props) => {
  // shuffle options
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  // Define state for options
  const [options, setOptions] = React.useState(() => {
    shuffleArray(props.options);
    return props.options.map((option, index) => {
      return { id: index, value: option, selected: false };
    });
  });

  const selectAnswer = (id) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) => {
        if (option.id === id) {
          props.selectAnswer(props.id, option.value);
          return { ...option, selected: !option.selected };
        }
        return { ...option, selected: false };
      })
    );
  };

  const questionOptions = options.map((option) => {
    let styles = props.gamestate !== "started" ? { opacity: "0.5" } : {};
    if (props.gamestate !== "started" && props.gamestate !== "not started") {
      if (option.value === props.answer) {
        styles = { backgroundColor: "#94D7A2", border: "none", opacity: "1" };
      } else if (option.value !== props.answer && option.selected) {
        styles = { backgroundColor: "#F8BCBC", border: "none", opacity: "0.5" };
      }
    }

    return (
      <li
        className={`answer ${option.selected ? "selected" : ""}`}
        onClick={() => {
          if (props.gamestate === "started") {
            selectAnswer(option.id);
          }
        }}
        style={styles}
      >
        {option.value}
      </li>
    );
  });

  return (
    <div className='quiz'>
      <div className='question'>
        <h2 className='question--text'>{props.question}</h2>
        <ul className='answers flex'>{questionOptions}</ul>
      </div>
    </div>
  );
};
export default Quiz;
