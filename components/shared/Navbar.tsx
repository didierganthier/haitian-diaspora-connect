import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MenuIcon from './icons/MenuIcon';
import { auth } from "@/lib/firebase"; // Adjust the path as necessary
import { onAuthStateChanged } from "firebase/auth";
import getAvatarUrl from '@/helpers/getAvatarUrl';

const Navbar = () => {
  const [user, setUser] = useState(null as any);

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
              <img
                src={getAvatarUrl(user.email)}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              {/* <span>{user.displayName || user.email}</span> */}
            </div>
          )}
        </nav>
        <Button variant="default" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
