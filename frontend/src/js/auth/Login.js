export class Login {
  constructor() {
    this.buttonSubmitElement = document.getElementById('submitLogin');
    this.emailInputElement = document.getElementById('emailInput');
    this.passwordInputElement = document.getElementById('passwordInput');
    this.checkInputElement = document.getElementById('flexCheckDefault');

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

      const result = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (result) {
        let res = await result.json();
        let loginData = {
          accessToken: res.tokens.accessToken,
          refreshToken: res.tokens.refreshToken,
          user: {
            userId: res.user.id,
            userName: res.user.name,
            userLastName: res.user.lastName,
          }
        }
        localStorage.setItem('accessToken', JSON.stringify(loginData.accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(loginData.refreshToken));
        localStorage.setItem('userLogin', JSON.stringify(loginData.user));

        window.location.href = "#/main"
      }

      this.emailInputElement.value = '';
      this.passwordInputElement.value = '';
      this.checkInputElement.checked = false;
    }
  }

}