import React, {useState, useEffect} from 'react'

function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch('/api/members')
      .then(res => res.json())
      .then(data => {
        setData(data)
        console.log(data)
      })
  }, [])






  return (
    <>
      <h1>React App</h1>
    </>
  )
}

export default App
