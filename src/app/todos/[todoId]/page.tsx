import { api } from "@/services/api";
import { Card, CardBody, Badge } from "@/components/ui";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function TodoDetailPage({
  params,
}: {
  params: Promise<{ todoId: string }>;
}) {
  const { todoId } = await params;
  const id = parseInt(todoId, 10);

  if (isNaN(id)) {
    notFound();
  }

  let todos;
  try {
    todos = await api.getTodos();
  } catch {
    notFound();
  }

  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    notFound();
  }

  let user;
  try {
    user = await api.getUser(todo.userId);
  } catch {
    user = null;
  }

  // Get other todos from the same user
  const userTodos = todos.filter(
    (t) => t.userId === todo.userId && t.id !== todo.id
  );
  const completedCount = userTodos.filter((t) => t.completed).length;
  const pendingCount = userTodos.filter((t) => !t.completed).length;

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link
        href="/todos"
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
        Back to Todos
      </Link>

      {/* Todo Detail Card */}
      <div
        className={`relative overflow-hidden rounded-2xl p-1 ${
          todo.completed
            ? "bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500"
            : "bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500"
        }`}
      >
        <div className="rounded-xl bg-white dark:bg-neutral-900 p-6 md:p-8">
          <div className="flex items-start gap-4 md:gap-6">
            {/* Status Icon */}
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${
                todo.completed
                  ? "bg-gradient-to-br from-emerald-400 to-teal-500"
                  : "bg-gradient-to-br from-amber-400 to-orange-500"
              }`}
            >
              {todo.completed ? (
                <svg
                  className="w-8 h-8 text-white"
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
              ) : (
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>

            {/* Todo Content */}
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant={todo.completed ? "success" : "warning"}>
                    {todo.completed ? "Completed" : "Pending"}
                  </Badge>
                  <span className="text-sm text-neutral-400 dark:text-neutral-500">
                    Todo #{todo.id}
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl font-semibold text-neutral-800 dark:text-neutral-100 leading-relaxed">
                  {todo.title.charAt(0).toUpperCase() + todo.title.slice(1)}
                </h1>
              </div>

              {/* Assigned User */}
              {user && (
                <Link
                  href={`/users/${user.id}`}
                  className="inline-flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400 dark:text-neutral-500">
                      Assigned to
                    </p>
                    <p className="font-medium text-neutral-700 dark:text-neutral-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {user.name}
                    </p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-sky-600 dark:text-sky-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">
              {userTodos.length + 1}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Total User Todos
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {completedCount + (todo.completed ? 1 : 0)}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Completed
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-amber-600 dark:text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {pendingCount + (todo.completed ? 0 : 1)}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Pending
            </p>
          </CardBody>
        </Card>
      </div>

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
              Other Todos from {user?.name || `User #${todo.userId}`}
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
                href={`/todos?userId=${todo.userId}`}
                className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
              >
                View All User Todos
              </Link>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
