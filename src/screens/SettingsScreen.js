import React from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { clearLikedJobs } from "../store/actions";

const SettingsScreen = (props) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        color="#F44336"
        icon="delete-variant"
        onPress={() => dispatch(clearLikedJobs())}
      >
        Reset Liked Jobs
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsScreen;
