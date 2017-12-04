import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight,Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { TitledInput } from './TitledInput'
import { styles } from './styles'
import  LoginScreen from './Login'
import IngredientsListScreen from './IngredientsList'
import Spinner from './Spinner'
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/Feather'
import RecipePreview from './components/RecipePreview'

export default class RecipeScreen extends React.Component {
  constructor(props){
    super(props)
  this.state = {
    "userIngredient": 'nothing',
    "Recipes": 'nothing',
    "userRecipes": 'nothing',
    recipeList: [],
    userRecipeList: [],
    currRecipeIndex: 0,
    prevRecipeButtonShowing: false,
    nextRecipeButtonShowing: true
  }
}

  showAllRecipesFor(){
    var userRecipe = [] ;
    //console.log(this.state.Recipes);
    Object.entries(this.state.Recipes).forEach(([key, value]) =>{
        //console.log("into1");
        if(value.hasOwnProperty("ingredients")){
          let chooseRecipe = true;
          //console.log("we dey here");
        Object.entries(value).forEach(([key2, value2]) =>{
          //console.log(key2);
          if(key2 == 'ingredients'){
              console.log("\n");
            Object.entries(value2).forEach(([key3, value3]) =>{
              //console.log("Ingredient Detailssssss");
              Object.entries(value3).forEach(([key4, value4]) =>{
                //console.log(`${key4} ${value4}`);
                if(key4 == 'name'){
                  trueFalse = this.compareWithUser(value4);
                  //console.log(`${key4} ${value4}`);
                  //console.log(trueFalse);
                  if(trueFalse === false){
                    chooseRecipe = false;
                  }
                }
              });//display every ingredient prop

            });//loop through ingredients list, display each
          }
        });//loop through each Recipe detail- name, instr, ingre

        if(chooseRecipe === true){
          //this.setState({"userRecipes": JSON.stringify(value)})
          //console.log(this.state.userRecipes);
          console.log(key);
          userRecipe.push(key);
          //userRecipe.push(value);
          console.log("choose R ?" + chooseRecipe);
          //this.setStuff(value);
          //this.setState({'userRecipes': "works2"})
          //console.log(this.state.userRecipes);
        }  //add recipe if all ingredients were found
      }//if
    });//loop through Recipes
    console.log(userRecipe);
    return userRecipe;
  }//showAllRecipesFor ends

  /*setStuff(stuff){
    this.setState({"userRecipes": JSON.stringify(stuff)})
    console.log(this.state.userRecipes);
  }*/

  compareWithUser(ingredientName){
    //add Amount later
    result = false;
    //console.log("Ingredient Name: " + ingredientName);
    //console.log(this.state.userIngredient);
    Object.entries(this.state.userIngredient).forEach(([key, value])=>{
      //Object.entries(value).forEach(([key2, value2])=> {
      //console.log("key: " + key);
        if(key == ingredientName){
          result = true;
        }
      //});
    });
    return result;
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
    /*this.setState({
      recipeList: Object.keys(this.state.Recipes)
    })*/
    /*
      This is what calls the cross referencing code
      Returns an array of recipe Ids
    */
    var recList = this.showAllRecipesFor();
    this.setState({
      userRecipeList: recList
    })
  }



  async getUserIngredient(){
    const {params} = this.props.navigation.state;
    try {
    let response = await fetch('https://testfirebase-5e2e2.firebaseio.com/.json');
    let responseJson = await response.json();
    return responseJson.UserIngredients[params.userId];
    } catch(error) {
    // Handle error
    console.error(error);
    }
  }

  async getRecipes(){
    try{
      let response = await fetch('https://testfirebase-5e2e2.firebaseio.com/.json');
      let responseJson = await response.json();
      return responseJson.Recipes;
    }catch(error){
      //Handle error
      console.error(error);
    }
  }

  nextRecipe () {
    this.swiper.scrollBy(1, true)
  }

