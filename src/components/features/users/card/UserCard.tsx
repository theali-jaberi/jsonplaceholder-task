import { User } from '@/types';
import { Card, CardBody, Badge } from '@/components/ui';
import Link from 'next/link';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Link href={`/users/${user.id}`} className="block group">
      <Card className="h-full group-hover:border-violet-300 dark:group-hover:border-violet-700 transition-colors">
        <CardBody>
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shrink-0 group-hover:scale-105 transition-transform">
              {user.name.charAt(0)}
            </div>
            
            <div className="flex-1 min-w-0">
              {/* Name and Username */}
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                {user.name}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                @{user.username}
              </p>
              
              {/* Contact Info */}
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                  <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">{user.email.toLowerCase()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                  <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{user.phone.split(' ')[0]}</span>
                </div>
              </div>

              {/* Company Badge */}
              <div className="mt-3 flex items-center justify-between gap-2">
                <Badge variant="info">{user.company.name}</Badge>
                <span className="text-xs text-emerald-500 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  View profile →
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}

