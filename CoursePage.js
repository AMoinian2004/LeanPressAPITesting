import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import axios from "axios";

const CoursePage = ({ navigation, route }) => {
  const allCourses = route.params.allCourses;

  return (
    <View>
      {allCourses.map((course) => (
        <Pressable
          key={course.id}
          onPress={() =>
            navigation.navigate("Lessons", { courseId: course.id })
          }
        >
          <Text>{course.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default CoursePage;
