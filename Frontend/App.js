import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import Screens
import Dashboard from "./Pages/Dashboard";
import CGPACalculator from "./Pages/Academic Progress";
import Afs from "./Pages/Afs"; // Feedback System
import Connect from "./Pages/Connect Through"; // Alumni Connection
import Placehub from "./Pages/Place Hub"; // Placement Hub
import Dashboard2 from "./Pages/Student Page"; // Profile Page

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="CGPACalculator" component={CGPACalculator} />
        <Stack.Screen name="Afs" component={Afs} />
        <Stack.Screen name="Connect" component={Connect} />
        <Stack.Screen name="Placehub" component={Placehub} />
        <Stack.Screen name="Dashboard2" component={Dashboard2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
