import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import axiosRetry from 'axios-retry';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

axiosRetry(apiClient, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000, //3 seconds delay for each retry
  retryCondition: (error) => 
    axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error),
});

const ApiDemo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.get('/users');
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>API Demo</Text>
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      )}
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}
      
      <View style={styles.buttonContainer}>
        <Button title="Fetch Data" onPress={fetchData} disabled={loading} />
      </View>
      
      <View style={styles.dataContainer}>
        <Text style={styles.dataTitle}>Users ({data.length})</Text>
        {data.slice(0, 3).map((item) => (
          <View key={item.id} style={styles.item}>
            <Text>{item.name} ({item.email})</Text>
          </View>
        ))}
      </View>
      
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 20,
  },
  dataContainer: {
    marginVertical: 20,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ApiDemo;