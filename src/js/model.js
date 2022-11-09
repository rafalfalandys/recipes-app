import { API_URL, RESULTS_PER_PAGE } from "./config";

// https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza //search results

// https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886 // single recipe

export const state = {
  recipe: {},
  searchResults: {
    query: "",
    results: [],
    page: 2,
    // resultsPerPage:
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
  } catch (err) {
    console.log(err);
  }
};

// Search Results
export const loadSearchResults = async function (query) {
  try {
    const res = await fetch(`${API_URL}?search=${query}`);
    const json = await res.json();
    const searchResults = json.data.recipes;
    state.searchResults.results = searchResults.map((recipe) => {
      return {
        id: recipe.id,
        image: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
      };
    });
  } catch (err) {
    console.log(err);
  }
};

export const countPages = function () {
  const resultsQty = state.searchResults.results.length;
  state.searchResults.pagesQty = Math.ceil(resultsQty / RESULTS_PER_PAGE);
};

export const getResultsPerPage = function (page = state.searchResults.page) {
  // state.searchResults.page = page;
  const start = (page - 1) * RESULTS_PER_PAGE;
  const end = page * RESULTS_PER_PAGE;
  return state.searchResults.results.slice(start, end);
  console.log(state.searchResults.results.slice(start, end));
};

export const changePage = function (isNext) {
  return isNext ? state.searchResults.page++ : state.searchResults.page--;
};
