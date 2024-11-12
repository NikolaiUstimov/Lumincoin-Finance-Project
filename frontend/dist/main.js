/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router.js */ \"./src/router.js\");\n\n\nclass App {\n  constructor() {\n    this.router = new _router_js__WEBPACK_IMPORTED_MODULE_0__.Router();\n    window.addEventListener('DOMContentLoaded', this.routeChanging.bind(this));\n    window.addEventListener('popstate', this.routeChanging.bind(this));\n  }\n\n  routeChanging() {\n    this.router.openRoute().then();\n  }\n}\n\n(new App());\n\n//# sourceURL=webpack://luminicoin-finance/./src/app.js?");

/***/ }),

/***/ "./src/components/all-finance/all-finance-add.js":
/*!*******************************************************!*\
  !*** ./src/components/all-finance/all-finance-add.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AllFinanceAdd: () => (/* binding */ AllFinanceAdd)\n/* harmony export */ });\n/* harmony import */ var _utils_urliutils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/urliutils.js */ \"./src/utils/urliutils.js\");\n/* harmony import */ var _utils_common_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/common-utils.js */ \"./src/utils/common-utils.js\");\n/* harmony import */ var _services_http_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/http-service.js */ \"./src/services/http-service.js\");\n/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/config.js */ \"./src/config/config.js\");\n\n\n\n\n\nclass AllFinanceAdd {\n  constructor() {\n    this.selectTypeElement = document.getElementById(\"selectType\");\n    this.selectCategoryElement = document.getElementById(\"selectCategory\");\n    this.inputAmountElement = document.getElementById(\"inputAmount\");\n    this.inputDateElement = document.getElementById(\"inputDate\");\n    this.inputCommentElement = document.getElementById(\"inputComment\");\n    this.btnCategoryAddElement = document.getElementById(\"categoryAdd\");\n    this.btnCategoryAddBackElement = document.getElementById(\"categoryAddBack\");\n    const type = _utils_urliutils_js__WEBPACK_IMPORTED_MODULE_0__.UrlUtils.getUrlParams('type');\n    if (!type) {\n      window.location.href = '#/all-finance';\n      return;\n    }\n\n    this.selectedType(type);\n    this.getCategoryOption(type).then();\n    this.btnCategoryAddElement.addEventListener('click', this.createCategory.bind(this));\n    this.btnCategoryAddBackElement.addEventListener('click', () => {\n      window.location.href = '#/all-finance';\n    });\n  }\n\n  //Блокировка option если выбран тот или иной тип операции\n  selectedType(type) {\n    this.selectTypeElement.querySelectorAll('option').forEach(element => {\n      if (type === element.value) {\n        element.selected = true;\n        element.removeAttribute('disabled');\n      } else {\n        element.setAttribute('disabled', 'disabled');\n      }\n    });\n  }\n\n  //Отрисовка select категорий по типу операции\n  async getCategoryOption(type) {\n    const options = await _utils_common_utils_js__WEBPACK_IMPORTED_MODULE_1__.CommonUtils.getOperationCategory(type);\n    for (let i = 0; i < options.length; i++) {\n      const option = document.createElement(\"option\");\n      option.value = options[i].title;\n      option.innerText = options[i].title;\n      option.setAttribute(\"data-id\", options[i].id);\n      this.selectCategoryElement.appendChild(option);\n    }\n  }\n\n  //Валидация полей\n  validateForm() {\n    let isValid = true;\n\n    if (this.inputAmountElement.value.trim()) {\n      this.inputAmountElement.classList.remove('is-invalid');\n    } else {\n      this.inputAmountElement.classList.add('is-invalid');\n      isValid = false;\n    }\n\n    if (this.inputDateElement.value.trim() && this.inputDateElement.value.match(/[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/)) {\n      this.inputDateElement.classList.remove('is-invalid');\n    } else {\n      this.inputDateElement.classList.add('is-invalid');\n      isValid = false;\n    }\n    return isValid;\n  }\n\n  //Получение id из атрибута выбранного option для категорий\n  getOptionCategoryId() {\n    const selectedOption = this.selectCategoryElement.querySelector(`option[value=\"${this.selectCategoryElement.value}\"]`);\n    return selectedOption ? selectedOption.getAttribute('data-id') : null;\n  }\n\n  //Запрос на создание операции\n  async createCategory() {\n    if (this.validateForm()) {\n      const categoryId = +this.getOptionCategoryId();\n      try {\n        const result = await _services_http_service_js__WEBPACK_IMPORTED_MODULE_2__.HttpService.request(_config_config_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].host + '/operations', 'POST', {\n          type: this.selectTypeElement.value,\n          amount: this.inputAmountElement.value,\n          date: this.inputDateElement.value,\n          comment: this.inputCommentElement.value,\n          category_id: categoryId\n        });\n        if (result && !result.error) {\n          window.location.href = '#/all-finance';\n        }\n      } catch (e) {\n        throw new Error(`Ошибка создания категории: ${this.selectTypeElement.textContent}`);\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack://luminicoin-finance/./src/components/all-finance/all-finance-add.js?");

/***/ }),

/***/ "./src/components/all-finance/all-finance-edit.js":
/*!********************************************************!*\
  !*** ./src/components/all-finance/all-finance-edit.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AllFinanceEdit: () => (/* binding */ AllFinanceEdit)\n/* harmony export */ });\n/* harmony import */ var _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/http-service.js */ \"./src/services/http-service.js\");\n/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/config.js */ \"./src/config/config.js\");\n/* harmony import */ var _utils_common_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/common-utils.js */ \"./src/utils/common-utils.js\");\n/* harmony import */ var _utils_urliutils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/urliutils.js */ \"./src/utils/urliutils.js\");\n\n\n\n\n\nclass AllFinanceEdit {\n  constructor() {\n    this.selectTypeElement = document.getElementById('selectType');\n    this.selectCategoryElement = document.getElementById('selectCategory');\n    this.inputAmountElement = document.getElementById('inputAmount');\n    this.inputDateElement = document.getElementById('inputDate');\n    this.inputCommentElement = document.getElementById('inputComment');\n    this.btnCategorySaveElement = document.getElementById('categorySave');\n    this.btnCategorySaveBackElement = document.getElementById('categorySaveBack');\n    const id = _utils_urliutils_js__WEBPACK_IMPORTED_MODULE_3__.UrlUtils.getUrlParams('id');\n    if (!id) {\n      window.location.href = '#/all-finance';\n      return;\n    }\n\n    this.getCategory(id).then();\n    this.btnCategorySaveElement.addEventListener('click', this.updateCategory.bind(this, id));\n    this.btnCategorySaveBackElement.addEventListener('click', () => {\n      window.location.href = '#/all-finance';\n    });\n\n    this.selectTypeElement.addEventListener('change', () => {\n      this.updateCategoryOptions().then();\n    });\n  }\n\n  //Получение категорий для select\n  async getCategoryOption(type) {\n    const options = await _utils_common_utils_js__WEBPACK_IMPORTED_MODULE_2__.CommonUtils.getOperationCategory(type);\n    this.selectCategoryElement.innerHTML = '';\n    for (let i = 0; i < options.length; i++) {\n      const option = document.createElement(\"option\");\n      option.value = options[i].title;\n      option.innerText = options[i].title;\n      option.setAttribute(\"data-id\", options[i].id);\n      this.selectCategoryElement.appendChild(option);\n    }\n  }\n\n  //Получение выбранной категории по id\n  async getCategory(id) {\n    try {\n      const result = await _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__.HttpService.request(_config_config_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].host + '/operations/' + id);\n      if (result && !result.error) {\n        this.selectTypeElement.querySelectorAll('option').forEach(element => {\n          if (result.type === element.value) {\n            element.selected = true;\n          }\n        });\n        await this.getCategoryOption(result.type);\n        this.selectCategoryElement.querySelectorAll('option').forEach(element => {\n          if (result.category === element.value) {\n            element.selected = true;\n          }\n        });\n        this.inputAmountElement.value = result.amount;\n        this.inputDateElement.value = result.date;\n        this.inputCommentElement.value = result.comment;\n      }\n    } catch (e) {\n      throw new Error(\"Ошибка получения категории \" + e);\n    }\n  }\n\n  //Если изменён тип, то меняем категории в select\n  async updateCategoryOptions() {\n    const selectedCategoryType = this.selectTypeElement.value;\n    if (selectedCategoryType) {\n      await this.getCategoryOption(selectedCategoryType);\n    }\n  }\n\n  //Валидация полей\n  validateForm() {\n    let isValid = true;\n\n    if (this.inputAmountElement.value.trim()) {\n      this.inputAmountElement.classList.remove('is-invalid');\n    } else {\n      this.inputAmountElement.classList.add('is-invalid');\n      isValid = false;\n    }\n\n    if (this.inputDateElement.value.trim() && this.inputDateElement.value.match(/[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/)) {\n      this.inputDateElement.classList.remove('is-invalid');\n    } else {\n      this.inputDateElement.classList.add('is-invalid');\n      isValid = false;\n    }\n    return isValid;\n  }\n\n  //Получение id из атрибута выбранного option для категорий\n  getOptionCategoryId() {\n    const selectedOption = this.selectCategoryElement.querySelector(`option[value=\"${this.selectCategoryElement.value}\"]`);\n    return selectedOption ? selectedOption.getAttribute('data-id') : null;\n  }\n\n  //Запрос на обновление операции\n  async updateCategory(id) {\n    if (this.validateForm()) {\n      try {\n        const categoryId = +this.getOptionCategoryId();\n\n        const result = await _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__.HttpService.request(_config_config_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].host + '/operations/' + id, 'PUT', {\n          type: this.selectTypeElement.value,\n          amount: +this.inputAmountElement.value,\n          date: this.inputDateElement.value,\n          comment: this.inputCommentElement.value,\n          category_id: categoryId,\n        });\n        if (result && !result.error) {\n          window.location.href = '#/all-finance';\n        }\n      } catch (e) {\n        throw new Error(\"Ошибка получения категории \" + e);\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack://luminicoin-finance/./src/components/all-finance/all-finance-edit.js?");

