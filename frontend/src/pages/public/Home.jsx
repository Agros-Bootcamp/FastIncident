import { Link } from "react-router-dom"
import './css/Home.css'

const Home = () => {
  return (
    <div className="mainHome" >
      <h1 className="titleHome" >Gestor de tareas</h1>
      <h3 className="subtitleHome" >AGROS IMPACT BOOTCAMP</h3>
      <Link className="buttonHome" to='/login' >Iniciar sesion</Link>
    </div>
  )
}

export default Home