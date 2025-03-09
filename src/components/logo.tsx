import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href={'/'} className="text-xl font-bold p-1  cursor-pointer">
      <div className="flex items-center justify-center gap-2">
        <div>
          <Image
            src={'/static/logo.png'}
            height={100}
            width={100}
            alt="logo"
            className="h-10 w-10"
          />
        </div>
        <div className="text-white">Gardenia</div>
      </div>
    </Link>
  );
}
