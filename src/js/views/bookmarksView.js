import View from "./view.js";
// import icons from "../../img/sprite.svg";

class BookmarksView extends View {
  _parentEl = document.querySelector(".results--bookmarks");
  _errorMessage = "No bookmarks yet";

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
}

export default new BookmarksView();