import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import GSTCalculatorScreen from './src/GSTCalculatorScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <GSTCalculatorScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
});
