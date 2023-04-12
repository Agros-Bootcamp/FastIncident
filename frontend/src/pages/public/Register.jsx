import { useReducer } from "react"
import { useRegisterMutation, useLoginMutation } from "../../api/authEndpoints"
import { useDispatch } from "react-redux"
import { setTokens } from "../../api/authSlice"

const Register = () => {

  const [login, {status}] = useLoginMutation()
  const [register, {isSuccess}] = useRegisterMutation()
  const dispatch = useDispatch()

  const blank = {first_name_user: '', email_user: '', password_user: ''}

  const [user, userDispatch] = useReducer((state, action) => {  
    const obj = {...state, [action.field]: action.payload}
    return obj
  }, blank)

  const handleUser = (e) => {
    const item = {field: e.target.name, payload: e.target.value}
    userDispatch(item)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(user)
    const result = await register(user)
    if (result) {
      const userData = await login({
        email_user: user.email_user,
        password_user: user.password_user
      })
      dispatch(setTokens(userData.data))
    }
  }

  return (
    <div>
        <h1>Modulo de registro</h1>
        <form onSubmit={e=>handleSubmit(e)}>
            <input onChange={e=>handleUser(e)} name="first_name_user" placeholder="Nombre de usuario" />
            <input onChange={e=>handleUser(e)} name="last_name_user" placeholder="Apellido de usuario" />
            <input onChange={e=>handleUser(e)} name="email_user" placeholder="Email" />
            <input onChange={e=>handleUser(e)} name="password_user" placeholder="Contraseña" />
            <button onClick={()=>console.log(user)} type="submit" >Iniciar sesion</button>
        </form>
    </div>
  )
}

export default Register