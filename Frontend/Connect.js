import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Static data
const alumniData = [
  {
    id: '1',
    name: 'Sarah Johnson',
    batch: '2020',
    department: 'Computer Science',
  },
  {
    id: '2',
    name: 'Michael Chen',
    batch: '2019',
    department: 'Electrical Engineering',
  },
  {
    id: '3',
    name: 'Emily Davis',
    batch: '2021',
    department: 'Mechanical Engineering',
  },
  {
    id: '4',
    name: 'John Smith',
    batch: '2018',
    department: 'Civil Engineering',
  },
  {
    id: '5',
    name: 'John Smith',
    batch: '2018',
    department: 'Civil Engineering',
  },
  {
    id: '6',
    name: 'John Smith',
    batch: '2018',
    department: 'Civil Engineering',
  },
  {
    id: '7',
    name: 'John Smith',
    batch: '2018',
    department: 'Civil Engineering',
  },
  {
    id: '8',
    name: 'John Smith',
    batch: '2018',
    department: 'Civil Engineering',
  },
  {
    id: '9',
    name: 'John Smith',
    batch: '2018',
    department: 'Civil Engineering',
  },
  {
    id: '10',
    name: 'John Smith',
    batch: '2018',
    department: 'Civil Engineering',
  },
];

// Main App Component
export default function App() {
  const [connections, setConnections] = useState({});

  const handleConnect = (id) => {
    setConnections((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle between connected and not connected
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alumni List</Text>
      <FlatList
        data={alumniData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemContent}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.details}>Batch: {item.batch}</Text>
                <Text style={styles.details}>Department: {item.department}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.connectButton,
                  connections[item.id] && styles.connectedButton,
                ]}
                onPress={() => handleConnect(item.id)}
              >
                <Text style={styles.connectButtonText}>
                  {connections[item.id] ? 'Connected' : 'Connect'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e3f2fd', // Light blue background
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1976d2', // Darker blue for header
  },
  item: {
    backgroundColor: '#ffffff', // White background for each item
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  connectButton: {
    backgroundColor: '#1976d2', // Light blue color
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  connectedButton: {
    backgroundColor: '#4caf50', // Green color when connected
  },
  connectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});