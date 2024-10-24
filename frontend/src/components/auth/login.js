import config from "../../config/config.js";

export class Login {
  constructor() {
    this.buttonSubmitElement = document.getElementById('submitLogin');
    this.emailInputElement = document.getElementById('emailInput');
    this.passwordInputElement = document.getElementById('passwordInput');
    this.checkInputElement = document.getElementById('flexCheckDefault');

    if (localStorage.getItem('accessToken')) {
      window.location.href = '#/main';
    }

    this.emailInputElement.addEventListener('keydown', this.preventSpace.bind(this));
    this.buttonSubmitElement.addEventListener('click', this.login.bind(this));
  }

  validateForm() {

    let isValid = true;
    if (this.emailInputElement.value && this.emailInputElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
      this.emailInputElement.classList.remove('is-invalid');
    } else {
      this.emailInputElement.classList.add('is-invalid');
      isValid = false;
    }

    if (this.passwordInputElement.value) {
      this.passwordInputElement.classList.remove('is-invalid');
    } else {
      this.passwordInputElement.classList.add('is-invalid');
      isValid = false;
    }

    return isValid;
  }

  preventSpace(e) {
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  }

  async login(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let data = {
        email: this.emailInputElement.value,
        password: this.passwordInputElement.value,
        rememberMe: this.checkInputElement.checked,
      }

      const response = await fetch(config.host + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok === true) {
        const result = await response.json();
        const userData = {
          accessToken: result.tokens.accessToken,
          refreshToken: result.tokens.refreshToken,
          user: {
            userId: result.user.id,
            userName: result.user.name,
            userLastName: result.user.lastName,
          }
        }
        localStorage.setItem('accessToken', JSON.stringify(userData.accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(userData.refreshToken));
        localStorage.setItem('userInfo', JSON.stringify(userData.user));

        window.location.href = "#/main";
      } else {
        const result = await response.json();
        if (result.error) {
          console.error(result.message);
        }
      }

      this.emailInputElement.value = '';
      this.passwordInputElement.value = '';
      this.checkInputElement.checked = false;
    }
  }

}