import { useEffect } from 'react'

export default function Logo() {
  useEffect(() => {
    const left = document.getElementById('left-eye')!
    const right = document.getElementById('right-eye')!
    const move = (event: MouseEvent) => {
      const clientX = event.clientX < 320 ? event.clientX : 700
      const clientY = event.clientY < 320 ? event.clientY : 700
      const x = -(window.innerWidth / 2 - clientX) / 160
      const y = -(window.innerHeight / 2 - clientY) / 160
      left.style.transform = `translateY(${y}px) translateX(${x}px)`
      right.style.transform = `translateY(${y}px) translateX(${x}px)`
    }
    window.addEventListener('mousemove', move)
  }, [])

  return (
    <a href='/' className='logo me-auto' title='logo-home'>
      <div className='logo-container'>
        <img src='/assets/logo-animation.png' title='logo-animation' />
        <div className='eyes'>
          <div className='left-eye'>
            <div id='left-eye' className='pupil' />
          </div>
          <div className='right-eye'>
            <div id='right-eye' className='pupil' />
          </div>
        </div>
      </div>
    </a>
  )
}
