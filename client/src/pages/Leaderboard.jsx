import React, { useState, useEffect } from 'react'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [error, setError] = useState('')
  const [babies, setBabies] = useState(new Map())

  const fetchBabies = async () => {
    try {
      const response = await fetch(`api/babies`)
      const data = await response.json()
      const babyParentMap = new Map()
      data.forEach(item => {
        babyParentMap.set(item.name, item.user.username)
      })
      setBabies(babyParentMap)
    } catch (error) {
      console.error('There was an error!', error)
      setError('Failed to fetch babies.')
    }
  }

  const fetchLeaders = async () => {
    try {
      const response = await fetch(`api/leaderboard`)
      const data = await response.json()
      setLeaders(data)
    } catch (error) {
      console.error('There was an error!', error)
      setError('Failed to fetch leaderboard.')
    }
  }

  useEffect(() => {
    fetchBabies()
    fetchLeaders()
  }, [])

  const podiumClasses = [
    'w-60 min-h-[300px] bg-amber-500 text-white flex flex-col justify-end items-center p-4',
    'w-60 min-h-[200px] bg-bloo text-white flex flex-col justify-end items-center p-4',
    'w-60 min-h-[100px] bg-pink text-white flex flex-col justify-end items-center p-4',
  ]

  const rankOrder = [1, 0, 2]
  const rankNumbers = [1, 2, 3]
  
  return (
    <div className='bg-dark-gray'>
      <div className="font-sans flex flex-col items-center justify-start min-h-screen p-8  rounded-xl shadow-2xl">
        <h1 className="text-white font-bold text-3xl mb-20">Top Infants</h1>
        {error && <p className='text-red-500'>{error}</p>}
        {leaders.length > 0 && (
          <div className="flex flex-row justify-around w-full items-end mb-4">
            {rankOrder.map(i => {
              const leader = leaders[i]
              return (
                <div key={i} className={`${podiumClasses[i]}`}>
                  <p className="text-5xl">{rankNumbers[i]}</p>
                  <p><strong>Baby Name:</strong> {leader.baby_name}</p>
                  <p><strong>Parent:</strong> {babies.get(leader.baby_name)}</p>
                  <p><strong>Average Score:</strong> {parseFloat(leader.average_score).toFixed(2)}</p>
                </div>
              )
            })}
          </div>
        )}
        <hr className="w-full border-gray-600 my-4"/>
        <div className='flex flex-col justify-center  mb-4'>
        {leaders.slice(3, 10).map((leader, index) => (
          <div key={index + 3} className='p-2 text-gray-300 mb-2'>
            <p><strong>Rank:</strong> {index + 4}</p>
            <p><strong>Baby Name:</strong> {leader.baby_name}</p>
            <p><strong>Parent:</strong> {babies.get(leader.baby_name)}</p>
            <p><strong>Average Score:</strong> {parseFloat(leader.average_score).toFixed(2)}</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Leaderboard

