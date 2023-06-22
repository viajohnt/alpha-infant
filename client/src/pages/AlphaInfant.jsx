import React, { useState, useEffect } from 'react';
import useUserStore from '../hooks/userStore';

function AlphaInfant() {
  const { user } = useUserStore();
  const [babies, setBabies] = useState([]);
  const [babyId, setBabyId] = useState("");
  const [trainData, setTrainData] = useState([{a: "", b: "", c: ""}]);
  const [inputData, setInputData] = useState({a: "", b: ""});
  const [prediction, setPrediction] = useState(null);

  const fetchBabies = async (userId) => {
    const response = await fetch(`http://localhost:5555/api/babies_by_user/${userId}`);
    const data = await response.json();
    setBabies(data);
  }

  useEffect(() => {
    if(user) {
      fetchBabies(user.id);
    }
  }, [user]);
  
  const trainModel = async () => {
    try {
      const formattedTrainData = {
        X: trainData.map(item => [parseFloat(item.a), parseFloat(item.b)]),
        Y: trainData.map(item => [parseFloat(item.c)]),
      };
      
      const response = await fetch(`api/train_model/${babyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedTrainData)
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const predictSum = async () => {
    try {
      const parsedData = [parseFloat(inputData.a), parseFloat(inputData.b)];
      const response = await fetch(`api/predict_sum/${babyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: parsedData})
      });
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  const handleTrainingDataChange = (e, index) => {
    const newTrainData = [...trainData];
    newTrainData[index][e.target.name] = e.target.value;
    setTrainData(newTrainData);
  }

  const handleAddTrainingData = () => {
    setTrainData([...trainData, {a: "", b: "", c: ""}]);
  }

  const handleBabyChange = (e) => {
    setBabyId(e.target.value);
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 h-screen justify-center">
      <select className="border-2 border-blue-500 rounded-lg p-2 m-2" onChange={handleBabyChange}>
        <option>Select a baby</option>
        {babies.map(baby => <option key={baby.id} value={baby.id}>{baby.name}</option>)}
      </select>
      {trainData.map((item, index) => (
        <div key={index}>
          <input name="a" value={item.a} onChange={(e) => handleTrainingDataChange(e, index)} />
          <span> + </span>
          <input name="b" value={item.b} onChange={(e) => handleTrainingDataChange(e, index)} />
          <span> = </span>
          <input name="c" value={item.c} onChange={(e) => handleTrainingDataChange(e, index)} />
        </div>
      ))}
      <button onClick={handleAddTrainingData}>Add Training Data</button>
      <div>
        <input name="a" value={inputData.a} onChange={handleInputChange} />
        <span> + </span>
        <input name="b" value={inputData.b} onChange={handleInputChange} />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={trainModel}>Train Model</button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={predictSum}>Predict Sum</button>
      <p className='text-blue-700 font-semibold text-xl'>Prediction: {prediction}</p>
    </div>
  );
}

export default AlphaInfant;
