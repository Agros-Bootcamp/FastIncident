import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/public/Home"
import Login from "./pages/public/Login"
import Register from "./pages/public/Register"
import Recovery from "./pages/public/Recovery"
import Homepage from "./pages/private/Homepage"
import RegisterMembers from "./pages/private/Admin/RegisterMembers"

import { LoginAndRegisterException, UserPrivateRoute } from './pages/config/userConfig'
import { AdminPrivateRoute } from "./pages/config/adminConfig"
import RegisterTasks from "./pages/private/Admin/RegisterTasks"
import RegisterIncidents from "./pages/private/Admin/RegisterIncidents"
//comentario 1
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<LoginAndRegisterException />}>
          
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Route>

        <Route element={<UserPrivateRoute />} >
          
          <Route path="/Home" element={<Homepage />} />

          <Route element={<AdminPrivateRoute />} >

            <Route path="/admin/register" element={<RegisterMembers />} />
            <Route path="/admin/createTask" element={<RegisterTasks />} />
            <Route path="/admin/reportIncident" element={<RegisterIncidents />} />

          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App