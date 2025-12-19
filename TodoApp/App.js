import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TodoScreen from './src/app/index';

export default function App() {
  return (
    <SafeAreaProvider>
      <TodoScreen />
    </SafeAreaProvider>
  );
}
