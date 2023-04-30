const Footer = () => {
  return (
    <footer className='grid items-end justify-center py-2 fixed bottom-0 left-1/2 z-50 -translate-x-1/2 text-xs container w-fit px-3 rounded-t-lg'>
      <div className='text-center rounded-t-xl '>
        Challenge by
        <a
          className='px-1 font-bold'
          href='https://www.frontendmentor.io?ref=challenge'
          target='_blank'
        >
          Frontend Mentor
        </a>
        . Coded by
        <a
          className='px-1 font-bold '
          href='https://github.com/amirhazizi'
          target='_blank'
        >
          Amir Hossein Azizi
        </a>
      </div>
    </footer>
  )
}
export default Footer
