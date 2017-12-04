import React from 'react';
import { StyleSheet, Text, View,Image, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { TitledInput } from './TitledInput'
import  LoginScreen from './Login'
import  RecipeScreen from './Recipe'
import IngredientsListScreen from './IngredientsList'
import Spinner from './Spinner'
import RecipeDetail from './RecipeDetails'

export const AllScreens = StackNavigator({
  First: { screen: LoginScreen },
  Second: { screen: IngredientsListScreen },
  Third: { screen: RecipeScreen },
  Fourth: { screen: RecipeDetail}
});


export default class App extends React.Component {
  /*componentWillMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyBuOKCx9RlqnKbjdziJcvJvw0RwrNNLVpU",
      authDomain: "testfirebase-5e2e2.firebaseapp.com",
      databaseURL: "https://testfirebase-5e2e2.firebaseio.com",
      projectId: "testfirebase-5e2e2",
      storageBucket: "testfirebase-5e2e2.appspot.com",
      messagingSenderId: "638488131684"
    });
  }*/
  render() {
    return <AllScreens />;
  }
}
