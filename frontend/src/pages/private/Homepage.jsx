import {useDispatch, useSelector} from 'react-redux'
import { logOut } from '../../api/authSlice'
import { NavLink } from 'react-router-dom'

const Homepage = () => {
  const data = useSelector(state=>state.auth.UserInfo)
  const dispatch = useDispatch()

  const logoutSession = (e) => {
    e.preventDefault()
    dispatch(logOut())
  }

  return (
    <div>
      <h1>Bienvenido {data.first_name_user}</h1>
      <h3>Tu rol es {data.title_rol_user}</h3>
      <button onClick={e=>logoutSession(e)} >Cerrar Sesion</button>
      {data.title_rol_user === 'Administrador' && 
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '3rem'
      }} >
        <NavLink to='/admin/register' >Registrar Miembros</NavLink>
        <NavLink to='/admin/createTask' >Crear Tarea</NavLink>
        <NavLink to='/admin/reportIncident' >Reportar Incidente</NavLink>  
      </div>}
    </div>
  )
}

export default Homepage