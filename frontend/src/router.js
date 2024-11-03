import {Login} from "./components/auth/login.js";
import {SignUp} from "./components/auth/sign-up.js";
import {Logout} from "./components/auth/logout.js";
import {Main} from "./components/main.js";
import config from "./config/config.js";
import {HttpService} from "./services/http-service.js";
import {AuthUtils} from "./utils/auth-utils.js";
import {Revenue} from "./components/revenues/revenues.js";
import {RevenueAdd} from "./components/revenues/revenue-add.js";
import {RevenueEdit} from "./components/revenues/revenue-edit.js";
import {Expenses} from "./components/expenses/expenses.js";
import {ExpenseAdd} from "./components/expenses/expense-add.js";
import {ExpenseEdit} from "./components/expenses/expense-edit.js";
import {AllFinance} from "./components/all-finance/all-finance.js";
import {AllFinanceEdit} from "./components/all-finance/all-finance-edit.js";

export class Router {
  constructor() {
    this.contentPageElement = document.getElementById('content');

    this.routes = [
      {
        route: '#/signup',
        title: 'Регистрация',
        template: '/templates/signup.html',
        layout: false,
        load: () => {
          new SignUp();
        }
      },
      {
        route: '#/login',
        title: 'Вход',
        template: '/templates/login.html',
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
        template: '/templates/main.html',
        layout: '/templates/layout.html',
        styles: ['/styles/main.css'],
        scripts: [],
        load: () => {
          new Main();
        }
      },
      {
        route: '#/revenues',
        title: 'Доходы',
        template: '/templates/revenues/revenues.html',
        layout: '/templates/layout.html',
        styles: ['/styles/revenues/revenues.css'],
        scripts: [],
        load: () => {
          new Revenue();
        }
      },
      {
        route: '#/revenue-add',
        title: 'Создание дохода',
        template: '/templates/revenues/revenues-add.html',
        layout: '/templates/layout.html',
        styles: ['/styles/revenues/revenues-add.css'],
        scripts: [],
        load: () => {
          new RevenueAdd();
        }
      },
      {
        route: '#/revenue-edit',
        title: 'Редактирование дохода',
        template: '/templates/revenues/revenues-edit.html',
        layout: '/templates/layout.html',
        styles: ['/styles/revenues/revenues-edit.css'],
        scripts: [],
        load: () => {
          new RevenueEdit();
        }
      },
      {
        route: '#/expenses',
        title: 'Расходы',
        template: '/templates/expenses/expenses.html',
        layout: '/templates/layout.html',
        styles: ['/styles/expenses/expenses.css'],
        scripts: [],
        load: () => {
          new Expenses();
        }
      },
      {
        route: '#/expense-add',
        title: 'Создание расхода',
        template: '/templates/expenses/expenses-add.html',
        layout: '/templates/layout.html',
        styles: ['/styles/expenses/expenses-add.css'],
        scripts: [],
        load: () => {
          new ExpenseAdd();
        }
      },
      {
        route: '#/expense-edit',
        title: 'Редактирование расхода',
        template: '/templates/expenses/expenses-edit.html',
        layout: '/templates/layout.html',
        styles: ['/styles/expenses/expenses-edit.css'],
        scripts: [],
        load: () => {
          new ExpenseEdit();
        }
      },
      {
        route: '#/all-finance',
        title: 'Доходы и Расходы',
        template: '/templates/all-finance/all-finance.html',
        layout: '/templates/layout.html',
        styles: ['/styles/all-finance/all-finance.css'],
        scripts: [],
        load: () => {
          new AllFinance();
        }
      },
      {
        route: '#/all-finance-add',
        title: 'Создание дохода/расхода',
        template: '/templates/all-finance/all-finance-add.html',
        layout: '/templates/layout.html',
        styles: ['/styles/all-finance/all-finance-add.css'],
        scripts: [],
        load: () => {}
      },
      {
        route: '#/all-finance-edit',
        title: 'Редактирование дохода/расхода',
        template: '/templates/all-finance/all-finance-edit.html',
        layout: '/templates/layout.html',
        styles: ['/styles/all-finance/all-finance-edit.css'],
        scripts: [],
        load: () => {
          new AllFinanceEdit();
        }
      },
    ];

    this.currentStyles = [];
    this.currentScripts = [];
  }

  async openRoute() {
    const hashRoute = window.location.hash.split('?')[0];
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