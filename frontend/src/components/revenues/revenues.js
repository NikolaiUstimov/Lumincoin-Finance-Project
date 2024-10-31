import {HttpService} from "../../services/http-service.js";
import config from "../../config/config.js";

export class Revenue {
  constructor() {
    this.cardBoxElement = document.querySelector('.card-box');
    this.showCardRevenues().then();
  }

  async showCardRevenues() {
    try {
      const result = await HttpService.request(config.host + '/categories/income');
      console.log(result);
      if (result && !result.error) {
        result.forEach(category => {
          let cardElement = document.createElement("div");
          cardElement.classList.add("card", "p-1");
          cardElement.setAttribute("data-id", category.id);
          cardElement.innerHTML = `
          <div class="card-body flex-grow-1">
            <h4 class="card-title mb-3">${category.title}</h4>
            <div class="action d-flex flex-column flex-sm-row gap-2">
              <a href="/#/revenues-edit" class="btn btn-primary">Редактировать</a>
              <button id="deleteCategory" class="btn btn-danger delete-category">Удалить</button>
            </div>
          </div>`;

          cardElement.querySelector('.delete-category').addEventListener('click', this.deleteCardRevenue.bind(this, category.id, cardElement));
          this.cardBoxElement.appendChild(cardElement);
        });

        let addCategoryElement = document.createElement("a");
        addCategoryElement.href = "/#/revenues-add";
        addCategoryElement.classList.add("btn", "btn-add-revenue", "border", "border-1");
        addCategoryElement.innerHTML = `<img src="src/static/images/svg/plus-mini-1523-svgrepo-com.svg" alt="plus" width="15px" height="15px">`;
        this.cardBoxElement.appendChild(addCategoryElement);
      }
    } catch (e) {
      throw new Error("Возникла ошибка при получении категории доходов " + e);
    }
  }

  async deleteCardRevenue(id, cardElement) {
    console.log(`Элемент ${id} будет удалён`);
  }
}