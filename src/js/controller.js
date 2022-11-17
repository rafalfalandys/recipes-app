import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchResultsView from "./views/searchResultsView.js";
import searchView from "./views/searchView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import uploadRecipeView from "./views/uploadRecipeView.js";
import { async } from "regenerator-runtime";

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

const controlAddBookmark = async function () {
  try {
    model.toggleBookmark();
    await model.loadBookmarksObjects();
    bookmarksView.render(model.state.bookmarksObjects);
    recipeView.update(model.state.recipe);
    model.setLocalStorage();
  } catch (error) {
    console.log(error);
  }
};

const controlBookmarks = async function () {
  try {
    model.loadLocalStorage();
    await model.loadBookmarksObjects();
    bookmarksView.render(model.state.bookmarksObjects);
  } catch (error) {
    console.log(error);
  }
};

////////////////////////////////////////////////////////////
///////////////////// Control upload ///////////////////////
////////////////////////////////////////////////////////////

const controlUploadRecipe = function (dataArr) {
  console.log(dataArr);
  const recipeData = dataArr.slice(0, 6);
  const ingredientsData = dataArr.slice(6);
  console.log(recipeData);
  console.log(ingredientsData);
};

////////////////////////////////////////////////////////////
/////////////////////////// Init ///////////////////////////
////////////////////////////////////////////////////////////

const init = function () {
  bookmarksView.addHandlerUrlChangeOrLoad(controlBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPageChange(controlPagination);
  recipeView.addHandlerUrlChangeOrLoad(controlRecipe);
  recipeView.addHandlerServingsChange(controlServingsChange);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  uploadRecipeView.addHandlerCollectData(controlUploadRecipe);
};

init();
