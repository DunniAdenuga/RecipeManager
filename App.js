import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import RecipePreview from './components/RecipePreview';
import Icon from 'react-native-vector-icons/Feather'
import Swiper from 'react-native-swiper'
import Recipes from './screens/Recipes'
import MainAppNavigator from './navigators/Navigator'
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBuOKCx9RlqnKbjdziJcvJvw0RwrNNLVpU",
  authDomain: "testfirebase-5e2e2.firebaseapp.com",
  databaseURL: "https://testfirebase-5e2e2.firebaseio.com",
  projectId: "testfirebase-5e2e2",
  storageBucket: "testfirebase-5e2e2.appspot.com",
  messagingSenderId: "638488131684"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {

  render () {
    return (
      <MainAppNavigator />
    )
  }
}
