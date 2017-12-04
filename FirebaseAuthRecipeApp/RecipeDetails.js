import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';

export default class RecipeDetail extends Component {

  constructor (props) {
    super (props)
    this.state = {
      recipe: {
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

  recipeSelected () {
    console.log('asfasdf')
    this.props.recipeCompletePress()
  }

  componentDidMount () {
    const { params } = this.props.navigation.state;
    console.log(params)
  }

  render () {
    const recipe = this.state.recipe
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state;
    console.log(params)
    return (
      <View style={styles.detailContainer}>
        <View style={styles.imageContainer}>
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
        <View style={{borderWidth: 1, borderColor: '#bababa', padding: '5%', marginBottom: 20}}>
          <View style={styles.ingredientsAndAppliancesContainer}>
            <View style={styles.ingredientsContainer}>
              <Text>Required Ingredients:</Text>
              {Object.keys(recipe.ingredients).map((ingredientName, index) =>
                <Text key={index}>
                  {'- '}{recipe.ingredients[ingredientName].quantity}{' '}
                  {recipe.ingredients[ingredientName].type}{' '}
                  {ingredientName}
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
        <TouchableOpacity onPress={() => navigate('RecipesScreen', {userID: 'lrg006'})}>
          <View style={styles.button}>
            <Text style={{color: 'white', fontSize: 20}}>Done Cooking</Text>
            <Text style={{color: 'white', textAlign: 'center'}}>
              (removes ingredients from your inventory)
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center'
  }
})
