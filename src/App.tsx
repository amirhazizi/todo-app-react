import lightMobileBG from "./assets/bg-mobile-light.jpg"
import darkMobileBG from "./assets/bg-mobile-dark.jpg"
import { BsCheckLg, BsFillMoonFill, BsSunFill } from "react-icons/bs"
import { RxCross2 } from "react-icons/rx"
function App() {
  return (
    <main className='relative grid place-items-center min-h-screen bg-black'>
      <img
        className='absolute top-0 left-0 w-full'
        src={lightMobileBG}
        alt='light BG'
      />
      <div className='space-y-8 z-30'>
        <div className='flex justify-between items-center'>
          <h1 className='text-4xl pt-2 tracking-widest text-white'>TODO</h1>
          <button>
            <BsFillMoonFill className='fill-white scale-125' />
          </button>
        </div>
        <div className='space-y-5'>
          <form className='relative'>
            <input
              type='text'
              className='w-full rounded-lg py-4 pl-16 text-sm'
              placeholder='Create a new Todo'
            />
            <span className='absolute w-7 h-7 rounded-full border-2 top-1/2 left-6 -translate-y-1/2'></span>
          </form>
          <div className='bg-white rounded-lg'>
            <div className='relative border-b-2 py-4 cursor-pointer w-full'>
              <div className='px-5 pl-16 flex justify-between items-center'>
                <p className='text-sm pt-1'>todo 1</p>
                <RxCross2 className='scale-150' />
              </div>
              <span className='absolute w-7 h-7 rounded-full border-2 top-1/2 left-6 -translate-y-1/2 bg-red-600'>
                <BsCheckLg className='absolute w-2/3 h-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-white' />
              </span>
            </div>
            <div className='relative border-b-2 py-4 cursor-pointer w-full'>
              <div className='px-5 pl-16 flex justify-between items-center'>
                <p className='text-sm pt-1'>todo 2</p>
                <RxCross2 className='scale-150' />
              </div>
              <span className='absolute w-7 h-7 rounded-full border-2 top-1/2 left-6 -translate-y-1/2 bg-red-600'>
                <BsCheckLg className='absolute w-2/3 h-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-white' />
              </span>
            </div>
            <div className='p-4 px-5 font-bold opacity-75 flex justify-between items-center text-sm'>
              <p>2 items left</p>
              <button>Clear Completed</button>
            </div>
          </div>
          <div className='flex gap-x-5 bg-white justify-center rounded-lg py-3 text-sm font-bold'>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
          </div>
        </div>
        <p className='text-white text-center text-xs opacity-50'>
          Drag and drop to reader list
        </p>
      </div>
    </main>
  )
}

export default App
