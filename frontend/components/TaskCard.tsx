import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Colors } from "@/themes/Colors";

type Props = {
  id: string; // ✅ Task ID
  title: string;
  description?: string;
  dueDate: string;
  onComplete: (id: string) => void; // ✅ Callback to remove task
};

export default function TaskCard({ id, title, description, dueDate, onComplete }: Props) {
  const translateX = useSharedValue(0); // ✅ Track swipe movement

  // ✅ Swipe Gesture
  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX > 0) {
        translateX.value = event.translationX; // ✅ Allow right swipe
      }
    })
    .onEnd(() => {
      if (translateX.value > 100) {
        onComplete(id); // ✅ Remove task immediately when swiped past 100px
      } else {
        translateX.value = withSpring(0); // ✅ Reset position if not swiped enough
      }
    });

  // ✅ Animated Styles
  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }], // ✅ Move the card
  }));

  return (
    <GestureDetector gesture={swipeGesture}>
      <Animated.View style={[styles.container, animatedCardStyle]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.description}>{description || "No description"}</Text>
        <Text style={styles.due}>{dueDate}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    maxWidth: 500,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.secondary,
    padding: 15,
    backgroundColor: "#4CD964", // ✅ Brighter Green for completed task
  },
  titleContainer: {
    paddingBottom: 5,
  },
  title: {
    color: Colors.light.onPrimary,
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    color: Colors.light.onPrimary,
    marginBottom: 5,
  },
  due: {
    fontSize: 14,
    color: Colors.light.onPrimary,
    borderTopWidth: 1,
    borderColor: Colors.light.secondary,
    paddingTop: 5,
  },
});
