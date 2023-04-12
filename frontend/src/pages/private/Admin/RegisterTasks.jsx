import { useCreateTaskMutation } from "../../../api/authEndpoints"
import { useState } from "react"

const RegisterTasks = () => {
    const [task, setTask] = useState({})
    const [createTask, {isSuccess}] = useCreateTaskMutation()

    const handleTask = (e) => {
        const item = {...task, [e.target.name]:e.target.value}
        setTask(item)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await createTask(task)
            result && console.log(result)
            console.log(task)
        } catch (error) {
            console.log(error)           
        }
    }

  return (
    <div>
        <h1>Crear tarea</h1>
        <form onSubmit={e=>handleSubmit(e)}>
            <input onChange={e=>handleTask(e)} type="text" name="title_task" />
            <input onChange={e=>handleTask(e)} type="text" name="description_task" />
            <label onChange={e=>handleTask(e)} name='status_task' >
                <input id="status-1" name="status_task" type="radio" value='value1' />
                <label for='status-1' >Value1</label>
                <input id="status-2" name="status_task" type="radio" value='value2' />
                <label for='status-2' >Value2</label>
                <input id="status-3" name="status_task" type="radio" value='value3' />
                <label for='status-3' >Value3</label>
            </label>
            <input onChange={e=>handleTask(e)} type="date" name="start_date_task" />
            <input onChange={e=>handleTask(e)} type="date" name="end_date_task" />
            <label onChange={e=>handleTask(e)} name='priority_task'>
                <input id="priority-1" name="priority_task" type="radio" value='value1' />
                <label for='priority-1' >Value1</label>
                <input id="priority-2" name="priority_task" type="radio" value='value2' />
                <label for='priority-2' >Value2</label>
                <input id="priority-3" name="priority_task" type="radio" value='value3' />
                <label for='priority-3' >Value3</label>
            </label>
            <input onChange={e=>handleTask(e)} type="number" name='development_HH' />
            <input onChange={e=>handleTask(e)} type="number" name='reward_task' />
            <input onChange={e=>handleTask(e)} type="number" name='limit_incidents' />
            <button type="submit" >Guardar tarea</button>
        </form>
    </div>
  )
}

export default RegisterTasks