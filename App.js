import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import RecipePreview from './components/RecipePreview';
import Icon from 'react-native-vector-icons/Feather'
import Swiper from 'react-native-swiper'
import Recipes from './screens/Recipes'
import AppNavigator from './Navigator'


export default class App extends React.Component {

  render () {
    return (
      <AppNavigator />
    )
  }
}
