export class SignUp {
  constructor() {
    this.buttonSubmitElement = document.getElementById('submitLogin');
    this.userNameInputElement = document.getElementById('userNameInput');
    this.emailInputElement = document.getElementById('emailInput');
    this.passwordInputElement = document.getElementById('passwordInput');
    this.repeatPasswordInputElement = document.getElementById('repeatPasswordInput');

    this.emailInputElement.addEventListener('keydown', this.preventSpace.bind(this));
    this.buttonSubmitElement.addEventListener('click', this.signUp.bind(this));
  }

  preventSpace(e) {
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  }

  validateForm() {
    let isValid = true;

    if (this.userNameInputElement.value.trim() && this.userNameInputElement.value.match(/^[А-ЯЁ][а-яё]*([-][А-ЯЁ][а-яё]*)?\s[А-ЯЁ][а-яё]*\s[А-ЯЁ][а-яё]*$/)) {
      this.userNameInputElement.classList.remove('is-invalid');
    } else {
      this.userNameInputElement.classList.add('is-invalid');
      isValid = false;
    }

    if (this.emailInputElement.value && this.emailInputElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
      this.emailInputElement.classList.remove('is-invalid');
    } else {
      this.emailInputElement.classList.add('is-invalid');
      isValid = false;
    }

    if (this.passwordInputElement.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
      this.passwordInputElement.classList.remove('is-invalid');
    } else {
      this.passwordInputElement.classList.add('is-invalid');
      isValid = false;
    }

    if (this.repeatPasswordInputElement.value && this.repeatPasswordInputElement.value === this.passwordInputElement.value) {
      this.repeatPasswordInputElement.classList.remove('is-invalid');
    } else {
      this.repeatPasswordInputElement.classList.add('is-invalid');
      isValid = false;
    }

    return isValid;
  }

  async signUp(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let splitSrt = this.userNameInputElement.value.split(' ');
      let data = {
        name: splitSrt[1],
        lastName: splitSrt[0],
        email: this.emailInputElement.value,
        password: this.passwordInputElement.value,
        passwordRepeat: this.repeatPasswordInputElement.value,
      }

      const result = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (result) {
        let res = await result.json();
        // console.log(res);
        let userData = {
          id: res.user.id,
          name: res.user.name,
          lastName: res.user.lastName,
        };
        localStorage.setItem('userSignUp', JSON.stringify(userData));

        window.location.href = "#/main"
      }

      this.userNameInputElement.value = '';
      this.emailInputElement.value = '';
      this.passwordInputElement.value = '';
      this.repeatPasswordInputElement.value = '';
    }
  }
}