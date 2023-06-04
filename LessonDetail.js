import React from "react";
import { View, StyleSheet, Text } from "react-native";

const LessonDetail = ({ route }) => {
  const { lesson } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.lessonName}>{lesson.name}</Text>
      <Text>{lesson.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  lessonName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  }
});

export default LessonDetail;
