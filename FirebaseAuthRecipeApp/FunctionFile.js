import React from 'react';
import * as firebase from 'firebase';


    export function showAllRecipesFor(Recipes, userIngredients){

    var  userRecipe = [];
    //var userIngredients = [];
    //var Recipes = [];

    /*getUserIngredient(userId)
    .then((data) =>{
      //console.log(data)
      userIngredients = data
      console.log(userIngredients);
    });
    //console.log(userIngredients);

    getRecipes()
    .then((data) =>{
      Recipes = data
      console.log(Recipes);
    });
    //console.log(Recipes);
    //console.log(this.state.Recipes);*/

    Object.entries(Recipes).forEach(([key, value]) =>{
        console.log("into1");
        if(value.hasOwnProperty("ingredients")){
          let chooseRecipe = true;
          //console.log("we dey here");
        Object.entries(value).forEach(([key2, value2]) =>{
          //console.log(key2);
          if(key2 == 'ingredients'){
              console.log("\n");
            Object.entries(value2).forEach(([key3, value3]) =>{
              //console.log("Ingredient Detailssssss");
              Object.entries(value3).forEach(([key4, value4]) =>{
                //console.log(`${key4} ${value4}`);
                if(key4 == 'name'){
                  trueFalse = compareWithUser(value4, userIngredients);
                  //console.log(`${key4} ${value4}`);
                  console.log(trueFalse);
                  if(trueFalse === false){
                    chooseRecipe = false;
                  }
                }
              });//display every ingredient prop

            });//loop through ingredients list, display each
          }
        });//loop through each Recipe detail- name, instr, ingre

        if(chooseRecipe === true){
        //console.log(this.state.userRecipes);
          console.log(key);
          userRecipe.push(key);
          //userRecipe.push(value);
          console.log("choose R ?" + chooseRecipe);
        }  //add recipe if all ingredients were found
      }//if
    });//loop through Recipes
    console.log(userRecipe);
    return userRecipe;
  }//showAllRecipesFor ends


      function compareWithUser(ingredientName, userIngredients){
        //add Amount later
        //console.log(userIngredients);
        result = false;
        //console.log("Ingredient Name: " + ingredientName);
        //console.log(this.state.userIngredient);
        console.log("ingredientName: " + ingredientName);
        Object.entries(userIngredients).forEach(([key, value])=>{
          //Object.entries(value).forEach(([key2, value2])=> {
          console.log("key: " + key);
            if(key == ingredientName){
              result = true;
              console.log(result);
            }
          //});
        });
        return result;
      }
