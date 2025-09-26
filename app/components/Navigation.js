import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-pink-200">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200">
            <Image
              src="/mate_icon.png"
              alt="Mate Icon"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
              priority
            />
            <span 
              className="text-2xl font-bold"
              style={{
                fontFamily: 'var(--font-mochiy-pop-one), cursive',
                color: 'rgb(120, 100, 120)'
              }}
            >
              Sofi&apos;s Blog
            </span>
          </Link>
          <div className="flex space-x-8">
            <Link 
              href="/blog" 
              className="text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              className="text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
            >
              About Me
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
