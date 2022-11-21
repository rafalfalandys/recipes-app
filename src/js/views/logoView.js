import View from "./view.js";

class LogoView extends View {
  _parentEl = document.querySelector(".logo");

  addHandlerReload(handler) {
    this._parentEl.addEventListener("click", function (e) {
      handler();
    });
  }
}

export default new LogoView();
