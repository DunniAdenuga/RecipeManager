import React from 'react';
import { StyleSheet, Text, View,Image, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { TitledInput } from './TitledInput'
import { styles } from './styles'
import IngredientsListScreen from './IngredientsList'
import Spinner from './Spinner'


export default class LoginScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {name:'', email: '', password: '', error: '', loading: false};
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

  onLoginPress(){
    this.setState({ error: '', loading: true});
    //const {navigate} = navigation;
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          //navigate('IngredientsListScreen')
          this.setState({error: '', loading: false});
          this.props.navigation.navigate('Third', { userId: this.state.email.split("@")[0], name: this.state.name} );

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
                this.props.navigation.navigate('Second', { userName: this.state.email.split("@")[0], name: this.state.name} );
              })
              .catch(() => {
                  this.setState({error: 'Authentication failed.', loading: false});
              });
        });
  }

  renderButtonOrSpinner () {
    //const {navigate} = navigation;
    if(this.state.loading){
      return <Spinner />;
    }
    //return <Button title="Log In" />
    //navigate('IngredientsListScreen');
    return <Button onPress={this.onLoginPress.bind(this)} title="Log In" />
  }

  render() {
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require('./contemporary-cooking-utensil-sets.jpg')}>
      </Image>
      <Text style={styles.textStyle}>
      Recipe Manager
      </Text>
      <View>
        <TitledInput
          label='Name'
          placeholder ='Jane Doe'
          value={this.state.name}
          onChangeText={name => this.setState({name})}
        />
        <TitledInput
          label='Email Address'
          placeholder ='you@domain.com'
          value={this.state.email}
          onChangeText={email => this.setState({email})}
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
