import {Router} from "./Router.js";

class App {
  constructor() {
    this.router = new Router();
    window.addEventListener('DOMContentLoaded', this.routeChanging.bind(this));
    window.addEventListener('popstate', this.routeChanging.bind(this));
  }

  routeChanging() {
    console.log('routeChanging сработало');
    this.router.openRoute();
  }
}

(new App());