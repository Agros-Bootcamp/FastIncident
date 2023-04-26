import './navBar.css'
import { useSelector } from 'react-redux'

export const NavBar = () => {

  const {online, UserInfo} = useSelector((state)=>state.auth)



  return (
    <div className='navBar' >
      <div>
        <h1 className='welcome' >
          {online?'Pantalla de inicio':'Bienvenido'}
        </h1>
      </div>
      <div className='name'>
        <h1>
        {online?`${UserInfo?.first_name_user}`:'AGROS'}
        </h1>
      </div>
      <div>
        <h3 className='detail' >
          {!online?'Impact Bootcamp':`Tu rol es ${UserInfo?.title_rol_user}`}
        </h3>
      </div>
    </div>
  )
}
