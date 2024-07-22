"use client";
import { useEffect, useState } from "react";
import { collection, addDoc, serverTimestamp, onSnapshot, doc, updateDoc, increment } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "./shared/Navbar";
import ShareIcon from "./shared/icons/ShareIcon";
import { HeartIcon } from "@radix-ui/react-icons";
import MessageCircleIcon from "./shared/icons/MessageCircleIcon";
import { auth, db } from "@/lib/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import TimeAgo from "./shared/Timeago";
import Initials from "./shared/Initials";
import { toast } from "react-toastify";

export function ForumComponent() {
  const [discussions, setDiscussions] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser as any);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchDiscussions = () => {
      const discussionsCollection = collection(db, "forumDiscussions");
      onSnapshot(discussionsCollection, (snapshot) => {
        const discussionList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDiscussions(discussionList as any);
      });
    };
    fetchDiscussions();
  }, []);

  const handlePostDiscussion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      await addDoc(collection(db, "forumDiscussions"), {
        title,
        content,
        authorId: (user as User).uid,
        authorName:  (user as User).displayName ?? 'Anonymous',
        authorEmail: (user as User).email ?? 'anonymous',
        authorProfilePicture: (user as User).photoURL ?? null,
        createdAt: serverTimestamp(),
        likes: 0,
      });
    } else {
      toast.error("You must be logged in to post a discussion.");
    }
    setTitle("");
    setContent("");
    toast.success("Discussion posted successfully!");
  };

  const handleLike = async (id: string) => {
    const docRef = doc(db, "forumDiscussions", id);
    await updateDoc(docRef, {
      likes: increment(1)
    });
  };

  const navigateToComments = (id: string) => {
    router.push(`forum/${id}`);
  };

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
                <Button>Join the Forum</Button>
                <Button variant="secondary">Start a Fundraiser</Button>
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
                discussions.map((discussion: { id: string; title: string; content: string; authorName: string; authorEmail: string; authorProfilePicture: string; createdAt: any; likes: number }) => (
                  <Card key={discussion.id}>
                    <CardHeader>
                      <CardTitle>{discussion.title}</CardTitle>
                      <CardDescription>{discussion.content}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar>
                          <AvatarImage src={discussion.authorProfilePicture} />
                          <AvatarFallback>
                            <Initials name={discussion.authorName} />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{discussion.authorName}</p>
                          <p className="text-muted-foreground text-sm">
                            <TimeAgo date={discussion.createdAt.toDate()} />
                          </p>
                        </div>
                      </div>
                      <p>{discussion.authorEmail}</p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => navigateToComments(discussion.id)}>
                          <MessageCircleIcon className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleLike(discussion.id)}>
                          <HeartIcon className="h-5 w-5" />
                        </Button>
                        <span>{discussion.likes}</span>
                        <Button variant="ghost" size="icon">
                          <ShareIcon className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
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
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter a title for your discussion" value={title} onChange={(e) => setTitle(e.target.value)} />
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
