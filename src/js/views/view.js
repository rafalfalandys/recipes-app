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
}
