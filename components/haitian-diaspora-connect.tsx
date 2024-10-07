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
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import DiscussionCard from './shared/DiscussionCard';
import fetchUserData from '@/utils/fetchUserData';
import CrowdfundingCard from './shared/CrowdFundingCard';
import { useRouter } from 'next/navigation';

export function HaitianDiasporaConnect() {
  const [forumDiscussions, setForumDiscussions] = useState([]);
  const [crowdfundingInitiatives, setCrowdfundingInitiatives] = useState([]);
  const [userDatas, setUserDatas] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const router = useRouter();
 
  useEffect(() => {
    const fetchForumDiscussions = async () => {
      const forumCollection = collection(db, "forumDiscussions");
      const forumSnapshot = await getDocs(forumCollection);
      const forumList = forumSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setForumDiscussions(forumList as any);
    };

    const fetchCrowdfundingInitiatives = async () => {
      const crowdfundingCollection = collection(db, "crowdfundingCampaigns");
      const crowdfundingSnapshot = await getDocs(crowdfundingCollection);
      const crowdfundingList = crowdfundingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCrowdfundingInitiatives(crowdfundingList as any);
    };

    fetchForumDiscussions();
    fetchCrowdfundingInitiatives();
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchDiscussions = async () => {
      const discussionsCollection = collection(db, "forumDiscussions");
      onSnapshot(discussionsCollection, async (snapshot) => {
        const discussionList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setForumDiscussions(discussionList as any);
        
        // Fetch user data for each discussion
        const userDataPromises = discussionList.map((discussion: any) => fetchUserData(discussion.authorId));
        const userDataResults = await Promise.all(userDataPromises);
        
        const userDataMap = {};
        userDataResults.forEach((userData: any, index: number) => {
          (userDataMap as any)[(discussionList[index] as any).authorId] = userData;
        });
        
        setUserDatas(userDataMap);
      });
    };
    fetchDiscussions();
  }, []);

  const handleJoinForum = () => {
    router.push("/forum");
  }

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
              <h1 className="text-3xl font-bold mb-4">Connect with the Haitian Community</h1>
              <p className="text-muted-foreground mb-6">
                Discover and engage with the Haitian diaspora around the world. Share your stories, discuss issues, and
                work together to support your community.
              </p>
              <div className="flex space-x-4">
                <Button onClick={handleJoinForum}>Join the Forum</Button>
                <Button variant="secondary" onClick={handleStartFundraiser}>Start a Fundraiser</Button>
              </div>
              <div className="my-6">
                <p className="text-lg italic">
                  &quot;Each one must give as he has decided in his heart, not reluctantly or under compulsion, for God loves a cheerful giver.&quot; 
                  <br /> - 2 Corinthians 9:7
                </p>
              </div>
              <div>
              <img
                src="/machann.jpeg"
                alt="Haitian Community"
                width={600}
                height={200}
                className="rounded-lg object-cover"
              />
            </div>
            </div>
            <div>
              <img
                src="/haitian-guy-min.jpg"
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
                  <DiscussionCard
                    key={discussion.id} 
                    discussion={discussion} 
                    userData={userDatas[discussion.authorId]} 
                  />
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
                  <CrowdfundingCard key={initiative.id} campaign={initiative} userData={userDatas[initiative.authorId]} />
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
