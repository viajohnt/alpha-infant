import React, { useState, useEffect } from 'react'
import useUserStore from '../hooks/userStore'

function Quiz() {
  const { user } = useUserStore()
  const [babies, setBabies] = useState([])
  const [babyId, setBabyId] = useState("")
  const [quizQuestions, setQuizQuestions] = useState([])
  const [quizResults, setQuizResults] = useState([])
  const [quizError, setQuizError] = useState('')
  const [babyError, setBabyError] = useState('')
  const [selectedBaby, setSelectedBaby] = useState(null);

  useEffect(() => {
    if(user) {
      fetchBabies(user.id)
    }
  }, [user])

  useEffect(() => {
    generateQuizQuestions()
  }, [])

  const fetchBabies = async (userId) => {
    const response = await fetch(`http://localhost:5555/api/babies_by_user/${userId}`)
    const data = await response.json()
    setBabies(data)
  }

  const handleBabyChange = (e) => {
    setBabyId(e.target.value)
  }

  const validateQuiz = () => {
    let error = false;

    if (!babyId) {
      setBabyError('Selecting a baby is required.');
      error = true;
    } else {
      setBabyError('');
    }

    return !error;
  }

  const generateQuizQuestions = () => {
    let questions = [];
    for (let i = 0; i < 5; i++) {
      let a = Math.round(Math.random() * 100);
      let b = Math.round(Math.random() * 100);
      questions.push({a: a, b: b});
    }
    setQuizQuestions(questions);
  }

  const startQuiz = async () => {
    if (!validateQuiz()) {
      return;
    }

    try {
      let results = [];
      for (let question of quizQuestions) {
        const response = await fetch(`api/predict_sum/${babyId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: [question.a, question.b] }),
        });
        const data = await response.json();
        results.push({question: question, prediction: data.prediction});
      }
      setQuizResults(results);
    } catch (err) {
      console.error(err);
    }
  };

return (
    <div className="flex flex-row items-start bg-dark-gray h-screen justify-center py-10">
        <div className="flex flex-col items-center w-1/3 bg-light-gray p-8 m-4 rounded-xl shadow-2xl">
            <h1 className="text-off-white font-bold text-3xl mb-4">Quiz</h1>
            <select id="babySelect" className="bg-gray-300 rounded p-2 m-2 w-full focus:outline-none" onChange={handleBabyChange}>
                <option>Select a baby</option>
                {babies.map(baby => <option key={baby.id} value={baby.id}>{baby.name}</option>)}
            </select>
            {babyError && <p className='text-red-500'>{babyError}</p>}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={startQuiz}>Start Quiz</button>
        </div>
        <div className="flex flex-col items-center w-2/3 bg-light-gray p-8 m-4 rounded-xl shadow-2xl">
            {quizResults.length > 0 ? quizResults.map((result, index) => (
                <div key={index} className='p-2 border border-gray-200 rounded mb-4 text-gray-300 w-full'>
                    <p><strong>Question:</strong> {result.question.a} + {result.question.b}</p>
                    <p><strong>Prediction:</strong> {result.prediction}</p>
                </div>
            )) :
            quizQuestions.map((question, index) => (
                <div key={index} className='p-2 border border-gray-200 rounded mb-4 text-gray-300 w-full'>
                    <p><strong>Question {index + 1}:</strong> {question.a} + {question.b}</p>
                </div>
            ))}
        </div>
    </div>
);
}

export default Quiz;
