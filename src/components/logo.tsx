import Link from 'next/link';

export default function Logo() {
  return (
    <Link href={'/'} className="text-xl font-bold p-1 cursor-pointer">
      Gardenia
    </Link>
  );
}
