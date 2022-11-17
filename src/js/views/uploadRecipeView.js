import View from "./view.js";

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
      handler(dataArr);
    });
  }
}

export default new UploadRecipeView();
