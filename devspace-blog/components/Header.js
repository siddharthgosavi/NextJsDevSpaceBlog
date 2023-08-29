import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-gray-900 text-gray-100 shadow w-full">
      <div className="container mx-auto items-center flex flex-wrap p-5 flex-col md:flex-row">
        <Link href="/">
          <div className="flex md:w1/5 title-font font-medium items-center md:justify-start md">
            <Image src="/images/logo.png" width={40} height={40} alt="logo" />
            <span className="text-xl">DevSpace</span>
          </div>
        </Link>
        <nav className="flex flex-col md:w-4/5 items-center justify-end text-base md:flex-row md:ml-auto">
          <Link href="/blog" className="mx-5 cursor-pointer uppercase hover:text-indigo-300">
            Blog
          </Link>
          <Link href="/about" className="mx-5 cursor-pointer uppercase hover:text-indigo-300">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
