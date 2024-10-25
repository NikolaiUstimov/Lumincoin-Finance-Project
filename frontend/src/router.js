import {Login} from "./components/auth/login.js";
import {SignUp} from "./components/auth/sign-up.js";
import {Logout} from "./components/auth/logout.js";

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
        route: '#/logout',
        load: () => {
          new Logout();
        }
      },
      {
        route: '#/main',
        title: 'Главная',
        template: 'src/templates/main.html',
        layout: 'src/templates/layout.html',
        styles: ['src/styles/main.css'],
        scripts: ['node_modules/chart.js/dist/chart.umd.js', 'src/components/lib-chart.js'],
        load: () => {}
      },
      {
        route: '#/revenues',
        title: 'Доходы',
        template: 'src/templates/revenues/revenues.html',
        layout: 'src/templates/layout.html',
        styles: ['src/styles/revenues/revenues.css'],
        scripts: [],
        load: () => {}
      },
      {
        route: '#/revenues-add',
        title: 'Создание дохода',
        template: 'src/templates/revenues/revenues-add.html',
        layout: 'src/templates/layout.html',
        styles: ['src/styles/revenues/revenues-add.css'],
        scripts: [],
        load: () => {}
      },
      {
        route: '#/revenues-edit',
        title: 'Редактирование дохода',
        template: 'src/templates/revenues/revenues-edit.html',
        layout: 'src/templates/layout.html',
        styles: ['src/styles/revenues/revenues-edit.css'],
        scripts: [],
        load: () => {}
      },
      {
        route: '#/expenses',
        title: 'Расходы',
        template: 'src/templates/expenses/expenses.html',
        layout: 'src/templates/layout.html',
        styles: ['src/styles/expenses/expenses.css'],
        scripts: [],
        load: () => {}
      },
      {
        route: '#/expenses-add',
        title: 'Создание расхода',
        template: 'src/templates/expenses/expenses-add.html',
        layout: 'src/templates/layout.html',
        styles: ['src/styles/expenses/expenses-add.css'],
        scripts: [],
        load: () => {}
      },
      {
        route: '#/expenses-edit',
        title: 'Редактирование расхода',
        template: 'src/templates/expenses/expenses-edit.html',
        layout: 'src/templates/layout.html',
        styles: ['src/styles/expenses/expenses-edit.css'],
        scripts: [],
        load: () => {}
      },
      {
        route: '#/general-finance',
        title: 'Доходы и Расходы',
        template: 'src/templates/general-finance/general-finance.html',
        layout: 'src/templates/layout.html',
        styles: ['src/styles/general-finance/general-finance.css'],
        scripts: [],
        load: () => {}
      },
      {
        route: '#/general-finance-add',
        title: 'Создание дохода/расхода',
        template: 'src/templates/general-finance/general-finance-add.html',
        layout: 'src/templates/layout.html',
        styles: ['src/styles/general-finance/general-finance-add.css'],
        scripts: [],
        load: () => {}
      },
      {
        route: '#/general-finance-edit',
        title: 'Редактирование дохода/расхода',
        template: 'src/templates/general-finance/general-finance-edit.html',
        layout: 'src/templates/layout.html',
        styles: ['src/styles/general-finance/general-finance-edit.css'],
        scripts: [],
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
    console.log(newRoute);

    if (!newRoute) {
      window.location.href = "#/login";
      return;
    }

    if (newRoute.route !== '#/login' && newRoute.route !== '#/signup' && !localStorage.getItem('accessToken')) {
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