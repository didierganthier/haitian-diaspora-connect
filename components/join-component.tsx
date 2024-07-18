import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Navbar from "./shared/Navbar";
import { auth } from "@/lib/firebase"; // Adjust the path as necessary
import { createUserWithEmailAndPassword } from "firebase/auth";

export function JoinComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Optionally, update the user's profile with their name
      console.log("User signed up:", user);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-muted py-12 px-6">
          <div className="container mx-auto max-w-md">
            <h1 className="text-3xl font-bold mb-6">Join Haitian Diaspora Connect</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter a password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button type="submit" className="w-full">
                Join
              </Button>
            </form>
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
  );
}
