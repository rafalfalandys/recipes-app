import PreviewView from "./PreviewView.js";

class BookmarksView extends PreviewView {
  _parentEl = document.querySelector(".results--bookmarks");
  _errorMessage = "No bookmarks yet";
}

export default new BookmarksView();
