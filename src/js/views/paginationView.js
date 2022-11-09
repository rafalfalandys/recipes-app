import View from "./view.js";
import { RESULTS_PER_PAGE } from "../config.js";
import * as model from "../model.js";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  addHandlerPageChange(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn");
      if (!btn) return;
      return handler(btn.classList.contains("btn--next"));
    });
  }

  // In this function I wanted to bind 'this', skip the data parameter and use _data instead. I failed with binding the keyword, so I just passed the data parameter through:
  _isItBtnNext(data, isNext) {
    // const btnNo = isNext ? this._data.page + 1 : this._data.page - 1;
    return `
        <button class="btn--${isNext ? "next" : "prev"} btn">
            Page &nbsp;<span class="page-btn-no">${
              isNext ? data.page + 1 : data.page - 1
            }</span>
        </button>
    `;
  }

  _generateMarkup(data) {
    // if page is one and only
    if (data.page === 1 && data.pagesQty === 1) return;

    // if page is one and there are others
    if (data.page === 1 && data.pagesQty > data.page)
      return this._isItBtnNext(data, true);

    // if page is last
    if (data.page === data.pagesQty) return this._isItBtnNext(data, false);

    // if page is somewhere inbetween
    if (data.page > 1 && data.page < data.pagesQty) {
      const markup = [
        this._isItBtnNext(data, false),
        this._isItBtnNext(data, true),
      ].join(" ");
      return markup;
    }
  }
}

export default new PaginationView();