  prevRecipe () {
    this.swiper.scrollBy(-1, true)
  }

  recipeSelected (stuff) {
    console.log(stuff)
    this.props.recipePress(stuff)
  }

  render(){
     let recipes = this.state.Recipes;
     //console.log("recipes[recipeIndex]")
     console.log(recipes[0].imageURL)
     console.log("recipes")
     //console.log(recipes)
     const {navigate} = this.props.navigation
     const {params} = this.props.navigation.state;
     /*var please = this.showAllRecipesFor();
      //var ingre = JSON.stringify(JSON.parse(please).ingredient);
      var arrayLength = please.length;
     for (var i = 0; i < arrayLength; i++) {
          var temp = please[i];
          var realS = temp.substring(1, temp.lastIndexOf("\""));
          //var temp2 = parseInt(temp, 10);
          //console.log("here " + temp);
          console.log("here222 " + realS);
          //console.log(this.state.Recipes[realS]);
          var theData=this.state.Recipes[realS];
          console.log(theData);
     }
     console.log(this.state.userRecipes);*/
     //console.log(this.state.Recipes);
     /*<View>
     <Text>Saved!</Text>
     <Text>User-Recipes</Text>
     <Text>{please}</Text>
     <Button
     title="Go to Ingredients"
     onPress={()=>this.props.navigation.navigate('Second', { userId: params.userId, name: params.name})}
     />
     <Text>{ingre}</Text>
     </View>*/
     //Object.keys(recipes).map((recipeIndex, index) =>

     //console.log(recipes[recipeIndex].imageURL)
     //console.log(recipes[recipeIndex].name)
     //console.log(recipes[recipeIndex].time)

    return(
      <View style={styles.container3}>
        <View style={styles.headerContainer}>
          <Text style={styles.header3}>Recipes</Text>
          <View style={styles.ingredientsIcon}>
            <Icon.Button
              name='shopping-cart'
              size={25}
              color='black'
              onPress={() => navigate('Second', { userId: params.userId, name: params.name})}
              backgroundColor='transparent'
              style={{
                padding: 0, margin: 0
              }}
            />
          </View>
        </View>
        <View style={styles.swiperContainer}>
          <Swiper
            showsButtons={true}
            style={styles.swiper}
            dotStyle={{display:'none'}}
            activeDotStyle={{display: 'none'}}
            ref={(swiper) => { this.swiper = swiper }}
            horizontal={true}
            loop={true}
          >
          {/*Object.keys(this.state.Recipes).map((recipeIndex, index) =>)*/}
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigate('Fourth', {userId: params.userId})}
                key={0}
              >
                <View style={styles.recipeContainer}>
                  <RecipePreview
                    recipeName={recipes[0].name}
                    imageURL={recipes[0].imageURL}
                    time={recipes[0].time}
                    difficulty={"difficulty"}
                    appliances={"hardcode"}
                  />
                </View>
              </TouchableOpacity>

          </Swiper>
        </View>
        <View style={styles.selectionContainer}>
          <View style={styles.recipeButtonContainer}>
              <View style={styles.circle}>
                <Icon.Button
                  name='chevrons-left'
                  size={50}
                  color='green'
                  onPress={this.prevRecipe.bind(this)}
                  style={{
                    margin: 0,
                    padding: 0,
                    width: 60,
                    height: 60,
                    paddingLeft: 2,
                  }}
                  backgroundColor='transparent'
                />
              </View>

          </View>
          <View style={styles.recipeButtonContainer}>
              <View style={styles.circle}>
                <Icon.Button
                  name='chevrons-right'
                  size={50}
                  color='green'
                  onPress={this.nextRecipe.bind(this)}
                  style={{
                    margin: 0,
                    padding: 0,
                    paddingLeft: 5,
                    width: 60,
                    height: 60,
                  }}
                  backgroundColor='transparent'
                />
              </View>

          </View>
        </View>
        <Text>Swipe up to see more</Text>
      </View>
    );
  }
}
