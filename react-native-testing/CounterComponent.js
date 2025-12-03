import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CounterComponent = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter Component</Text>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Increment" onPress={increment} testID="increment-button" />
        <Button title="Decrement" onPress={decrement} testID="decrement-button" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  count: {
    fontSize: 48,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
});

export default CounterComponent;