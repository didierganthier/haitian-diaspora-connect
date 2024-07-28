"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "./shared/Navbar";
import Initials from "./shared/Initials";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Footer from "./shared/Footer";
import useAuthState from "@/app/hooks/useAuthState";
import { useRouter } from "next/navigation";
import fetchCurrentUserAbout from "@/helpers/fetchCurrentUserAbout";
import { toast } from "react-toastify";

export function UserProfile() {
  const user = useAuthState();
  const router = useRouter();
  const [contributions, setContributions] = useState<any>([]);
  const [userAbout, setUserAbout] = useState("");

  useEffect(() => {
    if (user) {
      fetchCurrentUserAbout(user.uid).then((about) => {
        setUserAbout(about);
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchContributions = async () => {
      if (user) {
        const forumDiscussionsQuery = query(
          collection(db, "forumDiscussions"),
          where("authorId", "==", user.uid),
          where("isDeleted", "==", false)
        );
        const crowdfundingCampaignsQuery = query(
          collection(db, "crowdfundingCampaigns"),
          where("authorId", "==", user.uid),
          where("isDeleted", "==", false)
        );

        const [forumDiscussionsSnapshot, crowdfundingCampaignsSnapshot] = await Promise.all([
          getDocs(forumDiscussionsQuery),
          getDocs(crowdfundingCampaignsQuery)
        ]);

        const forumDiscussions = forumDiscussionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          type: "forumDiscussion",
          ...doc.data()
        }));

        const crowdfundingCampaigns = crowdfundingCampaignsSnapshot.docs.map((doc) => ({
          id: doc.id,
          type: "crowdfundingCampaign",
          ...doc.data()
        }));

        setContributions([...forumDiscussions, ...crowdfundingCampaigns]);
      }
    };

    fetchContributions();
  }, [user]);

  const formatContributionType = (type: string) => {
    if (type === "forumDiscussion") {
      return "forum";
    } else if (type === "crowdfundingCampaign") {
      return "crowdfunding";
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-muted py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-8 flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="text-muted-foreground">View and update your account information.</p>
              </div>
              <Button variant="secondary" onClick={() => router.push('profile/edit')} className="mt-4 md:mt-0">
                Edit Profile
              </Button>
            </div>
            <div className="bg-background rounded-lg shadow p-6">
              <div className="grid gap-8">
                <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-6 space-y-4 sm:space-y-0">
                  {user && (
                    <Avatar className="w-20 h-20">
                      <AvatarImage
                        src={
                          user.profilePicture ??
                          'https://api.dicebear.com/8.x/bottts/svg?seed=ZGlkaWVyZ2FudGhpZXJwZXJhbkBnbWFpbC5jb20&r=50&size=80'
                        }
                      />
                      <AvatarFallback>
                        <Initials name={user!.displayName!} />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  {user && (
                    <div className="text-center sm:text-left">
                      <h2 className="text-2xl font-bold">{user!.displayName!}</h2>
                      <p className="text-muted-foreground">{user!.email}</p>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">About Me</h3>
                  <div className="prose">
                    {user && <p>{userAbout}</p>}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">My Contributions</h3>
                  <div className="space-y-4">
                    {contributions.length > 0 ? (
                      contributions.map((contribution: any) => (
                        <div key={contribution.id} className="flex flex-col sm:flex-row items-center justify-between">
                          <div className="text-center sm:text-left">
                            <h4 className="font-medium">{contribution.title}</h4>
                            <p className="text-muted-foreground text-sm">
                              Posted {new Date(contribution.createdAt.seconds * 1000).toLocaleDateString()}
                            </p>
                          </div>
                          <Link href={`/${formatContributionType(contribution.type)}/${contribution.id}`}>
                            <Button variant="outline" className="mt-2 sm:mt-0">
                              View
                            </Button>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <p>No contributions yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
