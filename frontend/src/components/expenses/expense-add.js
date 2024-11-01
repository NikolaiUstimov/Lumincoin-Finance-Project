import {HttpService} from "../../services/http-service.js";
import config from "../../config/config.js";

export class ExpenseAdd {
  constructor() {
    this.inputNameCategoryElement = document.getElementById('inputCategoryName');
    this.btnCategoryAddElement = document.getElementById('categoryAdd');
    this.btnCategoryAddBackElement = document.getElementById('categoryAddBack');

    this.btnCategoryAddElement.addEventListener('click', this.addCategory.bind(this));

    this.btnCategoryAddBackElement.addEventListener('click', () => {
      window.location.href = '#/expenses';
    });
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

  async addCategory() {
    if (this.validateForm()) {
      try {
        const result = await HttpService.request(config.host + '/categories/expense', 'POST', {title: this.inputNameCategoryElement.value});
        if (result && !result.error) {
          window.location.href = '#/expenses';
        }
      } catch (e) {
        throw new Error ("Ошибка при создании категории " + e);
      }
    }
  }
}