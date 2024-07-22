import { useEffect, useState } from "react";

import { doc, getDoc, addDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { auth, db } from "@/lib/firebase";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import TimeAgo from "./shared/Timeago";
import Navbar from "./shared/Navbar";
import Initials from "./shared/Initials";
import { useParams } from "next/navigation";
import { User, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import fetchUserData from "@/utils/fetchUserData";
import Footer from "./shared/Footer";
import DiscussionCard from "./shared/DiscussionCard";


export default function DiscussionPage() {
    const [discussion, setDiscussion] = useState<any>(null);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState<any>(null);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser as any);
        });

        return () => unsubscribe();
    }, []);


    useEffect(() => {
        if (id) {
            console.log("ID", id);
            const fetchDiscussion = async () => {
                const docRef = doc(db, "forumDiscussions", id as string);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setDiscussion({ id: docSnap.id, ...docSnap.data() });
                }
            };

            const fetchComments = () => {
                const commentsCollection = collection(db, "forumDiscussions", id as string, "comments");
                onSnapshot(commentsCollection, (snapshot) => {
                    const commentList = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setComments(commentList as any);
                });
            };

            fetchDiscussion();
            fetchComments();
        } else {
            console.error("No discussion ID provided");
        }
    }, [id]);

    const handlePostComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentUser) {
            await addDoc(collection(db, "forumDiscussions", id as string, "comments"), {
                content: commentContent,
                authorId: (currentUser as User).uid,
                createdAt: serverTimestamp(),
            });
            toast.success("Comment posted successfully!");
        } else {
            toast.error("You must be logged in to post a comment");
        }
        setCommentContent("");
    };

    const getUserData = (authorId: string) => {
        fetchUserData(authorId).then((userDataLocal) => {
            console.log(userDataLocal!.profilePicture);
            setUserData(userDataLocal);
        });
    }

    useEffect(() => {
        if (discussion) {
            getUserData(discussion.authorId);
        }
    }, [discussion]);

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <section className="py-12 px-6">
                    <div className="container mx-auto">
                        {discussion ? (
                            <DiscussionCard discussion={discussion} userData={userData} />
                        ) : (
                            <p>Loading...</p>
                        )}
                        <div className="mt-6">
                            <h2 className="text-2xl font-bold mb-4">Comments</h2>
                            <div className="space-y-4">
                                {comments.length > 0 ? (
                                    comments.map((comment: { id: string; content: string; createdAt: any }) => (
                                        <Card key={comment.id}>
                                            <CardContent>
                                                <p>{comment.content}</p>
                                                <p className="text-muted-foreground text-sm">
                                                    <TimeAgo date={comment.createdAt.toDate()} />
                                                </p>
                                            </CardContent>
                                        </Card>
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
                </section>
            </main>
            <Footer />
        </div>
    );
}
