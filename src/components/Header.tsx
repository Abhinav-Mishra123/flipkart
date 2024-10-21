"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useCart } from '@/context/CartContext';

function Header() {
  const [menu, showMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();
  const [firstLetter, setFirstLetter] = useState<string>('');
  const [secondLetter, setSecondLetter] = useState<string>('');
  const { cartCount } = useCart();

  const handleSideMenu = () => {
    showMenu(!menu);
  };

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (menu && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        showMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menu]);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await axios.get('/api/me');
        let userName = response.data.user.name;
        const names = userName.split(" ");
        setFirstLetter(names[0]?.slice(0,1)?.toUpperCase());
        setSecondLetter(names[1]?.slice(0,1)?.toUpperCase());
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        setUser(null); 
      }
    };
    fetchUserSession();
  }, []);



  return (
    <nav className=''>
      <div className='main-header'>
        <div className='header-section'>
          <div className='header-flex flex justify-between items-center h-16'>
            {/* Hamburger Menu Icon for Mobile */}
            <div className='hamburger-menu md:hidden' onClick={handleSideMenu}>
              <GiHamburgerMenu className='text-2xl' />
            </div>

            {/* Logo */}
            <div className='main-logo'>
              <Link href={"/"}>
                <p className='font-bold text-red-700'>Am Store</p>
              </Link>
            </div>

            {/* Mobile Slide Menu */}
            <div ref={menuRef} className={`fixed top-0 left-0 h-full w-2/3 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${menu ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
              <div className='closeBar absolute top-2 right-2 text-2xl' onClick={() => showMenu(false)}>
                <IoMdCloseCircle />
              </div>
              <ul className='flex flex-col justify-center items-start p-4'>
                <li className='mb-4 hover:underline'>
                  <Link href={"/"} onClick={handleSideMenu}>Home</Link>
                </li>
                <li className='mb-4 hover:underline'>
                  <Link href={"/about-us"} onClick={handleSideMenu}>About Us</Link>
                </li>
                <li className='mb-4 hover:underline'>
                  <Link href={"/contact-us"} onClick={handleSideMenu}>Contact Us</Link>
                </li>
                <li className='mb-4 hover:underline'>
                  <Link href={"/product"} onClick={handleSideMenu}>Products</Link>
                </li>
              </ul>
            </div>

            {/* Desktop Menu */}
            <div className='middle-menu hidden md:block'>
              <ul className='flex justify-between items-center flex-wrap'>
                <li className='mx-3 hover:underline'><Link href={"/"}>Home</Link></li>
                <li className='mx-3 hover:underline'><Link href={"/about-us"}>About Us</Link></li>
                <li className='mx-3 hover:underline'><Link href={"/contact-us"}>Contact Us</Link></li>
                <li className='mx-3 hover:underline'><Link href={"/product"}>Products</Link></li>
              </ul>
            </div>
            <div className='last-menu flex relative'>
              <Link href={"/cart"} className='pr-5'><img src='https://cdn-icons-png.flaticon.com/128/1170/1170678.png' width={30} height={30}/></Link>
              {cartCount > 0 && (
                <span className='absolute right-16 -top-3 font-bold px-1'>
                  {cartCount}
                </span>
              )}
            <ul className='flex'>
              {user ? (
                <div className="user-initials">
                  <Link href="/login" onClick={() => {
                  }}>
                    <div className='bg-red-600 px-2 py-2 text-white rounded-full font-bold'>
                    {firstLetter && secondLetter ? `${firstLetter}${secondLetter}` : firstLetter}
                    {/* {user.name.slice(0, 2).toUpperCase()} */}
                    </div>
                  </Link>
                </div>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </ul>
          </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
