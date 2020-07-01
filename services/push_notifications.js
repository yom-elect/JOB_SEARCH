import React from "react";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Platform } from "react-native";

const PUSH_ENDPOINT = "http://rallycoding.herokuapp.com/api/tokens";

const PushNotifications = async () => {
  try {
    let previousToken = await AsyncStorage.getItem("push_token");
    if (previousToken) {
      return;
    } else {
      let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== "granted") {
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();
      // let { data } = await axios.post(PUSH_ENDPOINT, { token: { token } });
      AsyncStorage.setItem("push_token", token);
    }
    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export default PushNotifications;
