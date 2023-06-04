import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import axios from "axios";

const LessonDetail = ({ route }) => {
  const { lessonId, accessToken } = route.params;
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(
          `https://myselena.org/wp-json/learnpress/v1/lessons/${lessonId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              context: "view",
            },
          }
        );
        setLesson(response.data);
      } catch (err) {
        console.error(err);
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [accessToken, lessonId]);

  if (loading) {
    return <Text>Loading lesson data...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

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
    padding: 10,
  },
  lessonName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default LessonDetail;
