// // // // import React, { useState, useEffect } from 'react';
// // // // import { PDFDocument, StandardFonts, Worker } from 'pdfjs-dist/webpack';
// // // // import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';




// // // // function Upload() {
// // // //   return (
// // // //     <div>
// // // //         <center>
// // // //         <h3 className='text-center '>Convert PDF to Quiz</h3>

// // // //         <p className='text-center'>Convert PDF to Quiz with a single click. Enter PDF URL and we will convert it to Quiz for you.</p>


// // // //         </center>
        
// // // //     </div>
// // // //   )
// // // // }

// // // // export default Upload

// // // import React from 'react'
// // // import Tesseract from 'tesseract.js'
// // // import { useState } from 'react'



// // // function Upload() {
    

// // //     let [image,setImage]=useState(null)
// // //     let [text,setText]=useState(null)


// // //     const handleChange=(e)=>{
// // //         const image=e.target.files[0];
// // //         setImage(image)
// // //         console.log(image)
// // //     }

// // //     const handleImagetoText=async()=>{
        
// // //     }

// // //   return (
// // //     <div>
// // //          <center>
// // //          <h3 className='text-center '>Convert PDF to Quiz</h3>

// // //          <p className='text-center'>Convert PDF to Quiz with a single click. Enter PDF URL and we will convert it to Quiz for you.</p>
        

// // //          <h1>ImText</h1>
// // //       <p>Gets words in image!</p>
// // //       <div className="input-wrapper">
// // //         <label htmlFor="upload">Upload Image</label>
// // //         <input type="file" id="upload" accept='image/*' onChange={handleChange} />
// // //       </div>


// // //     <button onClick={handleImagetoText} className='text-center'>convert image to text</button>

// // //     <div>{text&&<p>{text}</p>}</div>
      

// // //         </center>
// // //     </div>
// // //   )
// // // }

// // // export default Upload



// // // // const { request } = require('express')
// // // // const express=require('/express')
// // // // const fileUpload=require('express-fileupload')
// // // // const pdfParse=require('pdf-parse')


// // // // const app=express()


// // // // app.use('/',express.static('public'))

// // // // app.post('/extract-txt',(req,res)=>{

// // // //   if(!req.files && !req.files.pdfFile){
// // // //     res.status(400)
// // // //     res.end()
// // // //   }

// // // //   pdfParse(req.files.pdfFile)
// // // //   .then(result=>{
// // // //     res.send(result.text)
// // // //   })

// // // // })

// // // // app.use(fileUpload())



// // import React, { useState } from 'react';
// // import Tesseract from 'tesseract.js';

// // function Upload() {
// //     let [image, setImage] = useState(null);
// //     let [text, setText] = useState(null);

// //     const handleChange = (e) => {
// //         const image = e.target.files[0];
// //         setImage(image);
// //     };

// //     const handleImagetoText = async () => {
// //         // Implement Tesseract OCR logic here
// //     };

// //     return (
// //         <div className='container' style={{ margin: '50px auto', maxWidth: '800px', color: '#333' }}>
// //             <h3 className="text-center" style={{ color: '#007bff' }}>Convert PDF to Quiz</h3>
// //             <p className="text-center" style={{ color: '#ff7f50' }}>
// //                 Convert PDF to Quiz with a single click. Enter PDF URL and we will convert it to Quiz for you.
// //             </p>

// //             <div style={{ textAlign: 'center', marginTop: '20px' }}>
// //                 {/* <h1 style={{ color: '#20c997' }}>ImText</h1> */}
// //                 <p style={{ color: '#f8c427' }}>Gets words in image!</p>
// //                 <div>
// //                     <label htmlFor="upload" style={styles.customFileUpload}>
// //                         Upload Image
// //                     </label>
// //                     <input type="file" id="upload" accept="image/*" onChange={handleChange} style={styles.fileInput} />
// //                 </div>

// //                 <button onClick={handleImagetoText} className="btn btn-primary" style={{ marginTop: '10px', backgroundColor: '#6c757d' }}>
// //                     Convert Image to Text
// //                 </button>

// //                 <div>{text && <p style={{ color: '#dc3545' }}>{text}</p>}</div>
// //             </div>
// //         </div>
// //     );
// // }

