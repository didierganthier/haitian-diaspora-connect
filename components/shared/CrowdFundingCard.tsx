"use client";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Initials from "./Initials";
import TimeAgo from "./Timeago";
import ShareIcon from "./icons/ShareIcon";

const CrowdfundingCard = ({ campaign, userData }: any) => {
    const router = useRouter();

    const handleDonate = () => {
        router.push(`/crowdfunding/${campaign.id}`);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{campaign.title}</CardTitle>
                <CardDescription>{campaign.description}</CardDescription>
            </CardHeader>
            <CardContent>
                {campaign.image && (
                    <div className="mb-4">
                        <img src={campaign.image} alt={campaign.title} className="w-full h-auto rounded-lg" />
                    </div>
                )}
                <div className="flex items-center space-x-2 mb-2">
                    <Avatar>
                        {userData ? (
                            <AvatarImage src={userData.profilePicture ?? 'https://api.dicebear.com/8.x/bottts/svg?seed=ZGlkaWVyZ2FudGhpZXJwZXJhbkBnbWFpbC5jb20&r=50&size=80'} />
                        ) : (
                            <AvatarFallback>
                                <Initials name={campaign.authorId} />
                            </AvatarFallback>
                        )}
                    </Avatar>
                    {userData && (
                        <div>
                            <p className="font-medium">{userData.name}</p>
                            {campaign.createdAt && (
                                <TimeAgo date={campaign.createdAt.toDate()} />
                            )}
                        </div>
                    )}
                </div>
                <p>{campaign.content}</p>
                <div className="mt-4">
                    <div className="bg-muted h-2 rounded-full">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }} />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>${campaign.raised} raised of ${campaign.goal} goal</span>
                        <span>{((campaign.raised / campaign.goal) * 100).toFixed(2)}% funded</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex items-center space-x-2">
                    <Button onClick={handleDonate}>Donate</Button>
                    <Button variant="ghost" size="icon">
                        <ShareIcon className="h-5 w-5" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default CrowdfundingCard;
