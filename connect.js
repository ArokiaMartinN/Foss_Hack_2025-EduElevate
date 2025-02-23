import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Linking,
  Image,
  ScrollView,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Added Icon import
import profilePhoto from './assets/trail1.png'; // Adjust the path as needed

// Static data
const alumniData = [
  {
    id: '1',
    name: 'Ambrish',
    batch: '2020',
    department: 'Computer Science',
    email: 'sarah.johnson@example.com',
    linkedin: '',
    profilePicture: 'https://via.placeholder.com/150',
    skills: ['JavaScript', 'React Native', 'Node.js'],
    recentWork: 'Software Engineer at Tech Corp', // Added recentWork
    achievements: ['Best Coder Award 2021', 'Hackathon Winner 2020'], // Added achievements
  },
  {
    id: '2',
    name: 'Martin',
    batch: '2019',
    department: 'Electrical Engineering',
    email: 'michael.chen@example.com',
    linkedin: '',
    profilePicture: 'https://via.placeholder.com/150',
    skills: ['Python', 'Machine Learning', 'Data Analysis'],
    recentWork: 'Data Scientist at DataWorks', // Added recentWork
    achievements: ['AI Innovator Award 2022'], // Added achievements
  },
  {
    id: '3',
    name: 'Rohit',
    batch: '2021',
    department: 'Mechanical Engineering',
    email: 'emily.davis@example.com',
    linkedin: '',
    profilePicture: 'https://via.placeholder.com/150',
    skills: ['CAD', 'Thermodynamics', 'Fluid Mechanics'],
    recentWork: 'Mechanical Engineer at AutoTech', // Added recentWork
    achievements: ['Design Excellence Award 2021'], // Added achievements
  },
  // Add more alumni data here...
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
      <Text style={styles.header}>CONNECT THROUGH</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
      
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Profile', { alumni: item })}
          >
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
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Profile Component
function Profile({ route }) {
  const { alumni } = route.params;

  // Handle LinkedIn button press
  const handleLinkedInPress = () => {
    if (alumni.linkedin) {
      Linking.openURL(alumni.linkedin);
    } else {
      alert('LinkedIn URL not available.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.profileContainer}>
        {/* Profile Picture */}
        <Image
  source={profilePhoto} // Use the imported image
  style={styles.profileImage}
/>

        {/* Name */}
        <Text style={styles.profileName}>{alumni.name}</Text>

        {/* Recent Work */}
        {alumni.recentWork && (
          <View style={styles.detailRow}>
            <Icon name="work" size={20} color="#0077B5" />
            <Text style={styles.profileDetail}>{alumni.recentWork}</Text>
          </View>
        )}

        {/* Email */}
        <View style={styles.detailRow}>
          <Icon name="email" size={20} color="#0077B5" />
          <Text style={styles.profileDetail}>{alumni.email}</Text>
        </View>

        {/* Batch */}
        <View style={styles.detailRow}>
          <Icon name="school" size={20} color="#0077B5" />
          <Text style={styles.profileDetail}>Batch: {alumni.batch}</Text>
        </View>

        {/* Department */}
        <View style={styles.detailRow}>
          <Icon name="business" size={20} color="#0077B5" />
          <Text style={styles.profileDetail}>Department: {alumni.department}</Text>
        </View>

        {/* Skills */}
        {alumni.skills && (
          <View style={styles.skillsContainer}>
            <Text style={styles.skillsTitle}>Skills:</Text>
            <View style={styles.skillsList}>
              {alumni.skills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Achievements */}
        {alumni.achievements && (
          <View style={styles.achievementsContainer}>
            <Text style={styles.skillsTitle}>Achievements:</Text>
            {alumni.achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementItem}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.achievementText}>{achievement}</Text>
              </View>
            ))}
          </View>
        )}

        {/* LinkedIn Button */}
        <TouchableOpacity
          style={styles.linkedinButton}
          onPress={handleLinkedInPress}
        >
          <Icon name="linkedin" size={20} color="#FFF" />
          <Text style={styles.linkedinButtonText}>View LinkedIn Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Navigation Stack
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AlumniList">
        <Stack.Screen
          name="AlumniList"
          component={AlumniList}
          options={{ title: 'Alumni List' }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: 'Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#27667B',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#000',
  },
  searchBar: {
    backgroundColor: '#EAE2C6',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#EAE2C6',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
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
    backgroundColor: '#1976d2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  connectedButton: {
    backgroundColor: '#4caf50',
  },
  connectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileDetail: {
    fontSize: 16,
    marginLeft: 8,
    color: '#555',
  },
  skillsContainer: {
    marginTop: 10,
    width: '100%',
  },
  skillsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    backgroundColor: '#e1e1e1',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  skillText: {
    fontSize: 14,
    color: '#333',
  },
  achievementsContainer: {
    marginTop: 10,
    width: '100%',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#555',
  },
  linkedinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0077B5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  linkedinButtonText: {
    fontSize: 16,
    color: '#FFF',
    marginLeft: 8,
  },
});