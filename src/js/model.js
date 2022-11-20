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
    isBookmarked: state.bookmarksIDs.some((id) => id === recipeData.id)
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
    console.log(state.searchResults.results);
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
  if (
    !state.bookmarksIDs.some((bookmarkID) => bookmarkID === state.recipe.id)
  ) {
    state.bookmarksIDs.push(state.recipe.id);
    state.recipe.isBookmarked = true;
  } else {
    state.bookmarksIDs.splice(state.bookmarksIDs.indexOf(state.recipe.id), 1);
    state.recipe.isBookmarked = false;
  }
};

const loadBookmarksSingleObject = async function (id) {
  try {
    // const res = await fetch(`${API_URL}${id}`);
    // const json = await res.json();
    const json = await AJAX(`${API_URL}${id}`);
    const recipeData = json.data.recipe;
    const recipe = buildPreviewRecipeObject(recipeData);
    // {
    //   id: recipeData.id,
    //   image: recipeData.image_url,
    //   publisher: recipeData.publisher,
    //   title: recipeData.title,
    // };
    return recipe;
  } catch (error) {
    throw new Error();
  }
};

export const loadBookmarksObjects = async function () {
  try {
    state.bookmarksObjects = await Promise.all(
      state.bookmarksIDs.map((id) => loadBookmarksSingleObject(id))
    );
  } catch (error) {
    console.log(error);
  }
};

export const setLocalStorage = function () {
  localStorage.setItem("bookmarksIDs", JSON.stringify(state.bookmarksIDs));
};

export const loadLocalStorage = function () {
  if (!localStorage.bookmarksIDs) return;
  const bookmarksIDs = JSON.parse(localStorage.bookmarksIDs);
  state.bookmarksIDs = bookmarksIDs;
};

export const uploadRecipeObject = async function (dataArr) {
  try {
    const recipeData = Object.fromEntries(dataArr.slice(0, 6));
    const ingredientsData = dataArr.slice(6);
    const ingredients = [];

    const separateIngredients = function (array) {
      const ingredientsArrays = [];
      while (array.length) {
        ingredientsArrays.push(array.splice(0, 3));
      }
      ingredientsArrays.forEach((arr) => {
        const ingredient = Object.fromEntries(arr);
        ingredients.push(ingredient);
      });
    };

    separateIngredients(ingredientsData);

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
