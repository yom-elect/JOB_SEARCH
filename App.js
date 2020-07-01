import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StyleSheet, View, Alert, Vibration } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/routes/MainNavigation";
import { Provider } from "react-redux";
import storeInfo from "./src/store";
import { Notifications } from "expo";
import { PersistGate } from "redux-persist/integration/react";
import PushNotifications from "./services/push_notifications";

export default function App() {
  useEffect(() => {
    PushNotifications();
    Notifications.addListener((notifications) => {
      Vibration.vibrate();
      const {
        data: { text },
        origin,
      } = notifications;
      if (origin === "received" && text) {
        Alert.alert("New Push Notification", text, [{ text: "Ok." }]);
      }
      // Alert.alert("New Push Notification", text, [{ text: "Ok." }]);
    });
  }, [PushNotifications]);
  return (
    <Provider store={storeInfo().store}>
      <PersistGate loading={null} persistor={storeInfo().persisted}>
        <NavigationContainer>
          <View style={styles.container}>
            <MainNavigator />
          </View>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
