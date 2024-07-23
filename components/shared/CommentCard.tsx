import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Initials from './Initials';
import TimeAgo from './Timeago';
import { getDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import fetchUserData from '@/utils/fetchUserData';
import TrashIcon from './icons/TrashIcon'; // Assuming you have a TrashIcon component
import { onAuthStateChanged } from 'firebase/auth';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';

const CommentCard = ({ comment, discussionId }: any) => {
    const [userData, setUserData] = useState<any>(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchAndSetUserData = async () => {
            const data = await fetchUserData(comment.authorId);
            setUserData(data as any);
        };

        fetchAndSetUserData();
    }, [comment.authorId]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async () => {
        if (!user) {
            return;
        }

        if (confirm("Are you sure you want to delete this comment?")) {
            try {
                const commentRef = doc(db, "forumDiscussions", discussionId as string, "comments", comment.id);
                await updateDoc(commentRef, {
                    isDeleted: true,
                });
                toast.success("Comment deleted successfully!");
            } catch (error) {
                toast.error("Failed to delete comment.");
            }
        }
    };


    return (
        comment.isDeleted ? null : (
            <Card key={comment.id} className="mb-4 shadow-sm border border-gray-200">
                <CardContent>
                    <div className="flex items-start space-x-4 mb-4">
                        <Avatar className="flex-shrink-0">
                            {userData ? (
                                <AvatarImage src={userData.profilePicture ?? 'https://api.dicebear.com/8.x/bottts/svg?seed=ZGlkaWVyZ2FudGhpZXJwZXJhbkBnbWFpbC5jb20&r=50&size=80'} />
                            ) : (
                                <AvatarFallback>
                                    <Initials name={comment.authorId} />
                                </AvatarFallback>
                            )}
                        </Avatar>
                        <div className="flex-1">
                            {userData ? (
                                <p className="font-medium text-gray-900">{userData.name}</p>
                            ) : (
                                <p className="font-medium text-gray-900">Loading user data...</p>
                            )}
                            {comment.createdAt ? (
                                <p className="text-muted-foreground text-sm">
                                    <TimeAgo date={comment.createdAt.toDate()} />
                                </p>
                            ) : (
                                <p className="text-muted-foreground text-sm">Loading time...</p>
                            )}
                            <p className="mt-2 text-gray-700">{comment.content}</p>
                        </div>
                        {user?.uid === comment.authorId && (
                            <Button variant="ghost" size="icon" onClick={handleDelete} className="text-red-500 hover:text-red-700">
                                <TrashIcon className="h-5 w-5" />
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        )
    );
};

export default CommentCard;
