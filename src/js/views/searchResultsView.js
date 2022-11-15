import View from "./view.js";
import { PREVIEW_HEIGHT } from "../config.js";
// import icons from "../../img/sprite.svg";

class SearchResultsView extends View {
  _parentEl = document.querySelector(".results--link");
  _errorMessage = "No recipes found. Search again";

  _generateSinglePreview(recipe) {
    return `
        <a class="preview" href="#${recipe.id}">
            <figure class="preview--image">
              <img
                src="${recipe.image}"
                alt="meal"
              />
            </figure>
            <h3 class="preview__data preview__data--title">${recipe.title}</h3>
            <p class="preview__data preview__data--publisher">${recipe.publisher}</p>
        </a>
    `;
  }

  _generateMarkup(recipesArr) {
    return `
    ${recipesArr.map((recipe) => this._generateSinglePreview(recipe)).join(" ")}
    `;
  }

  getResultsPerPageNo = function () {
    const headerHeight = document.querySelector(".header").offsetHeight;
    console.log(headerHeight);
    const paginationHeight = document.querySelector(".pagination").offsetHeight;
    const copyrightsHeight = document.querySelector(".copyright").offsetHeight;
    const mainContainerHeight =
      document.querySelector(".main-container").offsetHeight;
    const resultsHeight =
      mainContainerHeight - headerHeight - paginationHeight - copyrightsHeight;

    console.log(mainContainerHeight);
    const resultsNo = Math.floor(resultsHeight / PREVIEW_HEIGHT);

    return resultsNo;
  };
}

export default new SearchResultsView();

getResultsPerPageNo = function () {
  const headerHeight = document.querySelector(".header").offsetHeight;
  console.log("header", headerHeight);
  const paginationHeight = document.querySelector(".pagination").offsetHeight;
  console.log("pagination", paginationHeight);
  const copyrightsHeight = document.querySelector(".copyright").offsetHeight;
  console.log("copyright", copyrightsHeight);
  const mainContainerHeight =
    document.querySelector(".main-container").offsetHeight;
  console.log("main container", mainContainerHeight);
  const resultsHeight =
    mainContainerHeight - headerHeight - paginationHeight - copyrightsHeight;
  console.log("result", resultsHeight);
  const resultsNo = Math.floor(resultsHeight / PREVIEW_HEIGHT);

  return resultsNo;
};

getResultsPerPageNo();
