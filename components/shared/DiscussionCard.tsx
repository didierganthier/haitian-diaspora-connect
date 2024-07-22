import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Initials from './Initials';
import TimeAgo from './Timeago';


const DiscussionCard = ({ discussion, userData }: any) => {
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
    </Card>
  );
};

export default DiscussionCard;
