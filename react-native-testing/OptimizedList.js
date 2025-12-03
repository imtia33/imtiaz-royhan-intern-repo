import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Button } from 'react-native';

// Child component optimized with React.memo
const ListItem = React.memo(({ item, onRemove }) => {
  console.log(`Rendering item ${item.id}`);
  
  return (
    <View style={styles.listItem}>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
      <Button title="Remove" onPress={() => onRemove(item.id)} />
    </View>
  );
});

const OptimizedList = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  // Filter users using useMemo to avoid recalculation on every render
  const filteredUsers = useMemo(() => {
    console.log('Filtering users...');
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Memoize the removeUser function to prevent unnecessary re-renders
  const removeUser = useCallback((userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  }, []);

  // Memoize the addUser function
  const addUser = useCallback(() => {
    if (newUserName && newUserEmail) {
      const newUser = {
        id: Date.now(),
        name: newUserName,
        email: newUserEmail,
      };
      setUsers(prevUsers => [...prevUsers, newUser]);
      setNewUserName('');
      setNewUserEmail('');
    }
  }, [newUserName, newUserEmail]);

  // Memoize the key extractor function
  const keyExtractor = useCallback((item) => item.id.toString(), []);

  // Memoize the render item function
  const renderItem = useCallback(({ item }) => (
    <ListItem item={item} onRemove={removeUser} />
  ), [removeUser]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search users..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      
      <View style={styles.addUserContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={newUserName}
          onChangeText={setNewUserName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={newUserEmail}
          onChangeText={setNewUserEmail}
        />
        <Button title="Add User" onPress={addUser} />
      </View>
      
      <Text>Total Users: {users.length}</Text>
      <Text>Filtered Users: {filteredUsers.length}</Text>
      
      <FlatList
        data={filteredUsers}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addUserContainer: {
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default OptimizedList;