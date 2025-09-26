import Navigation from "../components/Navigation";

export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-green-50 to-pink-100">
      <Navigation />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-8 border border-pink-200">
          <h1 className="text-4xl font-bold mb-8" style={{
            color: 'rgb(120, 100, 120)',
            fontFamily: 'var(--font-mochiy-pop-one), cursive'
          }}>Contact Me</h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                I'd love to hear from you! Whether you have a question about one of my posts, 
                want to collaborate on a project, or just want to say hello, feel free to reach out.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="text-blue-600 text-xl mr-4">📧</div>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600">your.email@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="text-blue-600 text-xl mr-4">🐙</div>
                  <div>
                    <p className="font-semibold text-gray-800">GitHub</p>
                    <p className="text-gray-600">github.com/yourusername</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="text-blue-600 text-xl mr-4">🐦</div>
                  <div>
                    <p className="font-semibold text-gray-800">Twitter</p>
                    <p className="text-gray-600">@yourusername</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="text-blue-600 text-xl mr-4">💼</div>
                  <div>
                    <p className="font-semibold text-gray-800">LinkedIn</p>
                    <p className="text-gray-600">linkedin.com/in/yourusername</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
