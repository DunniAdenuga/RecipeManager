import React from 'react'
import { TabNavigator } from 'react-navigation'
import UserIngredients from '../screens/UserIngredients'
import AllIngredients from '../screens/AllIngredients'
import { View, Button, Text, AppRegistry } from 'react-native'

const Ingredients = TabNavigator(
  {
    AllIngredientsScreen: { screen: AllIngredients },
    UserIngredientsScreen: { screen: UserIngredients },
  },
  {
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'lightblue',
      labelStyle: {
        fontSize: 14
      }
    },
    lazy: true,
  }
)

AppRegistry.registerComponent('Ingredients', () => recipe)

export default Ingredients
