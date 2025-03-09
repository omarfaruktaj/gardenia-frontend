'use client';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Challenges() {
  const challenges = [
    {
      id: 1,
      title: '30-Day Plant Growth Challenge',
      description:
        'Document the growth of a plant over 30 days. Share daily photos and tips!',
      startDate: '2024-10-01',
      endDate: '2024-10-31',
    },
    {
      id: 2,
      title: 'Herb Garden Challenge',
      description:
        'Grow your own herb garden. Share your progress and recipes using your herbs.',
      startDate: '2024-10-15',
      endDate: '2024-12-15',
    },
    {
      id: 3,
      title: 'Community Clean-Up Challenge',
      description:
        'Join us in cleaning up local parks and gardens. Share your before-and-after photos!',
      startDate: '2024-11-01',
      endDate: '2024-11-30',
    },
    {
      id: 4,
      title: 'Pollinator Garden Challenge',
      description:
        'Create a garden that attracts pollinators. Share photos of your plants and the pollinators!',
      startDate: '2024-10-20',
      endDate: '2024-11-30',
    },
    {
      id: 5,
      title: 'Container Gardening Challenge',
      description:
        'Grow a vegetable garden in containers. Share your setup and growth progress!',
      startDate: '2024-11-01',
      endDate: '2024-12-15',
    },
    {
      id: 6,
      title: 'Succulent Care Challenge',
      description:
        'Showcase your succulent collection. Share care tips and propagation methods!',
      startDate: '2024-10-15',
      endDate: '2024-11-15',
    },
  ];

  const onClick = () => {
    toast.info(
      'Thanks for trying to join challenge. Challenge  is currently not available.'
    );
  };
  return (
    <div className="container mx-auto py-8 min-h-screen ">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl  font-bold mb-6">
          Gardening Challenges
        </h1>
        <p className="text-muted-foreground mb-6">
          Participate in our gardening challenges to enhance your skills and
          connect with fellow gardeners. Join now and share your progress!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className=" shadow-md rounded-lg ">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold mb-2">
                {challenge.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground mb-4">
                {challenge.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">
                <strong>Start Date:</strong> {challenge.startDate} <br />
                <strong>End Date:</strong> {challenge.endDate}
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={onClick}>Join Challenge</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
