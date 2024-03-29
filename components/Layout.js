import Nav from '@/components/Nav';
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from 'react';
import Logo from './Logo';
import { FaGoogle } from "react-icons/fa";
import Spinner from './Spinner';


export default function Layout({ children }) {
  const { status, data:session } = useSession();
  const [showNav, setShowNav] = useState(false);
 useEffect(() => {
  if(session) {
    if(session.notAdmin) {
      signOut()
   }
  }
 },[session]) ;
  if(status === "unauthenticated"){
    return (
      <>
        <div className="bg-gray-300 w-screen h-screen flex items-center">
          <div className="text-center w-full flex justify-center">
            <button 
                    className="bg-white text-primary shadow-md p-2 px-4 rounded-md flex gap-2 items-center"
                    onClick={async ()=> { await signIn("google")}}>
                      <FaGoogle className=''/>
                      <strong>Log in with google</strong></button>
          </div>
        </div>
      </>
    ) 
  };

  if(status === "loading"){
    console
    return (
      <>
        <div className="bg-gray-300 w-screen h-screen flex items-center">
          <div className="text-center w-full flex justify-center">
            <div 
                 
                   >
                     <Spinner /></div>
          </div>
        </div>
      </>
    ) 
  }

  if(status === 'authenticated' && !session?.notAdmin) {
    return(
      <div className="bg-[whiteSmoke] min-h-screen">
        <div className = " md:hidden flex gap-10 items-center p-4">
          <button onClick = {() => setShowNav(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
          </button>
          <div className="flex grow justify-center mr-6">
            <Logo />
          </div>
        </div>
        <div className="flex">
          <Nav show = {showNav}/>
          <div className=' flex-grow  p-4'>
            { children }
          </div>
        </div>
  
      </div>
    )
  }
}