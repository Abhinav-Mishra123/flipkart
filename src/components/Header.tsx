import React from 'react'
import logo  from "../public/img/logo.jpeg"
import Image from 'next/image'
import Link from 'next/link'

function Header() {
  return (
        <nav className=''>
            <div className='main-header'>
                <div className='header-section'>
                    <div className='header-flex flex justify-between items-center h-16'>
                        <div className='main-logo'>
                            {/* <Image src={logo} alt='logo' placeholder='empty' width={100} height={100} quality={75} priority={false}/> */}
                           <Link href={"/"}><p className='font-bold text-red-700'>Am Store</p></Link>
                        </div>
                        <div className='middle-menu'>
                            <ul className='flex justify-between items-center flex-wrap'>
                                <li className='mx-3 hover:underline'><Link href={"/"}>Home</Link></li>
                                <li className='mx-3 hover:underline'><Link href={"/about-us"}>About Us</Link></li>
                                <li className='mx-3 hover:underline'><Link href={"/contact-us"}>Contact Us</Link></li>
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