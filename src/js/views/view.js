import icons from "../../img/sprite.svg";

export default class View {
  _data;

  _clearView() {
    this._parentEl.innerHTML = "";
  }

  render(data) {
    this._data = data;
    this._clearView();
    this._parentEl.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkup(this._data)
    );
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
}
