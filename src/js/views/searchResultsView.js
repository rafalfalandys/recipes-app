import PreviewView from "./previewView.js";
import { PREVIEW_HEIGHT } from "../config.js";
// import icons from "../../img/sprite.svg";

class SearchResultsView extends PreviewView {
  _parentEl = document.querySelector(".results--link");
  _containerEl = document.querySelector(".results-and-btns");
  _overlay = document.querySelector(".overlay__sidebar");

  _errorMessage = "No recipes found. Search again";

  constructor() {
    super();
    this._containerEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-slider");
      if (!btn) return;
      this.toggleSidebar();
    });
  }

  getResultsPerPageNo = function () {
    const headerH = document.querySelector(".header").offsetHeight;
    const paginationH = document.querySelector(".pagination").offsetHeight;
    const copyrightsH = document.querySelector(".copyright").offsetHeight;
    const mainContainerH =
      document.querySelector(".main-container").offsetHeight;

    const resultsH = mainContainerH - headerH - paginationH - copyrightsH;

    const resultsNo = Math.floor(resultsH / PREVIEW_HEIGHT);

    return resultsNo;
  };

  toggleSidebar = () => {
    this._overlay.classList.toggle("hidden");
    this._containerEl.classList.toggle("moved");
  };

  hideSidebar = () => {
    this._overlay.classList.add("hidden");
    this._containerEl.classList.add("moved");
  };

  showSidebar = () => {
    this._overlay.classList.remove("hidden");
    this._containerEl.classList.remove("moved");
  };
}

export default new SearchResultsView();
