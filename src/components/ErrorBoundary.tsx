import React from 'react';

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?:
    | React.ReactNode
    | ((args: { error: Error; reset: () => void }) => React.ReactNode);
  onError?: (error: Error, info: React.ErrorInfo) => void;
  onReset?: () => void;
  resetKeys?: unknown[];
};

type ErrorBoundaryState = { error: Error | null };

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError?.(error, info);
  }

  reset() {
    this.setState({ error: null });
    this.props.onReset?.();
  }

  render() {
    const { error } = this.state;
    if (error) {
      const { fallback } = this.props;
      if (typeof fallback === 'function') {
        return fallback({ error, reset: this.reset });
      }
      if (fallback) return fallback;
      return (
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
          <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">
            Something went wrong
          </h2>
          <pre className="mt-2 text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
            {String(error?.message ?? error)}
          </pre>
          <button
            onClick={this.reset}
            className="mt-3 inline-flex items-center rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-3 py-2 text-sm hover:opacity-90"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
