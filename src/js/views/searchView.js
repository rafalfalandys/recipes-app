import View from "./view.js";

class SearchView extends View {
  _parentEl = document.querySelector(".search");

  getQuery() {
    const query = this._parentEl.querySelector(".search__field").value;
    this._parentEl.querySelector(".search__field").value = "";
    return query;
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  _stickyNav(entries) {
    const header = document.querySelector(".header");

    entries.forEach((entry) => {
      console.log(entry.isIntersecting);
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

// sticky nav