/***/ }),

/***/ "./src/components/all-finance/all-finance.js":
/*!***************************************************!*\
  !*** ./src/components/all-finance/all-finance.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AllFinance: () => (/* binding */ AllFinance)\n/* harmony export */ });\n/* harmony import */ var _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/http-service.js */ \"./src/services/http-service.js\");\n/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/config.js */ \"./src/config/config.js\");\n/* harmony import */ var _utils_common_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/common-utils.js */ \"./src/utils/common-utils.js\");\n\n\n\n\nclass AllFinance {\n  constructor() {\n    this.btnPeriodElement = document.querySelectorAll('.btn-main');\n    this.tableBodyElement = document.getElementById('tableBody');\n    this.inputFromDate = document.getElementById('inputFromDate');\n    this.inputToDate = document.getElementById('inputToDate');\n    this.modalElement = document.getElementById('modal');\n    this.modalBtnRemoveElement = document.getElementById('btnRemove');\n    this.modalBtnCancelElement = document.getElementById('btnCancel');\n    this.btnAddRevenueElement = document.getElementById('addRevenue');\n    this.btnAddExpenseElement = document.getElementById('addExpense');\n\n    this.btnAddRevenueElement.addEventListener('click', () => {\n      window.location.hash = '#/all-finance-add' + '?type=income';\n    });\n    this.btnAddExpenseElement.addEventListener('click', () => {\n      window.location.hash = '#/all-finance-add' + '?type=expense';\n    });\n    this.btnEventListener();\n    this.getPeriodData().then();\n  }\n\n  //Событие кликов по кнопкам фильтров\n  btnEventListener() {\n    this.btnPeriodElement.forEach(btn => {\n      btn.addEventListener('click', (e) => {\n        const period = e.target.getAttribute('data-period');\n\n        this.resetValidation();\n        if (period === \"interval\") {\n          if (!this.validateForm()) {\n            e.preventDefault();\n            return;\n          }\n        }\n        this.getPeriodData(period).then();\n      });\n    });\n  }\n\n  //Валидация полей\n  validateForm() {\n    let isValid = true;\n\n    if (this.inputFromDate.value) {\n      this.inputFromDate.classList.remove('is-invalid');\n    } else {\n      this.inputFromDate.classList.add('is-invalid');\n      isValid = false;\n    }\n\n    if (this.inputToDate.value) {\n      this.inputToDate.classList.remove('is-invalid');\n    } else {\n      this.inputToDate.classList.add('is-invalid');\n      isValid = false;\n    }\n    return isValid;\n  }\n\n  //Сброс валидационных сообщений\n  resetValidation() {\n    this.inputFromDate.classList.remove('is-invalid');\n    this.inputToDate.classList.remove('is-invalid');\n  }\n\n  //Получение данных по кнопкам фильтров\n  async getPeriodData(period) {\n    let url;\n    try {\n      this.tableBodyElement.innerHTML = '';\n      if (period === \"interval\") {\n        url = `${_config_config_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].host}/operations?period=interval&dateFrom=${this.inputFromDate.value}&dateTo=${this.inputToDate.value}`\n      } else if (period) {\n        url = `${_config_config_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].host}/operations?period=${period}`\n      } else {\n        url = `${_config_config_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].host}/operations`\n      }\n      const result = await _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__.HttpService.request(url);\n      if (result) {\n        this.showOperationsInTable(result);\n      }\n    } catch (e) {\n      throw new Error(\"Ошибка при запросе данных\", e);\n    }\n  }\n\n  //Отрисовка таблицы\n  showOperationsInTable(data) {\n    data.forEach((element, i) => {\n      let trElement = document.createElement(\"tr\");\n      trElement.insertCell().innerText = i + 1;\n      trElement.insertCell().innerHTML = _utils_common_utils_js__WEBPACK_IMPORTED_MODULE_2__.CommonUtils.getOperationsType(element.type);\n      trElement.insertCell().innerText = element.category;\n      trElement.insertCell().innerText = element.amount + '$';\n      trElement.insertCell().innerText = element.date.replaceAll('-', '.');\n      trElement.insertCell().innerText = element.comment;\n      trElement.insertCell().innerHTML = `\n      <button class=\"btn p-0 delete-category\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\"\n               class=\"bi bi-trash3\" viewBox=\"0 0 16 16\">\n            <path\n                d=\"M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5\"/>\n          </svg>\n        </button>\n        <a href=\"#/all-finance-edit?id=${element.id}\" class=\"btn p-0\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\"\n               class=\"bi bi-pencil\" viewBox=\"0 0 16 16\">\n            <path\n                d=\"M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325\"/>\n          </svg>\n        </a>\n      `;\n\n      //Событие клика по кнопке удаления строки таблицы\n      trElement.querySelector('.delete-category').addEventListener('click', () => {\n        this.modalElement.classList.add('open');\n\n        this.modalBtnRemoveElement.onclick = () => {\n          this.deleteCategory(element.id, trElement).then();\n          this.modalElement.classList.remove('open');\n        }\n\n        this.modalBtnCancelElement.onclick = () => {\n          this.modalElement.classList.remove('open');\n        }\n      });\n\n      this.tableBodyElement.appendChild(trElement);\n    });\n  }\n\n  //Запрос на удаление операции\n  async deleteCategory(id, trElement) {\n    try {\n      const result = await _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__.HttpService.request(_config_config_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].host + '/operations/' + id, 'DELETE');\n      if (result) {\n        trElement.remove();\n      } else {\n        throw new Error(result.message);\n      }\n    } catch (e) {\n      throw new Error(\"Ошибка удаления категории \" + e);\n    }\n  }\n}\n\n//# sourceURL=webpack://luminicoin-finance/./src/components/all-finance/all-finance.js?");

/***/ }),

