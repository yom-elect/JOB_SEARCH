import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Slides = ({ data, onComplete }) => {
  const renderSlides = () => {
    return data.map((slide, i) => (
      <View
        key={slide.id}
        style={[styles.slideStyle, { backgroundColor: slide.color }]}
      >
        <Text style={styles.slideText}>{slide.text}</Text>
        {i === data.length - 1 && (
          <MaterialCommunityIcons
            name="progress-check"
            size={30}
            color="black"
            style={styles.iconstyle}
            onPress={onComplete}
          />
        )}
      </View>
    ));
  };

  return (
    <ScrollView horizontal pagingEnabled>
      {renderSlides()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  slideText: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    //flex: 1,
  },
  slideStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
  },
  iconstyle: {
    marginTop: 25,
  },
});
export default Slides;
