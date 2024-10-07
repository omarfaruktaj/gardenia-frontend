import FollowButton from '@/components/follow-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TUser, TUserExtended } from '@/types';

interface UserCardProps {
  user: TUserExtended;
  currentUser: TUser;
}

export default function UserCard({ user, currentUser }: UserCardProps) {
  return (
    <Card>
      <CardHeader className="p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <Avatar>
              <AvatarImage src={user.avatar} alt={`${user.name}'s avatar`} />
              <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <CardTitle className="text-lg md:text-xl">{user.name}</CardTitle>
              <CardDescription>{user.username}</CardDescription>
            </div>
          </div>
          <FollowButton user={user} currentUser={currentUser} />
        </div>
      </CardHeader>
    </Card>
  );
}
