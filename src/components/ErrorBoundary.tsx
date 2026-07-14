import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="bg-[#1c2538]/60 backdrop-blur-md rounded-xl border border-[#ef4444] p-8 max-w-2xl text-center shadow-xl">
            <AlertTriangle className="w-16 h-16 text-[#ef4444] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Something Went Wrong
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              We encountered an error while loading this content. 
              This has been logged and we'll investigate the issue.
            </p>
            {this.state.error && (
              <details className="bg-[#161c2c]/60 border border-[#2d3a54] rounded-lg p-4 text-left text-xs font-mono text-gray-400 mb-6">
                <summary className="cursor-pointer text-[#9fef00] hover:text-[#8fd500] mb-2">
                  Technical Details
                </summary>
                <pre className="whitespace-pre-wrap break-words">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="bg-[#9fef00] hover:bg-[#8fd500] text-[#161c2c] font-mono font-bold text-sm px-6 py-3 rounded-lg transition-colors cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
