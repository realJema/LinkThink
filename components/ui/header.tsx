'use client'
import Link from 'next/link'
import MobileMenu from './mobile-menu'
import { UserAuth  } from '@/app/firebase/AuthContext'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import { useTheme } from "next-themes";

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();

  const pathname = usePathname();
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    console.log("signing out");
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link href="/" className="block" aria-label="Cruip">
              <svg className="w-8 h-8 fill-current text-purple-600" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M31.952 14.751a260.51 260.51 0 00-4.359-4.407C23.932 6.734 20.16 3.182 16.171 0c1.634.017 3.21.28 4.692.751 3.487 3.114 6.846 6.398 10.163 9.737.493 1.346.811 2.776.926 4.262zm-1.388 7.883c-2.496-2.597-5.051-5.12-7.737-7.471-3.706-3.246-10.693-9.81-15.736-7.418-4.552 2.158-4.717 10.543-4.96 16.238A15.926 15.926 0 010 16C0 9.799 3.528 4.421 8.686 1.766c1.82.593 3.593 1.675 5.038 2.587 6.569 4.14 12.29 9.71 17.792 15.57-.237.94-.557 1.846-.952 2.711zm-4.505 5.81a56.161 56.161 0 00-1.007-.823c-2.574-2.054-6.087-4.805-9.394-4.044-3.022.695-4.264 4.267-4.97 7.52a15.945 15.945 0 01-3.665-1.85c.366-3.242.89-6.675 2.405-9.364 2.315-4.107 6.287-3.072 9.613-1.132 3.36 1.96 6.417 4.572 9.313 7.417a16.097 16.097 0 01-2.295 2.275z" />
              </svg>
            </Link>
          </div>

          <nav className="hidden md:flex md:grow">
          <ul className="flex grow justify-start flex-wrap items-center">
            <li>
              <Link href="/bideas" className={pathname == "/bideas" ? "font-medium text-purple-600 hover:text-purple-600 px-5 py-3 flex items-center transition duration-150 ease-in-out" : "font-medium hover:text-purple-600 px-5 py-3 flex items-center transition duration-150 ease-in-out light:text-gray-900 dark:text-white"} >Business Ideas</Link>
            </li>
            <li>
              <Link href="/companies" className={pathname == "/companies" ? "font-medium text-purple-600 hover:text-purple-600 px-5 py-3 flex items-center transition duration-150 ease-in-out" : "light:text-gray-900 font-medium hover:text-purple-600 px-5 py-3 flex items-center transition duration-150 ease-in-out dark:text-white"}>Companies</Link>
            </li>
            <li>
              <Link href="/apps" className={pathname == "/apps" ? "font-medium text-purple-600 hover:text-purple-600 px-5 py-3 flex items-center transition duration-150 ease-in-out" : "font-medium light:text-gray-900 hover:text-purple-600 px-5 py-3 flex items-center transition duration-150 ease-in-out dark:text-white"}>Apps</Link>
            </li>
          </ul>
          </nav>

          {/* Desktop navigation */}
          {loading ? null : user ? (

            <nav className="hidden md:flex md:grow">
              {/* Desktop sign in links */}
              <ul className="flex grow justify-end flex-wrap items-center">
                <li>
                  <Link href="/post" className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3">
                    Add Post
                  </Link>
                </li>
                <li>
                  <button className="font-medium text-gray-900 hover:text-purple-600 px-4 py-3 flex items-center transition duration-150 ease-in-out dark:text-white" onClick={handleSignOut}>Sign Out </button>
                </li>
              </ul>
            </nav> )
            :
            (
            <nav className="hidden md:flex md:grow">
              {/* Desktop sign in links */}
              <ul className="flex grow justify-end flex-wrap items-center">
                {/* <li>
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
                </li> */}

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
            )
          }

          <MobileMenu loggedIn={loading}/>

        </div>
      </div>
    </header>
  )
}
