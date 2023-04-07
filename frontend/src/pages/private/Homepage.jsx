import {useDispatch, useSelector} from 'react-redux'
import { logOut } from '../../api/authSlice'

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
    </div>
  )
}

export default Homepage