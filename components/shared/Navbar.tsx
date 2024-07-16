import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import MenuIcon from './icons/MenuIcon'

const Navbar = () => {
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
        <Button variant="secondary">Join</Button>
      </nav>
      <Button variant="default" className="md:hidden">
        <MenuIcon className="h-6 w-6" />
      </Button>
    </div>
  </header>
  )
}

export default Navbar