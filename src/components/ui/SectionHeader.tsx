import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  count?: number;
}

export function SectionHeader({ title, subtitle, icon, count }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {icon && (
        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white">
          {icon}
        </div>
      )}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
            {title}
          </h2>
          {count !== undefined && (
            <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-sm rounded-full">
              {count}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