// // const styles = {
// //     customFileUpload: {
// //         border: '1px solid #ccc',
// //         display: 'inline-block',
// //         padding: '6px 12px',
// //         cursor: 'pointer',
// //         backgroundColor: '#007bff',
// //         color: '#fff',
// //         borderRadius: '5px',
// //     },
// //     fileInput: {
// //         display: 'none',
// //     },
// // };


// // export default Upload;


// import React, { useState } from 'react';
// import Tesseract from 'tesseract.js';

// function Upload() {
//   const [imageText, setImageText] = useState('');
//   const [questions, setQuestions] = useState([]);

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     const { data: { text } } = await Tesseract.recognize(file, 'eng');
//     setImageText(text);
//     const extractedQuestions = extractQuestions(text);
//     setQuestions(extractedQuestions);
//   };

//   const extractQuestions = (text) => {
//     // Split the text into lines
//     const lines = text.split('\n');
//     const questions = [];

//     let currentQuestion = {
//       question: '',
//       options: [],
//     };

//     // Iterate through each line to find questions and options
//     lines.forEach((line) => {
//       // If the line is not empty, consider it as part of the current question
//       if (line.trim() !== '') {
//         // If the line ends with a question mark, it's the beginning of a new question
//         if (line.trim().endsWith('?')) {
//           // Push the current question to the list if it's not empty
//           if (currentQuestion.question !== '') {
//             questions.push(currentQuestion);
//           }
//           // Start a new question
//           currentQuestion = {
//             question: line.trim(),
//             options: [],
//           };
//         } else {
//           // If the line doesn't end with a question mark, it's an option for the current question
//           currentQuestion.options.push(line.trim());
//         }
//       }
//     });

//     // Push the last question to the list if it's not empty
//     if (currentQuestion.question !== '') {
//       questions.push(currentQuestion);
//     }

//     return questions;
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       <div>
//         <h2>Extracted Text:</h2>
//         <p>{imageText}</p>
//       </div>
//       <div>
//         <h2>Extracted Questions:</h2>
//         <ul>
//           {questions.map((question, index) => (
//             <li key={index}>
//               <h3>{question.question}</h3>
//               <ul>
//                 {question.options.map((option, optionIndex) => (
//                   <li key={optionIndex}>{option}</li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Upload;


// import React, { useState } from 'react';
// import Tesseract from 'tesseract.js';

// function Upload() {
//   const [imageText, setImageText] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [score, setScore] = useState(null);

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     const { data: { text } } = await Tesseract.recognize(file, 'eng');
//     setImageText(text);
//     const extractedQuestions = extractQuestions(text);
//     setQuestions(extractedQuestions);
//     setSelectedOptions({});
//     setScore(null);
//   };

//   const extractQuestions = (text) => {
//     // Split the text into lines
//     const lines = text.split('\n');
//     const questions = [];

//     let currentQuestion = {
//       question: '',
//       options: [],
//       correctAnswer: null,
//     };

//     // Iterate through each line to find questions and options
//     lines.forEach((line) => {
//       // If the line is not empty, consider it as part of the current question
//       if (line.trim() !== '') {
//         // If the line ends with a question mark, it's the beginning of a new question
//         if (line.trim().endsWith('?')) {
//           // Push the current question to the list if it's not empty
//           if (currentQuestion.question !== '') {
//             questions.push(currentQuestion);
//           }
//           // Start a new question
//           currentQuestion = {
//             question: line.trim(),
//             options: [],
//             correctAnswer: null,
//           };
//         } else {
//           // If the line doesn't end with a question mark, it's an option for the current question
//           // Check if the option starts with an asterisk (*) indicating it's the correct answer
//           if (line.trim().startsWith('*')) {
//             currentQuestion.correctAnswer = line.trim().substring(1);
//             currentQuestion.options.push(line.trim().substring(1));
//           } else {
//             currentQuestion.options.push(line.trim());
//           }
//         }
//       }
//     });

//     // Push the last question to the list if it's not empty
//     if (currentQuestion.question !== '') {
//       questions.push(currentQuestion);
//     }

//     return questions;
//   };

//   const handleOptionSelect = (questionIndex, option) => {
//     setSelectedOptions({ ...selectedOptions, [questionIndex]: option });
//   };

//   const handleSubmitQuiz = () => {
//     let totalScore = 0;
//     questions.forEach((question, index) => {
//       if (selectedOptions[index] === question.correctAnswer) {
//         totalScore++;
//       }
//     });
//     setScore(totalScore);
//   };

