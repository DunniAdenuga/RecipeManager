import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';

export default class RecipeDetail extends Component {

  constructor (props) {
    super (props)
    this.state = {
      recipe: { // Placeholder recipe for initial rendering, gets overridden when component mounts
        name: 'Banana Bread',
        appliances: 'Oven, Stove',
        imageURL: 'http://www.simplyrecipes.com/wp-content/uploads/2014/08/banana-bread-horiz-a-1600.jpg',
        time: '2h',
        servings: 4,
        difficulty: 'medium',
        ingredients: {
          milk: {
            quantity: 2,
            type: 'cups'
          },
          eggs: {
            quantity: 4,
            type: ''
          }
        },
        instructions: 'Whisk eggs$$Put eggs and milk in bucket$$Put bucket in oven and watch cook'
      }
    }
  }

  // Takes a recipeId and returns its entry in the Recipes table from firebase
  getRecipeFromId (recipeId) {
    console.log(recipeId)
    return fetch(`https://testfirebase-5e2e2.firebaseio.com/Recipes/${recipeId}.json`)
      .then(response => response.json())
      .then(responseJson => {
        return responseJson
      })
      .catch(error => {
        console.error(error)
      })
  }

  // Looks in the User's Ingredients table to see how much of this ingredient they have
  getUserIngredientAmount (ingredientName) {
    const { params } = this.props.navigation.state
    return fetch(
      `https://testfirebase-5e2e2.firebaseio.com/UserIngredients/${params.userId}/${ingredientName}.json`
    )
      .then(ingredient => ingredient.json())
      .then(ingredientJson => {
        return ingredientJson
      })
      .catch(error => {
        console.error(error)
      })
  }

  // Removes quantity of ingredient from User's Ingredient table according to the Recipe
  removeUserIngredByNameAndQuantity (ingredientName, quantity) {
    const { params } = this.props.navigation.state
    this.getUserIngredientAmount(ingredientName)
      .then((ingredient) => {
        firebase.database().ref('UserIngredients/' + params.userId).update({
          [ingredientName]: {
            quantity: parseFloat(ingredient['quantity'] - quantity),
            type: ingredient['type']
          }
        })
      })
  }

  completeRecipe () {
    let recipe = this.state.recipe
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state
    {Object.keys(recipe.ingredients).forEach((ingredientId) => {
      this.removeUserIngredByNameAndQuantity(
        recipe.ingredients[ingredientId].name, parseFloat(recipe.ingredients[ingredientId].quantity)
      )
    })}
    navigate('RecipesScreen', {userId: params.userId})
  }

  componentWillMount () {
    const { params } = this.props.navigation.state
    this.getRecipeFromId(params.recipeId)
    .then((recipe) => {
      this.setState({
        recipe: recipe
      })
    })
  }

  render () {
    const recipe = this.state.recipe
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state;
    return (
      <ScrollView>
        <View style={styles.detailContainer}>
          <View style={styles.imageContainer}>
            <View style={styles.backButtonContainer}>
              <Icon.Button
                type='ionicon'
                name='ios-arrow-dropup-outline'
                size={30} color='white'
                onPress={() =>navigate('RecipesScreen', {userId: params.userId})}
                style={{
                  padding: 0, margin: 0
                }}
                backgroundColor='rgba(0, 0, 0, 0.25)'
              />
            </View>
            <Image source={{uri: recipe.imageURL}} style={styles.recipeImage} />
            <View style={styles.recipeNameServingTimeAndDifficultyContainer}>
              <View style={styles.nameAndServingSize}>
                <Text style={{fontSize: 25, color: 'white'}}>{recipe.name}</Text>
                <Text style={styles.overlaidText}>Serves {recipe.servings}</Text>
              </View>
              <View style={styles.timeAndDifficultyContainer}>
                <Text style={styles.overlaidText}>{recipe.time}</Text>
                <Text style={styles.overlaidText}>Difficulty: {recipe.difficulty}</Text>
              </View>
            </View>
          </View>
          <View style={styles.ingredientDetailContainer}>
            <View style={styles.ingredientsAndAppliancesContainer}>
              <View style={styles.ingredientsContainer}>
                <Text>Required Ingredients:</Text>
                {Object.keys(recipe.ingredients).map((ingredientId, index) =>
                  <Text key={index}>
                    {'- '}{recipe.ingredients[ingredientId].quantity}{' '}
                    {recipe.ingredients[ingredientId].type}{' '}
                    {recipe.ingredients[ingredientId].name}
                  </Text>
                )}
              </View>
              <View style={styles.appliancesContainer}>
                <Text>Required Appliances:</Text>
                {recipe.appliances.split(',').map((applianceName, index) =>
                  <Text key={index}>
                    {applianceName}
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.instructionsContiainer}>
              {recipe.instructions.split('$$').map((instruction, index) =>
                <View style={{paddingBottom: 10}} key={index}>
                  <Text style={{paddingBottom: 5}}>Step {index}:</Text>
                  <Text>{instruction}</Text>
                </View>
              )}
            </View>
          </View>
          <TouchableOpacity onPress={() => this.completeRecipe()}>
            <View style={styles.button}>
              <Text style={{color: 'white', fontSize: 20}}>Done Cooking</Text>
              <Text style={{color: 'white', textAlign: 'center'}}>
                (removes ingredients from your inventory)
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  detailContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fcfcfc'
  },
  backButtonContainer: {
    position: 'absolute',
    zIndex: 2,
    left: 10,
    top: 10,
    width: 35,
    height: 35
  },
  imageContainer: {
    width: '95%',
    height: 200,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#bababa',
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  recipeImage: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  recipeNameServingTimeAndDifficultyContainer: {
    width: '100%',
    height: '30%',
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9
  },
  nameAndServingSize: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    paddingLeft: 10,
    paddingBottom: 5
  },
  timeAndDifficultyContainer: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingBottom: 5
  },
  overlaidText: {
    color: 'white',
  },
  ingredientDetailContainer: {
    borderWidth: 1,
    borderColor: '#bababa',
    padding: '5%',
    marginBottom: 20
  },
  ingredientsAndAppliancesContainer: {
    width: '90%',
    flexDirection: 'row',
    marginBottom: 20
  },
  ingredientsContainer: {
    width: '50%'
  },
  appliancesContainer: {
    width: '50%',
    alignItems: 'flex-end',
  },
  instructionsContiainer: {
    width: '90%',
  },
  button: {
    width: '80%',
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  }
})