/***/ "./src/components/auth/login.js":
/*!**************************************!*\
  !*** ./src/components/auth/login.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Login: () => (/* binding */ Login)\n/* harmony export */ });\n/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config/config.js */ \"./src/config/config.js\");\n/* harmony import */ var _utils_auth_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/auth-utils.js */ \"./src/utils/auth-utils.js\");\n/* harmony import */ var _services_auth_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth-service.js */ \"./src/services/auth-service.js\");\n\n\n\n\nclass Login {\n  constructor() {\n    this.buttonSubmitElement = document.getElementById('submitLogin');\n    this.emailInputElement = document.getElementById('emailInput');\n    this.passwordInputElement = document.getElementById('passwordInput');\n    this.checkInputElement = document.getElementById('flexCheckDefault');\n\n    if (localStorage.getItem(_utils_auth_utils_js__WEBPACK_IMPORTED_MODULE_1__.AuthUtils.accessTokenKey)) {\n      window.location.href = '#/main';\n      return;\n    }\n\n    if (localStorage.getItem('userEmail')) {\n      this.emailInputElement.value = JSON.parse(localStorage.getItem('userEmail'));\n    } else {\n      this.emailInputElement.value = '';\n    }\n\n    this.emailInputElement.addEventListener('keydown', this.preventSpace.bind(this));\n    this.buttonSubmitElement.addEventListener('click', this.login.bind(this));\n  }\n\n  validateForm() {\n\n    let isValid = true;\n    if (this.emailInputElement.value && this.emailInputElement.value.match(/^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/)) {\n      this.emailInputElement.classList.remove('is-invalid');\n    } else {\n      this.emailInputElement.classList.add('is-invalid');\n      isValid = false;\n    }\n\n    if (this.passwordInputElement.value) {\n      this.passwordInputElement.classList.remove('is-invalid');\n    } else {\n      this.passwordInputElement.classList.add('is-invalid');\n      isValid = false;\n    }\n\n    return isValid;\n  }\n\n  //Запрет ввода пробелов\n  preventSpace(e) {\n    if (e.keyCode === 32) {\n      e.preventDefault();\n    }\n  }\n\n  //Вход в систему\n  async login(e) {\n    e.preventDefault();\n    if (this.validateForm()) {\n      let data = {\n        email: this.emailInputElement.value,\n        password: this.passwordInputElement.value,\n        rememberMe: this.checkInputElement.checked,\n      }\n\n      try {\n        const result = await _services_auth_service_js__WEBPACK_IMPORTED_MODULE_2__.AuthService.request(_config_config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].host + '/login', 'POST', data);\n\n        if (result) {\n          if (result.error || !result.tokens || !result.user) {\n            throw new Error(result.message);\n          }\n          const userData = {\n            accessToken: result.tokens.accessToken,\n            refreshToken: result.tokens.refreshToken,\n            user: {\n              userId: result.user.id,\n              userName: result.user.name,\n              userLastName: result.user.lastName,\n            }\n          }\n          _utils_auth_utils_js__WEBPACK_IMPORTED_MODULE_1__.AuthUtils.setTokenKey(userData.accessToken, userData.refreshToken);\n          _utils_auth_utils_js__WEBPACK_IMPORTED_MODULE_1__.AuthUtils.setUserInfo(userData.user);\n\n          localStorage.removeItem('userEmail');\n          window.location.href = \"#/main\";\n        }\n      } catch (e) {\n        throw new Error(e);\n      }\n\n      this.emailInputElement.value = '';\n      this.passwordInputElement.value = '';\n      this.checkInputElement.checked = false;\n    }\n  }\n}\n\n//# sourceURL=webpack://luminicoin-finance/./src/components/auth/login.js?");

/***/ }),

/***/ "./src/components/auth/logout.js":
/*!***************************************!*\
  !*** ./src/components/auth/logout.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Logout: () => (/* binding */ Logout)\n/* harmony export */ });\n/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config/config.js */ \"./src/config/config.js\");\n/* harmony import */ var _utils_auth_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/auth-utils.js */ \"./src/utils/auth-utils.js\");\n/* harmony import */ var _services_auth_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth-service.js */ \"./src/services/auth-service.js\");\n\n\n\n\nclass Logout {\n  constructor() {\n    if (!localStorage.getItem(_utils_auth_utils_js__WEBPACK_IMPORTED_MODULE_1__.AuthUtils.accessTokenKey) || !localStorage.getItem(_utils_auth_utils_js__WEBPACK_IMPORTED_MODULE_1__.AuthUtils.refreshTokenKey)) {\n      return window.location.href = '#/login';\n    }\n    this.logout().then();\n  }\n\n  async logout() {\n    await _services_auth_service_js__WEBPACK_IMPORTED_MODULE_2__.AuthService.request(_config_config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].host + '/logout', 'POST', {refreshToken: localStorage.getItem(_utils_auth_utils_js__WEBPACK_IMPORTED_MODULE_1__.AuthUtils.refreshTokenKey)});\n    _utils_auth_utils_js__WEBPACK_IMPORTED_MODULE_1__.AuthUtils.removeUserData();\n    window.location.href = \"#/login\";\n  }\n}\n\n//# sourceURL=webpack://luminicoin-finance/./src/components/auth/logout.js?");

/***/ }),

/***/ "./src/components/auth/sign-up.js":
/*!****************************************!*\
  !*** ./src/components/auth/sign-up.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SignUp: () => (/* binding */ SignUp)\n/* harmony export */ });\n/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config/config.js */ \"./src/config/config.js\");\n/* harmony import */ var _services_auth_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/auth-service.js */ \"./src/services/auth-service.js\");\n/* harmony import */ var _utils_auth_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/auth-utils.js */ \"./src/utils/auth-utils.js\");\n\n\n\n\nclass SignUp {\n  constructor() {\n    this.buttonSubmitElement = document.getElementById('submitLogin');\n    this.userNameInputElement = document.getElementById('userNameInput');\n    this.emailInputElement = document.getElementById('emailInput');\n    this.passwordInputElement = document.getElementById('passwordInput');\n    this.repeatPasswordInputElement = document.getElementById('repeatPasswordInput');\n\n    if (localStorage.getItem(_utils_auth_utils_js__WEBPACK_IMPORTED_MODULE_2__.AuthUtils.accessTokenKey)) {\n      window.location.href = '#/main';\n      return;\n    }\n\n    this.emailInputElement.addEventListener('keydown', this.preventSpace.bind(this));\n    this.buttonSubmitElement.addEventListener('click', this.signUp.bind(this));\n  }\n\n  //Запрет ввода пробелов\n  preventSpace(e) {\n    if (e.keyCode === 32) {\n      e.preventDefault();\n    }\n  }\n\n  //Валидация формы\n  validateForm() {\n    let isValid = true;\n\n    if (this.userNameInputElement.value.trim() && this.userNameInputElement.value.match(/^[А-ЯЁ][а-яё]*([-][А-ЯЁ][а-яё]*)?\\s[А-ЯЁ][а-яё]*\\s[А-ЯЁ][а-яё]*$/)) {\n      this.userNameInputElement.classList.remove('is-invalid');\n    } else {\n      this.userNameInputElement.classList.add('is-invalid');\n      isValid = false;\n    }\n\n    if (this.emailInputElement.value && this.emailInputElement.value.match(/^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/)) {\n      this.emailInputElement.classList.remove('is-invalid');\n    } else {\n      this.emailInputElement.classList.add('is-invalid');\n      isValid = false;\n    }\n\n    if (this.passwordInputElement.value.match(/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {\n      this.passwordInputElement.classList.remove('is-invalid');\n    } else {\n      this.passwordInputElement.classList.add('is-invalid');\n      isValid = false;\n    }\n\n    if (this.repeatPasswordInputElement.value && this.repeatPasswordInputElement.value === this.passwordInputElement.value) {\n      this.repeatPasswordInputElement.classList.remove('is-invalid');\n    } else {\n      this.repeatPasswordInputElement.classList.add('is-invalid');\n      isValid = false;\n    }\n    return isValid;\n  }\n\n  //Регистрация в системе\n  async signUp(e) {\n    e.preventDefault();\n    if (this.validateForm()) {\n      let splitStr = this.userNameInputElement.value.split(' ');\n      let data = {\n        name: splitStr[1],\n        lastName: splitStr[0],\n        email: this.emailInputElement.value,\n        password: this.passwordInputElement.value,\n        passwordRepeat: this.repeatPasswordInputElement.value,\n      }\n\n      try {\n        const result = await _services_auth_service_js__WEBPACK_IMPORTED_MODULE_1__.AuthService.request(_config_config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].host + '/signup', 'POST', data);\n\n        if (result) {\n          if (result.error || !result.user) {\n            throw new Error(result.message);\n          }\n          localStorage.setItem('userEmail', JSON.stringify(data.email));\n          window.location.href = \"#/login\";\n        }\n      } catch (e) {\n        console.error(\"Произошла ошибка при регистрации, обратитесь в поддержку \" + e);\n      }\n\n      this.userNameInputElement.value = '';\n      this.emailInputElement.value = '';\n      this.passwordInputElement.value = '';\n      this.repeatPasswordInputElement.value = '';\n    }\n  }\n}\n\n//# sourceURL=webpack://luminicoin-finance/./src/components/auth/sign-up.js?");

/***/ }),

