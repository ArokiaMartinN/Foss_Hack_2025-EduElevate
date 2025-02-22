import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(300))[0];

  useEffect(() => {
    checkLoginStatus();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.elastic(1.2),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // Check if the user is already logged in
  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      navigation.replace("Dashboard"); // Navigate to the home screen if logged in
    }
  };

  // Handle Login/Register logic
  const handleAuth = async () => {
    if (!email || !password || (!isLogin && password !== confirmPassword)) {
      Alert.alert("Error", "Please fill in all fields correctly.");
      return;
    }

    const url = isLogin ? "http://10.0.2.2:5000/login" : "http://10.0.2.2:5000/register";
    const data = { email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        if (isLogin) {
          await AsyncStorage.setItem("token", result.token);
          navigation.replace("Dashboard"); // Navigate to Home/Dashboard
        } else {
          Alert.alert("Success", "User Registered! Please Login.");
          setIsLogin(true);
        }
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("./CIT Logo.jpeg")} style={styles.logo} />
      <Text style={styles.appName}>EduElevate</Text>
      <Animated.View style={[styles.box, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}> 
        <Text style={styles.title}>{isLogin ? "Login" : "Register"}</Text>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>{isLogin ? "Login" : "Register"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchText}>{isLogin ? "Create an account" : "Already have an account? Login"}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E3F2FD", justifyContent: "center", alignItems: "center" },
  logo: { width: 100, height: 100, marginBottom: 20, borderRadius: 5 },
  appName: { fontSize: 32, fontWeight: "bold", color: "#1565C0", marginBottom: 20 },
  box: { width: "80%", padding: 20, backgroundColor: "#FFFFFF", borderRadius: 15, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 10, elevation: 10 },
  title: { fontSize: 28, fontWeight: "bold", color: "#1565C0", textAlign: "center", marginBottom: 20 },
  input: { backgroundColor: "#BBDEFB", color: "#0D47A1", padding: 12, marginBottom: 10, borderRadius: 8, width: "100%" },
  button: { backgroundColor: "#1E88E5", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10, width: "100%" },
  buttonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  switchText: { color: "#1565C0", textAlign: "center", marginTop: 15, fontSize: 16 },
});

export default AuthScreen;
