import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Button } from "react-native";
//import AsyncStorage from "@react-native-community/async-storage";
import * as auth from "./../store/actions";

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const onAuthComplete = async () => {
    //let fb_token = await AsyncStorage.getItem("fb_token");
    if (token) {
      props.navigation.navigate("main");
    }
  };

  useEffect(() => {
    onAuthComplete();
  });
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hi New User!</Text>
      <Button
        title="Facebook Login"
        onPress={() => dispatch(auth.facebookLogin())}
      />
    </View>
  );
};

export default AuthScreen;
