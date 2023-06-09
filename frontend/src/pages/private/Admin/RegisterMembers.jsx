import { useReducer } from "react"
import { useRegisterMutation } from "../../../api/authEndpoints"
import { schemaForm, schemaUser } from "../../config/schemas"

const RegisterMembers = () => {

  const [register, {isSuccess}] = useRegisterMutation()

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
  }

  return (
    // <div>
    //     <h1>Modulo de registro</h1>
    //     <form onSubmit={e=>handleSubmit(e)}>
    //         <input onChange={e=>handleUser(e)} name="first_name_user" placeholder="Nombre de usuario" />
    //         <input onChange={e=>handleUser(e)} name="last_name_user" placeholder="Apellido de usuario" />
    //         <input onChange={e=>handleUser(e)} name="email_user" placeholder="Email" />
    //         <input onChange={e=>handleUser(e)} name="password_user" placeholder="Contraseña" />
    //         <button onClick={()=>console.log(user)} type="submit" >Iniciar sesion</button>
    //     </form>
    // </div>
    <div>
      <h1>Modulo de registro</h1>
      <form onSubmit={e=>handleSubmit(e)}>
        {schemaForm(schemaUser, handleUser)}
        <button type="submit" >Registrar Usuario</button>
      </form>
    </div>
  )
}

export default RegisterMembers