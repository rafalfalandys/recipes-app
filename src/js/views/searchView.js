import View from "./view.js";

class SearchView extends View {
  _parentEl = document.querySelector(".search");

  getQuery() {
    const query = this._parentEl.querySelector(".search__field").value;
    this._parentEl.querySelector(".search__field").value = "";
    return query;
  }

  addHandlerSearch = function (handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  };
}

export default new SearchView();
