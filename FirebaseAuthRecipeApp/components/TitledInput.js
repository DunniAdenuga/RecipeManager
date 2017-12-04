import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';

const TitledInput = ({ label, value, onChangeText, placeholder, secureTextEntry}) => {

  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label.toUpperCase()}</Text>
      <TextInput
        autoCorrect={false}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        style={inputStyle}
        />
    </View>
  );
};

const styles = {
  inputStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 8,
    color: '#262626',
    fontSize: 18,
    fontWeight: '200',
    flex: 1,
    height: 45
  },
  labelStyle: {
    color: '#7F7D7D',
    fontSize: 12,
    fontWeight: '200',
    flex: 1
  },
  containerStyle: {
    height: 45,
    flexDirection: 'column',
    //alignItems: 'flex-start',
    width: '100%',
    borderColor: '#D4D4D4',
    borderBottomWidth: 0,
  }
};

export { TitledInput };