//   return (
    // <div>
    //   <input type="file" accept="image/*" onChange={handleImageUpload} />
    //   <div>
    //     <h2>Extracted Text:</h2>
    //     <p>{imageText}</p>
    //   </div>
    //   {questions.length > 0 && (
    //     <div>
    //       <h2>Quiz Questions:</h2>
    //       <ol>
    //         {questions.map((question, index) => (
    //           <li key={index}>
    //             <h3>{question.question}</h3>
    //             <ul>
    //               {question.options.map((option, optionIndex) => (
    //                 <li key={optionIndex}>
    //                   <label>
    //                     <input
    //                       type="radio"
    //                       value={option}
    //                       checked={selectedOptions[index] === option}
    //                       onChange={() => handleOptionSelect(index, option)}
    //                     />
    //                     {option}
    //                   </label>
    //                 </li>
    //               ))}
    //             </ul>
    //           </li>
    //         ))}
    //       </ol>
    //       <button onClick={handleSubmitQuiz}>Submit Quiz</button>
    //     </div>
    //   )}
    //   {score !== null && (
    //     <div>
    //       <h2>Quiz Result:</h2>
    //       <p>Your score: {score} out of {questions.length}</p>
    //     </div>
    //   )}
    // </div>
//   );
// }

// export default Upload;

// import React, { useState } from 'react';
// import Tesseract from 'tesseract.js';

// function Upload() {
//   const [imageText, setImageText] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [score, setScore] = useState(null);

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     const { data: { text } } = await Tesseract.recognize(file, 'eng');
//     setImageText(text);
//     const extractedQuestions = extractQuestions(text);
//     setQuestions(extractedQuestions);
//     setSelectedOptions({});
//     setScore(null);
//   };

//   const extractQuestions = (text) => {
//     // Split the text into lines
//     const lines = text.split('\n');
//     const questions = [];

//     let currentQuestion = {
//       question: '',
//       options: [],
//       correctAnswer: null,
//     };

//     // Iterate through each line to find questions and options
//     lines.forEach((line) => {
//       // If the line is not empty, consider it as part of the current question
//       if (line.trim() !== '') {
//         // If the line ends with a question mark, it's the beginning of a new question
//         if (line.trim().endsWith('?')) {
//           // Push the current question to the list if it's not empty
//           if (currentQuestion.question !== '') {
//             questions.push(currentQuestion);
//           }
//           // Start a new question
//           currentQuestion = {
//             question: line.trim(),
//             options: [],
//             correctAnswer: null,
//           };
//         } else {
//           // If the line doesn't end with a question mark, it's an option for the current question
//           // Check if the option starts with an asterisk (*) indicating it's the correct answer
//           if (line.trim().startsWith('*')) {
//             currentQuestion.correctAnswer = line.trim().substring(1);
//             currentQuestion.options.push(line.trim().substring(1));
//           } else {
//             currentQuestion.options.push(line.trim());
//           }
//         }
//       }
//     });

//     // Push the last question to the list if it's not empty
//     if (currentQuestion.question !== '') {
//       questions.push(currentQuestion);
//     }

//     return questions;
//   };

//   const handleOptionSelect = (questionIndex, option) => {
//     setSelectedOptions({ ...selectedOptions, [questionIndex]: option });
//   };

//   const handleSubmitQuiz = () => {
//     let totalScore = 0;
//     questions.forEach((question, index) => {
//       if (selectedOptions[index] === question.correctAnswer) {
//         totalScore++;
//       }
//     });
//     setScore(totalScore);
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       <div>
//         <h2>Extracted Text:</h2>
//         <p>{imageText}</p>
//       </div>
//       {questions.length > 0 && (
//         <div>
//           <h2>Quiz Questions:</h2>
//           <ol>
//             {questions.map((question, index) => (
//               <li key={index}>
//                 <h3>{question.question}</h3>
//                 <ul>
//                   {question.options.map((option, optionIndex) => (
//                     <li key={optionIndex}>
//                       <label>
//                         <input
//                           type="radio"
//                           value={option}
//                           checked={selectedOptions[index] === option}
//                           onChange={() => handleOptionSelect(index, option)}
//                         />
//                         {option}
//                       </label>
//                     </li>
//                   ))}
//                 </ul>
//               </li>
//             ))}
//           </ol>
//           <button onClick={handleSubmitQuiz}>Submit Quiz</button>
//         </div>
//       )}
//       {score !== null && (
//         <div>
//           <h2>Quiz Result:</h2>
//           <p>Your score: {score} out of {questions.length}</p>
//         </div>
//       )}
//     </div>
//   );
// }
// works

