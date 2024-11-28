// src/server-entry.tsx
import App from '@/App';
import ReactDOMServer from 'react-dom/server';

export function render() {
  return ReactDOMServer.renderToString(<App />);
}
