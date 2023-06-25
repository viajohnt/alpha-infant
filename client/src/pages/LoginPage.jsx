import { useState, useEffect } from 'react'
import useUserStore from '../hooks/userStore'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const { user, setUser } = useUserStore()
  const navigate = useNavigate()


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      if (response.ok) {
        const user = await response.json()
        setUser(user)
        navigate('/') 
      } else {
        setLoginError(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    };
  }, [])
  


  return (
    <div className="login-form flex items-center justify-center h-screen bg-dark-gray font-dm-sans pt-[10rem]">
      <div className="bg-light-gray rounded-lg shadow-lg p-12 w-full max-w-lg translate-y-[-8rem]">
        <div className="text-3xl text-center text-white mb-10 pt-2 rounded-t-lg font-bold">LOGIN</div>
        {loginError && (
          <p className="text-red-500 text-center mb-3">
            Invalid username or password
          </p>
        )}
        <p className="text-xl text-center text-white mb-3 pt-3 pb-10">
          Train your AI today!
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            value={username}
            onChange={event => setUsername(event.target.value)}
            placeholder="Username"
            required
            className="input mb-4 rounded-sm p-3 bg-white focus:outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Password"
            required
            className="input mb-4 rounded-sm p-3 bg-white focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full text-white py-2 px-4 bg-bloo max-w-[14rem] translate-x-[6rem] mb-4"
          >
            Login
          </button>
        </form>
        <p className="text-center text-white pt-10">Don't have an account?</p>
        <Link to="/signup" className="text-center text-bloo hover:underline block">
          Sign Up
        </Link>
      </div>
    </div>
  )
}
