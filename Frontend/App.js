import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import Screens
import AuthScreen from "./Pages/AuthScreen";
import Dashboard from "./Pages/Dashboard";
import CGPACalculator from "./Pages/Home";
import Afs from "./Pages/Afs"; // Feedback System
import Connect from "./Pages/Connect"; // Alumni Connection
import Placehub from "./Pages/Placehub"; // Placement Hub

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="CGPACalculator" component={CGPACalculator} />
        <Stack.Screen name="Afs" component={Afs} />
        <Stack.Screen name="Connect" component={Connect} />
        <Stack.Screen name="Placehub" component={Placehub} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
