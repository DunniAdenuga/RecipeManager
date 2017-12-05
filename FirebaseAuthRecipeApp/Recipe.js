import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight,Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import {showAllRecipesFor} from './FunctionFile'

export default class RecipeScreen extends React.Component {

  state ={
    "userIngredient": 'nothing',
    "Recipes": 'nothing',
  }

  async  getUserIngredient(){
    const {params} = this.props.navigation.state;
    try {
    let response = await fetch('https://testfirebase-5e2e2.firebaseio.com/.json');
    let responseJson = await response.json();
    //console.log(responseJson.UserIngredients[userId]);
    return responseJson.UserIngredients[params.userId];
    } catch(error) {
    // Handle error
    console.error(error);
    }
  }

  async  getRecipes(){
    try{
      let response = await fetch('https://testfirebase-5e2e2.firebaseio.com/.json');
      let responseJson = await response.json();
      //console.log(responseJson.Recipes);
      return responseJson.Recipes;
    }catch(error){
      //Handle error
      console.error(error);
    }
  }

  componentWillMount(){
    this.getUserIngredient()
    .then((theData) => {
    this.setState({"userIngredient" : theData})
    //console.log(this.state.userIngredient);
    })

    this.getRecipes()
    .then((theData) => {
      this.setState({
        "Recipes": theData
      })
      //console.log(this.state.Recipes);
      console.log("i was here!");
    })

  }


  render(){
     const {navigate} = this.props.navigation
     const {params} = this.props.navigation.state;
     var please = showAllRecipesFor(this.state.Recipes, this.state.userIngredient);
     //console.log("here");
     console.log("please:: " + please)
    return(
      <View>
      <Text>Saved!</Text>
      <Text>User-Recipes</Text>
      <Text>{please}</Text>
      <Button
      title="Go to Ingredients"
      onPress={()=>this.props.navigation.navigate('Second', { userId: params.userId, name: params.name})}
      />
      </View>
    );
  }
}
