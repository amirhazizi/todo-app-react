import lightMobileBG from "./assets/bg-mobile-light.jpg"
import darkMobileBG from "./assets/bg-mobile-dark.jpg"
import { BsFillMoonFill, BsSunFill, BsCheckLg } from "react-icons/bs"
import { useState, useEffect } from "react"
import { ADD_TODO, REMOVE_TODO } from "./action"
import { connect } from "react-redux"
import SingleTodo from "./components/SingleTodo"
type AppProps = {
  todos: {}[]
  addTodo: Function
}
type TodoAtr = {
  id: number
}
function App({ todos, addTodo }: AppProps) {
  const [themeTrigger, setThemeTrigger] = useState(true)
  const [todoText, setTodoText] = useState("")

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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (todoText) {
      addTodo(todoText)
      setTodoText("")
    }
  }
  return (
    <main
      className={`relative grid place-items-center min-h-screen ${
        themeTrigger ? "light-theme" : "dark-theme"
      } `}
    >
      <img
        className='absolute top-0 left-0 w-full'
        src={themeTrigger ? lightMobileBG : darkMobileBG}
        alt='light BG'
      />
      <div className='space-y-8 z-30'>
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
        <div className='space-y-5'>
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
              className={`absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ${
                todoText.length > 0
                  ? "-translate-x-10 opacity-100 "
                  : "translate-x-5 opacity-0"
              }`}
            >
              <BsCheckLg className='text-2xl fill-green-500' />
            </button>
          </form>
          <div className='container rounded-lg'>
            {todos.map((todo: any) => {
              return <SingleTodo key={todo.id} {...todo} />
            })}
            <div className='p-4 px-5 opacity-75 flex justify-between items-center text-sm'>
              <p className='total-btn'>2 items left</p>
              <button className='filter-btn'>Clear Completed</button>
            </div>
          </div>
          <div className='flex gap-x-5 container justify-center rounded-lg py-3 text-sm font-bold '>
            <button className='filter-btn'>All</button>
            <button className='filter-btn'>Active</button>
            <button className='filter-btn'>Completed</button>
          </div>
        </div>
        <p className='dnd text-center text-xs font-bold'>
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
  }
}
export default connect(mapStateToProps, mapDistpatchtoPrpos)(App)
