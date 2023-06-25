import React, { useState, useEffect, useRef } from 'react'
import useUserStore from '../hooks/userStore'

function AlphaInfant() {
  const { user } = useUserStore();
  const [babies, setBabies] = useState([]);
  const [babyId, setBabyId] = useState("");
  const [trainData, setTrainData] = useState([{a: "", b: "", c: ""}])
  const [inputData, setInputData] = useState({a: "", b: ""})
  const [prediction, setPrediction] = useState(null)
  const [trainingInfo, setTrainingInfo] = useState({status: '', loss: []});
  const [epochs, setEpochs] = useState(1);
  const splineViewerRef = useRef(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/@splinetool/viewer@0.9.373/build/spline-viewer.js'
    script.type = 'module'
    document.body.appendChild(script)

    const viewer = document.createElement('spline-viewer')
    viewer.url = 'https://prod.spline.design/74VN5bWSAZSe3lZU/scene.splinecode'
    viewer.style.width = '450px' 
    viewer.style.height = '450px' 

    if (splineViewerRef.current) {
      splineViewerRef.current.appendChild(viewer)
    }
    return () => {
      script?.remove()
      viewer?.remove()
    }
  }, [])

  const fetchBabies = async (userId) => {
    const response = await fetch(`http://localhost:5555/api/babies_by_user/${userId}`)
    const data = await response.json()
    setBabies(data)
  }

  useEffect(() => {
    if(user) {
      fetchBabies(user.id)
    }
  }, [user])
  
  const trainModel = async () => {
    try {
      const formattedTrainData = {
        X: trainData.map(item => [parseFloat(item.a), parseFloat(item.b)]),
        Y: trainData.map(item => [parseFloat(item.c)]),
        epochs: epochs, 
      };
      
      const response = await fetch(`api/train_model/${babyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedTrainData)
      });
      const data = await response.json();
      setTrainingInfo({status: data.status, loss: data.loss_per_epoch});
    } catch (err) {
      console.error(err);
      setTrainingInfo({status: 'failed'});
    }
  };
  

  const predictSum = async () => {
    try {
      const parsedData = [parseFloat(inputData.a), parseFloat(inputData.b)]
      const response = await fetch(`api/predict_sum/${babyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: parsedData})
      });
      const data = await response.json()
      setPrediction(data.prediction)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    };
  }, [])

  const handleInputChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value })
  }

  const handleTrainingDataChange = (e, index) => {
    const newTrainData = [...trainData];
    newTrainData[index][e.target.name] = e.target.value
    setTrainData(newTrainData)
  }

  const handleAddTrainingData = () => {
    if (trainData.length < 8) {
      setTrainData([...trainData, {a: "", b: "", c: ""}])
    } else {
      alert('Maximum of 8 training data can be added.')
    }
  }

  const handleRemoveTrainingData = (index) => {
    setTrainData(trainData.filter((item, i) => i !== index));
  }
  
  const handleBabyChange = (e) => {
    setBabyId(e.target.value)
  }

  const handleEpochsChange = (e) => {
    setEpochs(Number(e.target.value));
  }

  return (
    <div className="flex flex-row items-start bg-dark-gray h-screen justify-center">
      <div className="flex flex-col items-center w-1/3 bg-light-gray p-4 m-4 rounded shadow-lg translate-y-12">
        <h2 className='text-off-white font-semibold text-2xl mb-4'>Details</h2>
        <p className='text-off-white font-semibold text-xl'>Status: {trainingInfo.status}</p>
        <p className='text-off-white font-semibold text-xl'>Loss: {trainingInfo.loss.join(', ')}</p>
        <p className='text-off-white font-semibold text-xl'>Epochs: {epochs}</p>
      </div>
      <div className="flex flex-col items-center w-2/3 translate-y-[2rem]">
        <div className="flex flex-col w-1/2 items-start">
          <select id="babySelect" className="bg-gray-300 rounded p-2 m-2 w-full focus:outline-none translate-x-[-.5rem] " onChange={handleBabyChange}>
            <option>Select a baby</option>
            {babies.map(baby => <option key={baby.id} value={baby.id}>{baby.name}</option>)}
          </select>
          <label htmlFor="epochsInput" className='text-white mb-2 translate-x-[8.3rem]'>Epoch:</label>
          <input id="epochsInput" type="number" value={epochs} onChange={handleEpochsChange} className="bg-gray-300 rounded w-16 p-1 mb-4 focus:outline-none translate-x-[7.8rem]" />
        </div>
        <label className='text-white mb-2'>Training Data:</label>
        {trainData.map((item, index) => (
          <div key={index} className="flex justify-center space-x-4 mb-4">
            <input type="number" name="a" value={item.a} onChange={(e) => handleTrainingDataChange(e, index)} className=" bg-gray-300 rounded w-1/6 p-1 focus:outline-none" />
            <span className='text-white'> + </span>
            <input type="number" name="b" value={item.b} onChange={(e) => handleTrainingDataChange(e, index)} className="bg-gray-300 rounded w-1/6 p-1 focus:outline-none" />
            <span className='text-white'> = </span>
            <input type="number" name="c" value={item.c} onChange={(e) => handleTrainingDataChange(e, index)} className="bg-gray-300 rounded w-1/6 p-1 focus:outline-none" />
            <button onClick={() => handleRemoveTrainingData(index)} className=' text-white font-bold hover:text-red-400 '>Remove</button>
          </div>
        ))}
        <button onClick={handleAddTrainingData} className='bg-bloo hover:bg-light-blue text-white font-bold py-2 px-4 rounded m-2'>Add Training Data</button>
        <button className="bg-blue hover:bg-blue-dark bg-pink text-white font-bold py-2 px-4 rounded m-2" onClick={trainModel}>Train Model</button>
      </div>
      <div className="flex flex-col items-center w-1/3 bg-light-gray p-4 m-4 rounded shadow-lg translate-y-12">
        <label className='text-white mb-2'>Testing Data:</label>
        <div className="flex justify-center space-x-4">
          <input name="a" type="number" value={inputData.a} onChange={handleInputChange} className="bg-gray-300 rounded w-1/6 p-1 focus:outline-none" />
          <span className='text-white'> + </span>
          <input name="b" type="number" value={inputData.b} onChange={handleInputChange} className="bg-gray-300 rounded w-1/6 p-1 focus:outline-none" />
        </div>
        <button className="bg-blue hover:bg-blue-dark bg-bloo text-white font-bold py-2 px-4 rounded m-2 hover:bg-light-blue" onClick={predictSum}>Predict Sum</button>
        <p className='font-semibold text-xl'><span className='text-white'>Prediction: </span><span className='text-pink'>{prediction}</span></p>
        <div className=' translate-y-[2rem]' ref={splineViewerRef}></div>
      </div>
    </div>
  );  
}
export default AlphaInfant
