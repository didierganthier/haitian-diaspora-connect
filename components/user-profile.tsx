"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "./shared/Navbar";
import Initials from "./shared/Initials";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Footer from "./shared/Footer";
import useAuthState from "@/app/hooks/useAuthState";
import { useRouter } from "next/navigation";
import fetchCurrentUserAbout from "@/helpers/fetchCurrentUserAbout";
import { toast } from "react-toastify";
import { updateCurrentUser, updateProfile } from "firebase/auth";

export function UserProfile() {
  const user = useAuthState();
  const router = useRouter();
  const [contributions, setContributions] = useState<any[]>([]);
  const [userAbout, setUserAbout] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleLogout = async () => {
    try {
      setLoading(true);
      await auth.signOut();
      setLoading(false);
      router.push("/");
    } catch (error) {
      setLoading(false);
      console.error("Failed to logout", error);
      toast.error("Failed to logout");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      setUploading(true);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress
        },
        (error) => {
          // Handle error
          setUploading(false);
          toast.error("Failed to upload profile picture");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateDoc(doc(db, "users", user.uid), {
              profilePicture: downloadURL
            }).then(() => {
              console.log("Profile picture updated successfully in Firestore");
              updateProfile(user, {
                photoURL: downloadURL
              }).then(() => {
                setUploading(false);
                console.log("Profile picture updated successfully in Firebase Auth");
                toast.success("Profile picture updated successfully");
              }).catch(() => {
                setUploading(false);
                console.error("Failed to update profile picture in Firebase Auth");
                toast.error("Failed to update profile picture in Firebase Auth");
              });
            }).catch(() => {
              setUploading(false);
              console.error("Failed to update profile picture in Firestore");
              toast.error("Failed to update profile picture in Firestore");
            });
          });
        }
      );
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
              <div className="flex space-x-4">
                <Button variant="secondary" onClick={() => router.push("profile/edit")} className="mt-4 md:mt-0">
                  Edit Profile
                </Button>
                <Button variant="destructive" onClick={() => handleLogout()} className="mt-4 md:mt-0">
                  {loading ? "Logging out..." : "Logout"}
                </Button>
              </div>
            </div>
            <div className="bg-background rounded-lg shadow p-6">
              <div className="grid gap-8">
                <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-6 space-y-4 sm:space-y-0">
                  {user && (
                    <div className="relative">
                      <Avatar className="w-20 h-20">
                        <AvatarImage
                          src={
                            user.photoURL ??
                            "https://api.dicebear.com/8.x/bottts/svg?seed=ZGlkaWVyZ2FudGhpZXJwZXJhbkBnbWFpbC5jb20&r=50&size=80"
                          }
                        />
                        <AvatarFallback>
                          <Initials name={user!.displayName!} />
                        </AvatarFallback>
                      </Avatar>
                      <input
                        title="Upload Profile Picture"
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                      />
                      {uploading && <div className="absolute inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">Uploading...</div>}
                    </div>
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
