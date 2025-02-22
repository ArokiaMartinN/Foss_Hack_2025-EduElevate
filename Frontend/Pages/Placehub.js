import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
    ]
  },
];

function CompanyList({ navigation }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.centerContainer}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          {companies.map((company) => (
            <View key={company.id} style={styles.cardContainer}>
              <TouchableOpacity
                onPress={() => setExpanded(expanded === company.id ? null : company.id)}
                style={styles.card}
                activeOpacity={0.9}
              >
                <View style={styles.cardContent}>
                  <View style={styles.companyInfo}>
                    <Text style={styles.companyName}>{company.name}</Text>
                    <Text style={styles.email}>{company.email}</Text>
                    <Text style={styles.number}>{company.number}</Text>
                  </View>
                  <Ionicons name={expanded === company.id ? "chevron-down" : "chevron-forward"} size={20} color="#007AFF" />
                </View>
              </TouchableOpacity>

              {expanded === company.id && (
                <View style={styles.popup}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.details}>📌 {company.placed} placed</Text>
                    <Text style={styles.details}>🎯 Criteria: {company.criteria}</Text>
                    <Text style={styles.details}>💰 Pre-Intern Salary: {company.preInternSalary}</Text>
                    <Text style={styles.details}>🌍 Domain: {company.domain}</Text>
                    <Text style={styles.details}>🏢 Type: {company.type}</Text>
                    <TouchableOpacity style={styles.moreDetailsButton} onPress={() => navigation.navigate('PlacementDetails', { company })}>
                      <Text style={styles.moreDetailsText}>View Placement Details</Text>
                      <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ))}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F5F5' },
  centerContainer: { flex: 1, alignItems: 'center' },
  scrollView: { flex: 1, width: '100%' },
  scrollViewContent: { alignItems: 'center', paddingVertical: 16 },
  cardContainer: { width: CARD_WIDTH, marginBottom: 16 },
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
  cardContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  companyInfo: { flex: 1 },
  companyName: { fontSize: 18, fontWeight: 'bold', color: '#333333', marginBottom: 4 },
  email: { fontSize: 14, color: '#666666', marginBottom: 2 },
  number: { fontSize: 14, color: '#666666' },
  popup: { backgroundColor: '#FFFFFF', borderRadius: 12, marginTop: 8, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  details: { fontSize: 14, color: '#333333', marginBottom: 8 },
  moreDetailsButton: { backgroundColor: '#0D47A1', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 8, marginTop: 16 },
  moreDetailsText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600', marginRight: 8 },
});

export default function Placehub() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen 
          name="Companies" 
          component={CompanyList}
          options={{ title: 'Placement Companies', headerStyle: { backgroundColor: '#E3F2FD' }, headerTitleStyle: { color: '#0D47A1' } }}
        />
        <Stack.Screen 
          name="PlacementDetails" 
          component={PlacementDetails}
          options={{ title: 'Placement Details', headerStyle: { backgroundColor: '#E3F2FD' }, headerTitleStyle: { color: '#0D47A1' }, headerTintColor: '#0D47A1' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}