import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  private retry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-8" dir="rtl">
          <div className="flex w-full max-w-2xl flex-col items-center rounded-3xl bg-card p-8 text-center shadow-sm ring-1 ring-border" role="alert">
            <AlertTriangle size={48} className="mb-6 shrink-0 text-amber-600" aria-hidden="true" />
            <h2 className="text-2xl font-black text-foreground">تعذر عرض هذه الصفحة الآن</h2>
            <p className="mt-3 max-w-lg leading-7 text-muted-foreground">لم تكتمل هذه الصفحة كما ينبغي. يمكنك المحاولة مرة أخرى، أو إعادة تحميل الموقع. إن استمرت المشكلة، تواصل مع المؤسسة عبر القنوات الرسمية.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={this.retry} className="rounded-xl border border-primary px-5 py-3 font-bold text-primary hover:bg-primary/10">محاولة مرة أخرى</button>
              <button type="button" onClick={() => window.location.reload()} className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground hover:opacity-90"><RotateCcw size={16} aria-hidden="true" />إعادة تحميل الصفحة</button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
