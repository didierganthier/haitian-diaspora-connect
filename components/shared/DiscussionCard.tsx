import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Initials from './Initials';
import TimeAgo from './Timeago';
import { Button } from '../ui/button';
import MessageCircleIcon from './icons/MessageCircleIcon';
import HeartIcon from './icons/HeartIcon';
import ShareIcon from './icons/ShareIcon';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { User, onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';


const DiscussionCard = ({ discussion, userData, detailsScreen = false }: any) => {

    const [user, setUser] = useState<User>();
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser as any);
        });

        return () => unsubscribe();
    }, []);

    const handleLike = async (id: string, user: User) => {
        if (!user) {
            return;
        }

        const docRef = doc(db, "forumDiscussions", id);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
            const discussionData = docSnapshot.data();
            const likes = discussionData.likes || [];

            if (!likes.includes(user.uid)) {
                await updateDoc(docRef, {
                    likes: [...likes, user.uid],
                });
                toast.success("Liked post!");
            } else {
                const updatedLikes = likes.filter((like: string) => like !== user.uid);
                await updateDoc(docRef, {
                    likes: updatedLikes,
                });
                toast.info("You've unliked the post!");
            }
        }
    };

    const navigateToComments = (id: string) => {
        router.push(`forum/${id}`);
    };

    const handleShare = () => {
        const shareData = {
            title: discussion.title,
            text: discussion.content,
            url: window.location.href,
        };

        if (navigator.share) {
            navigator.share(shareData).then(() => {
                toast.success("Discussion shared successfully!");
            }).catch((error) => {
                toast.error("Error sharing discussion: " + error);
            });
        } else {
            navigator.clipboard.writeText(shareData.url).then(() => {
                toast.success("Link copied to clipboard!");
            }).catch((error) => {
                toast.error("Failed to copy link: " + error);
            });
        }
    };

    const likedByUser = discussion.likes.includes(user?.uid!!);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{discussion.title}</CardTitle>
                <CardDescription>{discussion.content}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-2 mb-2">
                    <Avatar>
                        {userData ? (
                            <AvatarImage src={userData.profilePicture ?? 'https://api.dicebear.com/8.x/bottts/svg?seed=ZGlkaWVyZ2FudGhpZXJwZXJhbkBnbWFpbC5jb20&r=50&size=80'} />
                        ) : (
                            <AvatarFallback>
                                <Initials name={discussion.authorId} />
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <div>
                        {userData ? (
                            <p className="font-medium">{userData.name}</p>
                        ) : (
                            <p className="font-medium">Getting user data...</p>
                        )}
                        <p className="text-muted-foreground text-sm">
                            <TimeAgo date={discussion.createdAt.toDate()} />
                        </p>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex items-center space-x-2">
                    {!detailsScreen && (
                        <Button variant="ghost" size="icon" onClick={() => navigateToComments(discussion.id)}>
                            <MessageCircleIcon className="h-5 w-5" />
                        </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => handleLike(discussion.id, user!!)}>
                        <HeartIcon className="h-5 w-5" isLiked={likedByUser} />
                    </Button>
                    <span>{discussion.likes.length}</span>
                    <Button variant="ghost" size="icon" onClick={handleShare}>
                        <ShareIcon className="h-5 w-5" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default DiscussionCard;
