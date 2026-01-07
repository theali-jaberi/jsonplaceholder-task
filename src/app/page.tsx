import { UserList, RecentPostList, RecentTodoList } from "@/components/features";

export default function Home() {
  return (
    <>
      {/* Users Section */}
      <UserList />

      {/* Divider */}
      <div className="border-t border-neutral-200 dark:border-neutral-800" />

      {/* Posts Section */}
      <RecentPostList />

      {/* Divider */}
      <div className="border-t border-neutral-200 dark:border-neutral-800" />

      {/* Todos Section */}
      <RecentTodoList />
    </>
  );
}