/***/ "./src/components/expenses/expense-add.js":
/*!************************************************!*\
  !*** ./src/components/expenses/expense-add.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ExpenseAdd: () => (/* binding */ ExpenseAdd)\n/* harmony export */ });\n/* harmony import */ var _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/http-service.js */ \"./src/services/http-service.js\");\n/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/config.js */ \"./src/config/config.js\");\n/* harmony import */ var _utils_menu_link_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/menu-link-utils.js */ \"./src/utils/menu-link-utils.js\");\n\n\n\n\nclass ExpenseAdd {\n  constructor() {\n    this.inputNameCategoryElement = document.getElementById('inputCategoryName');\n    this.btnCategoryAddElement = document.getElementById('categoryAdd');\n    this.btnCategoryAddBackElement = document.getElementById('categoryAddBack');\n\n    this.btnCategoryAddElement.addEventListener('click', this.addCategory.bind(this));\n\n    this.btnCategoryAddBackElement.addEventListener('click', () => {\n      window.location.href = '#/expenses';\n    });\n    this.activeLink();\n  }\n\n  //Активация пунктов меню\n  activeLink() {\n    const details = document.querySelectorAll(\"details\");\n    const link = document.querySelectorAll('.link-sidebar');\n    _utils_menu_link_utils_js__WEBPACK_IMPORTED_MODULE_2__.MenuLinkUtils.activeLink(details, link, '#/expenses');\n  }\n\n  //Валидация полей\n  validateForm() {\n    let isValid = true;\n\n    if (this.inputNameCategoryElement.value.trim()) {\n      this.inputNameCategoryElement.classList.remove('is-invalid');\n    } else {\n      this.inputNameCategoryElement.classList.add('is-invalid');\n      isValid = false;\n    }\n    return isValid;\n  }\n\n  //Запрос на добавление категории\n  async addCategory() {\n    if (this.validateForm()) {\n      try {\n        const result = await _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__.HttpService.request(_config_config_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].host + '/categories/expense', 'POST', {title: this.inputNameCategoryElement.value});\n        if (result && !result.error) {\n          window.location.href = '#/expenses';\n        }\n      } catch (e) {\n        throw new Error (\"Ошибка при создании категории \" + e);\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack://luminicoin-finance/./src/components/expenses/expense-add.js?");

/***/ }),

/***/ "./src/components/expenses/expense-edit.js":
/*!*************************************************!*\
  !*** ./src/components/expenses/expense-edit.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ExpenseEdit: () => (/* binding */ ExpenseEdit)\n/* harmony export */ });\n/* harmony import */ var _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/http-service.js */ \"./src/services/http-service.js\");\n/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/config.js */ \"./src/config/config.js\");\n/* harmony import */ var _utils_urliutils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/urliutils.js */ \"./src/utils/urliutils.js\");\n/* harmony import */ var _utils_menu_link_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/menu-link-utils.js */ \"./src/utils/menu-link-utils.js\");\n\n\n\n\n\nclass ExpenseEdit {\n  constructor() {\n    this.inputNameCategoryElement = document.getElementById('inputCategoryName');\n    this.categorySaveElement = document.getElementById('categorySave');\n    this.categorySaveBackElement = document.getElementById('categorySaveBack');\n    const id = _utils_urliutils_js__WEBPACK_IMPORTED_MODULE_2__.UrlUtils.getUrlParams('id');\n    if (!id) {\n      window.location.href = '#/expenses';\n    }\n\n    this.getCategory(id).then();\n    this.categorySaveElement.addEventListener('click', this.updateCategory.bind(this, id));\n    this.categorySaveBackElement.addEventListener('click', (e) => {\n      window.location.href = '#/expenses';\n    });\n    this.activeLink();\n  }\n\n  //Активация пунктов меню\n  activeLink() {\n    const details = document.querySelectorAll(\"details\");\n    const link = document.querySelectorAll('.link-sidebar');\n    _utils_menu_link_utils_js__WEBPACK_IMPORTED_MODULE_3__.MenuLinkUtils.activeLink(details, link, '#/expenses');\n  }\n\n  //Получение выбранной категории по id\n  async getCategory(id) {\n    try {\n      const result = await _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__.HttpService.request(_config_config_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].host + '/categories/expense/' + id);\n      if (result && !result.error) {\n        this.inputNameCategoryElement.value = result.title;\n      }\n    } catch (e) {\n      throw new Error(\"Ошибка получения категории \" + e);\n    }\n  }\n\n  //Валидация полей\n  validateForm() {\n    let isValid = true;\n\n    if (this.inputNameCategoryElement.value.trim()) {\n      this.inputNameCategoryElement.classList.remove('is-invalid');\n    } else {\n      this.inputNameCategoryElement.classList.add('is-invalid');\n      isValid = false;\n    }\n    return isValid;\n  }\n\n  //Запрос на обновление категории\n  async updateCategory(id) {\n    if (this.validateForm()) {\n      try {\n        const result = await _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__.HttpService.request(_config_config_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].host + '/categories/expense/' + id, 'PUT', {title: this.inputNameCategoryElement.value});\n        if (result && !result.error) {\n          window.location.href = '#/expenses';\n        }\n      } catch (e) {\n        throw new Error(\"Ошибка получения категории \" + e);\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack://luminicoin-finance/./src/components/expenses/expense-edit.js?");

/***/ }),

/***/ "./src/components/expenses/expenses.js":
/*!*********************************************!*\
  !*** ./src/components/expenses/expenses.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Expenses: () => (/* binding */ Expenses)\n/* harmony export */ });\n/* harmony import */ var _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/http-service.js */ \"./src/services/http-service.js\");\n/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/config.js */ \"./src/config/config.js\");\n\n\n\nclass Expenses {\n  constructor() {\n    this.cardBoxElement = document.querySelector('.card-box');\n    this.modalElement = document.getElementById('modal');\n    this.modalBtnRemoveElement = document.getElementById('btnRemove');\n    this.modalBtnCancelElement = document.getElementById('btnCancel');\n\n    this.showCardExpenses().then();\n  }\n\n  //Отрисовка карточек\n  async showCardExpenses() {\n    try {\n      const result = await _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__.HttpService.request(_config_config_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].host + '/categories/expense');\n      if (result && !result.error) {\n        result.forEach(category => {\n          let cardElement = document.createElement(\"div\");\n          cardElement.classList.add(\"card\", \"p-1\");\n          cardElement.innerHTML = `\n          <div class=\"card-body flex-grow-1\">\n            <h4 class=\"card-title mb-3\">${category.title}</h4>\n            <div class=\"action d-flex flex-column flex-sm-row gap-2\">\n              <a href=\"#/expense-edit?id=${category.id}\" class=\"btn btn-primary\">Редактировать</a>\n              <button id=\"deleteCategory\" class=\"btn btn-danger delete-category\">Удалить</button>\n            </div>\n          </div>`;\n\n          //Взаимодействие с модальным окном\n          cardElement.querySelector('.delete-category').addEventListener('click', () => {\n            this.modalElement.classList.add('open');\n\n            this.modalBtnRemoveElement.onclick = () => {\n              this.deleteCardExpense(category.id, cardElement);\n              this.modalElement.classList.remove('open');\n            }\n\n            this.modalBtnCancelElement.onclick = () => {\n              this.modalElement.classList.remove('open');\n            }\n\n          });\n          this.cardBoxElement.appendChild(cardElement);\n        });\n\n        let addCategoryElement = document.createElement(\"a\");\n        addCategoryElement.href = \"#/expense-add\";\n        addCategoryElement.classList.add(\"btn\", \"btn-add-revenue\", \"border\", \"border-1\");\n        addCategoryElement.innerHTML = `<img src=\"images/svg/plus-mini-1523-svgrepo-com.svg\" alt=\"plus\" width=\"15px\" height=\"15px\">`;\n        this.cardBoxElement.appendChild(addCategoryElement);\n      }\n    } catch (e) {\n      throw new Error(\"Возникла ошибка при получении категории доходов \" + e);\n    }\n  }\n\n  //Удаление карточки\n  async deleteCardExpense(id, cardElement) {\n    try {\n      const result = await _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__.HttpService.request(_config_config_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].host + '/categories/expense/' + id, 'DELETE');\n      if (result) {\n        cardElement.remove();\n      } else {\n        throw new Error(result.message);\n      }\n    } catch (e) {\n      throw new Error(\"Ошибка удаления категории \" + e);\n    }\n  }\n}\n\n//# sourceURL=webpack://luminicoin-finance/./src/components/expenses/expenses.js?");

/***/ }),

