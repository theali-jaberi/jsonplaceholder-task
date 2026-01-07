interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-800">
      <div className="w-12 h-12 mb-4 text-red-500">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
        Something went wrong
      </h3>
      <p className="text-red-600 dark:text-red-300 text-center mb-4 text-sm">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium text-sm"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

