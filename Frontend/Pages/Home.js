import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

const CGPACalculator = ({ navigation }) => {
  const [semesters, setSemesters] = useState([{ gpa: '', credits: '' }]);
  const [cgpa, setCGPA] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const contentAnim = useState(new Animated.Value(0))[0];
  const graphAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(contentAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    semesters.forEach(({ gpa, credits }) => {
      if (gpa && credits) {
        totalPoints += parseFloat(gpa) * parseFloat(credits);
        totalCredits += parseFloat(credits);
      }
    });

    if (totalCredits === 0) {
      Alert.alert('Invalid Input', 'Please enter valid GPA and credits for all semesters!');
      return;
    }

    setCGPA((totalPoints / totalCredits).toFixed(2));
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(graphAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    });
  };

  const addSemester = () => {
    setSemesters([...semesters, { gpa: '', credits: '' }]);
  };

  const updateSemester = (index, field, value) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[index][field] = value;
    setSemesters(updatedSemesters);
  };

  return (
    <Animated.View style={[styles.container, { opacity: contentAnim }]}> 
      <View style={styles.header}> 
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Ionicons name="home" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Academic Progress</Text>
      </View>

      <Text style={styles.subtitle}>CGPA Calculator</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {semesters.map((semester, index) => (
          <View key={index} style={styles.semesterContainer}>
            <Text style={styles.semesterTitle}>Semester {index + 1}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter GPA"
              keyboardType="numeric"
              value={semester.gpa}
              onChangeText={(value) => updateSemester(index, 'gpa', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Total Credits"
              keyboardType="numeric"
              value={semester.credits}
              onChangeText={(value) => updateSemester(index, 'credits', value)}
            />
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <Button title="Add Semester" onPress={addSemester} color="#5DADE2" />
          <Button title="Calculate CGPA" onPress={calculateCGPA} color="#2874A6" />
        </View>

        {cgpa !== null && (
          <Animated.View style={[styles.resultContainer, { opacity: fadeAnim }]}> 
            <Text style={styles.resultText}>Your CGPA: {cgpa}</Text>
          </Animated.View>
        )}

        {cgpa !== null && (
          <Animated.View style={{ opacity: graphAnim }}>
            <LineChart
              data={{
                labels: semesters.map((_, index) => `Sem ${index + 1}`),
                datasets: [{ data: semesters.map((sem) => parseFloat(sem.gpa) || 0) }]
              }}
              width={Dimensions.get('window').width - 40}
              height={220}
              yAxisSuffix=""
              chartConfig={{
                backgroundGradientFrom: '#E3F2FD',
                backgroundGradientTo: '#BBDEFB',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(41, 128, 185, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              bezier
              style={styles.chart}
            />
          </Animated.View>
        )}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E3F2FD' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 30 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', flex: 1, marginLeft: -20 },
  subtitle: { fontSize: 22, fontWeight: '600', textAlign: 'center', marginBottom: 20, color: '#1A5276' },
  semesterContainer: { marginBottom: 20, padding: 15, backgroundColor: '#BBDEFB', borderRadius: 10 },
  semesterTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#1A5276' },
  input: { borderWidth: 1, borderColor: '#1A5276', padding: 10, marginVertical: 5, borderRadius: 5, backgroundColor: '#fff' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 },
  resultContainer: { marginTop: 20, padding: 10, backgroundColor: '#AED6F1', borderRadius: 5 },
  resultText: { fontSize: 20, fontWeight: 'bold', color: '#154360', textAlign: 'center' },
  chart: { marginVertical: 20, borderRadius: 10 },
});

export default CGPACalculator;
