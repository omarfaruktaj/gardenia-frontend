import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import Mission from './_components/mission';
import Team from './_components/team';
import Vision from './_components/vision';

export default function About() {
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 bg-background p-4 lg:p-6 z-50">
        <Heading
          title="About Us"
          description="Learn more about our mission, vision, and the team driving the
          gardening movement forward."
          isLanding
        />
        <Separator className="my-2" />
      </div>
      <div className="px-4">
        <Mission />
        <Vision />
        <Team />
      </div>
    </div>
  );
}
