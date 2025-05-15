import React from 'react'
import { Link } from 'react-router-dom'


export const Footer = () => {
  return (
    <>
        <footer className='bg-black text-white align-item-center p-2 '>
        <div>
        <ul className='flex gap-x-2 text-center'>
            
            <li><Link to={"/contact"}>Contact</Link></li>
            <li><Link to={"/about"}>About</Link></li>
            <li><Link to={"/help"}>Help</Link></li>
        </ul>
    </div>
    </footer>
    </>

  )
}


