import lightMobileBG from "./assets/bg-mobile-light.jpg"
import darkMobileBG from "./assets/bg-mobile-dark.jpg"
import lightDesktopBG from "./assets/bg-desktop-light.jpg"
import darkDesktopBG from "./assets/bg-desktop-dark.jpg"
import { BsFillMoonFill, BsSunFill, BsCheckLg } from "react-icons/bs"
import { useState, useEffect } from "react"
import { ADD_TODO, CLEAR_COMPLETED, END_EDIT } from "./action"
import { connect } from "react-redux"
import SingleTodo from "./components/SingleTodo"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { ToastContainer, toast, Slide } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
type InitialStatePrpos = {
  todos: {}[]
  isEdit: boolean
  editID: number
  editContent: string
}
type AppProps = {
  todos: {}[]
  addTodo: Function
  clearCompleted: Function
  completeEdit: Function
  editContent: string
  isEdit: boolean
}
function App({
  todos,
  isEdit,
  editContent,
  addTodo,
  clearCompleted,
  completeEdit,
}: AppProps) {
  const [themeTrigger, setThemeTrigger] = useState(true)
  const [todoText, setTodoText] = useState("")
  const [totalActive, setTotalActive] = useState(0)
  const [tempTodos, setTempTodos] = useState(todos)
  const [filterType, setFilterType] = useState("all")
  const [parent] = useAutoAnimate()

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
  useEffect(() => {
    if (isEdit && editContent.length > 0) setTodoText(editContent)
  }, [isEdit])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (todoText && !isEdit) {
      addTodo(todoText)
      setTodoText("")
      toast.success("New Todo Added")
    }
    if (todoText && isEdit) {
      completeEdit(todoText)
      setTodoText("")
      toast.success("Todo Edited")
    }
  }
  return (
    <main
      className={`relative grid justify-center items-start min-h-screen ${
        themeTrigger ? "light-theme" : "dark-theme"
      } `}
    >
      <img
        className='bg-image absolute top-0 left-0 w-full md:hidden'
        src={themeTrigger ? lightMobileBG : darkMobileBG}
        alt='mobile BG'
      />
      <img
        className='bg-image absolute top-0 left-0 w-full hidden md:block'
        src={themeTrigger ? lightDesktopBG : darkDesktopBG}
        alt='desktop BG'
      />
      <div className='space-y-8 z-30 py-12 h-full md:py-14'>
        <div className='flex justify-between items-center'>
          <h1 className='logo text-3xl pt-2 font-bold text-white'>TODO</h1>
          <button onClick={() => setThemeTrigger(!themeTrigger)}>
            {themeTrigger ? (
              <BsFillMoonFill className='fill-white scale-125' />
            ) : (
              <BsSunFill className='fill-white scale-125' />
            )}
          </button>
        </div>
        <div className='space-y-5 self-start'>
          <form onSubmit={handleSubmit} className='relative z-10'>
            <input
              type='text'
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              className='py-5 pb-4  pl-16 rounded-lg container input-container focus:outline-none form-text'
              placeholder='Create a new Todo'
            />
            <span className='absolute rounded-full top-1/2 left-6 -translate-y-1/2'></span>
            <button
              type='submit'
              className={`absolute right-1 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity  ${
                todoText.length > 0 ? "opacity-100 " : "opacity-0"
              }`}
            >
              <BsCheckLg className='text-2xl fill-green-500' />
            </button>
          </form>
          {todos.length > 0 && (
            <div className='space-y-5'>
              <div className='container rounded-lg' ref={parent}>
                {tempTodos.map((todo: any) => {
                  return <SingleTodo key={todo.id} {...todo} />
                })}

                <div className='p-4 px-5 opacity-75 flex justify-between items-center text-sm md:py-1 md:px-3'>
                  <p className='total-btn'>{totalActive} items left</p>
                  <div className=' gap-x-5 justify-center py-3 text-sm font-bold hidden md:flex md:text-base'>
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
                  <button
                    onClick={() => {
                      clearCompleted()
                      toast.info("Completed Todos Removed.")
                    }}
                    className='filter-btn'
                  >
                    Clear Completed
                  </button>
                </div>
              </div>
            </div>
          )}
          <div
            className={`flex gap-x-5 container justify-center rounded-lg py-3 text-sm font-bold transition-opacity md:hidden ${
              todos.length > 0 ? "opacity-100" : "opacity-0"
            }`}
          >
            <button onClick={() => setFilterType("all")} className='filter-btn'>
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
        <p className='dnd text-xs font-bold  absolute bottom-14 left-1/2 -translate-x-1/2'>
          Drag and drop to reader list
        </p>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={2300}
        transition={Slide}
      />
    </main>
  )
}

const mapStateToProps = (state: InitialStatePrpos) => {
  return { ...state }
}
const mapDistpatchtoPrpos = (distpatch: Function) => {
  return {
    addTodo: (text: string) => distpatch({ type: ADD_TODO, payload: text }),
    clearCompleted: () => distpatch({ type: CLEAR_COMPLETED }),
    completeEdit: (text: string) =>
      distpatch({ type: END_EDIT, payload: text }),
  }
}
export default connect(mapStateToProps, mapDistpatchtoPrpos)(App)
