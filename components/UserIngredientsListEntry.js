import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native'

const UserIngredientsListEntry = (props) => {

  const incrementIngredient = () => {
    props.incrementIngredient
  }

  const decrementIngredient = () => {
    props.decrementIngredient
  }

  return (
    <View style={styles.entryContainer}>
      <View style={{width: '30%'}}>
        <Text style={{fontSize: 24}}>{props.ingredientName}</Text>
      </View>
      <Text>x{props.ingredientQuantity}</Text>
      <Text>{props.ingredientType}</Text>
      <View style={styles.addSubtractContainer}>
        <TouchableOpacity onPress={() => props.decrementIngredient()}>
          <View style={styles.buttonContainer}>
            <Text style={{color: 'white', fontSize: 30}}>-</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.incrementIngredient()}>
          <View style={styles.buttonContainer}>
            <Text style={{color: 'white', fontSize: 30}}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  entryContainer: {
    width: '100%',
    height: 75,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'space-between',
    paddingLeft: 15
  },
  addSubtractContainer: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  buttonContainer: {
    borderRadius: 50,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    padding: 5,
  }
})

export default UserIngredientsListEntry
