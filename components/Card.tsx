import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from "react-native";

type CardOptions = {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  layout?: 'vertical' | 'horizontal';
  testID?: string;
}

const Card = ({ children, style, onPress, layout = 'vertical', testID }: CardOptions) => {
  const cardStyles = [
    styles.container,
    layout === 'horizontal' && styles.horizontalLayout,
    style
  ];

  if (onPress) {
    return (
      <TouchableOpacity 
        style={cardStyles}
        onPress={onPress}
        testID={testID}
      >
        { children }
      </TouchableOpacity>
    )
  }

  return (
    <View 
      style={cardStyles}
      testID={testID}
    >
      { children }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    width: '100%',
    alignSelf: 'center',
  },
  horizontalLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // Add some space between items
  }
})

export default Card;