/***/ "./src/components/main.js":
/*!********************************!*\
  !*** ./src/components/main.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Main: () => (/* binding */ Main)\n/* harmony export */ });\n/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config.js */ \"./src/config/config.js\");\n/* harmony import */ var _services_http_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/http-service.js */ \"./src/services/http-service.js\");\n\n\n\nclass Main {\n  constructor() {\n    this.btnPeriodElement = document.querySelectorAll('.btn-main');\n    this.inputFromDate = document.getElementById('inputFromDate');\n    this.inputToDate = document.getElementById('inputToDate');\n    this.chartOneCanvas = document.getElementById('revenuesChart');\n    this.chartTwoCanvas = document.getElementById('expensesChart');\n\n    this.chartOne = null;\n    this.chartTwo = null;\n\n    this.arrayCategoryRevenue = [];\n    this.arrayAmountCategoryRevenue = [];\n    this.arrayCategoryExpense = [];\n    this.arrayAmountCategoryExpense = [];\n\n    this.loadChartLibrary().then(() => {\n      this.getPeriodData().then();\n    });\n    this.btnEventListener();\n  }\n\n  //Загрузка библиотеки Chart.js\n  async loadChartLibrary() {\n    if (typeof Chart === 'undefined') {\n      await __webpack_require__.e(/*! import() */ \"vendors-node_modules_chart_js_dist_chart_umd_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../../node_modules/chart.js/dist/chart.umd.js */ \"./node_modules/chart.js/dist/chart.umd.js\"));\n    }\n  }\n\n  //Событие клика по кнопкам фильтров\n  btnEventListener() {\n    this.btnPeriodElement.forEach(btn => {\n      btn.addEventListener('click', (e) => {\n        const period = e.target.getAttribute('data-period');\n        //Сброс ошибок валидации\n        this.resetValidation();\n        if (period === \"interval\") {\n          if (!this.validateForm()) {\n            e.preventDefault();\n            return;\n          }\n        }\n        //Обнуление данных в массивах\n        this.arrayCategoryRevenue = [];\n        this.arrayAmountCategoryRevenue = [];\n        this.arrayCategoryExpense = [];\n        this.arrayAmountCategoryExpense = [];\n        this.getPeriodData(period).then();\n      });\n    });\n  }\n\n  //Валидация полей\n  validateForm() {\n    let isValid = true;\n\n    if (this.inputFromDate.value) {\n      this.inputFromDate.classList.remove('is-invalid');\n    } else {\n      this.inputFromDate.classList.add('is-invalid');\n      isValid = false;\n    }\n\n    if (this.inputToDate.value) {\n      this.inputToDate.classList.remove('is-invalid');\n    } else {\n      this.inputToDate.classList.add('is-invalid');\n      isValid = false;\n    }\n    return isValid;\n  }\n\n  //Сброс валидационных сообщений\n  resetValidation() {\n    this.inputFromDate.classList.remove('is-invalid');\n    this.inputToDate.classList.remove('is-invalid');\n  }\n\n  //Получение данных по кнопкам фильтров\n  async getPeriodData(period) {\n    let url;\n    try {\n      if (period === \"interval\") {\n        url = `${_config_config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].host}/operations?period=interval&dateFrom=${this.inputFromDate.value}&dateTo=${this.inputToDate.value}`\n      } else if (period) {\n        url = `${_config_config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].host}/operations?period=${period}`\n      } else {\n        url = `${_config_config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].host}/operations`\n      }\n      const result = await _services_http_service_js__WEBPACK_IMPORTED_MODULE_1__.HttpService.request(url);\n      if (result) {\n        this.getArrayData(result);\n        //Отрисовка графиков после получения данных\n        this.renderChart();\n      }\n    } catch (e) {\n      console.error(\"Ошибка при запросе данных\", e);\n    }\n  }\n\n  //Фильтрация полученных данных и запись их в массивы для графиков\n  getArrayData(data) {\n    const revenueData = data.filter(item => item.type === \"income\");\n    this.arrayCategoryRevenue = revenueData.map(item => item.category);\n    this.arrayAmountCategoryRevenue = revenueData.map(item => item.amount);\n\n    const expenseData = data.filter(item => item.type === \"expense\");\n    this.arrayCategoryExpense = expenseData.map(item => item.category);\n    this.arrayAmountCategoryExpense = expenseData.map(item => item.amount);\n  }\n\n  //Отрисовка графиков\n  renderChart() {\n    if (this.chartOne) {\n      this.chartOne.destroy();\n    }\n\n    //Если данных нет, то устанавливаем дефолтные данные\n    const labelsRevenue = this.arrayCategoryRevenue.length ? this.arrayCategoryRevenue : ['Нет данных'];\n    const dataRevenue = this.arrayAmountCategoryRevenue.length ? this.arrayAmountCategoryRevenue : [1];\n\n    this.chartOne = new Chart(this.chartOneCanvas, {\n      type: 'pie',\n      data: {\n        labels: labelsRevenue,\n        datasets: [{\n          label: 'Сумма',\n          data: dataRevenue,\n          borderWidth: 1\n        }]\n      },\n      options: {\n        responsive: true,\n        maintainAspectRatio: true,\n        aspectRatio: 1,\n        boxSizing: 'border-box',\n        layout: {\n          padding: {\n            bottom: 5\n          }\n        },\n        plugin: {\n          legend: {\n            position: 'top',\n          }\n        },\n        radius: '90%'\n      }\n    });\n\n    if (this.chartTwo) {\n      this.chartTwo.destroy();\n    }\n\n    const labelsExpense = this.arrayCategoryExpense.length ? this.arrayCategoryExpense : ['Нет данных'];\n    const dataExpense = this.arrayAmountCategoryExpense.length ? this.arrayAmountCategoryExpense : [1];\n\n    this.chartTwo = new Chart(this.chartTwoCanvas, {\n      type: 'pie',\n      data: {\n        labels: labelsExpense,\n        datasets: [{\n          label: 'Сумма',\n          data: dataExpense,\n          borderWidth: 1\n        }]\n      },\n      options: {\n        responsive: true,\n        maintainAspectRatio: true,\n        aspectRatio: 1,\n        boxSizing: 'border-box',\n        layout: {\n          padding: {\n            bottom: 5\n          }\n        },\n        plugin: {\n          legend: {\n            position: 'top',\n          }\n        },\n        radius: '90%'\n      }\n    });\n  }\n}\n\n//# sourceURL=webpack://luminicoin-finance/./src/components/main.js?");

/***/ }),

/***/ "./src/components/revenues/revenue-add.js":
/*!************************************************!*\
  !*** ./src/components/revenues/revenue-add.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RevenueAdd: () => (/* binding */ RevenueAdd)\n/* harmony export */ });\n/* harmony import */ var _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/http-service.js */ \"./src/services/http-service.js\");\n/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/config.js */ \"./src/config/config.js\");\n/* harmony import */ var _utils_menu_link_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/menu-link-utils.js */ \"./src/utils/menu-link-utils.js\");\n\n\n\n\nclass RevenueAdd {\n  constructor() {\n    this.inputNameCategoryElement = document.getElementById('inputCategoryName');\n    this.btnCategoryAddElement = document.getElementById('categoryAdd');\n    this.btnCategoryAddBackElement = document.getElementById('categoryAddBack');\n\n    this.btnCategoryAddElement.addEventListener('click', this.addCategory.bind(this));\n    this.btnCategoryAddBackElement.addEventListener('click', () => {\n      window.location.href = '#/revenues';\n    });\n\n    this.activeLink();\n  }\n\n  //Активация пунктов меню\n  activeLink() {\n    const details = document.querySelectorAll(\"details\");\n    const link = document.querySelectorAll('.link-sidebar');\n    _utils_menu_link_utils_js__WEBPACK_IMPORTED_MODULE_2__.MenuLinkUtils.activeLink(details, link, '#/revenues');\n  }\n\n  //Валидация полей\n  validateForm() {\n    let isValid = true;\n\n    if (this.inputNameCategoryElement.value.trim()) {\n      this.inputNameCategoryElement.classList.remove('is-invalid');\n    } else {\n      this.inputNameCategoryElement.classList.add('is-invalid');\n      isValid = false;\n    }\n    return isValid;\n  }\n\n  //Запрос на добавление категории\n  async addCategory() {\n    if (this.validateForm()) {\n      try {\n        const result = await _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__.HttpService.request(_config_config_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].host + '/categories/income', 'POST', {title: this.inputNameCategoryElement.value});\n        if (result && !result.error) {\n          window.location.href = '#/revenues';\n        }\n      } catch (e) {\n        throw new Error (\"Ошибка при создании категории \" + e);\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack://luminicoin-finance/./src/components/revenues/revenue-add.js?");

