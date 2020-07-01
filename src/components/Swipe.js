import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  LayoutAnimation,
  UIManager,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250;

const Swipe = ({
  data,
  renderCards,
  onSwipeLeft,
  onSwipeRight,
  renderNoMoreCards,
}) => {
  const previousData = useRef(data);
  const [index, setIndex] = useState(0);
  const position = new Animated.ValueXY();
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        forceSwipe("right");
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        forceSwipe("left");
      } else {
        resetPosition();
      }
    },
  });

  useEffect(() => {
    if (previousData !== data) {
      setIndex(0);
    }
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }, [data]);

  const forceSwipe = (direction) => {
    Animated.timing(position, {
      toValue: {
        x: direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH,
        y: 0,
      },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction) => {
    const item = data[index];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });
    setIndex(index + 1);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  const renderItems = () => {
    if (index >= data.length) {
      return renderNoMoreCards();
    }
    return data
      .map((item, i) => {
        if (i < index) {
          return null;
        } else if (i === index) {
          return (
            <Animated.View
              key={index}
              {...panResponder.panHandlers}
              style={[getCardStyle(), styles.cardStyle]}
            >
              {renderCards(item)}
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              style={[styles.cardStyle, { top: 10 * (i - index) }]}
              key={i}
            >
              {renderCards(item)}
            </Animated.View>
          );
        }
      })
      .reverse();
  };

  return <View style={styles.container}>{renderItems()}</View>;
};

Swipe.defaultProps = {
  onSwipeLeft: () => {},
  onSwipeRight: () => {},
  renderNoMoreCards: () => {},
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH,
    zIndex: 1,
  },
});

export default Swipe;
