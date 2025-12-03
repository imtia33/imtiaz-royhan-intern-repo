import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { ThemeState } from '@/styles/theme/types';
import { useStylesWithTheme } from '@/styles/theme/useStylesWithTheme';

// Expensive calculation function
const expensiveCalculation = (num: number) => {
  console.log('Running expensive calculation...');
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += num;
  }
  return result;
};

// Child component that should be memoized
const ChildComponent = React.memo(({ onPress, title }: { onPress: () => void; title: string }) => {
  console.log(`Rendering ${title}`);
  return (
    <Button 
      title={title} 
      onPress={onPress} 
      color="#841584"
    />
  );
});

const PerformanceDemo = () => {
  const styles = useStylesWithTheme(getStyles);
  const [count, setCount] = useState(0);
  const [data, setData] = useState<number[]>([]);

  // Using useMemo to prevent expensive calculations on every render
  const memoizedValue = useMemo(() => {
    return expensiveCalculation(count);
  }, [count]);

  // Using useCallback to prevent function recreation
  const incrementCount = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  // Using useCallback for the data generator
  const generateData = useCallback(() => {
    const newData = [];
    for (let i = 0; i < 100; i++) {
      newData.push(Math.floor(Math.random() * 100));
    }
    setData(newData);
  }, []);

  // Render item for FlatList
  const renderItem = useCallback(({ item }: { item: number }) => (
    <Text style={styles.item}>{item}</Text>
  ), [styles]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Performance Optimization Demo</Text>
      
      <View style={styles.section}>
        <Text>Count: {count}</Text>
        <Text>Memoized Calculation Result: {memoizedValue}</Text>
        <ChildComponent onPress={incrementCount} title="Increment Count" />
      </View>
      
      <View style={styles.section}>
        <ChildComponent onPress={generateData} title="Generate Data" />
        <Text>Data Items: {data.length}</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />
      </View>
    </View>
  );
};

const getStyles = (theme: Readonly<ThemeState>) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background.default,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 20,
      color: theme.colors.text.primary,
    },
    section: {
      marginVertical: 20,
      padding: 15,
      backgroundColor: theme.colors.background.paper,
      borderRadius: 8,
    },
    item: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    list: {
      marginTop: 10,
      maxHeight: 200,
    },
  });
};

export default PerformanceDemo;