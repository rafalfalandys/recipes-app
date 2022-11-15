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
