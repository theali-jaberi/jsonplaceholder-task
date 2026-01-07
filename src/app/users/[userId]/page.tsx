import { api } from "@/services/api";
import { Card, CardBody, Badge } from "@/components/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Post, Todo } from "@/types";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const id = parseInt(userId, 10);

  if (isNaN(id)) {
    notFound();
  }

  let user;
  let userPosts;
  let userTodos;

  try {
    [user, userPosts, userTodos] = await Promise.all([
      api.getUser(id),
      api.getPosts(id.toString()),
      api.getTodos(id.toString()),
    ]);
  } catch {
    notFound();
  }

  const completedTodos = userTodos.filter((t: Todo) => t.completed).length;

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link
        href="/users"
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
        Back to Users
      </Link>

      {/* User Profile Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-1">
        <div className="rounded-xl bg-white dark:bg-neutral-900 p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-violet-500/25">
              {user.name.charAt(0)}
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100">
                  {user.name}
                </h1>
                <p className="text-lg text-neutral-500 dark:text-neutral-400">
                  @{user.username}
                </p>
              </div>

              {/* Company */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="info">{user.company.name}</Badge>
                <Badge variant="default">{user.website}</Badge>
              </div>

              {/* Catchphrase */}
              <p className="text-sm italic text-neutral-500 dark:text-neutral-400 border-l-2 border-violet-300 dark:border-violet-700 pl-3">
                &quot;{user.company.catchPhrase}&quot;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Address Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Card */}
        <Card>
          <CardBody className="p-6">
            <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-violet-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-violet-600 dark:text-violet-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500">
                    Email
                  </p>
                  <p className="text-neutral-700 dark:text-neutral-200">
                    {user.email.toLowerCase()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-violet-600 dark:text-violet-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500">
                    Phone
                  </p>
                  <p className="text-neutral-700 dark:text-neutral-200">
                    {user.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-violet-600 dark:text-violet-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500">
                    Website
                  </p>
                  <p className="text-neutral-700 dark:text-neutral-200">
                    {user.website}
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Address Card */}
        <Card>
          <CardBody className="p-6">
            <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-violet-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Address
            </h2>
            <div className="space-y-2">
              <p className="text-neutral-700 dark:text-neutral-200">
                {user.address.street}, {user.address.suite}
              </p>
              <p className="text-neutral-700 dark:text-neutral-200">
                {user.address.city}, {user.address.zipcode}
              </p>
              <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-700">
                <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-1">
                  Coordinates
                </p>
                <p className="text-sm font-mono text-neutral-600 dark:text-neutral-300">
                  {user.address.geo.lat}, {user.address.geo.lng}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800/30">
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
            {userPosts.length}
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-300">Posts</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-4 border border-emerald-100 dark:border-emerald-800/30">
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {completedTodos}
          </p>
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              Completed
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-rose-100 dark:border-rose-800/30">
          <p className="text-3xl font-bold text-rose-600 dark:text-rose-400">
            {userTodos.length - completedTodos}
          </p>
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm text-rose-700 dark:text-rose-300">Pending</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-xl p-4 border border-sky-100 dark:border-sky-800/30">
          <p className="text-3xl font-bold text-sky-600 dark:text-sky-400">
            {userTodos.length}
          </p>
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm text-sky-700 dark:text-sky-300">
              Total Todos
            </p>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      {userPosts.length > 0 && (
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
              Recent Posts
              <Badge variant="warning">{userPosts.length}</Badge>
            </h2>
            <div className="space-y-3">
              {userPosts.slice(0, 5).map((post: Post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.id}`}
                  className="block p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                >
                  <h3 className="font-medium text-neutral-700 dark:text-neutral-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1">
                    {post.body.charAt(0).toUpperCase() + post.body.slice(1)}
                  </p>
                </Link>
              ))}
              <Link
                href={`/posts?userId=${user.id}`}
                className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
              >
                View All Posts
              </Link>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Other Todos from Same User */}
      {userTodos.length > 0 && (
        <Card>
          <CardBody className="p-6">
            <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Todos from {user?.name || `User #${userId}`}
              
            </h2>
            <div className="space-y-2">
              {userTodos.slice(0, 5).map((t) => (
                <Link
                  key={t.id}
                  href={`/todos/${t.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                >
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${
                      t.completed
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-neutral-300 dark:border-neutral-600"
                    }`}
                  >
                    {t.completed && (
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`flex-1 text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors ${
                      t.completed
                        ? "text-neutral-400 dark:text-neutral-500 line-through"
                        : "text-neutral-700 dark:text-neutral-200"
                    }`}
                  >
                    {t.title.charAt(0).toUpperCase() + t.title.slice(1)}
                  </span>
                </Link>
              ))}
              <Link
                href={`/todos?userId=${user.id}`}
                className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
              >
                View All Todos
              </Link>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
