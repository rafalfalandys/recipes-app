import { mark } from "regenerator-runtime";
import View from "./view.js";
import icons from "url:../../img/sprite.svg";

class UploadRecipeView extends View {
  _parentEl = document.querySelector(".upload__container");
  _btn = document.querySelector(".btn--add-recipe");
  _overlay = document.querySelector(".overlay");
  _closeBtn = document.querySelector(".btn--close");

  constructor() {
    super();
    this._btn.addEventListener("click", this._toggleUploadWindow.bind(this));
    this._overlay.addEventListener("click", this._hideUploadWindow.bind(this));
    this._closeBtn.addEventListener(
      "click",
      this._toggleUploadWindow.bind(this)
    );
    document.addEventListener("keydown", this._runIfEsc.bind(this));
    this._addHandlerAddOrRemoveIngredientField();
  }

  _runIfEsc(e) {
    if (e.key === "Escape") this._hideUploadWindow();
  }

  _toggleUploadWindow() {
    this._parentEl.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }

  _hideUploadWindow() {
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

  _addHandlerAddOrRemoveIngredientField() {
    this._parentEl.addEventListener("click", function (e) {
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
      const newDiv = document.createElement("div");
      newDiv.classList.add("ingredient");
      const btn = e.target.closest(".icon--tiny");
      newDiv.insertAdjacentHTML("afterbegin", markup);
      if (!btn) return;
      const ingredientDiv = btn.closest(".ingredient");
      if (btn.classList.contains("icon--minus")) ingredientDiv.remove();
      if (btn.classList.contains("icon--plus"))
        ingredientDiv.insertAdjacentElement("afterend", newDiv);
    });
  }
}

export default new UploadRecipeView();
