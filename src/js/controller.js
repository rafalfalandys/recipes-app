import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchResultsView from "./views/searchResultsView.js";
import searchView from "./views/searchView.js";
import paginationView from "./views/paginationView.js";
import { RESULTS_PER_PAGE } from "./config.js";

const controlRecipe = async function () {
  const id = window.location.hash.slice(1);
  console.log(id);
  await model.loadRecipe(id);
  console.log(model.state);
  recipeView.render(model.state.recipe);
};

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

  console.log(model.state.searchResults);

  paginationView.render(model.state.searchResults);
};

const init = function () {
  // controlRecipe();
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerUrlChange(controlRecipe);
};

init();
