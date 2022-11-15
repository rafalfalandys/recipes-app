import { API_URL, RESULTS_PER_PAGE } from "./config";

// https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza //search results

// https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886 // single recipe

export const state = {
  recipe: {},
  searchResults: {
    query: "",
    results: [],
    page: 2,
    resultsPerPage: 10,
    pagesQty: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(`${API_URL}${id}`);
    const json = await res.json();
    const recipeData = json.data.recipe;
    state.recipe = {
      cookingTime: recipeData.cooking_time,
      id: recipeData.id,
      image: recipeData.image_url,
      ingredients: recipeData.ingredients,
      publisher: recipeData.publisher,
      servings: recipeData.servings,
      url: recipeData.source_url,
      title: recipeData.title,
    };
  } catch (error) {
    throw new Error();
  }
};

// Search Results
export const loadSearchResults = async function (query) {
  try {
    const res = await fetch(`${API_URL}?search=${query}`);
    if (!res) throw new Error();
    const json = await res.json();
    const searchResults = json.data.recipes;
    state.searchResults.page = 1;
    state.searchResults.results = searchResults.map((recipe) => {
      return {
        id: recipe.id,
        image: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
      };
    });
  } catch (err) {
    throw new Error();
    console.log(err);
  }
};

export const loadResultsPerPage = function (resultsPerPage) {
  console.log(resultsPerPage);
  return (state.searchResults.resultsPerPage = +resultsPerPage);
};

export const getResultsPerPage = function (page = state.searchResults.page) {
  // count pages
  const resultsQty = state.searchResults.results.length;
  state.searchResults.pagesQty = Math.ceil(
    resultsQty / state.searchResults.resultsPerPage
  );

  const start = (page - 1) * state.searchResults.resultsPerPage;
  const end = page * state.searchResults.resultsPerPage;
  return state.searchResults.results.slice(start, end);
};

export const changePage = function (isNext) {
  return isNext ? state.searchResults.page++ : state.searchResults.page--;
};

export const changeServings = function (addOrRemove) {
  const curServings = state.recipe.servings;
  let newServings;
  if (addOrRemove) newServings = curServings + 1;
  if (!addOrRemove && curServings < 2) return;
  if (!addOrRemove) newServings = curServings - 1;
  state.recipe.servings = newServings;

  state.recipe.ingredients.forEach(
    (ing) => (ing.quantity = (ing.quantity / curServings) * newServings)
  );
};
