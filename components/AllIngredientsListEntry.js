import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native'

const AllIngredientsListEntry = (props) => {

  return (
    <View style={styles.entryContainer}>
      <View style={{paddingLeft: 15}}>
        <Text style={{fontSize: 24}}>{props.ingredientName}</Text>
      </View>
      <TouchableOpacity onPress={() => props.addIngredientToUserIngreds()}>
        <View style={{backgroundColor: 'lightblue', borderRadius: 10, marginRight: 15, padding: 15}}>
          <Text style={{color: 'white'}}>Add</Text>
        </View>
      </TouchableOpacity>
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
    justifyContent: 'space-between'
  },
})

export default AllIngredientsListEntry
