import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "./AuthScreen";
import Dashboard from "./Dashboard";
import CGPACalculator from "./Home";
import Afs from "./Afs"; // Feedback System
import Connect from "./Connect"; // Alumni Connection

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="CGPACalculator" component={CGPACalculator} />
        <Stack.Screen name="Afs" component={Afs} />
        <Stack.Screen name="Connect" component={Connect} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
