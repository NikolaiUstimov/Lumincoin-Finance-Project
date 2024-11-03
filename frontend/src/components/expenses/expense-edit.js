import {HttpService} from "../../services/http-service.js";
import config from "../../config/config.js";
import {UrlUtils} from "../../utils/urliutils.js";

export class ExpenseEdit {
  constructor() {
    this.inputNameCategoryElement = document.getElementById('inputCategoryName');
    this.categorySaveElement = document.getElementById('categorySave');
    this.categorySaveBackElement = document.getElementById('categorySaveBack');
    const id = UrlUtils.getUrlParams('id');
    if (!id) {
      window.location.href = '#/expenses';
    }

    this.getCategory(id).then();
    this.categorySaveElement.addEventListener('click', this.updateCategory.bind(this, id));
    this.categorySaveBackElement.addEventListener('click', (e) => {
      window.location.href = '#/expenses';
    });
  }

  async getCategory(id) {
    try {
      const result = await HttpService.request(config.host + '/categories/expense/' + id);
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
        const result = await HttpService.request(config.host + '/categories/expense/' + id, 'PUT', {title: this.inputNameCategoryElement.value});
        if (result && !result.error) {
          window.location.href = '#/expenses';
        }
      } catch (e) {
        throw new Error("Ошибка получения категории " + e);
      }
    }
  }
}