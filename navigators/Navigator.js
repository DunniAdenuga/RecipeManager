import React from 'react'
import { StackNavigator } from 'react-navigation'
import Recipes from '../screens/Recipes'
import RecipeDetail from '../screens/RecipeDetail'
import Login from '../screens/Login'
import Ingredients from './IngredientsNavigator'
import { View, Button, Text, AppRegistry } from 'react-native'

const MainAppNavigator = StackNavigator(
  {
    LoginScreen: { screen: Login },
    RecipesScreen: { screen: Recipes },
    RecipeDetailScreen: { screen: RecipeDetail },
    IngredientsScreen: { screen: Ingredients },
  },
  {
    headerMode: 'none',
    mode: 'modal'
  }
)

AppRegistry.registerComponent('MainAppNavigator', () => recipe)

export default MainAppNavigator
