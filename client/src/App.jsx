import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "./pages/Header"
import Footer from "./pages/Footer"
import useUserStore from './hooks/userStore'
import './index.css'
export default function App() {

  const {setUser} = useUserStore()

  useEffect(() => {
    fetch("/api/check_session")
    .then(response => {
      if (response.ok)
        return response.json()
      })
    .then(user => setUser(user))}, [])

  return (
      <div>
        <Header />
        <Outlet />
      </div>
  )
}