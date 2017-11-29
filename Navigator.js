import React from 'react'
import { StackNavigator } from 'react-navigation'
import Recipes from './screens/Recipes'
import RecipeDetail from './screens/RecipeDetail'
import Login from './screens/Login'
import Ingredients from './screens/Ingredients'
import { View, Button, Text, AppRegistry } from 'react-native'

const AppNavigator = StackNavigator(
  {
    LoginScreen: { screen: Login },
    IngredientsScreen: { screen: Ingredients },
    RecipesScreen: { screen: Recipes },
    RecipeDetailScreen: { screen: RecipeDetail },
  },
  {
    headerMode: 'none',
    mode: 'modal'
  }
)

AppRegistry.registerComponent('AppNavigator', () => recipe)

export default AppNavigator
