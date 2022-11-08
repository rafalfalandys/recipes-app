import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchResultsView from "./views/searchResultsView.js";
import searchView from "./views/searchView.js";

const controlRecipe = async function () {
  const id = window.location.hash.slice(1);
  console.log(id);
  await model.loadRecipe(id);
  console.log(model.state);
  recipeView.render(model.state.recipe);
};

const controlSearchResults = async function () {
  const query = searchView.getQuery();
  await model.loadSearchResults(query);
  const resultsAfterPagination = model.getResultsPerPage(
    model.state.searchResults.page
  );
  searchResultsView.render(resultsAfterPagination);
};

const init = function () {
  // controlRecipe();
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerUrlChange(controlRecipe);
};

init();
