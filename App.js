import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/routes/MainNavigation";
import { Provider } from "react-redux";
import storeInfo from "./src/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
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
