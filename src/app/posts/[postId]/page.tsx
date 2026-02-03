import { api } from "@/services/api";
import { Card, CardBody, Badge } from "@/components/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Post } from "@/types";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const id: string = postId;

  let post;
  try {
    post = await api.getPost(id);
  } catch {
    notFound();
  }

  let author;
  let authorPosts: Post[] = [];
  try {
    [author, authorPosts] = await Promise.all([
      api.getUser(post.userId),
      api.getPosts(post.userId),
    ]);
  } catch {
    author = null;
    authorPosts = [];
  }

  // Get related posts (other posts from same author)
  const relatedPosts = authorPosts.filter((p) => p.id !== post.id);

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link
        href="/posts"
        className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
      >
        <svg
          className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Posts
      </Link>

      {/* Post Header */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-amber-400 via-orange-500 to-rose-500 p-1">
        <div className="rounded-xl bg-white dark:bg-neutral-900 p-6 md:p-8">
          <div className="space-y-6">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="warning">Post #{post.id}</Badge>
              <span className="text-sm text-neutral-400 dark:text-neutral-500">
                •
              </span>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {post.body.split(" ").length} words
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-800 dark:text-neutral-100 leading-tight">
              {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
            </h1>

            {/* Author */}
            {author && (
              <Link
                href={`/users/${author.id}`}
                className="inline-flex items-center gap-3 p-3 -ml-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-neutral-700 dark:text-neutral-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {author.name}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    @{author.username} • {author.company.name}
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <Card>
        <CardBody className="p-6 md:p-8">
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 first-letter:text-5xl first-letter:font-bold first-letter:text-amber-500 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
              {post.body.charAt(0).toUpperCase() + post.body.slice(1)}
            </p>
          </article>

          {/* Tags (simulated based on content) */}
          <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-700">
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
              Topics
            </p>
            <div className="flex flex-wrap gap-2">
              {["Article", "Discussion", "Insights"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-sm text-neutral-600 dark:text-neutral-400"
                >
                  #{tag.toLowerCase()}
                </span>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Card>
          <CardBody className="p-6">
            <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              More from {author?.name || `User #${post.userId}`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedPosts.slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  href={`/posts/${p.id}`}
                  className="block p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {p.id}
                    </span>
                    <div>
                      <h3 className="font-medium text-neutral-700 dark:text-neutral-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {p.title.charAt(0).toUpperCase() + p.title.slice(1)}
                      </h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-1">
                        {p.body.charAt(0).toUpperCase() + p.body.slice(1)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
              <Link
                href={`/posts?userId=${post.userId}`}
                className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
              >
                View All User Posts
              </Link>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
