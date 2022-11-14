import icons from "url:../../img/sprite.svg";
import View from "./view";
import fracty from "fracty";

class RecipeView extends View {
  _parentEl = document.querySelector(".recipe");
  _errorMessage = "We could not find that recipe, please try another one";

  addHandlerUrlChange(handler) {
    window.addEventListener("hashchange", handler);
  }

  addHandlerServingsChange(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".serving-btn");
      if (!btn) return;
      //returns true if plus btn pressed and false if minus
      const isPlus = btn.classList.contains("recipe__info-icon--man-plus");
      return handler(isPlus);
    });
  }

  // generating HTML for each ingredient
  _generateMarkupIngredients(ing) {
    return `
        <li class="recipe__ingredient">
          <span class="recipe__ingredient--ingredient">
            ${ing.description}
          </span>
          <span class="recipe__ingredient--dash">${
            ing.quantity ? "-" : ""
          }</span>
          <span class="recipe__ingredient--qty">${
            ing.quantity ? fracty(ing.quantity) : ""
          }</span>
          <span class="recipe__ingredient--unit">${ing.unit}</span>
        </li>
        `;
  }

  // generating whole recipe HTML
  _generateMarkup(data) {
    return `
        <!-- -------------------- header ---------------------- -->
        <header class="recipe__header">
            <figure class="recipe--image">
                <img
                src="${data.image}"
                alt="meal image"
                />
                <h1 class="recipe--title">
                    <span>${data.title}</span>
                </h1>
            </figure>
        </header>

        <!-- ---------------- recipe details ------------------ -->
        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon recipe__info-icon--time">
              <use xlink:href="${icons}#icon-time"></use>
            </svg>
            <span class="recipe-info-time">${data.cookingTime}</span>
            <span>&nbsp;minutes</span>
          </div>

          <div class="recipe__info recipe--servings">
            <svg
              class="recipe__info-icon recipe__info-icon--man-plus"
            >
              <use xlink:href="${icons}#icon-user-add"></use>
            </svg>
            <span class="recipe__info--data">${data.servings}</span>
            <span class="recipe__info--text">&nbsp;servings</span>
            <svg
              class="recipe__info-icon recipe__info-icon--man-minus icon-hover serving-btn"
            >
              <use xlink:href="${icons}#icon-minus-outline"></use>
            </svg>
            <svg
              class="recipe__info-icon recipe__info-icon--man-plus icon-hover  serving-btn"
            >
              <use xlink:href="${icons}#icon-add-outline"></use>
            </svg>
          </div>

          <div class="recipe--buttons">
            <svg class="recipe__info-icon recipe__info-icon--man">
              <use xlink:href="${icons}#icon-user"></use>
            </svg>
            <svg
              class="recipe__info-icon recipe__info-icon--bookmarks icon-hover"
            >
              <use xlink:href="${icons}#icon-bookmark-outline"></use>
            </svg>
          </div>
        </div>

        <!-- ------------------- ingredients ------------------ -->
        <div class="recipe__ingredients">
        <header class="recipe__ingredients--header heading-2">
            Recipe Ingredients
        </header>
            <ul class="recipe__ingredients__list">
                ${data.ingredients
                  .map((ing) => this._generateMarkupIngredients(ing))
                  .join(" ")}
            </ul>
        </div>

        <!-- ------------------- directions ------------------ -->
        <div class="recipe__directions">
            <header class="recipe__directions--header heading-2">
                How to cook it
            </header>
            <p class="recipe__directions--text">
                This recipe was carefully designed and tested by
                <span class="recipe--publisher">${data.publisher}</span>
                . Please check out directions at their website:
            </p>
            <a class="recipe__directions__btn btn" href="${
              data.url
            }" target='_blank'>
                <span>Directions</span>
                <svg class="recipe__directions__btn--icon btn--icon">
                    <use xlink:href="${icons}#icon-arrow-thin-right" />
                </svg>
            </a>
        </div>
        `;
  }
}

export default new RecipeView();
