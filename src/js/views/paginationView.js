import View from "./view.js";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  addHandlerPageChange(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn");
      if (!btn) return;
      return handler(btn.classList.contains("btn--next"));
    });
  }

  _isItBtnNext(isNext) {
    return `
        <button class="btn--${isNext ? "next" : "prev"} btn">
            Page &nbsp;<span class="page-btn-no">${
              isNext ? this._data.page + 1 : this._data.page - 1
            }</span>
        </button>
    `;
  }

  _generateMarkup(data) {
    // if page is one and only
    if (data.page === 1 && data.pagesQty < 2) return " ";

    // if page is one and there are others
    if (data.page === 1 && data.pagesQty > data.page)
      return this._isItBtnNext(true);

    // if page is last
    if (data.page === data.pagesQty) return this._isItBtnNext(false);

    // if page is somewhere inbetween
    if (data.page > 1 && data.page < data.pagesQty) {
      const markup = [this._isItBtnNext(false), this._isItBtnNext(true)].join(
        " "
      );
      return markup;
    }
  }
}

export default new PaginationView();
