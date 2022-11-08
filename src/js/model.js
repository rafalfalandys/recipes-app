import { API_URL } from "./config";

// https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza //search results

// https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886 // single recipe

export const state = {
  recipe: {},
  searchResults: {
    query: "",
    results: [],
    page: 1,
    // resultsPerPage:
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    console.log(id);
    console.log(`${API_URL}${id}`);
    const res = await fetch(`${API_URL}${id}`);
    console.log(res);
    const json = await res.json();
    console.log(json);
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
    // const res = await fetch(
    //   `https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza`
    // );
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
    console.log(state.searchResults);
  } catch (err) {
    console.log(err);
  }
};

export const splitResultsByPages = function () {
  state.searchResults.results.sli;
};
