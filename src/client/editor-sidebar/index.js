import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './containers/Sidebar';
import ErrorBounary from './components/auxiliary/ErrorBounary';

ReactDOM.render(
  <ErrorBounary>
    <Sidebar />
  </ErrorBounary>,
  document.getElementById('index')
);
