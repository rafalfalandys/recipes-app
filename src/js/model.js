import { API_KEY, API_URL } from "./config";
import { AJAX } from "./helper.js";

export const state = {
  recipe: {},
  searchResults: {
    query: "",
    results: [],
    page: 2,
    resultsPerPage: 10,
    pagesQty: 1,
  },
  bookmarksIDs: [],
  bookmarksObjects: [],
  bookmarks: [],
};

const createRecipeObject = function (recipeData) {
  return {
    cookingTime: recipeData.cooking_time,
    id: recipeData.id,
    image: recipeData.image_url,
    ingredients: recipeData.ingredients,
    publisher: recipeData.publisher,
    servings: recipeData.servings,
    url: recipeData.source_url,
    title: recipeData.title,
    isBookmarked: state.bookmarks.some(
      (bookmark) => bookmark.id === recipeData.id
    )
      ? true
      : false,
  };
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(`${API_URL}${id}?key=${API_KEY}`);
    const json = await res.json();
    const recipeData = json.data.recipe;
    state.recipe = createRecipeObject(recipeData);
  } catch (error) {
    throw new Error();
  }
};

const buildPreviewRecipeObject = function (recipe) {
  return {
    id: recipe.id,
    image: recipe.image_url,
    publisher: recipe.publisher,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
};

// Search Results
export const loadSearchResults = async function (query) {
  try {
    // const json = await AJAX(`${API_URL}?search=${query}`);
    const json = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    const searchResults = json.data.recipes;
    state.searchResults.page = 1;
    state.searchResults.results = searchResults.map((recipe) => {
      return buildPreviewRecipeObject(recipe);
    });
  } catch (err) {
    throw new Error();
  }
};

export const loadNumberOfResultsPerPage = function (resultsPerPage) {
  return (state.searchResults.resultsPerPage = resultsPerPage);
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

export const toggleBookmark = function () {
  if (!state.bookmarks.some((bookmark) => bookmark.id === state.recipe.id)) {
    state.bookmarks.push(state.recipe);
    state.recipe.isBookmarked = true;
  } else {
    const IDsArr = state.bookmarks.map((bookmark) => bookmark.id);
    const indexOf = IDsArr.indexOf(state.recipe.id);
    state.bookmarks.splice(indexOf, 1);
    state.recipe.isBookmarked = false;
  }
};

export const setLocalStorage = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const loadLocalStorage = function () {
  if (!localStorage.bookmarks) return;
  state.bookmarks = JSON.parse(localStorage.bookmarks);
};

const separateIngredients = function (dataArr, ingredientsArr) {
  const ingredientsArrays = [];
  while (dataArr.length) {
    ingredientsArrays.push(dataArr.splice(0, 3));
  }
  ingredientsArrays.forEach((arr) => {
    const ingredient = Object.fromEntries(arr);
    ingredientsArr.push(ingredient);
  });
};

export const uploadRecipeObject = async function (dataArr) {
  try {
    const recipeData = Object.fromEntries(dataArr.slice(0, 6));
    const ingredientsData = dataArr.slice(6);
    const ingredients = [];

    separateIngredients(ingredientsData, ingredients);

    const recipe = {
      title: recipeData.title,
      source_url: recipeData.sourceUrl,
      image_url: recipeData.image,
      publisher: recipeData.publisher,
      cooking_time: +recipeData.cookingTime,
      servings: +recipeData.servings,
      ingredients: ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    const id = data.data.recipe.id;

    await loadRecipe(id);
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

const deleteRecipe = async function (id) {
  await fetch(`${API_URL}${id}?key=${API_KEY}`, {
    method: "DELETE",
  });
};

// deleteRecipe("6377bef320736600162dde98");
