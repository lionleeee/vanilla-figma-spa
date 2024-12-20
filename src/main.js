import './style.css';
import './layout/Layout.js';
document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  app.innerHTML = '<app-layout></app-layout>';
});
