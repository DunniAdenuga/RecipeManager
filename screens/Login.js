import React from 'react';
import { StyleSheet, Text, View,Image, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { TitledInput } from './components/TitledInput'
import Spinner from './components/Spinner'


export default class LoginScreen extends React.Component {

  state = { email: '', password: '', error: '', loading: false};

  static navigationOptions = {
    title: 'Welcome',
    headerTintColor: 'blue'
  };

  onLoginPress(){
    this.setState({ error: '', loading: true});
    //const {navigate} = navigation;
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          //navigate('IngredientsListScreen')
          this.setState({error: '', loading: false});
          this.props.navigation.navigate( 'Second', { userName: this.state.email.split("@")[0]} );

        })
        .catch(() => {
          //Login was not successful, let's create a new account()
          firebase.auth().createUserWithEmailAndPassword(email, password)
              .then(() => {
                this.setState({ error: '', loading: false});
                this.props.navigation.navigate('Second', { userName: this.state.email.split("@")[0]} );
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

const styles = StyleSheet.create({
  container: {
  //  flex: 6,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
    padding: 50,
    paddingTop: 40,
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
});
