import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import MapView from "react-native-maps";
import { StyleSheet, View, Dimensions, ActivityIndicator } from "react-native";
import * as actions from "../store/actions";
import { Button } from "react-native-paper";

//4201738803816157

const MapScreen = (props) => {
  const dispatch = useDispatch();
  const [region, setRegion] = useState({
    longitude: -122,
    latitude: 37,
    longitudeDelta: 0.04,
    latitudeDelta: 0.09,
  });
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setMapLoaded(true);
  });

  const onRegionChangeComplete = (region) => {
    setRegion(region);
  };

  const onButtonPress = () => {
    dispatch(
      actions.fetchJobs(region, () => {
        props.navigation.navigate("deck");
      })
    );
  };

  if (!mapLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
      />
      <View style={styles.buttonContainer}>
        <Button
          large
          mode="contained"
          color="#009688"
          icon="map-search"
          onPress={onButtonPress}
        >
          Search Area
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default MapScreen;
