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
    return (
      <li
        className={`answer ${option.selected ? "selected" : ""}`}
        onClick={() => {
          selectAnswer(option.id);
        }}
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
