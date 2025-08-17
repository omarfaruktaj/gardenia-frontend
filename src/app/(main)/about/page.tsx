import { Separator } from '@/components/ui/separator';

import Mission from './_components/mission';
import Team from './_components/team';
import Vision from './_components/vision';

export default function About() {
  return (
    <div className="min-h-screen  px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-800">About Us</h1>
        <p className="mt-4 text-green-600 text-sm sm:text-base max-w-2xl mx-auto">
          Learn more about our mission, vision, and the team driving the
          gardening movement forward.
        </p>
        <div className="mt-6 flex justify-center">
          <Separator className="w-1/3 bg-green-300" />
        </div>
      </div>

      <Mission />
      <Vision />
      <Team />
    </div>
  );
}
