import './style.css';
import './components/layout/Layout.js';
import CanvasPage from './features/canvas/pages/CanvasPage.js';
import { router } from './core/router/Router.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  app.innerHTML = '<app-layout></app-layout>';

  router.addRoute('/', CanvasPage).addRoute('*', CanvasPage).init();
});
