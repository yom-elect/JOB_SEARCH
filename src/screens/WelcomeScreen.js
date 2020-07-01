import React, { useState, useEffect } from "react";
import _ from "lodash";
import { View } from "react-native";
import Slides from "../components/Slides";
import { AppLoading } from "expo";
import AsyncStorage from "@react-native-community/async-storage";

const SLIDE_DATA = [
  { id: 1, text: "Welcome to JobApp", color: "#03A9F4" },
  { id: 2, text: "Use this to surf for jobs", color: "#009688" },
  { id: 3, text: "Set your location, then swipe away", color: "#03A9F4" },
];

const WelcomeScreen = (props) => {
  const [token, setToken] = useState(null);
  const onSlidesComplete = () => {
    props.navigation.navigate("auth");
  };

  const checkToken = async () => {
    let token = await AsyncStorage.getItem("fb_token");
    if (token) {
      props.navigation.navigate("main");
      setToken(token);
    } else {
      setToken(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  if (_.isNull(token)) {
    return <AppLoading />;
  }
  return (
    <View style={{ flex: 1 }}>
      <Slides data={SLIDE_DATA} onComplete={onSlidesComplete} />
    </View>
  );
};

export default WelcomeScreen;
