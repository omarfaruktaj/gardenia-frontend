import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import Mission from './_components/mission';
import Team from './_components/team';
import Vision from './_components/vision';

export default function About() {
  return (
    <div className="min-h-screen  px-4 py-8">
      <Heading
        title="About Us"
        description="Learn more about our mission, vision, and the team driving the
          gardening movement forward."
      />
      <Separator className="my-6" />

      <Mission />
      <Vision />
      <Team />
    </div>
  );
}
