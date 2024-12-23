class Router {
  static instance = null;
  constructor() {
    if (Router.instance) {
      return Router.instance;
    }
    Router.instance = this;

    this.routes = new Map();

    window.addEventListener('popstate', () => {
      this.handleRoute(window.location.pathname);
    });

    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        this.navigate(link.getAttribute('href'));
      }
    });
  }

  addRoute(path, component) {
    this.routes.set(path, component);
    return this;
  }

  handleRoute(pathname) {
    const component = this.routes.get(pathname) || this.routes.get('*');
    if (component) {
      const main = document.querySelector('main');
      if (main) {
        main.innerHTML = '';
        main.appendChild(new component());
      }
    }
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRoute(path);
  }

  init() {
    this.handleRoute(window.location.pathname);
    return this;
  }
}

export const router = new Router();