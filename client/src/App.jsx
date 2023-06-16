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
      const response = await fetch(`api/predict_sum/${babyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: inputData})  // Pass the inputData as prediction data
      });
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setInputData(e.target.value);
    // Assuming inputData is of the format 'a + b = c'
    // Split the inputData and update the trainData
    const [a, , b, , c] = e.target.value.split(' ');
    setTrainData({ X: [[parseFloat(a), parseFloat(b)]], Y: [[parseFloat(c)]] });
     
  }

  return (
    <div>
      <input type="text" placeholder="Baby ID" onChange={e => setBabyId(e.target.value)} />
      <input type="text" placeholder="Input Data" onChange={handleInputChange} />
      <button onClick={trainModel}>Train Model</button>
      <button onClick={predictSum}>Predict Sum</button>
      <p>Prediction: {prediction}</p>
    </div>
  );
}

export default App;
