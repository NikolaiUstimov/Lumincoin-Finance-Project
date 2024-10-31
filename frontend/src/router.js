import {Login} from "./components/auth/login.js";
import {SignUp} from "./components/auth/sign-up.js";
import {Logout} from "./components/auth/logout.js";
import {Main} from "./components/main.js";
import config from "./config/config.js";
import {HttpService} from "./services/http-service.js";
import {AuthUtils} from "./utils/auth-utils.js";
import {Revenue} from "./components/revenues/revenues.js";

export class Router {
  constructor() {
    this.contentPageElement = document.getElementById('content');

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
        load: () => {
          new Main();
        }
      },
      {
        route: '#/revenues',
        title: 'Доходы',
        template: 'src/templates/revenues/revenues.html',
        layout: 'src/templates/layout.html',
        styles: ['src/styles/revenues/revenues.css'],
        scripts: [],
        load: () => {
          new Revenue();
        }
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

    if (!newRoute) {
      window.location.href = "#/login";
      return;
    }

    if (newRoute.route !== '#/login' && newRoute.route !== '#/signup' && !localStorage.getItem('accessToken')) {
      window.location.href = "#/login";
      return;
    }

    this.removeCurrentResources();

    //Отрисовка страниц с layout и без него
    if (newRoute.template) {
      let content = this.contentPageElement;
      if (newRoute.layout) {
        this.contentPageElement.innerHTML = await fetch(newRoute.layout).then(response => response.text());
        content = document.getElementById('contentLayout');
      }
      content.innerHTML = await fetch(newRoute.template).then(response => response.text());

      //Подгружаем имя и баланс
      this.showBalance().then();
      this.showUserName().then();
    }

    //Подключение стилей
    if (newRoute.styles) {
      this.linkStyles(newRoute.styles);
    }

    //Подключение скриптов
    if (newRoute.scripts) {
      this.linkScripts(newRoute.scripts);
    }

    //Отображение заголовка страницы
    document.getElementById('titlePage').innerText = newRoute.title;
    if (typeof newRoute.load === 'function') {
      newRoute.load();
    }
  }

  //Отображение пользователя
  async showUserName() {
    this.userNameElement = document.querySelectorAll(".user-name");
    const userInfo = AuthUtils.getUserInfo();
    if (userInfo && this.userNameElement.length > 0) {
      this.userNameElement.forEach(el => el.innerText = userInfo.userName + " " + userInfo.userLastName);
    }
  }

  //Отображение баланса
  async showBalance() {
    this.balanceShowElement = document.querySelectorAll(".balance-number");
    try {
      const result = await HttpService.request(config.host + '/balance');
      if (result && typeof result.balance === 'number') {
        this.balanceShowElement.forEach(el => {el.innerText = result.balance});
      } else {
        throw new Error(result.message);
      }
    } catch (e) {
      console.error("Ошибка при получении баланса: ", e);
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