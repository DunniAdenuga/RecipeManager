import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import AllIngredientsListEntry from '../components/AllIngredientsListEntry'
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
    tabBarLabel: 'All Ingredients',
  };

  async getAllIngredients () {
    try {
      let ingreds = await fetch(
        `https://testfirebase-5e2e2.firebaseio.com/Ingredient.json`
      )
      let ingredsJson = await ingreds.json()
      return ingredsJson
    } catch (error) {
      console.log(error)
    }
  }

  componentWillMount () {
    this.getAllIngredients()
      .then((data) => {
        this.setState({
          ingredients: data
        })
      })
  }

  addIngredientToUserIngreds (ingredientId) {
    const { params } = this.props.navigation.state
    let allIngredients = this.state.ingredients
    firebase.database().ref(`UserIngredients/${params.userId}/${allIngredients[ingredientId]['key']}`).set({
      quantity: 0,
      type: allIngredients[ingredientId]['measure']
    })
  }

  render () {
    let ingredients = this.state.ingredients
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state
    return (
      <View style={styles.ingredientsContainer}>
        <View style={styles.header}>
          <Text style={{fontSize: 25, color: 'white'}}>All Ingredients</Text>
          <View style={{position: 'absolute', right: 20, top: 22}}>
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
        <ScrollView style={styles.ingredientsListContainer}>
          {Object.keys(ingredients).map((ingredientId, index) =>
            <AllIngredientsListEntry
              ingredientName={ingredients[ingredientId]['key']}
              addIngredientToUserIngreds={() =>
                this.addIngredientToUserIngreds(ingredientId)
              }
              key={index}
              fromAllIngredients={true}
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
    height: '100%'
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
  }
})
