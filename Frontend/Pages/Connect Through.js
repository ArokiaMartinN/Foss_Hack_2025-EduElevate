import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button, Linking } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// Static data
const alumniData = [
  { id: '1', name: 'Ambrish', batch: '2020', department: 'Computer Science', email: 'sarah.johnson@example.com', linkedin: '' },
  { id: '2', name: 'Martin', batch: '2019', department: 'Electrical Engineering', email: 'michael.chen@example.com', linkedin: '' },
  { id: '3', name: 'Rohit', batch: '2021', department: 'Mechanical Engineering', email: 'emily.davis@example.com', linkedin: '' },
];

// Alumni List Component
function AlumniList({ navigation }) {
  const [connections, setConnections] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleConnect = (id) => {
    setConnections((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle between connected and not connected
    }));
  };

  const filteredData = alumniData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alumni List</Text>
      <TextInput style={styles.searchBar} placeholder="Search by name..." value={searchQuery} onChangeText={setSearchQuery} />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Profile', { alumni: item })}>
            <View style={styles.itemContent}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.details}>Batch: {item.batch}</Text>
                <Text style={styles.details}>Department: {item.department}</Text>
              </View>
              <TouchableOpacity style={[styles.connectButton, connections[item.id] && styles.connectedButton]} onPress={() => handleConnect(item.id)}>
                <Text style={styles.connectButtonText}>{connections[item.id] ? 'Connected' : 'Connect'}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Profile Component
function Profile({ route }) {
  const { alumni } = route.params;

  const handleLinkedInPress = () => {
    if (alumni.linkedin) {
      Linking.openURL(alumni.linkedin);
    }
  };

  return (
    <View style={styles.profileContainer}>
      <Text style={styles.profileName}>{alumni.name}</Text>
      <Text style={styles.profileDetail}>Email: {alumni.email}</Text>
      <Text style={styles.profileDetail}>Batch: {alumni.batch}</Text>
      <Text style={styles.profileDetail}>Department: {alumni.department}</Text>
      <Button title="View LinkedIn Profile" onPress={handleLinkedInPress} disabled={!alumni.linkedin} />
    </View>
  );
}

// Navigation Stack
const Stack = createStackNavigator();

export default function Connect() {
  return (
    <Stack.Navigator initialRouteName="AlumniList">
      <Stack.Screen name="AlumniList" component={AlumniList} options={{ title: 'Alumni List' }} />
      <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
    </Stack.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#e3f2fd' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: '#1976d2' },
  searchBar: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 16 },
  item: { backgroundColor: '#ffffff', padding: 16, marginBottom: 12, borderRadius: 8, elevation: 2 },
  itemContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  details: { fontSize: 14, color: '#666', marginTop: 4 },
  connectButton: { backgroundColor: '#1976d2', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  connectedButton: { backgroundColor: '#4caf50' },
  connectButtonText: { color: '#fff', fontWeight: 'bold' },
  profileContainer: { flex: 1, padding: 16, backgroundColor: '#e3f2fd' },
  profileName: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#1976d2' },
  profileDetail: { fontSize: 18, marginBottom: 8, color: '#333' },
});
