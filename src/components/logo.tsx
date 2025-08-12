import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex items-center gap-2 py-1 justify-center lg:justify-start w-full">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-primary-foreground">
        <Image
          src={'/static/logo.png'}
          height={100}
          width={100}
          alt="logo"
          className="h-6 w-6"
        />
      </div>
      <span className="font-bold text-lg hidden xl:block">Gardenia</span>
    </div>
  );
}
