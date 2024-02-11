"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/firebase/clientApp"; // Adjust the import path according to your project structure
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import FluxLogo from "../../../public/flux-no-bg.png";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef(null); // Ref for the menu container

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     setIsMenuVisible(false); // Close menu on route change
  //   };

  //   // // Close menu when clicking outside of it
  //   // const handleClickOutside = (event: MouseEvent) => {
  //   //   if (menuRef.current && !menuRef.current.contains(event.target)) {
  //   //     setIsMenuVisible(false);
  //   //   }
  //   // };

  //   if (isMenuVisible) {
  //     // document.addEventListener('mousedown', handleClickOutside);
  //   }

  //   return () => {
  //     // document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [isMenuVisible]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);

  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center flex-shrink-0">
            <Image src={FluxLogo} alt="Flux Logo" width={32} height={32} />
            <Link href="/" passHref className="text-2xl font-semibold whitespace-nowrap dark:text-white pl-2 cursor-pointer">Flux
            </Link>
          </div>

          {/* Hamburger menu button */}
          <button onClick={toggleMenu} className="">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {/* Menu content with centered text */}
          {isMenuVisible && (
            <div className="absolute top-full right-0 mt-2 py-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 dark:bg-gray-800 text-center">
              {user ? (
                <div className="flex flex-col">
                  <span className="px-4 py-2 text-gray-800 dark:text-white">Logged in as: {user.displayName || user.email}</span>
                  <Link href="/account-settings" passHref className="px-4 py-2 text-blue-700 hover:bg-blue-100 dark:hover:bg-gray-700">Account Settings
                  </Link>
                  <Link href="/" onClick={handleLogout}passHref className="px-4 py-2 text-red-500 hover:bg-red-100 dark:hover:bg-gray-700">Log Out
                </Link>
                  <button className="px-4 py-2 text-gray-800 dark:text-white">Translating to: Spanish</button>
                </div>
              ) : (
                <Link href="/login" passHref className="px-4 py-2 text-blue-700 hover:bg-blue-100 dark:hover:bg-gray-700">Login
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;