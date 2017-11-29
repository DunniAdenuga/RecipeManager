import React from 'react'
import { StackNavigator } from 'react-navigation'
import Recipes from './screens/Recipes'
import LoginScreen from './screens/Login'
import IngredientsListScreen from './screens/IngredientsList'
import { View, Button, Text } from 'react-native'

const RecipeScreen = ({ navigation }) => (
  <Recipes
    onShoppingCartPress={() => navigation.navigate('Details')}
  />
)

const DetailsScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Details Screen</Text>
    <Button
      onPress={() => navigation.navigate('Recipes')}
      title="Go to details"
    />
  </View>
);

const AppNavigator = StackNavigator({
  First: { screen: LoginScreen },
  Second: { screen: IngredientsListScreen },
  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      headerTitle: 'Details'
    }
  },
  Recipes: {
    screen: RecipeScreen,
    navigationOptions: {
      headerTitle: 'Recipes'
    },
  },
},
{
  headerMode: 'none'
}
)

export default AppNavigator
