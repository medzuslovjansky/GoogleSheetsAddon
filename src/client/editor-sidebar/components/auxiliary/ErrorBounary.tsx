import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import Pre from './Pre';

type ErrorBoundaryState = {
  hasError: boolean;
  errorDetails: string;
};

export default class ErrorBoundary extends Component<any, ErrorBoundaryState> {
  private logger: GoogleAppsScript.Base.console | Console;

  constructor(props) {
    super(props);

    this.logger = console;

    this.state = {
      hasError: false,
      errorDetails: '',
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorDetails: error ? `${error.message}\n${error.stack}` : `${error}`,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.logger.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card key="errorCard" variant="outlined" color="error">
          <Pre>{this.state.errorDetails}</Pre>
        </Card>
      );
    }

    return this.props.children;
  }
}
