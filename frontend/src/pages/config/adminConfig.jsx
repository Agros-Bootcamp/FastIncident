import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const AdminPrivateRoute = () => {
    const userInfo = useSelector(state=>state.auth.UserInfo)
    const role = userInfo?userInfo.title_rol_user:undefined
    const match = role === 'Administrador'? true : false
    //Comenario 22
    return (
        match? <Outlet /> : <Navigate to='/Home' />
    )
}