import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="">
      <div className="">
        <p>Profile</p>
      </div>
      <div className="">
        <p>Experience</p>
      </div>
      <div className="">
        <Link href={'/calculator'}>Calculator</Link>
      </div>
    </div>
  );
}
