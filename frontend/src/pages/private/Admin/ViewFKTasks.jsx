import { useGetAllTasksByFKQuery, useGetTaskByPkQuery } from "../../../api/authEndpoints"
import { useSelector } from "react-redux"

export const ViewFKTasks = () => {

  const { pk_id_user } = useSelector(state=>state.auth.UserInfo)
  const {data} = useGetAllTasksByFKQuery(pk_id_user)
  return (
    <div>ViewFKTasks</div>
  )
}
