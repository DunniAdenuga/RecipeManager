import React from 'react';
import firebase from 'firebase';

export async function getAllIngredients () {
  try {
    let response = await fetch('https://testfirebase-5e2e2.firebaseio.com/.json');
    let responseJson = await response.json();
    return responseJson.Ingredient;
  } catch(error) {
    // Handle error
    console.error(error);
  }
}

export function getUserIngredients (userId) {
  return fetch(`https://testfirebase-5e2e2.firebaseio.com/UserIngredients/${userId}.json`)
    .then(response => response.json())
    .then(responseJson => {
      return responseJson
    })
    .catch (error => {
      console.error(error)
    })
}

export async function getAllRecipes (recipeId) {
  try {
    let response = await fetch(`https://testfirebase-5e2e2.firebaseio.com/Recipes.json`)
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.error(error)
  }
}
