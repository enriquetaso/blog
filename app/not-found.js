import Link from "next/link";
import Navigation from "./components/Navigation";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-green-50 to-pink-100">
      <Navigation />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-8 border border-pink-200 text-center">
          <h1 className="text-6xl font-bold mb-4" style={{
            color: 'rgb(120, 100, 120)',
            fontFamily: 'var(--font-mochiy-pop-one), cursive'
          }}>404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Sorry, the page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <Link 
            href="/"
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}
