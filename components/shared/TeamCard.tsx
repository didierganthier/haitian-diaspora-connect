import React from 'react'
import { Card } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'
import TwitterIcon from './icons/socials/TwitterIcon'
import LinkedinIcon from './icons/socials/LinkedinIcon'
import GitlabIcon from './icons/socials/GitlabIcon'

const TeamCard = () => {
  return (
    <Card className="bg-background rounded-lg shadow p-6 flex flex-col items-center text-center">
    <Avatar className="mb-4">
      <AvatarImage src="https://avatars.githubusercontent.com/u/45739963?v=4" />
      <AvatarFallback>DG</AvatarFallback>
    </Avatar>
    <h3 className="text-lg font-semibold">Didier Ganthier</h3>
    <p className="text-muted-foreground text-sm">Co-Founder</p>
    <div className="mt-4 flex items-center space-x-2">
      <Link href="#" className="text-primary hover:underline" prefetch={false}>
        <LinkedinIcon className="h-5 w-5" />
      </Link>
      <Link href="#" className="text-primary hover:underline" prefetch={false}>
        <TwitterIcon className="h-5 w-5" />
      </Link>
      <Link href="#" className="text-primary hover:underline" prefetch={false}>
        <GitlabIcon className="h-5 w-5" />
      </Link>
    </div>
  </Card>
  )
}

export default TeamCard