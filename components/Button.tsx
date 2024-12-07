import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle, Pressable } from 'react-native';

type ButtonType = {
  onPress?: () => void,
  children?: React.ReactNode,
  style?: ViewStyle | ViewStyle[];
}

const Button = ({ children, onPress, style }: ButtonType) => {

  const pressHandler = () => {
    if(onPress) 
      onPress();
  }
  
  return (
    <TouchableOpacity
      style={[styles.button, style]} 
      onPress={pressHandler}
      >
      { children }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Button;
