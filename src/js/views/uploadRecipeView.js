import View from "./view.js";

class UploadRecipeView extends View {
  _parentEl = document.querySelector(".upload");
  _btn = document.querySelector(".btn--add-recipe");
  _overlay = document.querySelector(".overlay");

  constructor() {
    super();
    this._btn.addEventListener("click", this.toggleUploadWindow.bind(this));
    // this.addHandlerToggleUploadWindow();
  }

  toggleUploadWindow() {
    console.log(this);
    this._parentEl.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }
}

export default new UploadRecipeView();
