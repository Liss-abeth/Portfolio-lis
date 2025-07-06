import React from "react";

class AdminErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error("Error boundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error is caught
      return (
        <div style={{ padding: "20px", color: "red" }}>
          <h2>Something went wrong in Admin component.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </details>
        </div>
      );
    }
    // Render children normally if no error
    return this.props.children;
  }
}

export default AdminErrorBoundary;