/***/ }),

/***/ "./src/components/revenues/revenue-edit.js":
/*!*************************************************!*\
  !*** ./src/components/revenues/revenue-edit.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RevenueEdit: () => (/* binding */ RevenueEdit)\n/* harmony export */ });\n/* harmony import */ var _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/http-service.js */ \"./src/services/http-service.js\");\n/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/config.js */ \"./src/config/config.js\");\n/* harmony import */ var _utils_urliutils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/urliutils.js */ \"./src/utils/urliutils.js\");\n/* harmony import */ var _utils_menu_link_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/menu-link-utils.js */ \"./src/utils/menu-link-utils.js\");\n\n\n\n\n\nclass RevenueEdit {\n  constructor() {\n    this.inputNameCategoryElement = document.getElementById('inputCategoryName');\n    this.categorySaveElement = document.getElementById('categorySave');\n    this.categorySaveBackElement = document.getElementById('categorySaveBack');\n    const id = _utils_urliutils_js__WEBPACK_IMPORTED_MODULE_2__.UrlUtils.getUrlParams('id');\n    if (!id) {\n      window.location.href = '#/revenues';\n    }\n\n    this.getCategory(id).then();\n    this.categorySaveElement.addEventListener('click', this.updateCategory.bind(this, id));\n    this.categorySaveBackElement.addEventListener('click', (e) => {\n      window.location.href = '#/revenues';\n    });\n    this.activeLink();\n  }\n\n  //Активация пунктов меню\n  activeLink() {\n    const details = document.querySelectorAll(\"details\");\n    const link = document.querySelectorAll('.link-sidebar');\n    _utils_menu_link_utils_js__WEBPACK_IMPORTED_MODULE_3__.MenuLinkUtils.activeLink(details, link, '#/revenues');\n  }\n\n  //Получение выбранной категории по id\n  async getCategory(id) {\n    try {\n      const result = await _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__.HttpService.request(_config_config_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].host + '/categories/income/' + id, 'GET');\n      if (result && !result.error) {\n        this.inputNameCategoryElement.value = result.title;\n      }\n    } catch (e) {\n      throw new Error(\"Ошибка получения категории \" + e);\n    }\n  }\n\n  //Валидация полей\n  validateForm() {\n    let isValid = true;\n\n    if (this.inputNameCategoryElement.value.trim()) {\n      this.inputNameCategoryElement.classList.remove('is-invalid');\n    } else {\n      this.inputNameCategoryElement.classList.add('is-invalid');\n      isValid = false;\n    }\n    return isValid;\n  }\n\n  //Запрос на обновление категории\n  async updateCategory(id) {\n    if (this.validateForm()) {\n      try {\n        const result = await _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__.HttpService.request(_config_config_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].host + '/categories/income/' + id, 'PUT', {title: this.inputNameCategoryElement.value});\n        if (result && !result.error) {\n          window.location.href = '#/revenues';\n        }\n      } catch (e) {\n        throw new Error(\"Ошибка получения категории \" + e);\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack://luminicoin-finance/./src/components/revenues/revenue-edit.js?");

/***/ }),

/***/ "./src/components/revenues/revenues.js":
/*!*********************************************!*\
  !*** ./src/components/revenues/revenues.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Revenue: () => (/* binding */ Revenue)\n/* harmony export */ });\n/* harmony import */ var _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/http-service.js */ \"./src/services/http-service.js\");\n/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/config.js */ \"./src/config/config.js\");\n\n\n\nclass Revenue {\n  constructor() {\n    window.addEventListener('load', () => {\n      document.querySelector('.modal').classList.remove('hide');\n    });\n    this.cardBoxElement = document.querySelector('.card-box');\n    this.modalElement = document.getElementById('modal');\n    this.modalBtnRemoveElement = document.getElementById('btnRemove');\n    this.modalBtnCancelElement = document.getElementById('btnCancel');\n\n    this.showCardRevenues().then();\n  }\n\n  //Отрисовка карточек\n  async showCardRevenues() {\n    try {\n      const result = await _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__.HttpService.request(_config_config_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].host + '/categories/income');\n      console.log(result);\n      if (result && !result.error) {\n        result.forEach(category => {\n          let cardElement = document.createElement(\"div\");\n          cardElement.classList.add(\"card\", \"p-1\");\n          cardElement.setAttribute(\"data-id\", category.id);\n          cardElement.innerHTML = `\n          <div class=\"card-body flex-grow-1\">\n            <h4 class=\"card-title mb-3\">${category.title}</h4>\n            <div class=\"action d-flex flex-column flex-sm-row gap-2\">\n              <a href=\"#/revenue-edit?id=${category.id}\" class=\"btn btn-primary\">Редактировать</a>\n              <button id=\"deleteCategory\" class=\"btn btn-danger delete-category\">Удалить</button>\n            </div>\n          </div>`;\n\n          //Взаимодействие с модальным окном\n          cardElement.querySelector('.delete-category').addEventListener('click', () => {\n            this.modalElement.classList.add('open');\n\n            this.modalBtnRemoveElement.onclick = () => {\n              this.deleteCardRevenue(category.id, cardElement);\n              this.modalElement.classList.remove('open');\n            }\n\n            this.modalBtnCancelElement.onclick = () => {\n              this.modalElement.classList.remove('open');\n            }\n          });\n          this.cardBoxElement.appendChild(cardElement);\n        });\n\n        let addCategoryElement = document.createElement(\"a\");\n        addCategoryElement.href = \"#/revenue-add\";\n        addCategoryElement.classList.add(\"btn\", \"btn-add-revenue\", \"border\", \"border-1\");\n        addCategoryElement.innerHTML = `<img src=\"images/svg/plus-mini-1523-svgrepo-com.svg\" alt=\"plus\" width=\"15px\" height=\"15px\">`;\n        this.cardBoxElement.appendChild(addCategoryElement);\n      }\n    } catch (e) {\n      throw new Error(\"Возникла ошибка при получении категории доходов \" + e);\n    }\n  }\n\n  //Запрос на удаление категории\n  async deleteCardRevenue(id, cardElement) {\n    try {\n      const result = await _services_http_service_js__WEBPACK_IMPORTED_MODULE_0__.HttpService.request(_config_config_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].host + '/categories/income/' + id, 'DELETE');\n      if (result) {\n        cardElement.remove();\n      } else {\n        throw new Error(result.message);\n      }\n    } catch (e) {\n      throw new Error(\"Ошибка удаления категории \" + e);\n    }\n  }\n}\n\n//# sourceURL=webpack://luminicoin-finance/./src/components/revenues/revenues.js?");

/***/ }),

