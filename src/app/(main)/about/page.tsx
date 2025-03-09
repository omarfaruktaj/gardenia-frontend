import { Separator } from '@/components/ui/separator';

import Mission from './_components/mission';
import Team from './_components/team';
import Vision from './_components/vision';

export default function About() {
  return (
    <div className="p-4">
      {/* <Banner /> */}
      <div className="p-4">
        <div className="space-y-4 ">
          <h2 className="text-xl font-semibold mb-4">About Us</h2>
          <Separator />
        </div>
      </div>
      <Mission />
      <Vision />
      <Team />
    </div>
  );
}
