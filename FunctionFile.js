import React from 'react';
import * as firebase from 'firebase';
import { getUserIngredients, getAllRecipes } from './network/Requests'

getMatchingRecipes (userId) {
  let userIngredients = getUserIngredients (userId)
  let allRecipes = getAllRecipes()
  return gerRecipes (userIngredients, allRecipes)
}

gerRecipes (recipes, userIngredients) {

  let userRecipes = [];

  Object.entries(recipes).forEach((recipeId) => {
    if (this.userHasIngredients(recipes.recipeId.ingredients, userIngredients)) {
      userRecipes.push(recipeId)
    }
  })

  return userRecipes
}

userHasIngredients (recipeIngredients, userIngredients) {
  let numberOfCorrectIngredients = 0
  recipeIngredients.forEach((ingredientId) => {
    let ingredientName = recipeIngredients[ingredientId]['name']
    let ingredientQuantity = recipeIngredients[ingredientId]['quantity']
    if (userIngredients.hasOwnProperty(ingredientName)) {
      if (userIngredients[ingredientName]['quantity'] >= ingredientQuantity) {
        numberOfCorrectIngredients += 1
      } else {
        return false
      }
    } else {
      return false
    }
  })
  if (numberOfCorrectIngredients === recipeIngredients.length) {
    return true
  }
}
//
//   Object.entries(recipes).forEach(([recipe, value]) => { // go through each recipe possible
//     if (value.hasOwnProperty('ingredients')) {
//       let chooseRecipe = true;
//       Object.entries(value).forEach(([key2, value2]) =>{ // for each recipe, go through
//         if (key2 == 'ingredients') {
//           console.log("\n");
//           Object.entries(value2).forEach(([key3, value3]) =>{
//             console.log("Ingredient Detailssssss");
//             Object.entries(value3).forEach(([key4, value4]) =>{
//               //console.log(`${key4} ${value4}`);
//               if(key4 == 'name'){
//                 trueFalse = compareWithUser(value4, userIngredients);
//                 //console.log(`${key4} ${value4}`);
//                 console.log(trueFalse);
//                 if(trueFalse === false){
//                   chooseRecipe = false;
//                 }
//               }
//             });//display every ingredient prop
//
//           });//loop through ingredients list, display each
//       }
//     });//loop through each Recipe detail- name, instr, ingre
//
//     if(chooseRecipe === true){
//     //console.log(this.state.userrecipes);
//       console.log(key);
//       userRecipe.push(key);
//       //userRecipe.push(value);
//       console.log("choose R ?" + chooseRecipe);
//     }  //add recipe if all ingredients were found
//   }//if
//   });//loop through Recipes
//   console.log(userRecipe);
//   return userRecipe;
// }//showAllRecipesFor ends
//
//
// function compareWithUser(ingredientName, userIngredients){
//   result = false;
//   Object.entries(userIngredients).forEach((key, value)=>{
//     //Object.entries(value).forEach(([key2, value2])=> {
//     console.log("ingredientName: " + ingredientName);
//     console.log("key: " + key);
//       if(key === ingredientName){
//         result = true;
//       }
//   });
//   return result;
// }
