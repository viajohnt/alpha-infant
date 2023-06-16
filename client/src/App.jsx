import React, { useState } from 'react';

function App() {
  const [babyId, setBabyId] = useState("");
  const [trainData, setTrainData] = useState({X: [], Y: []});
  const [inputData, setInputData] = useState('');
  const [prediction, setPrediction] = useState(null);

  const trainModel = async () => {
    try {
      const response = await fetch(`api/train_model/${babyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(trainData)
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const predictSum = async () => {
    try {
      // Parse inputData to an array of numbers
      const parsedData = inputData.split('+').map(x => parseFloat(x));
      const response = await fetch(`api/predict_sum/${babyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: parsedData})  // Pass the parsed inputData as prediction data
      });
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (err) {
      console.error(err);
    }
  };
  

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  }

  const handleTrainingDataChange = (e) => {
    const lines = e.target.value.split('\n');
    const X = [];
    const Y = [];
    for (let line of lines) {
      const [a, , b, , c] = line.split(' ');
      X.push([parseFloat(a), parseFloat(b)]);
      Y.push([parseFloat(c)]);
    }
    setTrainData({ X, Y });
  }

  return (
    <div>
      <input type="text" placeholder="Baby ID" onChange={e => setBabyId(e.target.value)} />
      <textarea placeholder="Training Data" onChange={handleTrainingDataChange} />
      <input type="text" placeholder="Input Data" onChange={handleInputChange} />
      <button onClick={trainModel}>Train Model</button>
      <button onClick={predictSum}>Predict Sum</button>
      <p>Prediction: {prediction}</p>
    </div>
  );
}

export default App;
