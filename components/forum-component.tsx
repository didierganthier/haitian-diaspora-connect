import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs, addDoc, serverTimestamp, onSnapshot, doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "./shared/Navbar";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import DiscussionCard from './shared/DiscussionCard';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import Footer from './shared/Footer';
import fetchUserData from '@/utils/fetchUserData';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export function ForumComponent() {
  const [discussions, setDiscussions] = useState([]);
  const [userDatas, setUserDatas] = useState<any>({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const newDiscussionRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const fetchDiscussions = async () => {
      const discussionsCollection = collection(db, "forumDiscussions");
      onSnapshot(discussionsCollection, async (snapshot) => {
        const discussionList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDiscussions(discussionList as any);
        
        // Fetch user data for each discussion
        const userDataPromises = discussionList.map((discussion: any) => fetchUserData(discussion.authorId));
        const userDataResults = await Promise.all(userDataPromises);
        
        const userDataMap = {};
        userDataResults.forEach((userData, index) => {
          (userDataMap as any)[(discussionList[index] as any).authorId] = userData;
        });
        
        setUserDatas(userDataMap);
      });
    };
    fetchDiscussions();
  }, []);

  const handlePostDiscussion = async (e: any) => {
    e.preventDefault();
    if (user) {
      await addDoc(collection(db, "forumDiscussions"), {
        title,
        content,
        authorId: user.uid,
        likes: [],
        isDeleted: false,
        createdAt: serverTimestamp(),
      });
      toast.success("Discussion posted successfully!");
    } else {
      toast.error("You must be logged in to post a discussion.");
      router.push('/sign-in');
    }
    setTitle("");
    setContent("");
  };

  const scrollToNewDiscussion = () => {
    if (newDiscussionRef.current) {
      newDiscussionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartFundraiser = () => {
    router.push("/crowdfunding");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-muted py-12 px-6">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-3xl font-bold mb-4">Engage with the Haitian Community</h1>
              <p className="text-muted-foreground mb-6">
                Discuss important issues, share experiences, and connect with others in the Haitian diaspora.
              </p>
              <div className="flex space-x-4">
                <Button onClick={scrollToNewDiscussion}>Join the Forum</Button>
                <Button variant="secondary" onClick={handleStartFundraiser}>Start a Fundraiser</Button>
              </div>
            </div>
            <div>
              <img
                src="/haitian-community-forum.jpeg"
                alt="Haitian Community Forum"
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
              {discussions.length > 0 ? (
                discussions.map((discussion: any) => (
                  <DiscussionCard
                    key={discussion.id} 
                    discussion={discussion} 
                    userData={userDatas[discussion.authorId]} 
                  />
                ))
              ) : (
                <p>No discussions yet. Be the first to post!</p>
              )}
            </div>
          </div>
        </section>
        <section className="bg-muted py-12 px-6">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6">Start a New Discussion</h2>
            <div className="max-w-2xl mx-auto">
              <form className="space-y-4" onSubmit={handlePostDiscussion}>
                <div ref={newDiscussionRef}>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter a title for your discussion" value={title} onChange={(e: any) => setTitle(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" placeholder="Write your discussion post here" rows={6} value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Post Discussion</Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
