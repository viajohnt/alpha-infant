import { useState, useEffect } from "react"
import useUserStore from "../hooks/userStore"
import { Link, useNavigate } from 'react-router-dom'

export default function SignUpForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate()
  const { user, setUser } = useUserStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(password !== passwordConfirmation) {
        setErrorMsg("Password and password confirmation do not match!")
        return
    }
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          username,
          password,
          password_confirmation: passwordConfirmation,
          avatar_url: avatarUrl
        })
      })
      if (response.ok) {
        const user = await response.json()
        setUser(user)
        navigate('/')
      } else {
        const data = await response.json()
        setErrorMsg(data.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])
  

  return (
    <div className="flex items-center justify-center h-screen bg-dark-gray font-dm-sans pt-[8rem]">
      <div className="bg-light-gray rounded-lg shadow-lg p-12 w-full max-w-lg translate-y-[-8rem]">
        <div className="text-3xl text-center text-white rounded-t-lg">SIGN UP</div>
        {errorMsg && <p className="text-red-500 text-center mb-4">{errorMsg}</p>}
        <p className="text-xl text-center text-white pt-3 pb-10">Ready to become a parent?</p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="input mb-4 rounded-sm p-3 bg-white focus:outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="input mb-4 rounded-sm p-3 bg-white focus:outline-none"
          />
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Confirm Password"errorMsg
            required
            className="input mb-4 rounded-sm p-3 bg-white focus:outline-none"
          />
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="Profile Image URL"
            className="input mb-4 rounded-sm p-3 bg-white focus:outline-none"
          />
          <button
            type="submit"
            className="btn btn-primary rounded-full text-white py-2 px-4 bg-bloo mb-10 max-w-[14rem] translate-x-[6rem]"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-white">Already have an account?</p>
        <Link to="/login" className="text-center text-bloo hover:underline block">
          Sign In
        </Link>
      </div>
    </div>
  )
}
