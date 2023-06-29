import React, { useState, useEffect } from "react"
import useUserStore from "../hooks/userStore"

function Settings() {
  const { user, setUser } = useUserStore()
  const [babies, setBabies] = useState([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedBabyId, setSelectedBabyId] = useState(null)
  const [userData, setUserData] = useState({
    avatar_url: user?.avatar_url || '',
  })

  const fetchBabies = async (userId) => {
    const response = await fetch(`http://localhost:5555/api/babies_by_user/${userId}`)
    const data = await response.json()
    setBabies(data)
  }

  const deleteBaby = async (babyId) => {
    await fetch(`http://localhost:5555/api/babies/${babyId}`, {
      method: "DELETE",
    })
    fetchBabies(user.id)
  }

  function getUser(userId) {
    fetch(`api/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data)
        setUserData({
          avatar_url: data.avatar_url || '',
        })
      })
      .catch((error) => {})
  }

  function updateUser(userId, userData) {
    fetch(`api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data)
        setUserData({
          avatar_url: data.avatar_url || '',
        })
      })
      .catch((error) => {})
  }

  useEffect(() => {
    if (user && user.id) {
      getUser(user.id)
    }
  }, [])

  useEffect(() => {
    if (user && user.id) {
      fetchBabies(user.id)
    }
  }, [user])

  const handleInputChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateUser(user.id, userData)
  }

  const openConfirm = (babyId) => {
    setSelectedBabyId(babyId)
    setShowConfirm(true)
  }

  const closeConfirm = () => {
    setShowConfirm(false)
    setSelectedBabyId(null)
  }
  
  const confirmDelete = () => {
    deleteBaby(selectedBabyId)
    closeConfirm()
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="flex items-center justify-center h-screen bg-dark-gray font-dm-sans pt-4">
      <div className="bg-light-gray rounded-lg shadow-lg p-12 w-full max-w-lg translate-y-[-8rem]">
        <div className="text-3xl text-center mb-10 pt-2 rounded-t-lg font-bold text-white">
          Settings
        </div>
  
        <form onSubmit={handleSubmit} className="flex flex-col mb-6">
          <label className="text-white mb-2">Avatar URL</label>
          <input
            type="text"
            name="avatar_url"
            value={userData.avatar_url}
            onChange={handleInputChange}
            className="input text-black mb-4 rounded-sm p-4 bg-white focus:outline-none"
          />
          <button
            type="submit"
            className="btn btn-primary rounded-lg text-white py-2 px-4 bg-bloo mb-8 max-w-[10rem] translate-x-[8rem] "
          >
            Save Changes
          </button>
        </form>
  
        <div className="mb-4">
          <h2 className="text-2xl text-white">Baby List:</h2>
          <div className="divide-y divide-gray-200">
            {babies.map((baby) => (
              <div key={baby.id} className="flex justify-between py-4">
                <span className="text-white">{baby.name}</span>
                <button onClick={() => openConfirm(baby.id)} className="text-red-500 hover:text-red-700">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-10 translate-y-[2rem]">
            <div className="bg-darker-gray p-4 rounded shadow-lg text-white">
              <p>Are you sure you want to KILL this child?</p>
              <div className="mt-4 flex justify-end">
                <button onClick={closeConfirm} className="mr-2">Cancel</button>
                <button onClick={confirmDelete} className="text-red-500">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )  
}

export default Settings
