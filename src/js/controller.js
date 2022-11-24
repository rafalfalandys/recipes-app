import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchResultsView from "./views/searchResultsView.js";
import searchView from "./views/searchView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import uploadRecipeView from "./views/uploadRecipeView.js";
import { wait } from "./helper.js";
import { async } from "regenerator-runtime";
import logoView from "./views/logoView.js";

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

    // 5) hide sidebar on phones
    searchResultsView.hideSidebar();
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

const controlAddBookmark = function () {
  // handle bookmarks in model
  model.toggleBookmark();
  //upload local storage
  model.setLocalStorage();
  // render bookmarks panel
  bookmarksView.render(model.state.bookmarks);
  //update current recipe view
  recipeView.update(model.state.recipe);
};

const controlLoadBookmarks = function () {
  // get local storage into model
  model.loadLocalStorage();
  // render bookmarks view
  bookmarksView.render(model.state.bookmarks);
};

////////////////////////////////////////////////////////////
///////////////////// Control upload ///////////////////////
////////////////////////////////////////////////////////////

const controlUploadRecipe = async function (dataArr) {
  try {
    // render spinner
    uploadRecipeView.renderSpinner();
    // upload recipe
    await model.uploadRecipeObject(dataArr);
    // render recipe
    recipeView.render(model.state.recipe);
    // bookmark it
    controlAddBookmark();
    // render message
    uploadRecipeView.renderMessage();
    // change id in url
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    //
    await wait(3);
    uploadRecipeView.hideUploadWindow();
    await wait(1);
    uploadRecipeView.render();
  } catch (error) {
    uploadRecipeView.renderError();
    setTimeout(() => {
      uploadRecipeView.hideUploadWindow();
      uploadRecipeView.render();
    });
  }
};

const controlReload = function () {
  model.stateInit();
  window.history.pushState(null, "", "#");
  document.location.reload();
};
////////////////////////////////////////////////////////////
/////////////////////////// Init ///////////////////////////
////////////////////////////////////////////////////////////

const init = function () {
  bookmarksView.addHandlerUrlChangeOrLoad(controlLoadBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPageChange(controlPagination);
  recipeView.addHandlerUrlChangeOrLoad(controlRecipe);
  recipeView.addHandlerServingsChange(controlServingsChange);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  uploadRecipeView.addHandlerCollectData(controlUploadRecipe);
  logoView.addHandlerReload(controlReload);
};

init();
