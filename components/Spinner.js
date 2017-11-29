import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native';

class Spinner extends React.Component{

  render(){
    return(
      <View style={styles.container}>
        <ActivityIndicator
              size = 'small'
        />
        <Text>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Spinner;
