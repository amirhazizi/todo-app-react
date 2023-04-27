import { BsCheckLg } from "react-icons/bs"
import { RxCross2 } from "react-icons/rx"
type SingleTodoProps = { id: number; content: string; type: string }
const SingleTodo = ({ id, content, type }: SingleTodoProps) => {
  return (
    <div className='todo relative py-4 w-full'>
      <div className='px-5 pl-16 flex justify-between items-center'>
        <p className='cursor-pointer pt-1'>{content}</p>
        <button>
          <RxCross2 className='scale-150 opacity-50' />
        </button>
      </div>
      <span className='cursor-pointer absolute rounded-full top-1/2 left-6 -translate-y-1/2 todo-span'>
        <BsCheckLg className='absolute w-2/3 h-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-white' />
      </span>
    </div>
  )
}

export default SingleTodo
