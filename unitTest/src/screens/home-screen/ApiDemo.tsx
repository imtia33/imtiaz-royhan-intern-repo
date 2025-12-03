import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button } from 'react-native';
import { ThemeState } from '@/styles/theme/types';
import { useStylesWithTheme } from '@/styles/theme/useStylesWithTheme';
import { fetchUsers, User } from '@/services/apiService';

const ApiDemo = () => {
  const styles = useStylesWithTheme(getStyles);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const userData = await fetchUsers();
      setUsers(userData);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const renderUser = ({ item }: { item: User }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Demo</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color={styles.loading.color} />
      ) : error ? (
        <View>
          <Text style={styles.error}>{error}</Text>
          <Button title="Retry" onPress={loadUsers} />
        </View>
      ) : (
        <FlatList
          data={users}
          renderItem={renderUser}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
      )}
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
    list: {
      flex: 1,
    },
    userContainer: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.background.paper,
      marginBottom: 10,
      borderRadius: 8,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text.primary,
    },
    userEmail: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginTop: 5,
    },
    loading: {
      color: theme.colors.primary.main,
    },
    error: {
      color: theme.colors.error,
      textAlign: 'center',
      marginVertical: 20,
    },
  });
};

export default ApiDemo;