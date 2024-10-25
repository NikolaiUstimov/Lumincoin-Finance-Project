import config from "../../config/config.js";

export class Logout {
  constructor() {

    if (!localStorage.getItem('accessToken') || !localStorage.getItem('refreshToken')) {
      return window.location.href = '#/login';
    }

    this.logout().then();
  }

  async logout() {

    const response = await fetch(config.host + '/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: localStorage.getItem('refreshToken'),
      }),
    });
    const result = await response.json();
    console.log(result);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');

    window.location.href = "#/login";
  }
}