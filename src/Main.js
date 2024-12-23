import './style.css';
import './layout/Layout.js';

import HomePage from './pages/HomePage.js';
import { router } from './Router.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  app.innerHTML = '<app-layout></app-layout>';

  router.addRoute('/', HomePage).addRoute('*', HomePage).init();
});