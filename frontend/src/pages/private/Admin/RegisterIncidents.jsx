import { schemaIncident, schemaForm } from "../../config/schemas"
import { useState } from "react"

const RegisterIncidents = () => {
  const [incident, setIncident] = useState({})
  
  const handleIncident = (e) => {
    const item = {...incident, [e.target.name]:e.target.value}
    setIncident(item)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(incident)
  }
  
  return (
    <div>
      <h1>Registrar incidente</h1>
      <form onSubmit={e=>handleSubmit(e)} >
        {schemaForm(schemaIncident, handleIncident)}
        <button type="submit" >Guardar incidente</button>
      </form>
    </div>
  )
}

export default RegisterIncidents