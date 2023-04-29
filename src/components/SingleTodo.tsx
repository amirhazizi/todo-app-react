import { BsCheckLg } from "react-icons/bs"
import { RxCross2, RxPencil2 } from "react-icons/rx"
import { AiOutlineDrag } from "react-icons/ai"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { connect } from "react-redux"
import { REMOVE_TODO, IS_COMPLETED, IS_ACTIVE, START_EDIT } from "../action"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
type SingleTodoProps = {
  id: number
  content: string
  type: string
  removeTodo: Function
  setActive: Function
  setCompleted: Function
  startEdit: Function
}
type InitialStatePrpos = {
  isEdit: boolean
  editID: number
  editContent: string
}
const SingleTodo = ({
  id,
  content,
  type,
  removeTodo,
  setActive,
  setCompleted,
  startEdit,
}: SingleTodoProps) => {
  const [isCompleted, setIsCompleted] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition }

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
    <div
      ref={setNodeRef}
      style={style}
      className='todo relative py-4 w-full rounded-t-lg'
    >
      <div className='px-5 pl-16 flex justify-between items-center'>
        <p
          onClick={() => setIsCompleted(!isCompleted)}
          className={`cursor-pointer pt-1 ${
            isCompleted && "opacity-50 line-through"
          }`}
        >
          {content}
        </p>
        <div className='flex gap-x-4'>
          <RxPencil2
            onClick={() => {
              startEdit()
              toast.info("Now you can edit...")
            }}
            className='scale-150 opacity-50 cursor-pointer'
          />
          <RxCross2
            onClick={() => {
              removeTodo()
              toast.warning("Todo Removed.")
            }}
            className='scale-150 opacity-50 cursor-pointer'
          />
          <AiOutlineDrag
            {...attributes}
            {...listeners}
            className='scale-150 opacity-50 cursor-pointer'
          />
        </div>
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

const mapDistpatchtoPrpos = (
  distpatch: Function,
  ownProps: { id: number; content: string }
) => {
  const { id, content } = ownProps
  return {
    removeTodo: () => distpatch({ type: REMOVE_TODO, payload: id }),
    setActive: () => distpatch({ type: IS_ACTIVE, payload: id }),
    setCompleted: () => distpatch({ type: IS_COMPLETED, payload: id }),
    startEdit: () => distpatch({ type: START_EDIT, payload: { id, content } }),
  }
}
export default connect(null, mapDistpatchtoPrpos)(SingleTodo)
