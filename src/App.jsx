import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Question from "./components/question";
import "./app.css";
const url = "https://opentdb.com/api.php?amount=5&type=multiple";

function App() {
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameEnded, setIsGameEnded] = useState(false);

  useEffect(() => {
    data.forEach((obj) => {
      if (obj.isCorrect) {
        setScore((score) => score + 1);
      }
    });
  }, [isGameEnded]);

  async function fetchData() {
    const response = await fetch(url);
    const data = await response.json();
    setData(
      data.results.map((obj) => {
        return { id: nanoid(), isCorrect: false, ...obj };
      })
    );
  }

  function toggle(questionId, correct, answer) {
    setData((prevData) =>
      prevData.map((obj) => {
        return obj.id === questionId
          ? { ...obj, isCorrect: correct === answer }
          : obj;
      })
    );
  }

  function checkAnswers() {
    if (isGameEnded) {
      setIsGameEnded(false);
      fetchData();
    } else {
      setScore(0);
      setIsGameEnded(true);
    }
  }

  return (
    <div className={`app ${isGameEnded ? "done" : ""}`}>
      {data.length > 0 ? (
        <>
          {data.map((obj) => (
            <Question
              key={obj.id}
              data={obj}
              toggle={toggle}
              isGameEnded={isGameEnded}
            />
          ))}
          <div className="score-part">
            {isGameEnded ? (
              <h5 className="score">You scored {score}/5 correct answers</h5>
            ) : (
              ""
            )}
            <button className="check-btn" onClick={checkAnswers}>
              {isGameEnded ? "Play again" : "Check answers"}
            </button>
          </div>
        </>
      ) : (
        <div className="start">
          <h1>Quizzical</h1>
          <p>Chase the High Score and Become a Quiz Champion with Quizzical</p>
          <button onClick={fetchData}>Start quiz</button>
        </div>
      )}
    </div>
  );
}

export default App;
