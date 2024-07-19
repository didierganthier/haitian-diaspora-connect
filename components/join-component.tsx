import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Navbar from "./shared/Navbar";
import { auth, db } from "@/lib/firebase"; // Adjust the path as necessary
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export function JoinComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: user.email,
        verified: false,
      }).then(() => async () => {
        console.log("User added to Firestore");
        await sendEmailVerification(user).then(() => {
          console.log("Verification email sent");
          toast.success("Account created successfully. Please check your email to verify your account.");
        }).catch((error) => {
          toast.error("Failed to send verification email: " + error.message);
          console.error("Failed to send verification email: ", error);
        });
      }).catch((error) => {
        toast.error("Failed to create account: " + error.message);
        console.error("Failed to create account: ", error);
      });
    } catch (error: any) {
      setError(error.message);
      toast.error("Failed to sign up: " + error.message);
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
                {loading ? "Granting Access..." : "Join"}
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
