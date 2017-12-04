import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, AppRegistry } from 'react-native';
import RecipePreview from '../components/RecipePreview';
import Icon from 'react-native-vector-icons/Feather'
import Swiper from 'react-native-swiper'

export default class Recipes extends Component {
  constructor (props) {
    super(props)
    this.state = {
      recipeIds: [0, 1, 2],
      recipes: {
        0: {
          imageURL: 'http://www.simplyrecipes.com/wp-content/uploads/2014/08/banana-bread-horiz-a-1600.jpg',
          time: '2h',
          difficulty: 'medium',
          appliances: 'Oven',
          recipe_name: 'Banana Bread'
        },
        1: {
          imageURL: 'http://www.seriouseats.com/recipes/assets_c/2016/03/20160209-amatriciana-pasta-vicky-wasik-017-thumb-1500xauto-430193.jpg',
          time: '20m',
          difficulty: 'easy',
          appliances: 'Pot,Pan',
          recipe_name: 'Pasta wirh red sauce'
        },
        2: {
          imageURL: 'https://23209-presscdn-pagely.netdna-ssl.com/wp-content/uploads/2015/06/IMG_0319edit.jpg',
          time: '40m',
          difficulty: 'medium',
          appliances: 'Pan,Oven',
          recipe_name: 'Grilled Chicken'
        }
      },
      recipesTwo: {},
      recipeList: [],
      currRecipeIndex: 0,
      prevRecipeButtonShowing: false,
      nextRecipeButtonShowing: true
    }
  }

  async getRecipeFromId (recipeId) {
    try {
      let response = await fetch(`https://testfirebase-5e2e2.firebaseio.com/Recipes/${recipeId}.json`)
      let responseJson = await response.json()
      return responseJson
    } catch (error) {
      console.error(error)
    }
  }

  componentWillMount () {
    const { params } = this.props.navigation.state
    let recipesTwo = this.state.recipesTwo
    this.setState({
      recipeList: Object.keys(this.state.recipes)
    })
    {this.state.recipeIds.forEach((recipeId) => {
      this.getRecipeFromId(recipeId)
        .then((newRecipe) => {
          recipesTwo[recipeId] = newRecipe
          this.setState({
            recipesTwo
          })
        })
    })}
  }

  nextRecipe () {
    this.swiper.scrollBy(1)
  }

  prevRecipe () {
    this.swiper.scrollBy(-1)
  }

  recipeSelected (stuff) {
    this.props.recipePress(stuff)
  }

  render() {
    let recipes = this.state.recipesTwo
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Recipes</Text>
          <View style={styles.ingredientsIcon}>
            <Icon.Button
              name='shopping-cart'
              size={25}
              color='black'
              onPress={() => navigate('IngredientsScreen', {userId: params.userId})}
              backgroundColor='transparent'
              style={{
                padding: 0, margin: 0
              }}
            />
          </View>
        </View>
        <View style={styles.swiperContainer}>
          <Swiper
            showsButtons={false}
            style={styles.swiper}
            dotStyle={{display:'none'}}
            activeDotStyle={{display: 'none'}}
            ref={(swiper) => { this.swiper = swiper }}
            horizontal={true}
            loop={true}
          >
            {Object.keys(recipes).map((recipeIndex, index) =>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigate('RecipeDetailScreen', {userId: params.userId, recipeId: recipeIndex})}
                key={recipeIndex}
              >
                <View style={styles.recipeContainer}>
                  <RecipePreview
                    recipeName={recipes[recipeIndex].name}
                    imageURL={recipes[recipeIndex].imageURL}
                    time={recipes[recipeIndex].time}
                    difficulty={recipes[recipeIndex].difficulty}
                    appliances={recipes[recipeIndex].appliances.split(',').join(' and ')}
                  />
                </View>
              </TouchableOpacity>
            )}
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
        <Text>Tap a recipe to see more</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    height: '12%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  header: {
    fontSize: 24,
    color: 'black',
  },
  ingredientsIcon: {
    position: 'absolute',
    right: 15,
    bottom: 15
  },
  swiperContainer: {
    height: '60%',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  swiper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    position: 'relative',
  },
  recipeContainer: {
    paddingBottom: 10,
    paddingTop: 10,
    width: '80%',
    height: '100%',
    alignSelf: 'center',
  },
  selectionContainer: {
    height: '20%',
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  recipeButtonContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 80,
    height: 80,
    shadowColor: '#919191',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  }
})
