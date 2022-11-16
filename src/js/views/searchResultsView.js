import PreviewView from "./previewView.js";
import { PREVIEW_HEIGHT } from "../config.js";
// import icons from "../../img/sprite.svg";

class SearchResultsView extends PreviewView {
  _parentEl = document.querySelector(".results--link");
  _errorMessage = "No recipes found. Search again";

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
}

export default new SearchResultsView();
