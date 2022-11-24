import View from "./view.js";
import searchResultsView from "./searchResultsView.js";

class SearchView extends View {
  _parentEl = document.querySelector(".search");

  constructor() {
    super();
    this.addHeaderObserver();
  }

  getQuery() {
    const query = this._parentEl.querySelector(".search__field").value;
    this._parentEl.querySelector(".search__field").value = "";
    return query;
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      searchResultsView.toggleSidebar();
      handler();
    });
  }

  // Sticky Header
  _stickyNav(entries) {
    const header = document.querySelector(".header");

    entries.forEach((entry) => {
      if (!entry.isIntersecting) header.classList.add("sticky");
      if (entry.isIntersecting) header.classList.remove("sticky");
    });
  }

  addHeaderObserver() {
    const headerObserver = new IntersectionObserver(this._stickyNav, {
      root: null,
      threshold: 1,
    });
    const headerContainer = document.querySelector(".header__container");
    headerObserver.observe(headerContainer);
  }
}

export default new SearchView();
