import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

export default class RecipePreview extends Component {
  render () {
    return (
      <View style={styles.previewContainer}>
        <Image source={{uri: this.props.imageURL}} style={styles.image} />
        <View style={styles.contentContainer}>
          <View style={styles.recipeNameContainer}>
            <Text style={styles.recipeName}>{this.props.recipeName}</Text>
          </View>
          <View style={styles.seperator} />
          <View style={styles.detailsContainer}>
            <View style={styles.applianceContainer}>
              <Text style={styles.detailsLeft}>{this.props.appliances}</Text>
            </View>
            <View style={styles.timeAndDifficultyContainer}>
              <View style={styles.timeContainer}>
                <Text style={styles.detailsRight}>{this.props.time}&nbsp;</Text>
                <Icon name='clock' size={15} color='black' />
              </View>
              <Text style={styles.detailsRight}>Difficulty: {this.props.difficulty}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  previewContainer: {
    display: 'flex',
    borderRadius: 10,
    height: '100%',
    width: '100%',
    borderWidth: 1,
    borderColor: '#bababa',
    backgroundColor: 'snow',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: '60%',
    borderRadius: 10
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  recipeNameContainer: {
    paddingTop: 15,
    marginBottom: 10
  },
  recipeName: {
    fontSize: 24
  },
  seperator: {
    width: '80%',
    height: 1,
    backgroundColor: 'black'
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    marginTop: 10
  },
  applianceContainer: {
    display: 'flex',
    flex: 1
  },
  timeAndDifficultyContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    position: 'relative',
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  detailsLeft: {
    fontSize: 14
  },
  detailsRight: {
    fontSize: 14,
    textAlign: 'right'
  }
})
