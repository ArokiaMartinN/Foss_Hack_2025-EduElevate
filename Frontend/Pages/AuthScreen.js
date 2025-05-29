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
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const AuthScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(300))[0];
  const logoAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    checkLoginStatus();
    Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.elastic(1.2),
          useNativeDriver: true,
        })
      ])
    ]).start();
  }, []);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      navigation.replace("Dashboard");
    }
  };

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
          navigation.replace("Dashboard");
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
    <LinearGradient
      colors={['#1565C0', '#1976D2', '#2196F3']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Animated.View style={[styles.logoContainer, { opacity: logoAnim }]}>
          <Image source={require("./CIT Logo.jpeg")} style={styles.logo} />
          <Text style={styles.appName}>EduElevate</Text>
          <Text style={styles.tagline}>Empowering Education, Elevating Futures</Text>
        </Animated.View>

        <Animated.View 
          style={[
            styles.box, 
            { 
              opacity: fadeAnim, 
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Text style={styles.title}>{isLogin ? "Welcome Back!" : "Create Account"}</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#90CAF9"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#90CAF9"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#90CAF9"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          )}
          <TouchableOpacity style={styles.button} onPress={handleAuth}>
            <Text style={styles.buttonText}>{isLogin ? "Login" : "Register"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.switchText}>
              {isLogin ? "New user? Create an account" : "Already have an account? Login"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: width * 0.175,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  tagline: {
    fontSize: 16,
    color: "#E3F2FD",
    marginTop: 10,
    fontStyle: "italic",
  },
  box: {
    width: width * 0.9,
    padding: 25,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1565C0",
    textAlign: "center",
    marginBottom: 25,
  },
  input: {
    backgroundColor: "#E3F2FD",
    color: "#1565C0",
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#BBDEFB",
  },
  button: {
    backgroundColor: "#1565C0",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchText: {
    color: "#1565C0",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default AuthScreen;