import { useReducer } from "react"

const Register = () => {

  const blank = {first_name_user: '', email_user: '', password_user: ''}

  const [user, userDispatch] = useReducer((state, action) => {  
    const obj = {...state, [action.field]: action.payload}
    return obj
  }, blank)

  const handleUser = (e) => {
    const item = {field: e.target.name, payload: e.target.value}
    userDispatch(item)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(user)
  }

  return (
    <div>
        <h1>Modulo de registro</h1>
        <form onSubmit={e=>handleSubmit(e)}>
            <input onChange={e=>handleUser(e)} name="first_name_user" placeholder="Nombre de usuario" />
            <input onChange={e=>handleUser(e)} name="last_name_user" placeholder="Nombre de usuario" />
            <input onChange={e=>handleUser(e)} name="email_user" placeholder="Email" />
            <input onChange={e=>handleUser(e)} name="password_user" placeholder="Contraseña" />
            <button onClick={()=>console.log(user)} type="submit" >Iniciar sesion</button>
        </form>
    </div>
  )
}

export default Register