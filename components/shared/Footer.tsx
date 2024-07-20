import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-primary text-primary-foreground py-6 px-6">
            <div className="container mx-auto flex items-center justify-between">
                <p className="text-sm">&copy; 2023 Haitian Diaspora Connect</p>
                <div className="flex items-center space-x-4">
                    <Link href="#" className="hover:underline" prefetch={false}>
                        Privacy
                    </Link>
                    <Link href="#" className="hover:underline" prefetch={false}>
                        Terms
                    </Link>
                    <Link href="#" className="hover:underline" prefetch={false}>
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer