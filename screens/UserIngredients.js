import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import UserIngredientsListEntry from '../components/UserIngredientsListEntry'
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';

export default class UserIngredients extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      ingredients: {
        bananas: 1 // for when render runs first time, this gets overwritten by getIngredients
      }
    }
  }

  static navigationOptions = {
    tabBarLabel: 'Your Ingredients',
  };

  // Gets all ingredients the User has in their inventory
  getUserIngredients (userId) {
    return fetch(`https://testfirebase-5e2e2.firebaseio.com/UserIngredients/${userId}.json`)
      .then(response => response.json())
      .then(responseJson => {
        return responseJson
      })
      .catch (error => {
        console.error(error)
      })
  }

  // Gets a specific ingredient from User's inventory -- useful for updates of specific entries
  async getIngredient (userId, ingredientName) {
    try {
      let ingredient = await fetch(
        `https://testfirebase-5e2e2.firebaseio.com/UserIngredients/${userId}/${ingredientName}.json`
      )
      let ingredientJson = await ingredient.json()
      return ingredientJson
    } catch (error) {
      console.log(error)
    }
  }

  componentWillMount () {
    const { params } = this.props.navigation.state
    this.getUserIngredients(params.userId)
      .then((data) => {
        this.setState({
          ingredients: data
        })
      })
  }

  // When one entry in User's inventory changes, call this to update state accordingly
  updateQuantities (ingredientName) {
    const ingredients = this.state.ingredients
    const { params } = this.props.navigation.state
    this.getIngredient(params.userId, ingredientName)
      .then((data) => {
        ingredients[ingredientName] = data
        this.setState({
          ingredients
        })
      })
  }

  updateIngredient (ingredientName, newQuantity) {
    const { params } = this.props.navigation.state
    firebase.database().ref(`UserIngredients/${params.userId}/${ingredientName}/quantity`)
      .set(newQuantity)
    this.updateQuantities(ingredientName)
  }

  render () {
    let ingredients = this.state.ingredients
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state
    return (
      <View style={styles.ingredientsContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Your Ingredients</Text>
          <View style={styles.recipeButtonConatiner}>
            <Icon.Button
              type='ionicon'
              name='ios-map-outline'
              size={30} color='white'
              onPress={() =>navigate('RecipesScreen', {userId: params.userId})}
              style={{
                padding: 0, margin: 0
              }}
              backgroundColor='transparent'
            />
        </View>
        </View>
        <ScrollView>
          {Object.keys(ingredients).map((ingredientName, index) =>
            <UserIngredientsListEntry
              ingredientName={ingredientName}
              ingredientQuantity={ingredients[ingredientName]['quantity']}
              ingredientType={ingredients[ingredientName]['type']}
              incrementIngredient={() =>
                this.updateIngredient(ingredientName, ingredients[ingredientName]['quantity'] + 1)
              }
              decrementIngredient={() =>
                this.updateIngredient(ingredientName, ingredients[ingredientName]['quantity'] - 1)
              }
              key={index}
              fromAllIngredients={false}
            />
          )}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ingredientsContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  header: {
    height: '10%',
    backgroundColor: 'lightblue',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    flexDirection: 'row',
    position: 'relative'
  },
  headerText: {
    fontSize: 25,
    color: 'white'
  },
  recipeButtonConatiner: {
    position: 'absolute',
    right: 10,
    top: 22
  }
})
