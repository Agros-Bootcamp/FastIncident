import { useReducer } from "react"

const Home = () => {
  const [state, dispatch] = useReducer((state, action)=>{
    state.obj1='lol'
    state.obj2 = action
    console.log(state)
  }, {})
  return (
    <div>
      Home
      <button onClick={()=>dispatch('lol')} >Cambiar</button>
    </div>
  )
}

export default Home