import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/public/Home"
import Login from "./pages/public/Login"
import { AuthProvider } from "./context/AuthContext"

const App = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App