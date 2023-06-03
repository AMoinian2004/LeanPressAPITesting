import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import axios from "axios";

const LessonPage = ({ route }) => {
  const { courseId, accessToken } = route.params;
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://myselena.org/wp-json/learnpress/v1/lessons/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          params: {
            context: "view"
          }
        }
      );
      setLessonData(response.data);
    } catch (err) {
      console.error(err); // This will print the error to the console
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  fetchData();

  return (
    <View style={styles.container}>
      <Text style={styles.courseName}>Course: {courseId}</Text>
      {loading ? (
        <Text>Loading lesson data...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <Text>{JSON.stringify(lessonData, null, 2)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  courseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  }
});

export default LessonPage;
