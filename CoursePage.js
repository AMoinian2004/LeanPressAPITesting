import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

const CoursePage = ({ navigation, route }) => {
  const { allCourses, accessToken } = route.params; // Retrieve the accessToken from route params

  const handleCoursePress = (course) => {
    navigation.navigate("Lessons", { courseId: course.id, accessToken }); // Pass the course ID and accessToken to the Lessons screen
  };

  return (
    <View>
      {allCourses.map((course) => (
        <Pressable
          key={course.id}
          onPress={() => handleCoursePress(course)}
          style={styles.courseContainer}
        >
          <Text>{course.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  courseContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  }
});

export default CoursePage;
