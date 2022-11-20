import { mark } from "regenerator-runtime";
import View from "./view.js";
import icons from "url:../../img/sprite.svg";

class UploadRecipeView extends View {
  _parentEl = document.querySelector(".upload__container");
  _message = "Recipe succesfully uploaded";
  _errorMessage = "Something went wrong. Please try again";

  _btn = document.querySelector(".btn--add-recipe");
  _overlay = document.querySelector(".overlay");
  _closeBtn = document.querySelector(".btn--close");

  constructor() {
    super();
    this._btn.addEventListener("click", this._toggleUploadWindow.bind(this));
    this._overlay.addEventListener("click", this.hideUploadWindow.bind(this));
    this._parentEl.addEventListener(
      "click",
      this._closeWithCloseBtn.bind(this)
    );
    document.addEventListener("keydown", this._runIfEsc.bind(this));
    this._addHandlerAddOrRemoveIngredientField();
  }

  _closeWithCloseBtn(e) {
    const btn = e.target.closest(".btn--close");
    if (!btn) return;
    this.hideUploadWindow();
  }

  _runIfEsc(e) {
    if (e.key === "Escape") this.hideUploadWindow();
  }

  _toggleUploadWindow() {
    this._parentEl.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }

  hideUploadWindow() {
    this._parentEl.classList.add("hidden");
    this._overlay.classList.add("hidden");
  }

  addHandlerCollectData(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      const form = this.querySelector(".upload");
      const dataArr = [...new FormData(form)];
      // const data = Object.fromEntries(dataArr);
      handler(dataArr);
    });
  }

  _generateMarkup() {
    return `
    <form class="upload">
        <div class="btn btn--close hover">
          <svg class="">
            <use xlink:href="${icons}#icon-close" />
          </svg>
        </div>
        <!-- ------------------ Column 1 -------------------- -->

        <div class="column column__1">
          <h1 class="heading">Recipe Data</h1>

          <div class="data-row">
            <label>Title</label>
            <input type="text" name="title" value="" required />
          </div>

          <div class="data-row">
            <label>Recipe URL</label>
            <input
              type="text"
              name="sourceUrl"
              value=""
              required
            />
          </div>

          <div class="data-row">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              value=""
              required
            />
          </div>

          <div class="data-row">
            <label>Publisher</label>
            <input type="text" name="publisher" value="" required />
          </div>

          <div class="data-row">
            <label>Prep. time (min)</label>
            <input type="text" value="" name="cookingTime" required />
          </div>

          <div class="data-row">
            <label>Servings</label>
            <input type="text" name="servings" value="" required />
          </div>
        </div>

        <!-- ------------------ Column 2 -------------------- -->

        <div class="column column__2">
          <h1 class="heading">Ingredients</h1>
          <h2 class="column__2--heading-2">Ingredient</h2>
          <h2 class="column__2--heading-2">Qty</h2>
          <h2 class="column__2--heading-2">Unit</h2>

          <div class="ingredient">
            <input type="text" name="description" value="" required />
            <input type="text" name="quantity" value="" />
            <input type="text" name="unit" value="" />
            <div class="ingredient__btns">
              <svg class="icon--tiny icon--plus hover">
                <use xlink:href="${icons}#icon-add-outline" />
              </svg>
            </div>
          </div>
        </div>

        <div class="row">
          <button class="btn btn--large">
            <span>Upload Recipe</span>
            <svg class="btn--icon">
              <use xlink:href="${icons}#icon-arrow-thin-right" />
            </svg>
          </button>
        </div>
    </form>
    `;
  }

  _addHandlerAddOrRemoveIngredientField() {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".icon--tiny");
      if (!btn) return;

      const markup = `
      <input type="text" name="description" value="" required />
      <input type="text" name="quantity" value="" />
      <input type="text" name="unit" value="" />
      <div class="ingredient__btns">
      <svg class="icon--tiny icon--minus hover">
      <use xlink:href="${icons}#icon-minus-outline" />
      </svg>
      <svg class="icon--tiny icon--plus hover">
      <use xlink:href="${icons}#icon-add-outline" />
      </svg>
      </div>
      `;

      const curIngredientEl = btn.closest(".ingredient");
      // creating new ingredient div
      const newIngredientEl = document.createElement("div");
      newIngredientEl.classList.add("ingredient");
      newIngredientEl.insertAdjacentHTML("afterbegin", markup);

      if (btn.classList.contains("icon--minus")) curIngredientEl.remove();
      if (btn.classList.contains("icon--plus"))
        curIngredientEl.insertAdjacentElement("afterend", newIngredientEl);
    });
  }
}

export default new UploadRecipeView();
