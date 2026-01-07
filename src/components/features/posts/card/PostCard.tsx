import { Post } from '@/types';
import { Card, CardBody } from '@/components/ui';
import Link from 'next/link';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="h-full">
      <CardBody>
        {/* Post Number */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
            {post.id}
          </span>
          <span className="text-xs text-neutral-400 dark:text-neutral-500">
            by User #{post.userId}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-2 line-clamp-2 leading-snug">
          {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
        </h3>

        {/* Body */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
          {post.body.charAt(0).toUpperCase() + post.body.slice(1)}
        </p>

        {/* Read More Link */}
        <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-700">
          <Link href={`/posts/${post.id}`} className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
            Read more →
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}

