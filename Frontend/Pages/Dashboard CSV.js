import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';
import Papa from 'papaparse';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const path = RNFS.DocumentDirectoryPath + '/users.csv';
      const fileContent = await RNFS.readFile(path, 'utf8');
      
      Papa.parse(fileContent, {
        header: true,
        complete: (result) => {
          const users = result.data;
          const user = users.find(u => u.email === email && u.password === password);
          
          if (user) {
            navigation.navigate('Dashboard', { user });
          } else {
            Alert.alert('Invalid Credentials', 'Please check your email and password.');
          }
        },
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to read CSV file.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const Dashboard = ({ route }) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Role: {user.role}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});

export { LoginScreen, Dashboard };
