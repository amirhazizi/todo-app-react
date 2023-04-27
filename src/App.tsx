import lightMobileBG from "./assets/bg-mobile-light.jpg"
import darkMobileBG from "./assets/bg-mobile-dark.jpg"
import { BsCheckLg, BsFillMoonFill, BsSunFill } from "react-icons/bs"
import { RxCross2 } from "react-icons/rx"
import { useState, useEffect } from "react"
function App() {
  const [themeTrigger, setThemeTrigger] = useState(true)
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
          <form className='relative z-10'>
            <input
              type='text'
              className='w-full py-5 pb-4 pl-16 rounded-lg  container focus:outline-none form-text'
              placeholder='Create a new Todo'
            />
            <span className='absolute rounded-full top-1/2 left-6 -translate-y-1/2'></span>
          </form>
          <div className='container rounded-lg'>
            <div className='todo relative py-4 w-full'>
              <div className='px-5 pl-16 flex justify-between items-center'>
                <p className='cursor-pointer pt-1'>todo 1</p>
                <button>
                  <RxCross2 className='scale-150 opacity-50' />
                </button>
              </div>
              <span className='cursor-pointer absolute rounded-full top-1/2 left-6 -translate-y-1/2 todo-span'>
                <BsCheckLg className='absolute w-2/3 h-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-white' />
              </span>
            </div>
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

export default App
