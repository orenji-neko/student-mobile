import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type QRButtonType = {
  onPress?: () => void
}

const QRButton = ({ onPress }: QRButtonType) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <Ionicons name="qr-code-sharp" size={40} color="#2A3335" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10, // Adjust this to fine-tune vertical positioning
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#C5D3E8", // Bright cyan color
    width: 80,
    height: 80,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default QRButton;
