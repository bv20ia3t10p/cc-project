import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.getElementById('app')!;
const hydrateRoot = ReactDOM.hydrateRoot || ReactDOM.createRoot;
hydrateRoot(root, <App />);
