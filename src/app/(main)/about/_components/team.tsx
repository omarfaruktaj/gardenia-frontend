import Image from 'next/image';

const member1 = '/static/customers/customer-1.jpg';
const member2 = '/static/customers/customer-2.jpg';
const member3 = '/static/customers/customer-3.jpg';
const member4 = '/static/customers/customer-4.jpg';

const teamMembers = [
  { src: member1, name: 'Sophia Johnson', title: 'Chief Executive Officer' },
  { src: member2, name: 'Liam Martinez', title: 'Chief Technology Officer' },
  { src: member3, name: 'Olivia Brown', title: 'Marketing Director' },
  { src: member4, name: 'Noah Wilson', title: 'Lead Software Engineer' },
];

export default function Team() {
  return (
    <section className="py-16 bg-muted rounded-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold ">Meet the Team</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Our team is made up of passionate professionals dedicated to
          delivering the best results.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <Image
                height={100}
                width={100}
                className="mx-auto h-40 w-40 rounded-full shadow-lg"
                src={member.src}
                alt={member.name}
              />
              <h3 className="mt-4 text-xl font-semibold ">{member.name}</h3>
              <p className="mt-2 text-muted-foreground">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
