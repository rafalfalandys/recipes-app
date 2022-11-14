import { mark } from "regenerator-runtime";
import icons from "url:../../img/sprite.svg";

export default class View {
  _data;

  _clearView() {
    this._parentEl.innerHTML = "";
  }

  render(data) {
    if (data.length === 0) return this.renderError();
    this._data = data;
    this._clearView();
    this._parentEl.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkup(this._data)
    );
  }

  update(data) {
    if (data.length === 0) return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup(data);
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentEl.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild.nodeValue.trim() !== "" // here I struggled a lot because I was skipping 'nodeValue' and tried to trim the child itself
      ) {
        curEl.textContent = newEl.textContent;
      }
    });
  }

  renderSpinner() {
    this._clearView();
    this._parentEl.insertAdjacentHTML(
      "afterbegin",
      `
    <div class="spinner">
      <svg>
        <use xlink:href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `
    );
  }

  renderError() {
    const markup = `
      <div class="message">
        <svg class="btn--icon">
          <use xlink:href="${icons}#icon-alert-triangle"></use>
        </svg>
        <span>&nbsp;${this._errorMessage}</span>
      </div>
      `;
    this._clearView();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}
