
import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';

function Upload() {
  const [imageText, setImageText] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes (300 seconds)
  const [timerStarted, setTimerStarted] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const { data: { text } } = await Tesseract.recognize(file, 'eng');
    setImageText(text);
    setTimerStarted(true);
    const extractedQuestions = extractQuestions(text);
    setQuestions(extractedQuestions);
    setSelectedOptions({});
    setScore(null);
  };

  useEffect(() => {
    if (timerStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timerStarted, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmitQuiz();
    }
  }, [timeLeft]);

  const extractQuestions = (text) => {
    // Split the text into lines
    const lines = text.split('\n');
    const questions = [];

    let currentQuestion = {
      question: '',
      options: [],
      correctAnswer: null,
    };

    // Iterate through each line to find questions and options
    lines.forEach((line) => {
      // If the line is not empty, consider it as part of the current question
      if (line.trim() !== '') {
        // If the line ends with a question mark, it's the beginning of a new question
        if (line.trim().endsWith('?')) {
          // Push the current question to the list if it's not empty
          if (currentQuestion.question !== '') {
            questions.push(currentQuestion);
          }
          // Start a new question
          currentQuestion = {
            question: line.trim(),
            options: [],
            correctAnswer: null,
          };
        } else {
          // If the line doesn't end with a question mark, it's an option for the current question
          // Check if the option starts with an asterisk (*) indicating it's the correct answer
          if (line.trim().startsWith('*')) {
            currentQuestion.correctAnswer = line.trim().substring(1);
            currentQuestion.options.push(line.trim().substring(1));
          } else {
            currentQuestion.options.push(line.trim());
          }
        }
      }
    });

    // Push the last question to the list if it's not empty
    if (currentQuestion.question !== '') {
      questions.push(currentQuestion);
    }

    return questions;
  };

  const handleOptionSelect = (questionIndex, option) => {
    setSelectedOptions({ ...selectedOptions, [questionIndex]: option });
  };

  const handleSubmitQuiz = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctAnswer) {
        totalScore++;
      }
    });
    setScore(totalScore);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
        <label className='text-warning'>UploadImageFile </label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          
          {
          // imageText
          //  && (
          //   <>
          //     <h2>Extracted Text:</h2>
          //     <p>{imageText}</p>
          //   </>
          // )
          }
        </div>
        {
        // imageText &&
         (
          <div className="col-md-6">
            <h2>Timer: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</h2>
            {questions.length > 0 &&
             (
              <div>
                <h2>Quiz Questions:</h2>
                <ol>
                  {questions.map((question, index) => (
                    <li key={index}>
                      <h3>{question.question}</h3>
                      <ul>
                        {question.options.map((option, optionIndex) => (
                          <li key={optionIndex}>
                            <label>
                              <input
                                type="radio"
                                value={option}
                                checked={selectedOptions[index] === option}
                                onChange={() => handleOptionSelect(index, option)}
                              />
                              {option}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
                <button className="btn btn-primary text-center" onClick={handleSubmitQuiz}>Submit Quiz</button>
              </div>
            )}
            {score !== null && (
              <div>
                <h2>Quiz Result:</h2>
                <p>Your score: {score} out of {questions.length}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;

