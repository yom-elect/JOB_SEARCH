import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, Platform } from "react-native";
import Swipe from "../components/Swipe";
import MapView from "react-native-maps";
import * as actions from "../store/actions";
import { Card, Title, Paragraph } from "react-native-paper";

const DeckScreen = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  // console.log(jobs);

  const renderCard = (job) => (
    <Card>
      <Card.Title title={job.jobtitle} />
      <View style={{ height: 300 }}>
        <MapView
          scrollEnabled={false}
          style={{ flex: 1 }}
          cacheEnabled={Platform.OS === "android" ? true : false}
          initialRegion={{
            longitude: job.longitude,
            latitude: job.latitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.02,
          }}
        ></MapView>
      </View>

      <Card.Content style={styles.detailWrapper}>
        <Title>{job.company}</Title>
        <Paragraph style={{ marginLeft: 30 }}>
          {job.formattedRelativeTime}
        </Paragraph>
      </Card.Content>
      <Paragraph>{job.snippet}</Paragraph>
    </Card>
  );

  const renderNoMoreCards = () => (
    <Card>
      <Card.Title title="No More Jobs" />
    </Card>
  );

  return (
    <View>
      <Swipe
        data={jobs}
        renderCards={renderCard}
        renderNoMoreCards={renderNoMoreCards}
        onSwipeRight={(job) => dispatch(actions.likeJob(job))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  detailWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
});

export default DeckScreen;
