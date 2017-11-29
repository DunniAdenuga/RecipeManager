import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Select, Option, OptionList, updatePosition } from 'react-native-dropdown';
import * as firebase from 'firebase';

{/*value={userQuantity}
onChangeText={onChangeText}I want to post to */
/*<ListItem
ingredientName={item.key}
ingredientQuantity='0'
/>*/}
{/*Dropdown - https://github.com/g6ling/react-native-dropdown*/}


{/*initialize firebase*/}
const firebaseConfig = {
  apiKey: "AIzaSyBuOKCx9RlqnKbjdziJcvJvw0RwrNNLVpU",
  authDomain: "testfirebase-5e2e2.firebaseapp.com",
  databaseURL: "https://testfirebase-5e2e2.firebaseio.com",
  projectId: "testfirebase-5e2e2",
  storageBucket: "testfirebase-5e2e2.appspot.com",
  messagingSenderId: "638488131684"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class Ingredients extends React.Component {

  constructor (props) {
    super (props)
    this.state = {
      'data': 'nothing'
    }
    console.log('constructor', props)
  }

  async getIngredient () {
    try {
      let response = await fetch('https://testfirebase-5e2e2.firebaseio.com/.json');
      let responseJson = await response.json();
      return responseJson.Ingredient;
    } catch(error) {
      // Handle error
      console.error(error);
    }
  }

  componentWillMount () {
    this.getIngredient ()
    .then((theData) => {
      this.setState({
      "data" : theData
      })
    })
    console.log('will mount', this.props)
  }

  componentDidMount () {
    console.log('did mount', this.props)
  }

  saveData (ingredient, amount) {
    const { params } = this.props.navigation.state;
    if (amount == "") {
      firebaseApp.database().ref('UserIngredient/'+ params.userName + '/' + ingredient).set(0)
    }
    else {
      firebaseApp.database().ref(
        'UserIngredient/'+ params.userName + '/' + ingredient).set(amount)
    }
  }

  render () {
    console.log(this.props)
    return(
      <View>
        <View style={styles.headingStyle}>
          <Text style={{fontWeight: 'bold'}}>Ingredient</Text>
          <Text style={{fontWeight: 'bold'}}>Amount</Text>
          <Text style={{fontWeight: 'bold'}}>Amount Type</Text>
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({item})=>
            <ListItem
              ingredientName={item.key}
              ingredientQuantity='0'
              onChangeText={amount => this.saveData(item.key, amount)}
            />
          }
          keyExtractor={(item, key) => key}
        />
      </View>
    );
  }

}

class DropdownComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      typeOfQuantity: '',
    };
  }

  componentDidMount () {
    updatePosition(this.refs['SELECT1']);
    updatePosition(this.refs['OPTIONLIST']);
  }

  _getOptionList () {
    return this.refs['OPTIONLIST'];
  }

  updateStuff (quant) {
    this.setState({
      ...this.state,
      typeOfQuantity: quant
    });
  }

  render () {
    return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Select
        width={120}
        ref="SELECT1"
        optionListRef={this._getOptionList.bind(this)}
        defaultValue="type"
        onSelect={this.updateStuff.bind(this)}>
        <Option>Count</Option>
        <Option>tbs</Option>
        <Option>lbs</Option>
        <Option>Bottles</Option>
      </Select>

      <OptionList ref="OPTIONLIST"/>
    </View>
    );
  }
}

const ListItem = ({ingredientName, ingredientQuantity, onChangeText}) => {
  const { container, textStyle } = styles;
  return(
    <View style={container}>
      <Text style={textStyle}>{ingredientName}</Text>
        <TextInput
          autoCorrect={false}
          placeholder={ingredientQuantity}
          style={textStyle}
          maxLength={4}
          keyboardType='numeric'
          onChangeText={onChangeText}
        />
      <DropdownComponent />
    </View>
  );
};

const styles = {
  container: {
    alignItems: 'center',
    padding: 7,
    paddingBottom: 105,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  textStyle: {
    padding: 1,
    color: '#7F7D7D',
    fontSize: 15,
    flex: 1,
    fontWeight: '200',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 0,
    borderColor: 'white',

  },
  headingStyle: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

export default Ingredients;
