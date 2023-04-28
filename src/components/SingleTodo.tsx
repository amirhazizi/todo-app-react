import { BsCheckLg } from "react-icons/bs"
import { RxCross2 } from "react-icons/rx"
import { connect } from "react-redux"
import { REMOVE_TODO, IS_COMPLETED, IS_ACTIVE } from "../action"
import { useState, useEffect } from "react"
type SingleTodoProps = {
  id: number
  content: string
  type: string
  removeTodo: Function
  setActive: Function
  setCompleted: Function
}
const SingleTodo = ({
  id,
  content,
  type,
  removeTodo,
  setActive,
  setCompleted,
}: SingleTodoProps) => {
  const [isCompleted, setIsCompleted] = useState(false)
  useEffect(() => {
    if (isCompleted) {
      setCompleted()
    } else {
      setActive()
    }
  }, [isCompleted])
  useEffect(() => {
    if (type !== "active") setIsCompleted(true)
  }, [])
  return (
    <div className='todo relative py-4 w-full'>
      <div className='px-5 pl-16 flex justify-between items-center'>
        <p
          onClick={() => setIsCompleted(!isCompleted)}
          className={`cursor-pointer pt-1 ${
            isCompleted && "opacity-50 line-through"
          }`}
        >
          {content}
        </p>
        <button>
          <RxCross2
            onClick={() => removeTodo()}
            className='scale-150 opacity-50'
          />
        </button>
      </div>
      <span
        onClick={() => setIsCompleted(!isCompleted)}
        className={`cursor-pointer absolute rounded-full top-1/2 left-6 -translate-y-1/2 todo-span ${
          isCompleted && "completed-span"
        }`}
      >
        {isCompleted && (
          <BsCheckLg className='absolute w-2/3 h-2/3 top-1/2 left-4 -translate-x-3 -translate-y-1/2 fill-white' />
        )}
      </span>
    </div>
  )
}
const mapDistpatchtoPrpos = (distpatch: Function, ownProps: { id: number }) => {
  const { id } = ownProps
  return {
    removeTodo: () => distpatch({ type: REMOVE_TODO, payload: id }),
    setActive: () => distpatch({ type: IS_ACTIVE, payload: id }),
    setCompleted: () => distpatch({ type: IS_COMPLETED, payload: id }),
  }
}
export default connect(null, mapDistpatchtoPrpos)(SingleTodo)
