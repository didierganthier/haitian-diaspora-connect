"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "./shared/Navbar";
import InstagramIcon from "./shared/icons/socials/InstagramIcon";
import FacebookIcon from "./shared/icons/socials/FacebookIcon";
import TwitterIcon from "./shared/icons/socials/TwitterIcon";
import { toast } from "react-toastify";

export function ContactComponent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("https://formspree.io/f/xqazpnra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-muted py-12 px-6">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <p className="text-muted-foreground mb-6">
                  Have a question or want to get involved? Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Enter your message" className="min-h-[150px]" value={formData.message} onChange={handleChange} />
                  </div>
                  <Button type="submit">Submit</Button>
                </form>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Location</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Haitian Diaspora Connect</h3>
                    <p className="text-muted-foreground">123 Main Street, Port-au-Prince, Haiti</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 555-5555</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Email</h3>
                    <p className="text-muted-foreground">info@haitiandiasporaconnect.org</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Social Media</h3>
                    <div className="flex items-center space-x-4">
                      <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                        <TwitterIcon className="h-6 w-6" />
                      </Link>
                      <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                        <FacebookIcon className="h-6 w-6" />
                      </Link>
                      <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                        <InstagramIcon className="h-6 w-6" />
                      </Link>
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
  );
}
