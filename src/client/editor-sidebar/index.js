import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './common/Sidebar';
import ErrorBounary from './common/components/ErrorBounary';

ReactDOM.render(
  <ErrorBounary>
    <Sidebar />
  </ErrorBounary>,
  document.getElementById('index')
);
