import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDatabase } from "../context/DatabaseProvider"

const Home = () => {
  const navigate = useNavigate()
  const { isLoggedIn, attemptSignOut } = useDatabase()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
    }
  }, [isLoggedIn])

  const signOut = () => {
    attemptSignOut()
  }

  return (
    <main className="min-h-screen min-w-full bg-stone-900 text-stone-100">
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1>Welcome, Home!</h1>
        <button
          onClick={signOut}
          className="p-1 text-blue-500 hover:text-blue-600 transition-all"
        >
          Sign out
        </button>
      </div>
    </main>
  )
}

export default Home
