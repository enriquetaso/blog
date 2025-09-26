import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "../../lib/posts";
import Navigation from "../components/Navigation";

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-green-50 to-pink-100">
      <Navigation />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{
            color: 'rgb(120, 100, 120)',
            fontFamily: 'var(--font-mochiy-pop-one), cursive'
          }}>Blog</h1>
          <p className="text-xl text-gray-600">
            Thoughts, insights, and experiences from my journey in technology
          </p>
        </div>
        
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 border border-pink-200">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex justify-end mb-2">
                  <time className="text-sm text-gray-500 px-3 py-1">{post.meta.date}</time>
                </div>
                <h2 className="text-2xl font-semibold hover:opacity-80 transition-opacity duration-200 mb-3" style={{
                  color: 'rgb(120, 100, 120)',
                  fontFamily: 'var(--font-mochiy-pop-one), cursive'
                }}>
                  {post.meta.title}
                </h2>
                {post.meta.tags && (
                  <div className="flex items-center gap-2 mb-4">
                    {post.meta.tags.split(',').map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full border border-pink-200">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-gray-600 mb-4">{post.meta.description}</p>
                <div className="flex items-center justify-end">
                  <span className="text-gray-600 hover:text-pink-500 font-medium transition-colors duration-200">Read more →</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
        
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  );
}
