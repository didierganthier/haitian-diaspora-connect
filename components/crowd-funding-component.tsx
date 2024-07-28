"use client";
import React, { useEffect, useRef, useState } from 'react';
import { collection, getDocs, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "./shared/Navbar";
import ShareIcon from "./shared/icons/ShareIcon";
import { auth, db } from "@/lib/firebase"; // Ensure your Firebase config and initialization are correct
import { toast } from "react-toastify";
import CrowdfundingCard from './shared/CrowdFundingCard';
import Link from 'next/link';
import Footer from './shared/Footer';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import fetchUserData from '@/utils/fetchUserData';

export function CrowdFundingComponent() {
  const [campaigns, setCampaigns] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [userDatas, setUserDatas] = useState<any>({});
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const newCampaignRef = useRef<HTMLDivElement>(null);
  const exploreCampaignsRef = useRef<HTMLDivElement>(null);

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
    const fetchCampaigns = async () => {
      const campaignsCollection = collection(db, "crowdfundingCampaigns");
      onSnapshot(campaignsCollection, async (snapshot) => {
        const campaignList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filteredCampaigns = campaignList.filter((campaign: any) => !campaign.isDeleted);
        
        setCampaigns(filteredCampaigns as any);

        const userDataPromises = campaignList.map((campaign: any) => fetchUserData(campaign.authorId));
        const userDataResults = await Promise.all(userDataPromises);

        const userDataMap = {};
        userDataResults.forEach((userData, index) => {
          (userDataMap as any)[(campaignList[index] as any).authorId] = userData;
        });

        setUserDatas(userDataMap);
      });
    };
    fetchCampaigns();
  }, []);

  const handlePostCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "crowdfundingCampaigns"), {
        title,
        description,
        goal: Number(goal),
        raised: 0,
        authorId: user.uid,
        isDeleted: false,
        createdAt: serverTimestamp(),
      });
      toast.success("Campaign started successfully!");
      setTitle("");
      setDescription("");
      setGoal("");
    } catch (error) {
      toast.error("Failed to start campaign. Please try again.");
    }
  };
  
  const scrollToNewCampaign = () => {
    if (newCampaignRef.current) {
      newCampaignRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToExploreCampaigns = () => {
    if (exploreCampaignsRef.current) {
      exploreCampaignsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-muted py-12 px-6">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-3xl font-bold mb-4">Crowdfunding for Haitian Initiatives</h1>
              <p className="text-muted-foreground mb-6">
                Support Haitian-led projects and initiatives through our crowdfunding platform. Contribute to causes
                that matter to you and the Haitian community.
              </p>
              <div className="flex space-x-4">
                <Button onClick={scrollToNewCampaign}>Start a Campaign</Button>
                <Button variant="secondary" onClick={scrollToExploreCampaigns}>Explore Campaigns</Button>
              </div>
            </div>
            <div>
              <img
                src="/haitian-crowdfunding.jpeg"
                alt="Haitian Crowdfunding"
                width={600}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </section>
        <section className="py-12 px-6">
          <div className="container mx-auto" ref={exploreCampaignsRef}>
            <h2 className="text-2xl font-bold mb-6">Featured Campaigns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.length > 0 ? (
                campaigns.map((campaign: any) => (
                  <CrowdfundingCard key={campaign.id} campaign={campaign} userData={userDatas[campaign.authorId]} />
                ))
              ) : (
                <p>No campaigns yet. Be the first to start one!</p>
              )}
            </div>
          </div>
        </section>
        <section className="bg-muted py-12 px-6">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6">Start a New Campaign</h2>
            <div className="max-w-2xl mx-auto">
              <form className="space-y-4" onSubmit={handlePostCampaign}>
                <div ref={newCampaignRef}>
                  <Label htmlFor="title">Campaign Title</Label>
                  <Input id="title" placeholder="Enter a title for your campaign" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Provide a description of your campaign" rows={6} value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="goal">Funding Goal</Label>
                  <Input id="goal" type="number" placeholder="Enter your funding goal" value={goal} onChange={(e) => setGoal(e.target.value)} />
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Start Campaign</Button>
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
