import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import MessageCircleIcon from "./shared/icons/MessageCircleIcon";
import HeartIcon from "./shared/icons/HeartIcon";
import ShareIcon from "./shared/icons/ShareIcon";
import { db } from "@/lib/firebase"; // Adjust the path as necessary
import { collection, getDocs } from "firebase/firestore";

export function HaitianDiasporaConnect() {
  const [forumDiscussions, setForumDiscussions] = useState([]);
  const [crowdfundingInitiatives, setCrowdfundingInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchForumDiscussions = async () => {
      const forumCollection = collection(db, "forumDiscussions");
      const forumSnapshot = await getDocs(forumCollection);
      const forumList = forumSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setForumDiscussions(forumList as any);
    };

    const fetchCrowdfundingInitiatives = async () => {
      const crowdfundingCollection = collection(db, "crowdfundingInitiatives");
      const crowdfundingSnapshot = await getDocs(crowdfundingCollection);
      const crowdfundingList = crowdfundingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCrowdfundingInitiatives(crowdfundingList as any);
    };

    fetchForumDiscussions();
    fetchCrowdfundingInitiatives();
    setLoading(false);
  }, []);

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
              {loading ? (
                <p>Loading...</p>
              ) : forumDiscussions.length === 0 ? (
                <p>No discussions available</p>
              ) : (
                forumDiscussions.map((discussion: any) => (
                  <Card key={discussion.id}>
                    <CardHeader>
                      <CardTitle>{discussion.title}</CardTitle>
                      <CardDescription>{discussion.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar>
                          <AvatarImage src={discussion.userAvatar || "/placeholder-user.jpg"} />
                          <AvatarFallback>{discussion.userInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{discussion.userName}</p>
                          <p className="text-muted-foreground text-sm">{discussion.timestamp}</p>
                        </div>
                      </div>
                      <p>{discussion.content}</p>
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
                ))
              )}
            </div>
          </div>
        </section>
        <section className="bg-muted py-12 px-6">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6">Crowdfunding Initiatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <p>Loading...</p>
              ) : crowdfundingInitiatives.length === 0 ? (
                <p>No crowdfunding initiatives available</p>
              ) : (
                crowdfundingInitiatives.map((initiative: any ) => (
                  <Card key={initiative.id}>
                    <CardHeader>
                      <CardTitle>{initiative.title}</CardTitle>
                      <CardDescription>{initiative.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar>
                          <AvatarImage src={initiative.userAvatar || "/placeholder-user.jpg"} />
                          <AvatarFallback>{initiative.userInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{initiative.userName}</p>
                          <p className="text-muted-foreground text-sm">{initiative.timestamp}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: initiative.progress }} />
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{initiative.amountRaised} raised</span>
                          <span>{initiative.goal} goal</span>
                        </div>
                      </div>
                      <p>{initiative.content}</p>
                    </CardContent>
                    <CardFooter>
                      <Button>Contribute</Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
