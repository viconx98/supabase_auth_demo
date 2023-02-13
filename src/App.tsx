import { BrowserRouter, Routes, Route } from "react-router-dom"
import DatabaseContextProvider from "./context/DatabaseProvider"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  return (
    <DatabaseContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </DatabaseContextProvider>
  )
}

export default App
