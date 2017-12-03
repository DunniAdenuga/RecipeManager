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
