import Navigation from "../components/Navigation";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-green-50 to-pink-100">
      <Navigation />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-8 border border-pink-200">
          <h1 className="text-4xl font-bold mb-8" style={{
            color: 'rgb(120, 100, 120)',
            fontFamily: 'var(--font-mochiy-pop-one), cursive'
          }}>About Me</h1>
          
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hello, I&apos;m a Developer</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Welcome to my corner of the internet! I&apos;m passionate about technology, 
                web development, and sharing knowledge with the community. Through this blog, 
                I aim to document my learning journey and help others along the way.
              </p>
              <p className="text-gray-600 leading-relaxed">
                When I&apos;m not coding, you can find me exploring new technologies, 
                contributing to open source projects, or enjoying a good cup of coffee 
                while reading about the latest trends in software development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
