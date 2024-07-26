import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import MenuIcon from "./shared/icons/MenuIcon"
import Navbar from "./shared/Navbar"
import useAuthState from "@/app/hooks/useAuthState"
import Initials from "./shared/Initials"

export function UserProfile() {

  const user = useAuthState();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-muted py-12 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="text-muted-foreground">View and update your account information.</p>
              </div>
              <Button variant="secondary">Edit Profile</Button>
            </div>
            <div className="bg-background rounded-lg shadow p-6">
              <div className="grid gap-8">
                <div className="flex items-center space-x-6">
                  {user && <Avatar className="w-20 h-20">
                    <AvatarImage src={user.profilePicture ?? 'https://api.dicebear.com/8.x/bottts/svg?seed=ZGlkaWVyZ2FudGhpZXJwZXJhbkBnbWFpbC5jb20&r=50&size=80'} />
                    <AvatarFallback>
                      <Initials name={user!.displayName!!} />
                    </AvatarFallback>
                  </Avatar>}
                  {user && <div>
                    <h2 className="text-2xl font-bold">{user!.displayName!!}</h2>
                    <p className="text-muted-foreground">{user!.email}</p>
                  </div>}
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">About Me</h3>
                  <div className="prose">
                    <p>
                      I am a proud member of the Haitian diaspora, passionate about connecting with my roots and
                      supporting my community. I enjoy exploring Haitian cuisine, attending cultural events, and
                      engaging in discussions about the challenges and opportunities facing Haitians around the world.
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">My Contributions</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Haitian Cuisine Recipe</h4>
                        <p className="text-muted-foreground text-sm">Posted 2 days ago</p>
                      </div>
                      <Button variant="outline">View</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Crowdfunding Campaign</h4>
                        <p className="text-muted-foreground text-sm">Contributed 1 week ago</p>
                      </div>
                      <Button variant="outline">View</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Forum Discussion</h4>
                        <p className="text-muted-foreground text-sm">Posted 3 days ago</p>
                      </div>
                      <Button variant="outline">View</Button>
                    </div>
                  </div>
                </div>
              </div>
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
