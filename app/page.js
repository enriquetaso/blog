import Link from "next/link";
import MateIcon from "./components/MateIcon";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-green-50 to-pink-100 flex items-center justify-center">
      <div className="text-center">
        {/* Mate Icon */}
        <div className="mb-6">
          <div className="w-48 h-48 mx-auto mb-0">
            <MateIcon 
              width={192} 
              height={192} 
              className="w-full h-full object-contain" 
            />
          </div>
          <h1 className="text-4xl font-bold mb-6" style={{ 
            color: 'rgb(120,100,120)', 
            fontFamily: 'var(--font-mochiy-pop-one), cursive'
          }}>Sofi&apos;s Blog</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="flex justify-center items-center space-x-8">
          <Link 
            href="/blog" 
            className="text-pink-300 hover:text-pink-500 transition-colors duration-300 font-medium text-lg relative group"
          >
            Blog
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 192, 203)" strokeWidth="2">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
          <Link 
            href="/about" 
            className="text-pink-300 hover:text-pink-400 transition-colors duration-300 font-medium text-lg relative group"
          >
            About Me
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 192, 203)" strokeWidth="2">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
          <Link 
            href="/contact" 
            className="text-pink-300 hover:text-pink-500 transition-colors duration-300 font-medium text-lg relative group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>
      </div>
    </main>
  );
}