/***/ "./src/config/config.js":
/*!******************************!*\
  !*** ./src/config/config.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst config = {\n  host: 'http://localhost:3000/api',\n  operationsType: {\n    expense: 'expense',\n    income: 'income',\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\n\n//# sourceURL=webpack://luminicoin-finance/./src/config/config.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Router: () => (/* binding */ Router)\n/* harmony export */ });\n/* harmony import */ var _components_auth_login_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/auth/login.js */ \"./src/components/auth/login.js\");\n/* harmony import */ var _components_auth_sign_up_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/auth/sign-up.js */ \"./src/components/auth/sign-up.js\");\n/* harmony import */ var _components_auth_logout_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/auth/logout.js */ \"./src/components/auth/logout.js\");\n/* harmony import */ var _components_main_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/main.js */ \"./src/components/main.js\");\n/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config/config.js */ \"./src/config/config.js\");\n/* harmony import */ var _services_http_service_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/http-service.js */ \"./src/services/http-service.js\");\n/* harmony import */ var _utils_auth_utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/auth-utils.js */ \"./src/utils/auth-utils.js\");\n/* harmony import */ var _components_revenues_revenues_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/revenues/revenues.js */ \"./src/components/revenues/revenues.js\");\n/* harmony import */ var _components_revenues_revenue_add_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/revenues/revenue-add.js */ \"./src/components/revenues/revenue-add.js\");\n/* harmony import */ var _components_revenues_revenue_edit_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/revenues/revenue-edit.js */ \"./src/components/revenues/revenue-edit.js\");\n/* harmony import */ var _components_expenses_expenses_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/expenses/expenses.js */ \"./src/components/expenses/expenses.js\");\n/* harmony import */ var _components_expenses_expense_add_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/expenses/expense-add.js */ \"./src/components/expenses/expense-add.js\");\n/* harmony import */ var _components_expenses_expense_edit_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/expenses/expense-edit.js */ \"./src/components/expenses/expense-edit.js\");\n/* harmony import */ var _components_all_finance_all_finance_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/all-finance/all-finance.js */ \"./src/components/all-finance/all-finance.js\");\n/* harmony import */ var _components_all_finance_all_finance_edit_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/all-finance/all-finance-edit.js */ \"./src/components/all-finance/all-finance-edit.js\");\n/* harmony import */ var _components_all_finance_all_finance_add_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/all-finance/all-finance-add.js */ \"./src/components/all-finance/all-finance-add.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nclass Router {\n  constructor() {\n    this.contentPageElement = document.getElementById('content');\n\n    this.routes = [\n      {\n        route: '#/signup',\n        title: 'Регистрация',\n        template: '/templates/signup.html',\n        layout: false,\n        load: () => {\n          new _components_auth_sign_up_js__WEBPACK_IMPORTED_MODULE_1__.SignUp();\n        }\n      },\n      {\n        route: '#/login',\n        title: 'Вход',\n        template: '/templates/login.html',\n        layout: false,\n        load: () => {\n          new _components_auth_login_js__WEBPACK_IMPORTED_MODULE_0__.Login();\n        }\n      },\n      {\n        route: '#/logout',\n        load: () => {\n          new _components_auth_logout_js__WEBPACK_IMPORTED_MODULE_2__.Logout();\n        }\n      },\n      {\n        route: '#/main',\n        title: 'Главная',\n        template: '/templates/main.html',\n        layout: '/templates/layout.html',\n        styles: ['/styles/main.css'],\n        load: () => {\n          new _components_main_js__WEBPACK_IMPORTED_MODULE_3__.Main();\n        }\n      },\n      {\n        route: '#/revenues',\n        title: 'Доходы',\n        template: '/templates/revenues/revenues.html',\n        layout: '/templates/layout.html',\n        styles: ['/styles/revenues/revenues.css'],\n        load: () => {\n          new _components_revenues_revenues_js__WEBPACK_IMPORTED_MODULE_7__.Revenue();\n        }\n      },\n      {\n        route: '#/revenue-add',\n        title: 'Создание дохода',\n        template: '/templates/revenues/revenues-add.html',\n        layout: '/templates/layout.html',\n        styles: ['/styles/revenues/revenues-add.css'],\n        load: () => {\n          new _components_revenues_revenue_add_js__WEBPACK_IMPORTED_MODULE_8__.RevenueAdd();\n        }\n      },\n      {\n        route: '#/revenue-edit',\n        title: 'Редактирование дохода',\n        template: '/templates/revenues/revenues-edit.html',\n        layout: '/templates/layout.html',\n        styles: ['/styles/revenues/revenues-edit.css'],\n        load: () => {\n          new _components_revenues_revenue_edit_js__WEBPACK_IMPORTED_MODULE_9__.RevenueEdit();\n        }\n      },\n      {\n        route: '#/expenses',\n        title: 'Расходы',\n        template: '/templates/expenses/expenses.html',\n        layout: '/templates/layout.html',\n        styles: ['/styles/expenses/expenses.css'],\n        load: () => {\n          new _components_expenses_expenses_js__WEBPACK_IMPORTED_MODULE_10__.Expenses();\n        }\n      },\n      {\n        route: '#/expense-add',\n        title: 'Создание расхода',\n        template: '/templates/expenses/expenses-add.html',\n        layout: '/templates/layout.html',\n        styles: ['/styles/expenses/expenses-add.css'],\n        load: () => {\n          new _components_expenses_expense_add_js__WEBPACK_IMPORTED_MODULE_11__.ExpenseAdd();\n        }\n      },\n      {\n        route: '#/expense-edit',\n        title: 'Редактирование расхода',\n        template: '/templates/expenses/expenses-edit.html',\n        layout: '/templates/layout.html',\n        styles: ['/styles/expenses/expenses-edit.css'],\n        load: () => {\n          new _components_expenses_expense_edit_js__WEBPACK_IMPORTED_MODULE_12__.ExpenseEdit();\n        }\n      },\n      {\n        route: '#/all-finance',\n        title: 'Доходы и Расходы',\n        template: '/templates/all-finance/all-finance.html',\n        layout: '/templates/layout.html',\n        styles: ['/styles/all-finance/all-finance.css'],\n        load: () => {\n          new _components_all_finance_all_finance_js__WEBPACK_IMPORTED_MODULE_13__.AllFinance();\n        }\n      },\n      {\n        route: '#/all-finance-add',\n        title: 'Создание дохода/расхода',\n        template: '/templates/all-finance/all-finance-add.html',\n        layout: '/templates/layout.html',\n        styles: ['/styles/all-finance/all-finance-add.css'],\n        load: () => {\n          new _components_all_finance_all_finance_add_js__WEBPACK_IMPORTED_MODULE_15__.AllFinanceAdd();\n        }\n      },\n      {\n        route: '#/all-finance-edit',\n        title: 'Редактирование дохода/расхода',\n        template: '/templates/all-finance/all-finance-edit.html',\n        layout: '/templates/layout.html',\n        styles: ['/styles/all-finance/all-finance-edit.css'],\n        load: () => {\n          new _components_all_finance_all_finance_edit_js__WEBPACK_IMPORTED_MODULE_14__.AllFinanceEdit();\n        }\n      },\n    ];\n\n    this.currentStyles = [];\n  }\n\n  //Роутинг по страницам\n  async openRoute() {\n    const hashRoute = window.location.hash.split('?')[0];\n    const newRoute = this.routes.find(item => {\n      return item.route === hashRoute;\n    });\n\n    if (!newRoute) {\n      window.location.href = \"#/login\";\n      return;\n    }\n\n    if (newRoute.route !== '#/login' && newRoute.route !== '#/signup' && !localStorage.getItem('accessToken')) {\n      window.location.href = \"#/login\";\n      return;\n    }\n\n    //Удаление текущих стилей страницы\n    this.removeCurrentStyles();\n\n    //Отрисовка страниц с layout и без него\n    if (newRoute.template) {\n      let content = this.contentPageElement;\n      if (newRoute.layout) {\n        this.contentPageElement.innerHTML = await fetch(newRoute.layout).then(response => response.text());\n        content = document.getElementById('contentLayout');\n      }\n      content.innerHTML = await fetch(newRoute.template).then(response => response.text());\n\n      //Активация пунктов меню\n      this.activateMenuItem(newRoute);\n      //Подгружаем имя и баланс\n      this.showBalance().then();\n      this.showUserName().then();\n      //Выход из системы\n      this.logout();\n    }\n\n    //Подключение стилей\n    if (newRoute.styles) {\n      this.linkStyles(newRoute.styles);\n    }\n\n    //Отображение заголовка страницы\n    const titleElement = document.getElementById('titlePage');\n    if (titleElement) {\n      titleElement.innerText = newRoute.title;\n    }\n    //Выполнение функции загрузки функционала страницы\n    if (typeof newRoute.load === 'function') {\n      newRoute.load();\n    }\n  }\n\n  //Отображение пользователя\n  async showUserName() {\n    this.userNameElement = document.querySelectorAll(\".user-name\");\n    const userInfo = _utils_auth_utils_js__WEBPACK_IMPORTED_MODULE_6__.AuthUtils.getUserInfo();\n    if (userInfo && this.userNameElement.length > 0) {\n      this.userNameElement.forEach(el => el.innerText = userInfo.userName + \" \" + userInfo.userLastName);\n    }\n  }\n\n  //Выход из системы\n  logout() {\n    const logoutElement = document.querySelectorAll(\".person-out\");\n    const logoutLink = document.querySelectorAll(\".logout\");\n\n    const toggleModalElement = () => {\n      logoutLink.forEach(el => {\n        el.classList.toggle(\"logout-open\");\n      });\n    }\n\n    logoutElement.forEach(el => {\n      el.addEventListener(\"click\", (e) => {\n        e.stopPropagation();\n        toggleModalElement();\n      });\n    });\n  }\n\n  //Отображение баланса\n  async showBalance() {\n    this.balanceShowElement = document.querySelectorAll(\".balance-number\");\n    try {\n      const result = await _services_http_service_js__WEBPACK_IMPORTED_MODULE_5__.HttpService.request(_config_config_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"].host + '/balance');\n      if (result && typeof result.balance === 'number') {\n        this.balanceShowElement.forEach(el => {el.innerText = result.balance});\n      } else {\n        throw new Error(result.message);\n      }\n    } catch (e) {\n      console.error(\"Ошибка при получении баланса: \", e);\n    }\n  }\n\n  //Активация пунктов меню\n  activateMenuItem(route) {\n    const details = document.querySelectorAll(\"details\");\n    //Массив с роутами для категорий\n    const openDetailsRoutes = ['#/revenues', '#/expenses'];\n\n    document.querySelectorAll('.layout .link-sidebar').forEach(item => {\n      let href = item.getAttribute('href');\n\n      if ((route.route.includes(href) && href !== '#/login' && href !== '#/signup')) {\n        item.classList.add('active-link');\n\n        if (openDetailsRoutes.includes(href)) {\n          details.forEach(details => details.setAttribute('open', 'open'));\n        }\n      } else {\n        item.classList.remove('active-link');\n      }\n    });\n  }\n\n  //Подключение стилей\n  linkStyles(styles) {\n    const headElement = document.querySelector('head');\n    styles.forEach(stylePath => {\n      const link = document.createElement('link');\n      link.rel = 'stylesheet';\n      link.href = stylePath;\n      headElement.appendChild(link);\n      this.currentStyles.push(link);\n    });\n  }\n\n  //Удаление стилей\n  removeCurrentStyles() {\n    this.currentStyles.forEach(styleElement => {\n      styleElement.remove();\n    });\n    this.currentStyles = [];\n  }\n}\n\n//# sourceURL=webpack://luminicoin-finance/./src/router.js?");

/***/ }),

