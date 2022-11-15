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
    const headerHeight = document.querySelector(".header").clientHeight;
    const paginationHeight = document.querySelector(".pagination").clientHeight;
    const copyrightsHeight = document.querySelector(".copyright").clientHeight;
    const mainContainerHeight =
      document.querySelector(".main-container").clientHeight;
    const resultsHeight =
      mainContainerHeight - headerHeight - paginationHeight - copyrightsHeight;

    const resultsNo = Math.floor(resultsHeight / PREVIEW_HEIGHT);

    return resultsNo;
  };
}

export default new SearchResultsView();
