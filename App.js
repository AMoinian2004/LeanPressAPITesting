import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./LoginPage";
import CoursePage from "./CoursePage";
import LessonPage from "./LessonPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Courses" component={CoursePage} />
        <Stack.Screen name="Lessons" component={LessonPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
