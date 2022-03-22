import React from 'react';
import { withRouter } from 'react-router-dom';
import { shape, func, node, oneOfType, arrayOf } from 'prop-types';
import * as Sentry from '@sentry/react';
import ErrorWrap from '../components/common/ErrorWrap';
import { localStorageService } from './localStorageService';
import { Button } from '../components/atoms';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };

    this.logOutHandler = this.logOutHandler.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error(error, errorInfo);
    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  logOutHandler() {
    const { history } = this.props;
    history.push('/');
    localStorageService.clearStorage();
    window.location.reload();
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <ErrorWrap>
          <h1>Something went wrong.</h1>
          <Button onClick={this.logOutHandler}>Log out</Button>
        </ErrorWrap>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
  children: oneOfType([arrayOf(node), node]).isRequired,
};

export default withRouter(ErrorBoundary);
