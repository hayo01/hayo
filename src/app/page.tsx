import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen flex flex-col p-20 font-mono">
      <div className="flex justify-center pb-10">
        <p className="text-2xl font-extrabold">Hayoung Yang</p>
      </div>
      <div className="pb-8">
        <p className="text-xl font-bold">Skills</p>
        <p className="text-lg font-medium">
          - Korean, English
          <br />- JavaScript, TypeScript, React, Next.js, Java, etc.
          <br />- MySQL, MariaDB
          <br />- Git, Confluence, Jira, Discord, Teams, Notion, etc.
        </p>
      </div>
      <div className="">
        <p className="text-xl font-bold">What you can check</p>
        <Link href={'/calculator'} className="text-lg font-semibold underline">
          ▶ Calculator
        </Link>
      </div>
      <p className="text-lg animate-typing">▌</p>
    </div>
  );
}
