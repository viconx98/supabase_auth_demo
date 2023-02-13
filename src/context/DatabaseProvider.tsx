import { createClient, SupabaseClient, User } from "@supabase/supabase-js"
import React, { createContext, useContext, useEffect, useState } from "react"

type TDatabaseContex = {
  client: SupabaseClient
  user: User | null
  isLoggedIn: boolean
  isLoggingIn: boolean
  loginError: string | null
  isSigningUp: boolean
  signUpError: string | null
  attemptLogin: (email: string, password: string) => void
  attemptSignUp: (email: string, password: string) => void
  attemptSignOut: () => void
}

const DatabaseContext = createContext<TDatabaseContex | null>(null)

const DatabaseContextProvider = ({ children }: React.PropsWithChildren) => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)

  const [user, setUser] = useState<User | null>(null)

  const [isLoggedIn, setIsLoggedIn] = useState(user !== null)

  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isSigningUp, setIsSigningUp] = useState(false)

  const [loginError, setLoginError] = useState<string | null>(null)
  const [signUpError, setSignUpError] = useState<string | null>(null)

  const attemptLogin = async (email: string, password: string) => {
    setIsLoggingIn(true)
    setLoginError(null)

    supabase.auth
      .signInWithPassword({ email, password })
      .then((res) => {
        if (res.error) {
          setLoginError(res.error.message)
        } else {
          setUser(res.data.user)
          setIsLoggedIn(true)
          setLoginError(null)
        }
      })
      .finally(() => setIsLoggingIn(false))
  }

  const attemptSignup = async (email: string, password: string) => {
    setIsSigningUp(true)
    setSignUpError(null)

    supabase.auth
      .signUp({ email, password })
      .then((res) => {
        if (res.error) {
          setSignUpError(res.error.message)
        } else {
          setUser(res.data.user)
          setIsLoggedIn(true)
          setSignUpError(null)
        }
      })
      .finally(() => setIsSigningUp(false))
  }

  const attemptSignOut = async () => {
    supabase.auth.signOut().then((res) => {
      setUser(null)
      setIsLoggedIn(false)
    })
  }

  useEffect(() => {
    if (!user) {
      supabase.auth.getUser().then((currentUser) => {
        setUser(currentUser.data.user)
        if (currentUser.data.user) {
          setIsLoggedIn(true)
        }
      })
    }
  }, [user])

  return (
    <DatabaseContext.Provider
      value={{
        client: supabase,
        user,
        isLoggedIn,
        isLoggingIn,
        loginError,
        isSigningUp,
        signUpError,
        attemptLogin,
        attemptSignUp: attemptSignup,
        attemptSignOut,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

export const useDatabase = () => {
  const context = useContext(DatabaseContext)

  if (!context) {
    throw new Error(
      "useDatabase must be used within the DatabaseContextProvider"
    )
  }

  return context
}

export default DatabaseContextProvider
