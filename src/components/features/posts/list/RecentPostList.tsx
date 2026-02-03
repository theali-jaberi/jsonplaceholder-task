"use client";

import { usePosts } from "@/hooks";
import { LoadingSpinner, ErrorDisplay, SectionHeader } from "@/components/ui";
import { PostCard } from "../card";
import Link from "next/link";
import { Post } from "@/types";

const POSTS_PER_PAGE = 6;

export function RecentPostList() {
  const { data: posts, loading, error, refetch } = usePosts();

  const displayedPosts = posts?.slice(0, POSTS_PER_PAGE);

  return (
    <section>
      <SectionHeader
        title="Posts"
        subtitle="Latest articles and updates"
        count={posts?.length}
        icon={
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        }
      />

      {loading && <LoadingSpinner />}

      {error && <ErrorDisplay message={error} onRetry={refetch} />}

      {posts && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedPosts?.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {posts.length > POSTS_PER_PAGE && (
            <div className="mt-6 text-center">
              <Link
                href="/posts"
                className="px-6 py-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors font-medium text-sm"
              >
                {`Show All ${posts.length} Posts`}
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}
