import { Component, ErrorInfo, ReactNode } from "react";
import ErrorPage from "./components/ErrorPage";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          type="500"
          title="Oops! Something went wrong."
          message="An error occurred while processing your request. Please try again later."
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
