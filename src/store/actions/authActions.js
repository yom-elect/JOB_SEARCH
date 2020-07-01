import * as types from "./actionConstants";
import AsyncStorage from "@react-native-community/async-storage";
import * as Facebook from "expo-facebook";
import config from "../../../config";

export const facebookLogin = () => {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem("fb_token");
    if (token) {
      //Dispatch an action facebook login is done
      dispatch({
        type: types.FACEBOOK_LOGIN_SUCCESS,
        payload: token,
      });
    } else {
      // Start up FB Login process
      await doFacebookLogin(dispatch);
    }
  };
};

const doFacebookLogin = async (dispatch) => {
  try {
    await Facebook.initializeAsync(config.FACEBOOK_ID);
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      config.FACEBOOK_ID,
      {
        permissions: ["public_profile"],
      }
    );
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      await AsyncStorage.setItem("fb_token", token);
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      let resData = await response.json();
      if (resData) {
        await AsyncStorage.setItem("fb_details", resData);
        dispatch({
          type: types.FACEBOOK_LOGIN_SUCCESS,
          payload: { resData, token },
        });
      } else {
        dispatch({ type: types.FACEBOOK_LOGIN_SUCCESS, payload: token });
      }
    } else {
      return dispatch({ type: types.FACEBOOK_LOGIN_FAIL });
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};
