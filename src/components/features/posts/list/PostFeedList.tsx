'use client';

import { usePosts } from '@/hooks';
import { LoadingSpinner, ErrorDisplay, SectionHeader } from '@/components/ui';
import { PostCard } from '../card';
import { Post } from '@/types';

export function PostFeedList({userId}: {userId?: string}) {
  const { data: posts, loading, error, refetch } = usePosts(userId);

  return (
    <section>
      <SectionHeader
        title="Posts"
        subtitle="Latest articles and updates"
        count={posts?.length}
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        }
      />

      {loading && <LoadingSpinner />}
      
      {error && <ErrorDisplay message={error} onRetry={refetch} />}
      
      {posts && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts?.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

