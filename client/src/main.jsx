import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom"
import App from './App'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ErrorPage from './pages/ErrorPage'
import AlphaInfant from './pages/AlphaInfant'
import CreateBabyForm from './pages/CreateBabyForm'
import Quiz from './pages/Quiz'
import Leaderboard from './pages/Leaderboard'
import Settings from './pages/Settings'
import Home from './pages/Home'
import About from './pages/About'
import './index.css'

const router = createBrowserRouter(createRoutesFromElements(
  <Route
    id="root"
    element={<App />}
    errorElement={<ErrorPage />}
  >
    <Route
      id="home"
      path="/"
      element={<Home />}
    />
    <Route
      id="about"
      path="/about"
      element={<About />}
    />
    <Route
      id="alpha-infant"
      path="/alpha-infant"
      element={<AlphaInfant />}
    />
    <Route
      id="create-baby"
      path="/create-baby"
      element={<CreateBabyForm />}
    />
    <Route
      id="ai-quiz"
      path="/ai-quiz"
      element={<Quiz />}
    />
    <Route
      id="leaderboard"
      path="/leaderboard"
      element={<Leaderboard />}
    />
    <Route
      id="settings"
      path="/settings"
      element={<Settings />}
    />
    <Route
      id="login"
      path="/login"
      element={<LoginPage />}
    />
    <Route
      id="signup"
      path="/signup"
      element={<SignUpPage />}
    />
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)