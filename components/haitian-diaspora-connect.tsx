/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/LvxvUy1DUiR
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Eczar } from 'next/font/google'
import { Fraunces } from 'next/font/google'

eczar({
  subsets: ['latin'],
  display: 'swap',
})

fraunces({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { JSX, SVGProps } from "react"
import Navbar from "./shared/Navbar"

export function HaitianDiasporaConnect() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-muted py-12 px-6">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-3xl font-bold mb-4">Connect with the Haitian Community</h1>
              <p className="text-muted-foreground mb-6">
                Discover and engage with the Haitian diaspora around the world. Share your stories, discuss issues, and
                work together to support your community.
              </p>
              <div className="flex space-x-4">
                <Button>Join the Forum</Button>
                <Button variant="secondary">Start a Fundraiser</Button>
              </div>
            </div>
            <div>
              <img
                src="/haitian-community.jpeg"
                alt="Haitian Community"
                width={600}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </section>
        <section className="py-12 px-6">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6">Latest Forum Discussions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preserving Haitian Culture Abroad</CardTitle>
                  <CardDescription>
                    Discuss ways to maintain and celebrate Haitian culture in the diaspora.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-muted-foreground text-sm">2 days ago</p>
                    </div>
                  </div>
                  <p>
                    As Haitians living abroad, it&apos;s important to find ways to preserve our rich cultural heritage. What
                    are some traditions, customs, or practices you&apos;ve been able to maintain in your community?
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <MessageCircleIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <HeartIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ShareIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Improving Education in Haiti</CardTitle>
                  <CardDescription>
                    Discuss ways to support and enhance educational opportunities in Haiti.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>ML</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Marie Laguerre</p>
                      <p className="text-muted-foreground text-sm">1 week ago</p>
                    </div>
                  </div>
                  <p>
                    Education is a crucial aspect of community development in Haiti. What initiatives or programs have
                    you seen or participated in that aim to improve access to quality education for Haitian children and
                    youth?
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <MessageCircleIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <HeartIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ShareIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Empowering Haitian Women</CardTitle>
                  <CardDescription>
                    Discuss ways to support and empower Haitian women in the diaspora and in Haiti.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Sophia Aurelien</p>
                      <p className="text-muted-foreground text-sm">3 days ago</p>
                    </div>
                  </div>
                  <p>
                    Haitian women play a vital role in our communities, both locally and globally. How can we better
                    support and empower Haitian women to lead, innovate, and contribute to the betterment of our
                    communities?
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <MessageCircleIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <HeartIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ShareIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="bg-muted py-12 px-6">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6">Crowdfunding Initiatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rebuilding Schools in Haiti</CardTitle>
                  <CardDescription>
                    Help us raise funds to rebuild schools in Haiti that were damaged by natural disasters.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JB</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Jean-Baptiste Duval</p>
                      <p className="text-muted-foreground text-sm">1 month ago</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "65%" }} />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>$12,500 raised</span>
                      <span>$20,000 goal</span>
                    </div>
                  </div>
                  <p>
                    Many schools in Haiti have been damaged or destroyed by natural disasters. Your contribution will
                    help us rebuild these essential educational facilities and provide a safe learning environment for
                    Haitian children.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button>Contribute</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Support Haitian Small Businesses</CardTitle>
                  <CardDescription>
                    Help Haitian entrepreneurs and small business owners expand their operations and create more jobs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>MC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Marie Chéry</p>
                      <p className="text-muted-foreground text-sm">2 weeks ago</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "45%" }} />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>$8,000 raised</span>
                      <span>$18,000 goal</span>
                    </div>
                  </div>
                  <p>
                    Small businesses are the backbone of the Haitian economy. Your contribution will help Haitian
                    entrepreneurs access the resources and support they need to grow their businesses and create more
                    jobs in their communities.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button>Contribute</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Providing Clean Water in Haiti</CardTitle>
                  <CardDescription>
                    Help us install water filtration systems in Haitian communities to ensure access to clean, safe
                    drinking water.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JL</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Jean-Luc Desrosiers</p>
                      <p className="text-muted-foreground text-sm">3 months ago</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "82%" }} />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>$24,600 raised</span>
                      <span>$30,000 goal</span>
                    </div>
                  </div>
                  <p>
                    Access to clean water is a fundamental human right, yet many Haitian communities still lack this
                    basic necessity. Your donation will help us install water filtration systems and provide clean, safe
                    drinking water to those in need.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button>Contribute</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
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
    </div>
  )
}

function HeartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}


function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MessageCircleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}


function ShareIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  )
}


function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
