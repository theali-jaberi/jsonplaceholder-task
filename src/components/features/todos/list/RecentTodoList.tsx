"use client";

import { useState, useMemo } from "react";
import { useTodos } from "@/hooks";
import { LoadingSpinner, ErrorDisplay, SectionHeader } from "@/components/ui";
import { TodoCard } from "../card";
import { Todo } from "@/types";
import Link from "next/link";

type FilterType = "all" | "pending" | "completed";
const TODOS_TO_SHOW = 12;

export function RecentTodoList() {
  const { data: todos, loading, error, refetch } = useTodos();
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTodos = useMemo(() => {
    if (!todos) return [];

    let filtered = todos;
    if (filter === "completed") {
      filtered = todos.filter((todo: Todo) => todo.completed);
    } else if (filter === "pending") {
      filtered = todos.filter((todo: Todo) => !todo.completed);
    }

    return filtered.slice(0, TODOS_TO_SHOW);
  }, [todos, filter]);

  const stats = useMemo(() => {
    if (!todos) return { total: 0, completed: 0, pending: 0 };
    return {
      total: todos.length,
      completed: todos.filter((t: Todo) => t.completed).length,
      pending: todos.filter((t: Todo) => !t.completed).length,
    };
  }, [todos]);

  const filterButtons: { label: string; value: FilterType; count: number }[] = [
    { label: "All", value: "all", count: stats.total },
    { label: "Pending", value: "pending", count: stats.pending },
    { label: "Completed", value: "completed", count: stats.completed },
  ];

  return (
    <section>
      <SectionHeader
        title="Todos"
        subtitle="Task management overview"
        count={stats.total}
        icon={
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        }
      />

      {loading && <LoadingSpinner />}

      {error && <ErrorDisplay message={error} onRetry={refetch} />}

      {todos && (
        <>
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === btn.value
                    ? "bg-emerald-500 text-white"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                {btn.label}
                <span className="ml-1.5 opacity-70">({btn.count})</span>
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-neutral-600 dark:text-neutral-400">
                Progress
              </span>
              <span className="text-neutral-500">
                {stats.completed} of {stats.total} completed
              </span>
            </div>
            <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-emerald-400 to-teal-500 transition-all duration-500"
                style={{ width: `${(stats.completed / stats.total) * 100}%` }}
              />
            </div>
          </div>

          {/* Todo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredTodos.map((todo: Todo) => (
              <TodoCard key={todo.id} todo={todo} />
            ))}
          </div>

          {(todos.length > TODOS_TO_SHOW && filter === "all") && (
            <div className="mt-6 text-center">
              <Link
                href="/todos"
                className="px-6 py-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors font-medium text-sm"
              >
                {`Show All ${todos.length} Posts`}
              </Link>
            </div>
          )}

          {filteredTodos.length === 0 && (
            <p className="text-center text-neutral-500 py-8">
              No {filter !== "all" ? filter : ""} todos found.
            </p>
          )}
        </>
      )}
    </section>
  );
}
