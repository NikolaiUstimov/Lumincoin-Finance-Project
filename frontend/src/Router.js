import {Login} from "./js/auth/Login.js";
import {SignUp} from "./js/auth/Sign-up.js";

export class Router {
  constructor() {
    this.routes = [
      {
        route: '#/signup',
        title: 'Регистрация',
        template: 'src/templates/signup.html',
        layout: false,
        load: () => {
          new SignUp();
        }
      },
      {
        route: '#/login',
        title: 'Вход',
        template: 'src/templates/login.html',
        layout: false,
        load: () => {
          new Login();
        }
      },
      {
        route: '#/main',
        title: 'Главная',
        template: 'src/templates/main.html',
        layout: 'src/templates/layout.html',
        styles: ['src/styles/main.css'],
        scripts: ['node_modules/chart.js/dist/chart.umd.js', 'src/js/lib-chart.js'],
        load: () => {}
      },
    ];

    this.currentStyles = [];
    this.currentScripts = [];
  }

  async openRoute() {
    const hashRoute = window.location.hash;
    console.log("Текущий хеш:", hashRoute);
    const newRoute = this.routes.find(item => {
      return item.route === hashRoute;
    });

    if (!newRoute) {
      window.location.href = "#/login";
      return;
    }

    this.removeCurrentResources();
    //Отрисовка страниц с layout
    if (newRoute.layout) {
      const layoutPage = await fetch(newRoute.layout);
      const content = document.getElementById('content')
      content.innerHTML = await layoutPage.text();
    }

    //Отрисовка страниц если нет layout
    const contentContainer = newRoute.layout ? document.getElementById('content-layout') : document.getElementById('content');
    const response = await fetch(newRoute.template);
    contentContainer.innerHTML = await response.text();

    if (newRoute.styles) {
      this.linkStyles(newRoute.styles);
    }

    if (newRoute.scripts) {
      this.linkScripts(newRoute.scripts);
    }

    document.getElementById('titlePage').innerText = newRoute.title;
    if (typeof newRoute.load === 'function') {
      newRoute.load();
    }
  }

  //Подключение стилей
  linkStyles(styles) {
    const headElement = document.getElementsByTagName('head')[0];
    styles.forEach(stylePath => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = stylePath;
      headElement.appendChild(link);
      this.currentStyles.push(link);
    });
  }

  //Подключение скриптов
  linkScripts(scripts) {
    const bodyElement = document.getElementsByTagName('body')[0];
    scripts.forEach(scriptPath => {
      const script = document.createElement('script');
      script.src = scriptPath;
      bodyElement.appendChild(script);
      this.currentScripts.push(script);
    });
  }

  //Удаление стилей и скриптов
  removeCurrentResources() {
    this.currentStyles.forEach(styleElement => {
      styleElement.remove();
    });
    this.currentStyles = [];

    this.currentScripts.forEach(scriptElement => {
      scriptElement.remove();
    });
    this.currentScripts = [];
  }
}