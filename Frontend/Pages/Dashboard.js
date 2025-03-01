import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const Dashboard = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.replace("AuthScreen");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Dashboard!</Text>
      
      <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("Dashboard2")}>
        <Text style={styles.profileButtonText}>Go to Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("StudentProfile")}> 
        <Text style={styles.profileButtonText}>Student Profile</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("TeacherProfile")}> 
        <Text style={styles.profileButtonText}>Teacher Profile</Text>
      </TouchableOpacity>
      
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("CGPACalculator")}> 
          <Ionicons name="stats-chart-outline" size={24} color="#FFFFFF" />
          <Text style={styles.navText}>Academic Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Afs")}> 
          <Ionicons name="chatbubbles-outline" size={24} color="#FFFFFF" />
          <Text style={styles.navText}>Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Connect")}> 
          <Ionicons name="people-outline" size={24} color="#FFFFFF" />
          <Text style={styles.navText}>Alumni Connect</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Placehub")}> 
          <Ionicons name="business-outline" size={24} color="#FFFFFF" />
          <Text style={styles.navText}>Placement Hub</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={handleLogout}> 
          <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
          <Text style={styles.navText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#E3F2FD", padding: 20, paddingBottom: 60 },
  title: { fontSize: 24, fontWeight: "bold", color: "#1565C0", marginBottom: 20 },
  profileButton: { backgroundColor: "#1E88E5", padding: 10, borderRadius: 5, marginBottom: 10 },
  profileButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  navBar: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#1976D2", paddingVertical: 10 },
  navItem: { alignItems: "center", flex: 1 },
  navText: { color: "#FFFFFF", fontSize: 12, marginTop: 4 }
});

export default Dashboard;
