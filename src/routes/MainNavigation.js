import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

import AuthScreen from "../screens/AuthScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import DeckScreen from "../screens/DeckScreen";
import MapScreen from "../screens/MapScreen";
import ReviewScreen from "../screens/ReviewScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Review = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="review"
        component={ReviewScreen}
        options={({ navigation }) => ({
          title: "Review Jobs",
          headerRight: () => (
            <AntDesign
              name="setting"
              size={24}
              style={{ marginRight: 25 }}
              color="black"
              onPress={() => navigation.navigate("settings")}
            />
          ),
        })}
      />
      <Stack.Screen name="settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="map" component={MapScreen} />
      <Tab.Screen name="deck" component={DeckScreen} />
      <Tab.Screen name="review" component={Review} />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="auth" component={AuthScreen} />
      <Stack.Screen name="main" component={Home} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
