import lightMobileBG from "./assets/bg-mobile-light.jpg"
import darkMobileBG from "./assets/bg-mobile-dark.jpg"
import { BsFillMoonFill, BsSunFill, BsCheckLg } from "react-icons/bs"
import { useState, useEffect } from "react"
import { ADD_TODO, CLEAR_COMPLETED, FILTER_TODO } from "./action"
import { connect } from "react-redux"
import SingleTodo from "./components/SingleTodo"
type AppProps = {
  todos: {}[]
  addTodo: Function
  clearCompleted: Function
}
type TodoAtr = {
  id: number
}
function App({ todos, addTodo, clearCompleted }: AppProps) {
  const [themeTrigger, setThemeTrigger] = useState(true)
  const [todoText, setTodoText] = useState("")
  const [totalActive, setTotalActive] = useState(0)
  const [tempTodos, setTempTodos] = useState(todos)
  const [filterType, setFilterType] = useState("all")
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setThemeTrigger(false)
    } else {
      setThemeTrigger(true)
    }
  }, [])
  useEffect(() => {
    const actives = todos.filter((item: any) => item.type === "active")
    setTotalActive(actives.length)
    setTempTodos(todos)
  }, [todos])
  useEffect(() => {
    if (filterType === "active") {
      const newTodo = todos.filter((todo: any) => todo.type === "active")
      setTempTodos(newTodo)
    } else if (filterType === "completed") {
      const newTodo = todos.filter((todo: any) => todo.type === "completed")
      setTempTodos(newTodo)
    } else {
      setTempTodos(todos)
    }
  }, [filterType])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (todoText) {
      addTodo(todoText)
      setTodoText("")
    }
  }
  return (
    <main
      className={`relative grid justify-center items-start min-h-screen ${
        themeTrigger ? "light-theme" : "dark-theme"
      } `}
    >
      <img
        className='bg-image absolute top-0 left-0 w-full'
        src={themeTrigger ? lightMobileBG : darkMobileBG}
        alt='light BG'
      />
      <div className='space-y-8 z-30 py-24 h-full'>
        <div className='flex justify-between items-center'>
          <h1 className='text-4xl pt-2 tracking-widest text-white'>TODO</h1>
          <button onClick={() => setThemeTrigger(!themeTrigger)}>
            {themeTrigger ? (
              <BsFillMoonFill className='fill-white scale-125' />
            ) : (
              <BsSunFill className='fill-white scale-125' />
            )}
          </button>
        </div>
        <div className='space-y-5 self-start'>
          <form
            onSubmit={handleSubmit}
            className='relative z-10 overflow-hidden'
          >
            <input
              type='text'
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              className='w-full py-5 pb-4  pl-16 rounded-lg  container focus:outline-none form-text'
              placeholder='Create a new Todo'
            />
            <span className='absolute rounded-full top-1/2 left-6 -translate-y-1/2'></span>
            <button
              type='submit'
              className={`absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity  ${
                todoText.length > 0 ? "opacity-100 " : "opacity-0"
              }`}
            >
              <BsCheckLg className='text-2xl fill-green-500' />
            </button>
          </form>
          {todos.length > 0 && (
            <div className='space-y-5'>
              <div className='container rounded-lg'>
                {tempTodos.map((todo: any) => {
                  return <SingleTodo key={todo.id} {...todo} />
                })}
                <div className='p-4 px-5 opacity-75 flex justify-between items-center text-sm'>
                  <p className='total-btn'>{totalActive} items left</p>
                  <button
                    onClick={() => clearCompleted()}
                    className='filter-btn'
                  >
                    Clear Completed
                  </button>
                </div>
              </div>
              <div className='flex gap-x-5 container justify-center rounded-lg py-3 text-sm font-bold '>
                <button
                  onClick={() => setFilterType("all")}
                  className='filter-btn'
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType("active")}
                  className='filter-btn'
                >
                  Active
                </button>
                <button
                  onClick={() => setFilterType("completed")}
                  className='filter-btn'
                >
                  Completed
                </button>
              </div>
            </div>
          )}
        </div>
        <p className='dnd text-xs font-bold  absolute bottom-14 left-1/2 -translate-x-1/2'>
          Drag and drop to reader list
        </p>
      </div>
    </main>
  )
}

const mapStateToProps = (state: {}[]) => {
  return { todos: state }
}
const mapDistpatchtoPrpos = (distpatch: Function, ownProps: { id: number }) => {
  const { id } = ownProps
  return {
    addTodo: (text: string) => distpatch({ type: ADD_TODO, payload: text }),
    clearCompleted: () => distpatch({ type: CLEAR_COMPLETED }),
  }
}
export default connect(mapStateToProps, mapDistpatchtoPrpos)(App)
