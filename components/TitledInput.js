import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';

const TitledInput = ({ label, value, onChangeText, placeholder, secureTextEntry}) => {

  const { input, labelStyle, container, inputContainer } = styles;

  return (
    <View style={container}>
      <Text style={labelStyle}>{label.toUpperCase()}</Text>
      <View style={inputContainer}>
        <TextInput
          autoCorrect={false}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          style={input}
        />
      </View>
    </View>
  );
};

const styles = {
  input: {
    color: '#262626',
    fontSize: 18,
    fontWeight: '200',
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: '#D4D4D4'
  },
  labelStyle: {
    color: '#7F7D7D',
    fontSize: 12,
    fontWeight: '200',
  },
  container: {
    height: 45,
    flexDirection: 'column',
    width: '100%',
  }
};

export { TitledInput };
