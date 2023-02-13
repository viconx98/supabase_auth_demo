import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useDatabase } from "../context/DatabaseProvider"

const Signup = () => {
  const { isLoggedIn, isSigningUp, attemptSignUp, signUpError } = useDatabase()

  const navigate = useNavigate()

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const signUp = () => {
    if (!emailRef.current || !passwordRef.current) return
    if (!emailRef.current.value || !passwordRef.current.value) return

    const email = emailRef.current.value
    const password = passwordRef.current.value

    attemptSignUp(email, password)
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true })
    }
  }, [isLoggedIn])

  return (
    <main className="min-h-screen min-w-full bg-stone-900 text-stone-100">
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-96 flex flex-col gap-2">
          <h1 className="text-center text-lg p-4">Supabase Auth Demo</h1>
          <input
            ref={emailRef}
            type="email"
            placeholder="johndoe@gmail.com"
            className="p-2 rounded-sm bg-stone-800"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="A strong password"
            className="p-2 rounded-sm bg-stone-800"
          />

          {signUpError && (
            <p className="mt-4 text-red-500 text-center">{signUpError}</p>
          )}

          {isSigningUp && (
            <div className="w-full h-28 flex justify-center items-center">
              <div className="rounded-full h-6 w-6 bg-blue-500 animate-pulse"></div>
            </div>
          )}

          {!isSigningUp && (
            <>
              <button
                onClick={signUp}
                disabled={isSigningUp}
                className="p-1 disabled:bg-stone-600 bg-blue-500 rounded-sm hover:bg-blue-600 transition-all"
              >
                Signup
              </button>
              <button
                disabled={isSigningUp}
                onClick={() => navigate("/login", { replace: true })}
                className="p-1 text-blue-500 hover:text-blue-600 transition-all"
              >
                Already have an account? Login instead
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default Signup
