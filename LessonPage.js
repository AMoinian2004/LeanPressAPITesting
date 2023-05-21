import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

const LessonPage = ({ route }) => {
  const [lessons, setLessons] = useState([]);
  const { courseId } = route.params;

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await axios.get(
        `https://myselena.org/wp-json/learnpress/v1/courses/${courseId}/lessons`
      );
      setLessons(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <View>
      {lessons.map((lesson) => (
        <Text key={lesson.id}>{lesson.title.rendered}</Text>
      ))}
    </View>
  );
};

export default LessonPage;
