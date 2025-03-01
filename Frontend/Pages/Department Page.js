import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Enhanced student data generator
const generateStudents = (year) => {
  return Array.from({ length: 25 }, (_, i) => {
    const id = (i + 1).toString().padStart(2, '0');
    const rollNo = `CSE${year}${id}`; // Correct template literal syntax
    return {
      id,
      name: `Student ${id}`,
      rollNo,
      sem: (i % 8) + 1,
      cgpa: (Math.random() * (10 - 7) + 7).toFixed(2), // CGPA between 7 and 10
      scorePoints: Math.floor(Math.random() * 100),
      domain: ['Software Development', 'Full Stack Engineering', 'Data Science', 'DevOps & Cloud'][i % 4],
      skills: ['React', 'Python', 'JavaScript', 'Node.js', 'AWS'].slice(0, (i % 3) + 2),
      projects: Math.floor(Math.random() * 5) + 1,
    };
  });
};

const classAdvisors = {
  '1': { name: 'Dr. John Doe', expertise: 'Software Engineering' },
  '2': { name: 'Dr. Jane Smith', expertise: 'Machine Learning' },
  '3': { name: 'Dr. Alice Johnson', expertise: 'Cloud Computing' },
  '4': { name: 'Dr. Bob Brown', expertise: 'Data Science' },
};

// Home Screen
const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Computer Science Department</Text>
      <View style={styles.yearContainer}>
        {['1', '2', '3', '4'].map((year) => (
          <TouchableOpacity
            key={year}
            style={styles.yearButton}
            onPress={() => navigation.navigate('Year', { year })}
          >
            <Text style={styles.yearText}>{`Year ${year}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

// Student Card Component
const StudentCard = ({ student, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.studentCard}
      onPress={() => navigation.navigate('StudentDetails', { student })}
    >
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.rollNumber}>{student.rollNo}</Text>
        </View>
        <View style={styles.cgpaBadge}>
          <Text style={styles.cgpaText}>CGPA: {student.cgpa}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.infoText}>Semester: {student.sem}</Text>
        <Text style={styles.infoText}>Domain: {student.domain}</Text>
        <Text style={styles.infoText}>Projects: {student.projects}</Text>
      </View>

      <View style={styles.skillsContainer}>
        <Text style={styles.skillsTitle}>Skills:</Text>
        <View style={styles.skillsBadgeContainer}>
          {student.skills.map((skill, index) => (
            <View key={index} style={styles.skillBadge}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Year Screen
const YearScreen = ({ route, navigation }) => {
  const { year } = route.params;
  const students = generateStudents(year);
  const advisor = classAdvisors[year];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.advisorCard}>
        <Text style={styles.advisorName}>{advisor.name}</Text>
        <Text style={styles.advisorExpertise}>{advisor.expertise}</Text>
      </View>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <StudentCard student={item} navigation={navigation} />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

// Student Details Screen
const StudentDetailsScreen = ({ route }) => {
  const { student } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>{student.name}</Text>
        <Text style={styles.detailsSubtitle}>{student.rollNo}</Text>
        
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Academic Information</Text>
          <Text style={styles.detailText}>CGPA: {student.cgpa}</Text>
          <Text style={styles.detailText}>Semester: {student.sem}</Text>
          <Text style={styles.detailText}>Score Points: {student.scorePoints}</Text>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Professional Information</Text>
          <Text style={styles.detailText}>Domain: {student.domain}</Text>
          <Text style={styles.detailText}>Projects: {student.projects}</Text>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsBadgeContainer}>
            {student.skills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const Stack = createStackNavigator();

const department = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Year" component={YearScreen} />
        <Stack.Screen name="StudentDetails" component={StudentDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#1a1a1a',
  },
  yearContainer: {
    padding: 20,
  },
  yearButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
  },
  yearText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  studentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  rollNumber: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  cgpaBadge: {
    backgroundColor: '#e8f5e9',
    padding: 8,
    borderRadius: 6,
  },
  cgpaText: {
    color: '#2e7d32',
    fontWeight: '600',
  },
  cardContent: {
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
    marginVertical: 2,
  },
  skillsContainer: {
    marginTop: 8,
  },
  skillsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  skillsBadgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  skillBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    color: '#1976d2',
    fontSize: 12,
  },
  advisorCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  advisorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  advisorExpertise: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  detailsCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  detailsSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  detailsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 8,
  },
});

export default Department;