// export default Upload;


// import React, { useState } from 'react';
// import Tesseract from 'tesseract.js';
// import * as pdfjsLib from 'pdfjs-dist';

// function Upload() {
//   const [imageText, setImageText] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [score, setScore] = useState(null);

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (file.type.startsWith('image/')) {
//       const { data: { text } } = await Tesseract.recognize(file, 'eng');
//       setImageText(text);
//       const extractedQuestions = extractQuestions(text);
//       setQuestions(extractedQuestions);
//       setSelectedOptions({});
//       setScore(null);
//     } else if (file.type === 'application/pdf') {
//       const text = await extractTextFromPDF(file);
//       setImageText(text);
//       const extractedQuestions = extractQuestions(text);
//       setQuestions(extractedQuestions);
//       setSelectedOptions({});
//       setScore(null);
//     } else {
//       console.error('Unsupported file type');
//     }
//   };

//   const extractTextFromPDF = async (file) => {
//     const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(file));
//     const pdf = await loadingTask.promise;
//     const pageCount = pdf.numPages;
//     let text = '';
//     for (let i = 1; i <= pageCount; i++) {
//       const page = await pdf.getPage(i);
//       const pageText = await page.getTextContent();
//       text += pageText.items.map(item => item.str).join('\n') + '\n';
//     }
//     return text;
//   };

//   const extractQuestions = (text) => {
//     // Split the text into lines
//     const lines = text.split('\n');
//     const questions = [];

//     let currentQuestion = {
//       question: '',
//       options: [],
//       correctAnswer: null,
//     };

//     // Iterate through each line to find questions and options
//     lines.forEach((line) => {
//       // If the line is not empty, consider it as part of the current question
//       if (line.trim() !== '') {
//         // If the line ends with a question mark, it's the beginning of a new question
//         if (line.trim().endsWith('?')) {
//           // Push the current question to the list if it's not empty
//           if (currentQuestion.question !== '') {
//             questions.push(currentQuestion);
//           }
//           // Start a new question
//           currentQuestion = {
//             question: line.trim(),
//             options: [],
//             correctAnswer: null,
//           };
//         } else {
//           // If the line doesn't end with a question mark, it's an option for the current question
//           // Check if the option starts with an asterisk (*) indicating it's the correct answer
//           if (line.trim().startsWith('*')) {
//             currentQuestion.correctAnswer = line.trim().substring(1);
//             currentQuestion.options.push(line.trim().substring(1));
//           } else {
//             currentQuestion.options.push(line.trim());
//           }
//         }
//       }
//     });

//     // Push the last question to the list if it's not empty
//     if (currentQuestion.question !== '') {
//       questions.push(currentQuestion);
//     }

//     return questions;
//   };

//   const handleOptionSelect = (questionIndex, option) => {
//     setSelectedOptions({ ...selectedOptions, [questionIndex]: option });
//   };

//   const handleSubmitQuiz = () => {
//     let totalScore = 0;
//     questions.forEach((question, index) => {
//       if (selectedOptions[index] === question.correctAnswer) {
//         totalScore++;
//       }
//     });
//     setScore(totalScore);
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*, application/pdf" onChange={handleImageUpload} />
//       <div>
//         <h2>Extracted Text:</h2>
//         <p>{imageText}</p>
//       </div>
//       {questions.length > 0 && (
//         <div>
//           <h2>Quiz Questions:</h2>
//           <ol>
//             {questions.map((question, index) => (
//               <li key={index}>
//                 <h3>{question.question}</h3>
//                 <ul>
//                   {question.options.map((option, optionIndex) => (
//                     <li key={optionIndex}>
//                       <label>
//                         <input
//                           type="radio"
//                           value={option}
//                           checked={selectedOptions[index] === option}
//                           onChange={() => handleOptionSelect(index, option)}
//                         />
//                         {option}
//                       </label>
//                     </li>
//                   ))}
//                 </ul>
//               </li>
//             ))}
//           </ol>
//           <button onClick={handleSubmitQuiz}>Submit Quiz</button>
//         </div>
//       )}
//       {score !== null && (
//         <div>
//           <h2>Quiz Result:</h2>
//           <p>Your score: {score} out of {questions.length}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Upload;
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

