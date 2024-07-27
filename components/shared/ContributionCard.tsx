import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Initials from './Initials'
import fetchUserData from '@/utils/fetchUserData'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import TimeAgo from './Timeago'

const ContributionCard = ({ contribution, campaignName }: any) => {
    const [userData, setUserData] = useState<any>(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchAndSetUserData = async () => {
            const data = await fetchUserData(contribution.authorId);
            setUserData(data as any);
        };

        fetchAndSetUserData();
    }, [contribution.authorId]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);
    return (
        <div className="grid gap-6">
            <Card className="bg-background rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Avatar className="flex-shrink-0">
                            {userData ? (
                                <AvatarImage src={userData.profilePicture ?? 'https://api.dicebear.com/8.x/bottts/svg?seed=ZGlkaWVyZ2FudGhpZXJwZXJhbkBnbWFpbC5jb20&r=50&size=80'} />
                            ) : (
                                <AvatarFallback>
                                    <Initials name={contribution.authorId} />
                                </AvatarFallback>
                            )}
                        </Avatar>
                        {userData && contribution && campaignName && <div>
                            <h3 className="text-lg font-semibold">{userData.name}</h3>
                            <p className="text-muted-foreground text-sm">Donated ${contribution.amount} USD to {campaignName}</p>
                        </div>}
                    </div>
                    {contribution.createdAt ? (
                        <p className="text-muted-foreground text-sm">
                            <TimeAgo date={contribution.createdAt.toDate()} />
                        </p>
                    ) : (
                        <p className="text-muted-foreground text-sm">Loading time...</p>
                    )}
                </div>
            </Card>
        </div>
    )
}

export default ContributionCard

