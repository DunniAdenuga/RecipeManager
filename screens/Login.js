import React from 'react';
import { StyleSheet, Text, View,Image, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { TitledInput } from '../components/TitledInput'
import Spinner from '../components/Spinner'

export default class Login extends React.Component {

  constructor (props) {
    super (props)
    this.state = {
      email: '',
      name: '',
      password: '',
      error: '',
      loading: false
    }
  }

  static navigationOptions = {
    title: 'Welcome',
    headerTintColor: 'blue'
  };

  createUser (userId, name, password) {
    firebase.database().ref('Users/' + userId).set(
      {
        name: name,
        password: password
      }
    )
  }

  createUserIngredientsEntry (userId) {
    const { navigate } = this.props.navigation
    firebase.database().ref('UserIngredients/' + userId).set({
      bananas: {
        quantity: 0,
        type: ''
      }
    })
    .then(navigate('IngredientsScreen', {userId: this.state.email.split('@')[0]}))
  }

  onLoginPress(){
    this.setState({ error: '', loading: true});
    const { email, password } = this.state;
    const { navigate } = this.props.navigation
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({error: '', loading: false});
        navigate('RecipesScreen', {userId: this.state.email.split('@')[0]})
      })
      .catch(() => {
        //Login was not successful, let's create a new account()
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
              this.setState({ error: '', loading: false});
              this.createUser(
                this.state.email.split('@')[0],
                this.state.name,
                this.state.password
              )
              this.createUserIngredientsEntry(this.state.email.split('@')[0])
            })
            .catch(() => {
                this.setState({error: 'Authentication failed.', loading: false});
            });
      });
  }

  renderButtonOrSpinner () {
    if(this.state.loading){
      return <Spinner />;
    }
    return <Button onPress={this.onLoginPress.bind(this)} title="Log In" />
  }

  render() {
    return(
      <View style={styles.container}>
        <Image
          style={styles.imageStyle}
          source={require('../contemporary-cooking-utensil-sets.jpg')}>
        </Image>
        <Text style={styles.textStyle}>
          Recipe Manager
        </Text>
        <View style={{height: 200, justifyContent: 'space-between'}}>
          <TitledInput
            label='Email Address'
            placeholder ='you@domain.com'
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
          <TitledInput
            label='Name'
            placeholder ='Jane Doe'
            value={this.state.name}
            onChangeText={name => this.setState({name})}
          />
          <TitledInput
            label='Password'
            autoCorrect={false}
            placeholder ='**********'
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({password})}
          />
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        {this.renderButtonOrSpinner()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
    paddingTop: 40,
    padding: 50,
    height: '100%'
  },
  textStyle: {
    fontSize: 62,
    fontWeight: 'bold',
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
});
