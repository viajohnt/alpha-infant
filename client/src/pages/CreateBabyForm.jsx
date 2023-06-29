import React, { useState, useEffect } from 'react'
import useUserStore from '../hooks/userStore'

function CreateBabyForm() {
  const { user } = useUserStore()
  const [name, setName] = useState('')
  const [favoriteFood, setFavoriteFood] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await fetch('/api/babies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          user_id: user.id,
          favorite_food: favoriteFood,
          avatar_url: avatarUrl,
        }),
      })
      if (response.status === 201) {
        const responseData = await response.json()
        alert(`Baby ${responseData.name} created successfully with model path: ${responseData.model_path}`)
        setName('')
        setFavoriteFood('')
        setAvatarUrl('')
      } else {
        const responseData = await response.json()
        alert(responseData.error || 'Error creating baby')
      }
    } catch (error) {
      console.error(error)
      alert('Error creating baby')
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="form-container flex items-center justify-center h-screen bg-dark-gray font-dm-sans pt-[10rem]">
      <div className="form-content bg-light-gray rounded-lg shadow-lg p-12 w-full max-w-lg translate-y-[-8rem]">
        <div className="text-3xl text-center text-white mb-10 pt-2 rounded-t-lg font-bold">Create Baby</div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder="Baby Name"
            required
            className="input mb-4 rounded-sm p-3 bg-white focus:outline-none"
          />
          <input
            type="text"
            value={favoriteFood}
            onChange={event => setFavoriteFood(event.target.value)}
            placeholder="Favorite Food"
            required
            className="input mb-4 rounded-sm p-3 bg-white focus:outline-none"
          />
          <input
            type="text"
            value={avatarUrl}
            onChange={event => setAvatarUrl(event.target.value)}
            placeholder="Baby Photo URL"
            required
            className="input mb-4 rounded-sm p-3 bg-white focus:outline-none"
          />
          <button
            type="submit"
            className="submit-button rounded-full text-white py-2 px-4 bg-bloo max-w-[14rem] translate-x-[6rem] mb-4"
          >
            Create Baby
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateBabyForm
