"use client";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MenuIcon from './icons/MenuIcon';

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import getAvatarUrl from '@/helpers/getAvatarUrl';
import XIcon from './icons/XIcon';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [user, setUser] = useState(null as any);
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        if (window.location.pathname !== "/join" && window.location.pathname !== "/sign-in") {
          router.push("/join");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 shadow">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold" prefetch={false}>
          Haitian Diaspora Connect
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/forum" className="hover:underline" prefetch={false}>
            Forum
          </Link>
          <Link href="/crowdfunding" className="hover:underline" prefetch={false}>
            Crowdfunding
          </Link>
          <Link href="/about" className="hover:underline" prefetch={false}>
            About
          </Link>
          <Link href="/contact" className="hover:underline" prefetch={false}>
            Contact
          </Link>
          {!user ? (
            <Button variant="secondary">
              <Link href="/join" prefetch={false}>
                Join
              </Link>
            </Button>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/profile" className="hover:underline" prefetch={false}>
                <img
                  src={user.photoURL ?? getAvatarUrl(user.email)}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
              </Link>
            </div>
          )}
        </nav>
        <Button variant="default" className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </Button>
      </div>
      {menuOpen && (
        <nav className="md:hidden mt-4 space-y-2">
          <Link href="/forum" className="block px-4 py-2 hover:bg-gray-100" prefetch={false}>
            Forum
          </Link>
          <Link href="/crowdfunding" className="block px-4 py-2 hover:bg-gray-100" prefetch={false}>
            Crowdfunding
          </Link>
          <Link href="/about" className="block px-4 py-2 hover:bg-gray-100" prefetch={false}>
            About
          </Link>
          <Link href="/contact" className="block px-4 py-2 hover:bg-gray-100" prefetch={false}>
            Contact
          </Link>
          {!user ? (
            <Link href="/join" className="block px-4 py-2 hover:bg-gray-100" prefetch={false}>
              <Button variant="secondary" className="w-full">
                Join
              </Button>
            </Link>
          ) : (
            <div className="flex items-center space-x-4 px-4 py-2">
              <Link href="/profile" className="hover:underline" prefetch={false}>
                <img
                  src={user.photoURL ?? getAvatarUrl(user.email)}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
