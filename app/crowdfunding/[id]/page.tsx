"use client";
import { useEffect, useState } from "react";
import { doc, getDoc, addDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { auth, db } from "@/lib/firebase";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { User, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import fetchUserData from "@/utils/fetchUserData";
import Navbar from "@/components/shared/Navbar";
import TimeAgo from "@/components/shared/Timeago";
import Initials from "@/components/shared/Initials";
import CommentCard from "@/components/shared/CommentCard";
import Footer from "@/components/shared/Footer";
import ContributionCard from "@/components/shared/ContributionCard";


export default function CrowdfundingPage() {
    const [campaign, setCampaign] = useState<any>(null);
    const [contributions, setContributions] = useState([]);
    const [contributionAmount, setContributionAmount] = useState("");
    const [commentContent, setCommentContent] = useState("");
    const [comments, setComments] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState<any>(null);
    const params = useParams();
    const id = params.id;

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser as any);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (id) {
            const fetchCampaign = async () => {
                const docRef = doc(db, "crowdfundingCampaigns", id as string);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setCampaign({ id: docSnap.id, ...docSnap.data() });
                }
            };

            const fetchContributions = () => {
                const contributionsCollection = collection(db, "crowdfundingCampaigns", id as string, "contributions");
                onSnapshot(contributionsCollection, (snapshot) => {
                    const contributionList = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setContributions(contributionList as any);
                });
            };

            const fetchComments = () => {
                const commentsCollection = collection(db, "crowdfundingCampaigns", id as string, "comments");
                onSnapshot(commentsCollection, (snapshot) => {
                    const commentList = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setComments(commentList as any);
                });
            };

            fetchCampaign();
            fetchContributions();
            fetchComments();
        } else {
            console.error("No campaign ID provided");
        }
    }, [id]);

    const handlePostContribution = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentUser && contributionAmount) {
            await addDoc(collection(db, "crowdfundingCampaigns", id as string, "contributions"), {
                amount: parseFloat(contributionAmount),
                contributorId: (currentUser as User).uid,
                isDeleted: false,
                createdAt: serverTimestamp(),
            });
            toast.success("Contribution posted successfully!");
            setContributionAmount("");
        } else {
            toast.error("You must be logged in and enter a valid amount to contribute");
            router.push("/sign-in");
        }
    };

    const handlePostComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentUser) {
            await addDoc(collection(db, "crowdfundingCampaigns", id as string, "comments"), {
                content: commentContent,
                authorId: (currentUser as User).uid,
                isDeleted: false,
                createdAt: serverTimestamp(),
            });
            toast.success("Comment posted successfully!");
            setCommentContent("");
        } else {
            toast.error("You must be logged in to post a comment");
        }
    };

    const getUserData = (authorId: string) => {
        fetchUserData(authorId).then((userDataLocal) => {
            setUserData(userDataLocal);
        });
    }

    useEffect(() => {
        if (campaign) {
            getUserData(campaign.authorId);
        }
    }, [campaign]);

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <section className="py-12 px-6">
                    <div className="container mx-auto">
                        {campaign ? (
                            <Card>
                                <CardHeader>
                                    <CardTitle>{campaign.title}</CardTitle>
                                    <CardDescription>
                                        <TimeAgo date={campaign.createdAt.toDate()} />
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>{campaign.description}</p>
                                </CardContent>
                                <CardFooter>
                                    <div className="flex space-x-4">
                                        <Avatar>
                                            <AvatarImage src={userData?.profilePicture ?? 'https://via.placeholder.com/150'} />
                                            <AvatarFallback>
                                                <Initials name={userData?.displayName ?? 'User'} />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p>{userData?.displayName}</p>
                                            <p>{userData?.email}</p>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        ) : (
                            <p>Loading...</p>
                        )}

                        <div className="mt-6">
                            <section className="bg-muted py-12 px-6">
                                <div className="container mx-auto max-w-4xl">
                                    <div className="mb-8 flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-bold">Contributions</h2>
                                            <p className="text-muted-foreground">View contributions made by members of the community.</p>
                                        </div>
                                    </div>
                                    {contributions.length > 0 ? (
                                        contributions.map((contribution: { id: string; amount: number; createdAt: any }) => (
                                            <ContributionCard key={contribution.id} contribution={contribution} campaignName={campaign?.title} />
                                        ))
                                    ) : (
                                        <p>No contributions yet. Be the first to contribute!</p>
                                    )}
                                </div>
                            </section>
                            <div className="mt-6">
                                <h2 className="text-2xl font-bold mb-4">Add a Contribution</h2>
                                <form className="space-y-4" onSubmit={handlePostContribution}>
                                    <div>
                                        <Input
                                            id="contributionAmount"
                                            placeholder="Enter amount"
                                            type="number"
                                            value={contributionAmount}
                                            onChange={(e) => setContributionAmount(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <Button type="submit">Post Contribution</Button>
                                    </div>
                                </form>
                            </div>

                            <div className="mt-6">
                                <h2 className="text-2xl font-bold mb-4">Comments</h2>
                                <div className="space-y-4">
                                    {comments.length > 0 ? (
                                        comments.map((comment: { id: string; content: string; createdAt: any }) => (
                                            <CommentCard key={comment.id} comment={comment} campaignId={id} />
                                        ))
                                    ) : (
                                        <p>No comments yet. Be the first to comment!</p>
                                    )}
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-2xl font-bold mb-4">Add a Comment</h2>
                                    <form className="space-y-4" onSubmit={handlePostComment}>
                                        <div>
                                            <Textarea
                                                id="comment"
                                                placeholder="Write your comment here"
                                                rows={4}
                                                value={commentContent}
                                                onChange={(e) => setCommentContent(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <Button type="submit">Post Comment</Button>
                                        </div>
                                    </form>
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
