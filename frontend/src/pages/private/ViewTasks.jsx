import { useAxiosCustomHook } from "../../Axios/AxiosApi"
import { useSelector } from "react-redux"

export const ViewTasks = () => {

    const baseURL = 'http://127.0.0.1:8000/'

    const info = {
        field: 'fk_id_user'
    }

    const data = useAxiosCustomHook(baseURL, `tasks/allByFk/${useSelector(state=>state.auth.UserInfo.pk_id_user)}`, 'GET', info)

    console.log(data)

    return (
        <div>
        </div>
    )
}