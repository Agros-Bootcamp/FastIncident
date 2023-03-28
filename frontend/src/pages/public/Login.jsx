const Login = () => {
  return (
    <div>
        <form>
            <input name="username" placeholder="Nombre de usuario" />
            <input name="email" placeholder="Email" />
            <input name="password" placeholder="Contraseña" />
            <button type="submit" >Iniciar sesion</button>
        </form>
    </div>
  )
}

export default Login