import { PostFeedList } from "@/components/features";
import AutherInfoCard from "@/components/features/users/card/AutherInfoCard";
import { api } from "@/services/api";

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ userId: string }>;
}) {
  const { userId } = await searchParams;

  let author;
  try {
    [author] = await Promise.all([api.getUser(userId)]);
  } catch {
    author = null;
  }

  return (
    <>
      {/* Author Info Card */}
      {author && <AutherInfoCard author={author} />}

      {/* Posts Section */}
      <PostFeedList userId={userId} />
    </>
  );
}
