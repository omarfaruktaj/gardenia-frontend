import Image from 'next/image';

const teamMembers = [
  {
    src: '/static/customers/customer-1.jpg',
    name: 'Sophia Johnson',
    title: 'Chief Executive Officer',
  },
  {
    src: '/static/customers/customer-2.jpg',
    name: 'Liam Martinez',
    title: 'Chief Technology Officer',
  },
  {
    src: '/static/customers/customer-3.jpg',
    name: 'Olivia Brown',
    title: 'Marketing Director',
  },
  {
    src: '/static/customers/customer-4.jpg',
    name: 'Noah Wilson',
    title: 'Lead Software Engineer',
  },
];

export default function Team() {
  return (
    <section className="mb-10">
      <div className="border rounded-xl py-12 px-6 text-center shadow-sm">
        <h2 className="text-3xl font-bold text-green-800">Meet the Team</h2>
        <p className="mt-4 text-green-700 max-w-2xl mx-auto text-base sm:text-lg">
          Our team is made up of passionate professionals dedicated to
          delivering the best results.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <Image
                height={160}
                width={160}
                className="mx-auto rounded-full shadow-md object-cover h-40 w-40"
                src={member.src}
                alt={member.name}
              />
              <h3 className="mt-4 text-lg font-semibold text-green-800">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-green-600">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
