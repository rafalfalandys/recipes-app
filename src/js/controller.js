import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchResultsView from "./views/searchResultsView.js";
import searchView from "./views/searchView.js";
import paginationView from "./views/paginationView.js";
import { RESULTS_PER_PAGE } from "./config.js";

////////////////////////////////////////////////////////////
////////////////////// Control recipe //////////////////////
////////////////////////////////////////////////////////////

const controlRecipe = async function () {
  const id = window.location.hash.slice(1);
  await model.loadRecipe(id);
  recipeView.render(model.state.recipe);
};

////////////////////////////////////////////////////////////
////////////////// Control search results //////////////////
////////////////////////////////////////////////////////////

const controlSearchResults = async function () {
  // 1) get query and set it to model
  const query = searchView.getQuery();
  model.state.searchResults.query = query;

  // 2) LOAD SEARCH RESULTS and count pages
  await model.loadSearchResults(query);
  model.countPages();

  // 3) render page of recipes
  searchResultsView.render(model.getResultsPerPage());

  // 4) render pagination
  paginationView.render(model.state.searchResults);
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
/////////////////////////// Init ///////////////////////////
////////////////////////////////////////////////////////////

const init = function () {
  // controlRecipe();
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerUrlChange(controlRecipe);
  paginationView.addHandlerPageChange(controlPagination);
};

init();
