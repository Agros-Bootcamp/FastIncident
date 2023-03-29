import { useReducer } from "react"

const Login = () => {

  const blank = {username: '', email: '', password: ''}

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
        <form onSubmit={e=>handleSubmit(e)}>
            <input onChange={e=>handleUser(e)} name="username" placeholder="Nombre de usuario" />
            <input onChange={e=>handleUser(e)} name="email" placeholder="Email" />
            <input onChange={e=>handleUser(e)} name="password" placeholder="Contraseña" />
            <button onClick={()=>console.log(user)} type="submit" >Iniciar sesion</button>
        </form>
    </div>
  )
}

export default Login