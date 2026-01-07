import { Todo } from '@/types';
import { Card, CardBody, Badge } from '@/components/ui';
import Link from 'next/link';

interface TodoCardProps {
  todo: Todo;
}

export function TodoCard({ todo }: TodoCardProps) {
  return (
    <Link href={`/todos/${todo.id}`} className="block group">
      <Card className={`h-full ${todo.completed ? 'opacity-75' : ''} group-hover:border-emerald-300 dark:group-hover:border-emerald-700 transition-colors`}>
        <CardBody>
          <div className="flex items-start gap-3">
            {/* Checkbox Icon */}
            <div
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-110 ${
                todo.completed
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'border-neutral-300 dark:border-neutral-600'
              }`}
            >
              {todo.completed && (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>

            <div className="flex-1 min-w-0">
              {/* Title */}
              <p
                className={`text-sm leading-relaxed group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors ${
                  todo.completed
                    ? 'text-neutral-400 dark:text-neutral-500 line-through'
                    : 'text-neutral-700 dark:text-neutral-200'
                }`}
              >
                {todo.title.charAt(0).toUpperCase() + todo.title.slice(1)}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={todo.completed ? 'success' : 'warning'}>
                  {todo.completed ? 'Completed' : 'Pending'}
                </Badge>
                <span className="text-xs text-neutral-400">
                  User #{todo.userId}
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}

