import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchResultsView from "./views/searchResultsView.js";
import searchView from "./views/searchView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";

////////////////////////////////////////////////////////////
////////////////////// Control recipe //////////////////////
////////////////////////////////////////////////////////////

const controlRecipe = async function () {
  try {
    // 1) get id from url
    const id = window.location.hash.slice(1);
    if (id === "") return;

    // 2) render spinner
    recipeView.renderSpinner();

    // 3) load recipe
    await model.loadRecipe(id);
    // 4) render
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
    recipeView.renderError();
  }
};

////////////////// Change servings //////////////////

const controlServingsChange = function (addOrRemove) {
  model.changeServings(addOrRemove);
  recipeView.update(model.state.recipe);
  // console.log(model.state.recipe.servings);
};

////////////////////////////////////////////////////////////
////////////////// Control search results //////////////////
////////////////////////////////////////////////////////////

const controlSearchResults = async function () {
  try {
    // 1) render spinner
    searchResultsView.renderSpinner();

    // 2) get query and set it to model
    const query = searchView.getQuery();
    model.state.searchResults.query = query;

    // 3) LOAD SEARCH RESULTS and count pages
    await model.loadSearchResults(query);

    // get number of pages basing on view height
    const resultsPerPage = searchResultsView.getResultsPerPageNo();
    model.loadNumberOfResultsPerPage(resultsPerPage);

    // 4) render page of recipes
    searchResultsView.render(model.getResultsPerPage());

    // 5) render pagination
    paginationView.render(model.state.searchResults);
  } catch (err) {
    // throw new Error();
    console.log(err);
  }
};

////////////////////////////////////////////////////////////
//////////////////// Control pagination ////////////////////
////////////////////////////////////////////////////////////

const controlPagination = function (isNext) {
  // 1) modify state
  model.changePage(isNext);

  // 2) render search resutls again
  searchResultsView.render(model.getResultsPerPage());

  // 3) render pagination
  paginationView.render(model.state.searchResults);
};

////////////////////////////////////////////////////////////
//////////////////// Control bookmarks /////////////////////
////////////////////////////////////////////////////////////

const controlBookmarks = function () {
  const recipe = model.state.recipe;
  const bookmarks = model.state.bookmarks;
  if (!bookmarks.includes(recipe)) {
    model.addBookmark();
    //   model.state.bookmarks.push(recipe);
    //   model.state.recipe.isBookmarked = true;
  } else {
    model.removeBokmark();
    //   model.state.bookmarks.splice(bookmarks.indexOf(recipe), 1);
    //   model.state.recipe.isBookmarked = false;
  }
  // model.toggleBookmark();
  bookmarksView.render(model.state.bookmarks);
  recipeView.update(model.state.recipe);
};

////////////////////////////////////////////////////////////
/////////////////////////// Init ///////////////////////////
////////////////////////////////////////////////////////////

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerUrlChangeOrLoad(controlRecipe);
  // recipeView.addHandlerUrlChangeOrLoad(controlBookmarks);
  recipeView.addHandlerServingsChange(controlServingsChange);
  recipeView.addHandlerAddBookmark(controlBookmarks);
  paginationView.addHandlerPageChange(controlPagination);
};

init();

console.log(model.state);
