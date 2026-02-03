'use client';

import { useUsers } from '@/hooks';
import { LoadingSpinner, ErrorDisplay, SectionHeader } from '@/components/ui';
import { UserCard } from '../card';
import { User } from '@/types';

export function UserList() {
  const { data: users, loading, error, refetch } = useUsers();

  return (
    <section>
      <SectionHeader
        title="Users"
        subtitle="Team members from the organization"
        count={users?.length}
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
          </svg>
        }
      />

      {loading && <LoadingSpinner />}
      
      {error && <ErrorDisplay message={error} onRetry={refetch} />}
      
      {users && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {users.map((user: User) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </section>
  );
}

