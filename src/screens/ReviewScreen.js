import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, ScrollView, StyleSheet, Linking } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import MapView from "react-native-maps";

const ReviewScreen = (props) => {
  const likedJobs = useSelector((state) => state.likedJobs);

  const renderLikedJobs = () => {
    return likedJobs.map(
      (
        { jobtitle, company, formattedRelativeTime, url, latitude, longitude },
        i
      ) => (
        <Card key={i} style={{ marginTop: 10 }}>
          <View style={{ height: 250 }}>
            <Card.Title title={jobtitle} />
            <MapView
              scrollEnabled={false}
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === "android"}
              initialRegion={{
                longitude: longitude,
                latitude: latitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02,
              }}
            ></MapView>

            <Card.Content style={styles.detailWrapper}>
              <Title style={styles.italics}>{company}</Title>
              <Paragraph style={styles.italics}>
                {formattedRelativeTime}
              </Paragraph>
            </Card.Content>
            <Card.Actions style={{ justifyContent: "flex-end" }}>
              <Button
                mode="outlined"
                color="#03A9F4"
                icon="application-import"
                onPress={() => Linking.openURL(url)}
              >
                Apply Now!
              </Button>
            </Card.Actions>
            {/* <Paragraph>{job.snippet}</Paragraph> */}
          </View>
        </Card>
      )
    );
  };
  return <ScrollView style={{ marginTop: 15 }}>{renderLikedJobs()}</ScrollView>;
};

const styles = StyleSheet.create({
  detailWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 2,
    marginTop: 5,
  },
  italics: {
    fontStyle: "italic",
  },
});

export default ReviewScreen;
