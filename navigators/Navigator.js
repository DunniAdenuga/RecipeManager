import React from 'react'
import { StackNavigator } from 'react-navigation'
import Recipes from '../screens/Recipes'
import RecipeDetail from '../screens/RecipeDetail'
import Login from '../screens/Login'
import Ingredients from './IngredientsNavigator'
import { View, Button, Text, AppRegistry } from 'react-native'

const IngredientsScreenNavigator = ({ navigation }) => (
  <Ingredients navigation={navigation} />
)

const MainAppNavigator = StackNavigator(
  {
    LoginScreen: { screen: Login },
    RecipesScreen: { screen: Recipes },
    IngredientsScreen: { screen: Ingredients },
    RecipeDetailScreen: { screen: RecipeDetail },
  },
  {
    headerMode: 'none',
    mode: 'modal'
  }
)

AppRegistry.registerComponent('MainAppNavigator', () => recipe)

export default MainAppNavigator
