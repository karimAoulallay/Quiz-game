import React, { useEffect, useState } from "react";
import { decode } from "html-entities";

function Question(props) {
  const [buttons, setButtons] = useState([]);
  const [choice, setchoice] = useState("");
  const [style, setStyle] = useState("");

  useEffect(() => {
    setButtons(
      [props.data.correct_answer, ...props.data.incorrect_answers].sort(
        (a, b) => 0.5 - Math.random()
      )
    );
  }, []);

  function handleChoice(e) {
    if (!props.isGameEnded) {
      setchoice(e.target.name);
      props.toggle(
        props.data.id,
        decode(props.data.correct_answer),
        e.target.name
      );
    }
  }

  return (
    <div className="question">
      <h2>{decode(props.data.question)}</h2>
      <div className="answers">
        {buttons.map((q) => {
          let style = "";

          if (
            decode(q) === choice &&
            decode(q) === decode(props.data.correct_answer)
          ) {
            style = "active correct";
          } else if (
            decode(q) === choice &&
            decode(q) !== decode(props.data.correct_answer)
          ) {
            style = "active incorrect";
          } else if (decode(q) === decode(props.data.correct_answer)) {
            style = "correct";
          } else {
            style = "";
          }

          return (
            <button
              key={decode(q)}
              name={decode(q)}
              onClick={handleChoice}
              className={style}
            >
              {decode(q)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Question;
