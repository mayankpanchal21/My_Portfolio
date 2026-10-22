import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

declare global {
  interface Window {
    /** Set by the inline intro script in index.html: performance.now() timestamp when the intro ends. */
    __introEnd?: number;
  }
}

function mount() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

// The intro screen lives in index.html so it paints before this bundle loads. The app mounts
// when the intro finishes, so the hero's entrance animation plays as the overlay fades out.
function finishIntro() {
  const intro = document.getElementById('intro');
  mount();
  if (!intro) return;
  intro.classList.add('intro-exit');
  window.setTimeout(() => intro.remove(), 600);
}

window.setTimeout(finishIntro, Math.max(0, (window.__introEnd ?? 0) - performance.now()));