/***/ "./src/services/auth-service.js":
/*!**************************************!*\
  !*** ./src/services/auth-service.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthService: () => (/* binding */ AuthService)\n/* harmony export */ });\nclass AuthService {\n  static async request(url, method = 'GET', body = null) {\n\n    const params = {\n      method: method,\n      headers: {\n        'Content-Type': 'application/json',\n        'Accept': 'application/json',\n      }\n    }\n    if (body) {\n      params.body = JSON.stringify(body);\n    }\n    const response = await fetch(url, params);\n    if (response.status < 200 && response.status >= 300) {\n      throw new Error(response.statusMessage);\n    }\n    return await response.json();\n  }\n}\n\n//# sourceURL=webpack://luminicoin-finance/./src/services/auth-service.js?");

/***/ }),

/***/ "./src/services/http-service.js":
/*!**************************************!*\
  !*** ./src/services/http-service.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HttpService: () => (/* binding */ HttpService)\n/* harmony export */ });\n/* harmony import */ var _utils_auth_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/auth-utils.js */ \"./src/utils/auth-utils.js\");\n\n\nclass HttpService {\n  static async request(url, method = 'GET', body = null) {\n\n    const params = {\n      method: method,\n      headers: {\n        'Content-Type': 'application/json',\n        'Accept': 'application/json',\n      }\n    };\n\n    let token = localStorage.getItem(_utils_auth_utils_js__WEBPACK_IMPORTED_MODULE_0__.AuthUtils.accessTokenKey);\n    if (token) {\n      params.headers['x-auth-token'] = token;\n    }\n\n    if (body) {\n      params.body = JSON.stringify(body);\n    }\n\n    const response = await fetch(url, params);\n\n    if (response.status < 200 || response.status >= 300) {\n      if (response.status === 401) {\n        const result = await _utils_auth_utils_js__WEBPACK_IMPORTED_MODULE_0__.AuthUtils.updateTokens();\n        if (result) {\n          return await this.request(url, method, body);\n        } else {\n          return null;\n        }\n      }\n      throw new Error(response.statusMessage);\n    }\n    return await response.json();\n  }\n}\n\n//# sourceURL=webpack://luminicoin-finance/./src/services/http-service.js?");

/***/ }),

/***/ "./src/utils/auth-utils.js":
/*!*********************************!*\
  !*** ./src/utils/auth-utils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthUtils: () => (/* binding */ AuthUtils)\n/* harmony export */ });\n/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config.js */ \"./src/config/config.js\");\n\n\nclass AuthUtils {\n  static accessTokenKey = 'accessToken';\n  static refreshTokenKey = 'refreshToken';\n  static userInfoKey = 'userInfo';\n\n  //Обновление токенов, если они устарели\n  static async updateTokens() {\n    const refreshToken = localStorage.getItem(this.refreshTokenKey);\n    if (refreshToken) {\n      const response = await fetch(_config_config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].host + '/refresh', {\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json',\n          'Accept': 'application/json',\n        },\n        body: JSON.stringify({refreshToken: refreshToken}),\n      });\n\n      if (response && response.status === 200) {\n        const result = await response.json();\n        if (result && !result.error) {\n          this.setTokenKey(result.tokens.accessToken, result.tokens.refreshToken);\n          return true;\n        } else {\n          throw new Error(result.message);\n        }\n      }\n    }\n    return false;\n  }\n\n  static setTokenKey(accessToken, refreshToken) {\n    localStorage.setItem(this.accessTokenKey, accessToken);\n    localStorage.setItem(this.refreshTokenKey, refreshToken);\n  }\n\n  static setUserInfo(info) {\n    localStorage.setItem(this.userInfoKey, JSON.stringify(info));\n  }\n\n  static getUserInfo() {\n    const userInfo = localStorage.getItem(this.userInfoKey);\n    if (userInfo) {\n      return JSON.parse(userInfo);\n    }\n    return null;\n  }\n\n  static removeUserData() {\n    localStorage.removeItem(this.accessTokenKey);\n    localStorage.removeItem(this.refreshTokenKey);\n    localStorage.removeItem(this.userInfoKey);\n  }\n}\n\n//# sourceURL=webpack://luminicoin-finance/./src/utils/auth-utils.js?");

/***/ }),

/***/ "./src/utils/common-utils.js":
/*!***********************************!*\
  !*** ./src/utils/common-utils.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CommonUtils: () => (/* binding */ CommonUtils)\n/* harmony export */ });\n/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config.js */ \"./src/config/config.js\");\n/* harmony import */ var _services_http_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/http-service.js */ \"./src/services/http-service.js\");\n\n\n\nclass CommonUtils {\n  static getOperationsType(operationType) {\n    let type = null;\n    switch (operationType) {\n      case _config_config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].operationsType.expense:\n        type = `<span class=\"text-danger\">расход</span>`;\n        break;\n      case _config_config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].operationsType.income:\n        type = `<span class=\"text-success\">доход</span>`;\n        break;\n        default:\n          type = `<span class=\"text-dark\">-</span>`;\n    }\n    return type;\n  }\n\n  static async getOperationCategory(type) {\n    let url = null;\n    if (type === \"expense\") {\n      url = `${_config_config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].host}/categories/expense`;\n    } else {\n      url = `${_config_config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].host}/categories/income`;\n    }\n    try {\n      const result = await _services_http_service_js__WEBPACK_IMPORTED_MODULE_1__.HttpService.request(url);\n      if (result && !result.error) {\n        return result;\n      }\n    } catch (e) {\n      throw  new Error(\"Ошибка при загрузке категорий\", e);\n    }\n  }\n}\n\n//# sourceURL=webpack://luminicoin-finance/./src/utils/common-utils.js?");

/***/ }),

/***/ "./src/utils/menu-link-utils.js":
/*!**************************************!*\
  !*** ./src/utils/menu-link-utils.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MenuLinkUtils: () => (/* binding */ MenuLinkUtils)\n/* harmony export */ });\nclass MenuLinkUtils {\n  static activeLink(details, links, url) {\n\n    links.forEach(link => {\n      const href = link.getAttribute('href');\n\n      if (href === url) {\n        link.classList.add('active-link');\n\n        // Открываем только тот details, который содержит активную ссылку используя метод closest\n        const parentDetails = link.closest(\"details\");\n        if (parentDetails) {\n          parentDetails.setAttribute('open', 'open');\n        }\n      } else {\n        link.classList.remove('active-link');\n      }\n    });\n  }\n}\n\n//# sourceURL=webpack://luminicoin-finance/./src/utils/menu-link-utils.js?");

/***/ }),

/***/ "./src/utils/urliutils.js":
/*!********************************!*\
  !*** ./src/utils/urliutils.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   UrlUtils: () => (/* binding */ UrlUtils)\n/* harmony export */ });\nclass UrlUtils {\n  static getUrlParams(param) {\n    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);\n    return  urlParams.get(param);\n  }\n}\n\n//# sourceURL=webpack://luminicoin-finance/./src/utils/urliutils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".main.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "luminicoin-finance:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkluminicoin_finance"] = self["webpackChunkluminicoin_finance"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;