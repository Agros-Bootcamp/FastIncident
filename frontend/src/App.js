import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/public/Home"
import Login from "./pages/public/Login"
import { AuthProvider } from "./context/AuthContext"
import Register from "./pages/public/Register"
import Recovery from "./pages/public/Recovery"

const App = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recovery" element={<Recovery />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App