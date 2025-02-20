import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  FadeIn,
  FadeOut
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.92;

// Sample company data
const companies = [
  {
    id: "1",
    name: "Microsoft",
    email: "contact@microsoft.com",
    number: "+91 98765 43210",
    placed: "120 Students",
    criteria: "CGPA > 9.0",
    preInternSalary: "₹1 Lakh per month",
    domain: "Software Development",
    type: "Product-Based",
    placedStudents: [
      { id: 1, name: "Arokia Martin", branch: "Computer Science", package: "24 LPA", year: "2024" },
      { id: 2, name: "Varadha Rajan", branch: "Information Technology", package: "22 LPA", year: "2024" },
      { id: 3, name: "Alex Wilson", branch: "Computer Science", package: "26 LPA", year: "2024" },
    ]
  },
  {
    id: "2",
    name: "Google",
    email: "contact@google.com",
    number: "+91 87654 32109",
    placed: "150 Students",
    criteria: "CGPA > 9.2",
    preInternSalary: "₹1.2 Lakh per month",
    domain: "AI & Cloud Computing",
    type: "Product-Based",
    placedStudents: [
      { id: 1, name: "Shreyas", branch: "Computer Science", package: "28 LPA", year: "2024" },
      { id: 2, name: "Maneesh", branch: "AI & ML", package: "26 LPA", year: "2024" },
      { id: 3, name: "Vithuna", branch: "Data Science", package: "27 LPA", year: "2024" },
    ]
  },
];

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

function CompanyList() {
  const [expanded, setExpanded] = useState(null);
  const scale = useSharedValue(1);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.centerContainer}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {companies.map((company) => {
            const animatedStyle = useAnimatedStyle(() => ({
              transform: [{ scale: scale.value }],
            }));

            return (
              <Animated.View 
                key={company.id} 
                style={[styles.cardContainer]}
                entering={FadeIn.duration(400)}
              >
                <AnimatedTouchable
                  onPress={() => {
                    scale.value = withSpring(1.03, { damping: 15 });
                    setTimeout(() => {
                      scale.value = withSpring(1);
                      setExpanded(expanded === company.id ? null : company.id);
                    }, 100);
                  }}
                  style={[styles.card, animatedStyle]}
                  activeOpacity={0.95}
                >
                  <View style={styles.cardContent}>
                    <View style={styles.companyInfo}>
                      <Text style={styles.companyName}>{company.name}</Text>
                      <Text style={styles.email}>{company.email}</Text>
                      <Text style={styles.number}>{company.number}</Text>
                    </View>
                    <Ionicons 
                      name={expanded === company.id ? "chevron-down" : "chevron-forward"}
                      size={20} 
                      color="#007AFF" 
                    />
                  </View>
                </AnimatedTouchable>

                {expanded === company.id && (
                  <Animated.View 
                    style={styles.popup}
                    entering={FadeIn.duration(300)}
                    exiting={FadeOut.duration(200)}
                  >
                    <View style={styles.detailsContainer}>
                      <Text style={styles.details}>📌 {company.placed} placed</Text>
                      <Text style={styles.details}>🎯 Criteria: {company.criteria}</Text>
                      <Text style={styles.details}>💰 Pre-Intern Salary: {company.preInternSalary}</Text>
                      <Text style={styles.details}>🌍 Domain: {company.domain}</Text>
                      <Text style={styles.details}>🏢 Type: {company.type}</Text>
                      
                      <TouchableOpacity 
                        style={styles.moreDetailsButton}
                        onPress={() => navigation.navigate('PlacementDetails', { company })}
                      >
                        <Text style={styles.moreDetailsText}>View Placement Details</Text>
                        <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                )}
              </Animated.View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function PlacementDetails({ route }) {
  const { company } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.companyTitle}>{company.name}</Text>
          <Text style={styles.subtitle}>Placement Details 2024</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{company.placedStudents.length}</Text>
            <Text style={styles.statLabel}>Students Placed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{company.preInternSalary}</Text>
            <Text style={styles.statLabel}>Avg. Package</Text>
          </View>
        </View>

        <View style={styles.placedStudentsContainer}>
          <Text style={styles.sectionTitle}>Placed Students</Text>
          {company.placedStudents.map((student) => (
            <View key={student.id} style={styles.studentCard}>
              <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.studentBranch}>{student.branch}</Text>
              </View>
              <View style={styles.packageContainer}>
                <Text style={styles.packageText}>{student.package}</Text>
                <Text style={styles.yearText}>{student.year}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.criteriaSection}>
          <Text style={styles.sectionTitle}>Selection Criteria</Text>
          <View style={styles.criteriaCard}>
            <Text style={styles.criteriaText}>• CGPA: {company.criteria}</Text>
            <Text style={styles.criteriaText}>• Domain: {company.domain}</Text>
            <Text style={styles.criteriaText}>• Type: {company.type}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  number: {
    fontSize: 14,
    color: '#666666',
  },
  popup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  details: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
  },
  moreDetailsButton: {
    backgroundColor: '#0D47A1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  moreDetailsText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  // Placement Details Styles
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
  },
  companyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#1976D2',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-around',
  },
  statCard: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 150,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  placedStudentsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 16,
  },
  studentCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  studentBranch: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  packageContainer: {
    alignItems: 'flex-end',
  },
  packageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D47A1',
  },
  yearText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  criteriaSection: {
    padding: 16,
  },
  criteriaCard: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
  },
  criteriaText: {
    fontSize: 15,
    color: '#333333',
    marginBottom: 8,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Companies" 
          component={CompanyList}
          options={{
            title: 'Placement Companies',
            headerStyle: {
              backgroundColor: '#E3F2FD',
            },
            headerTitleStyle: {
              color: '#0D47A1',
            },
          }}
        />
        <Stack.Screen 
          name="PlacementDetails" 
          component={PlacementDetails}
          options={{
            title: 'Placement Details',
            headerStyle: {
              backgroundColor: '#E3F2FD',
            },
            headerTitleStyle: {
              color: '#0D47A1',
            },
            headerTintColor: '#0D47A1',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}