import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';


const styles = StyleSheet.create({
  container: {
  //  flex: 6,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
    padding: 50,
    paddingTop: 35,
    //paddingLeft:5
  },
  textStyle: {
    fontSize: 62,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: 'black',
    alignSelf: 'center',
    paddingBottom: 30
  },
  imageStyle: {
    width: 120,
    height: 120,
    //paddingBottom: 50,
    paddingTop: 5,
    alignSelf: 'center',
  },
  errorTextStyle: {
    color: '#E64A19',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  container3: {
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
    marginBottom: 60,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  header3: {
    fontSize: 24,
    color: 'black',
  },
  ingredientsIcon: {
    position: 'absolute',
    right: 15,
    bottom: 15
  },
  swiperContainer: {
    height: '50%',
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
  },
});

export { styles };
