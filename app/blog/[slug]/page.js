import { getAllPosts, getPostBySlug } from "../../../lib/posts";
import Navigation from "../../components/Navigation";
import MermaidRenderer from "../../components/MermaidRenderer";

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-green-50 to-pink-100">
      <Navigation />
      <MermaidRenderer />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <article className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-8 border border-pink-200">
            <time className="text-gray-800 text-sm font-medium mb-6 px-4 py-2 text-right block" style={{ 
            fontFamily: 'var(--font-mochiy-pop-one), cursive'
          }}>{post.meta.date}</time>
          <h1 className="text-4xl font-bold mb-4" style={{ 
            fontFamily: 'var(--font-mochiy-pop-one), cursive',
          }}>{post.meta.title}</h1>
          <div className="flex items-center gap-4 mb-6">
            
            {post.meta.tags && (
              <div className="flex gap-2 flex-wrap">
                {post.meta.tags.split(',').map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full border border-pink-200"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div
            className="prose prose-lg max-w-none text-gray-700 prose-headings:text-pink-600 prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-code:text-pink-500 prose-code:bg-pink-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-100 prose-pre:border prose-pre:border-pink-200 prose-pre:rounded-lg prose-a:text-pink-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-pink-600 prose-blockquote:border-pink-300 prose-blockquote:bg-pink-50 prose-blockquote:italic prose-li:text-gray-600 prose-ul:text-gray-600 prose-ol:text-gray-700 prose-p:text-gray-700 prose-p:leading-relaxed"
            style={{
              '--tw-prose-headings': 'rgb(219, 39, 119)',
              '--tw-prose-h1': 'rgb(219, 39, 119)',
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </main>
  );
}

// Pre-generate static pages for each post
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
