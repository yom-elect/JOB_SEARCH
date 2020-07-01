import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

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
          headerLeft: () => {},
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
      <Tab.Screen
        name="map"
        component={MapScreen}
        options={(props) => ({
          title: "Map",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={"crosshairs"}
              size={24}
              color={color}
            />
          ),
          // tabBarLabel: { fontSize: 12 },
        })}
      />
      <Tab.Screen
        name="deck"
        component={DeckScreen}
        options={(props) => ({
          title: "Jobs",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={"briefcase"}
              size={24}
              color={color}
            />
          ),
          // tabBarLabel: { fontSize: 12 },
        })}
      />
      <Tab.Screen
        name="review"
        component={Review}
        options={(props) => ({
          title: "Review Jobs",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons name={"heart"} size={24} color={color} />
          ),
          // tabBarLabel: () => {
          //   fontSize: 22;
          // },
        })}
      />
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
