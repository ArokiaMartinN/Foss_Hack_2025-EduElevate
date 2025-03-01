import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Table, Row, Rows } from 'react-native-table-component';

const NavigationButtons = ({ navigation }) => (
  <View style={styles.navButtons}>
    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Dashboard')}>
      <Text style={styles.navButtonText}>🏠 Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
      <Text style={styles.navButtonText}>⬅ Back</Text>
    </TouchableOpacity>
  </View>
);

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome, John Doe</Text>
    <Text style={styles.subtitle}>3rd Year, Computer Science</Text>
    {['Profile', 'InternalMarks', 'CGPA', 'Analysis'].map((screen) => (
      <TouchableOpacity key={screen} style={styles.button} onPress={() => navigation.navigate(screen)}>
        <Text style={styles.buttonText}>{screen}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const ProfileScreen = ({ navigation }) => (
  <View style={styles.container}>
    <NavigationButtons navigation={navigation} />
    <Text style={styles.header}>Profile</Text>
    {['Name: John Doe', 'Year: 3rd', 'Department: Computer Science', 'Email: john.doe@example.com'].map((info, index) => (
      <Text key={index} style={styles.text}>{info}</Text>
    ))}
  </View>
);

const InternalMarksScreen = ({ navigation }) => (
  <View style={styles.container}>
    <NavigationButtons navigation={navigation} />
    <Text style={styles.header}>Internal Marks</Text>
    <ScrollView>
      <Table borderStyle={{ borderWidth: 1, borderColor: '#ccc' }}>
        <Row data={['Subject', 'Marks', 'Grade']} style={styles.head} textStyle={styles.text} />
        <Rows data={[['Math', '95', 'A'], ['Physics', '85', 'B'], ['Chemistry', '90', 'A'], ['English', '80', 'B'], ['CS', '98', 'A']]} textStyle={styles.text} />
      </Table>
    </ScrollView>
  </View>
);

const CGPAScreen = ({ navigation }) => (
  <View style={styles.container}>
    <NavigationButtons navigation={navigation} />
    <Text style={styles.header}>CGPA</Text>
    <ScrollView>
      <Table borderStyle={{ borderWidth: 1, borderColor: '#ccc' }}>
        <Row data={['Semester', 'CGPA']} style={styles.head} textStyle={styles.text} />
        <Rows data={[['Semester 1', '3.8'], ['Semester 2', '3.9'], ['Semester 3', '4.0']]} textStyle={styles.text} />
      </Table>
    </ScrollView>
  </View>
);

const AnalysisScreen = ({ navigation }) => (
  <View style={styles.container}>
    <NavigationButtons navigation={navigation} />
    <Text style={styles.header}>Analysis Graph</Text>
    <LineChart
      data={{ labels: ['Sem 1', 'Sem 2', 'Sem 3'], datasets: [{ data: [3.8, 3.9, 4.0] }] }}
      width={300}
      height={220}
      chartConfig={{
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: { borderRadius: 16 },
        propsForDots: { r: '6', strokeWidth: '2', stroke: '#ffa726' },
      }}
      bezier
      style={{ marginVertical: 8, borderRadius: 16 }}
    />
  </View>
);

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="InternalMarks" component={InternalMarksScreen} />
    <Stack.Screen name="CGPA" component={CGPAScreen} />
    <Stack.Screen name="Analysis" component={AnalysisScreen} />
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();
const Dashboard = () => (
  <Tab.Navigator>
    <Tab.Screen name="Dashboard" component={StackNavigator} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, color: 'gray', marginBottom: 20 },
  button: { backgroundColor: '#007bff', padding: 15, marginVertical: 5, borderRadius: 5, width: '80%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
  navButtons: { position: 'absolute', top: 10, left: 10, flexDirection: 'row' },
  navButton: { padding: 10, marginRight: 10, backgroundColor: '#007bff', borderRadius: 5 },
  navButtonText: { fontSize: 16, color: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 5 },
  head: { height: 40, backgroundColor: '#f1f1f1' },
});

export default Dashboard;
