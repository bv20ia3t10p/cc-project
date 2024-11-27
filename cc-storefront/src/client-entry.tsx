// src/client-entry.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('app');
if (rootElement) {
  ReactDOM.hydrateRoot(rootElement, <App />);
}
