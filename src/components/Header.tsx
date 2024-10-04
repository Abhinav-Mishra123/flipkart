import React from 'react'
import logo  from "../public/img/logo.jpeg"
import Image from 'next/image'
import Link from 'next/link'

function Header() {
  return (
        <nav>
            <div className='main-header'>
                <div className='header-section'>
                    <div className='header-flex flex justify-between align-middle'>
                        <div className='main-logo'>
                            <Image src={logo} alt='logo' width={100} height={50}/>
                        </div>
                        <div className='middle-menu'>
                            <ul>
                                <li><Link href={"/"}>Home</Link></li>
                                <li><Link href={"/"}>About Us</Link></li>
                                <li><Link href={"/"}>Contact Us</Link></li>
                            </ul>
                        </div>
                        <div className='last-menu'>
                            <ul>
                                <li><Link href={"/login"}>Login</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        
  )
}   

export default Header