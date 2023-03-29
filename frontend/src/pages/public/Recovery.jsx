import { useState } from "react"

const Recovery = () => {
    const [email, setEmail] = useState('')
    const found = false

    return (
    <div>
        <h1>
            Ingresa tu correo electronico para verificar
        </h1>
        <input type='email' placeholder="correo"></input>
        {found?<h1>Su usuario es</h1>:<button>Buscar</button>}
    </div>
  )
}

export default Recovery