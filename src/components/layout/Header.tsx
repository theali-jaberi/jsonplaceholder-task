import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-9 h-9 rounded-lg bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-neutral-800 dark:text-neutral-100">
                DataHub
              </h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 hidden sm:block">
                JSONPlaceholder Explorer
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

