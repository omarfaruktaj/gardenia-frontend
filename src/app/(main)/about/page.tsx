import Banner from './_components/banner';
import Mission from './_components/mission';
import Team from './_components/team';
import Vision from './_components/vision';

export default function About() {
  return (
    <div className="p-4">
      <Banner />
      <Mission />
      <Vision />
      <Team />
    </div>
  );
}
