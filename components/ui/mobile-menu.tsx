'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { UserAuth } from '@/app/firebase/AuthContext'
import { usePathname } from 'next/navigation';
import { useTheme } from "next-themes";


export default function MobileMenu({loggedIn}) {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)
  const { logOut } = UserAuth();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const trigger = useRef<HTMLButtonElement>(null)
  const mobileNav = useRef<HTMLDivElement>(null)

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return;
      if (!mobileNavOpen || mobileNav.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
      setMobileNavOpen(false)
    };
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false)
    };
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`hamburger ${mobileNavOpen && 'active'}`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg
          className="w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="4" width="24" height="2" rx="1" />
          <rect y="11" width="24" height="2" rx="1" />
          <rect y="18" width="24" height="2" rx="1" />
        </svg>
      </button>

      {/* Desktop navigation */}
      {loggedIn ?
      <nav
        id="mobile-nav"
        ref={mobileNav}
        className="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out"
        style={mobileNavOpen ? { maxHeight: mobileNav.current?.scrollHeight, opacity: 1 } : { maxHeight: 0, opacity: 0.8 }}
      >

          {/* Desktop sign in links */}
          <ul className="flex grow justify-end flex-wrap items-center">
            <li>
              <Link href="/post" className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3">
                Add Post
              </Link>
            </li>
            <li>

              <button className="font-medium text-gray-900 hover:text-purple-600 px-4 py-3 flex items-center transition duration-150 ease-in-out" onClick={handleSignOut}>Sign Out </button>
            </li>
          </ul>
        </nav>
        :

        <nav className="hidden md:flex md:grow">
          {/* Desktop sign in links */}
          <ul className="flex grow justify-end flex-wrap items-center">
            <li>
              <Link
                href="/signin"
                className={pathname === '/signin' ? "font-medium text-purple-600 px-4 py-3 flex items-center transition duration-150 ease-in-out light:text-gray-900" : "font-medium hover:text-purple-600 px-4 py-3 flex items-center transition duration-150 ease-in-out light:text-gray-900 dark:text-white"}
              >
                Sign in
              </Link>
            </li>
            <li>
              <Link href="/signup" className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3 rounded-md">
                Sign up
              </Link>
            </li>

            <li>
              <Link href="/post" className={pathname == "/post" ? "invisible" : "btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3 rounded-md"}>
                Add Post
              </Link>
            </li>
            {resolvedTheme === 'light' ? 
            
            <li className='ml-4 p-2 flex justify-center items-center text-purple-600 transition duration-150 ease-in-out' onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5d5dff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
            </li>
          : 
            <li className='ml-4 p-2 flex justify-center items-center text-purple-600 transition duration-150 ease-in-out' onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5d5dff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </li>
          
          }
          </ul>
        </nav>
      }
    </div>
  )
}
