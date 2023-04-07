import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'



export const UserPrivateRoute = () => {
    const online = useSelector(state => state.auth.online)
    return (
        online? <Outlet /> : <Navigate to='/' />
    )
}

export const LoginAndRegisterException = () => {
    const online = useSelector(state => state.auth.online)
    return(
    online? <Navigate to='/Home' /> : <Outlet />
    )
}