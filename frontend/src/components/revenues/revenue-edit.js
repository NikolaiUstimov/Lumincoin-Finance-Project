import {HttpService} from "../../services/http-service.js";
import config from "../../config/config.js";

export class RevenueEdit {
  constructor() {
    this.inputNameCategoryElement = document.getElementById('inputCategoryName');
    this.categorySaveElement = document.getElementById('categorySave');
    this.categorySaveBackElement = document.getElementById('categorySaveBack');
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const id = urlParams.get('id');

    this.getCategory(id).then();
    this.categorySaveElement.addEventListener('click', this.updateCategory.bind(this, id));
    this.categorySaveBackElement.addEventListener('click', (e) => {
      window.location.href = '#/revenues';
    });
  }

  async getCategory(id) {
    try {
      const result = await HttpService.request(config.host + '/categories/income/' + id, 'GET');
      if (result && !result.error) {
        this.inputNameCategoryElement.value = result.title;
      }
    } catch (e) {
      throw new Error("Ошибка получения категории " + e);
    }
  }

  validateForm() {
    let isValid = true;

    if (this.inputNameCategoryElement.value.trim()) {
      this.inputNameCategoryElement.classList.remove('is-invalid');
    } else {
      this.inputNameCategoryElement.classList.add('is-invalid');
      isValid = false;
    }

    return isValid;
  }

  async updateCategory(id) {
    if (this.validateForm()) {
      try {
        const result = await HttpService.request(config.host + '/categories/income/' + id, 'PUT', {title: this.inputNameCategoryElement.value});
        if (result && !result.error) {
          window.location.href = '#/revenues';
        }
      } catch (e) {
        throw new Error("Ошибка получения категории " + e);
      }
    }
  }
}