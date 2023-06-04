import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import axios from "axios";

const LessonPage = ({ route, navigation }) => {
  const { courseId, accessToken } = route.params;
  const [lessonData, setLessonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://myselena.org/wp-json/learnpress/v1/lessons",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            params: {
              context: "view",
              per_page: 10,
              include: [courseId]
            }
          }
        );
        setLessonData(response.data);
      } catch (err) {
        console.error(err);
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken, courseId]);

  const handleLessonPress = (lesson) => {
    // Navigate to the LessonDetail screen with the lesson data
    navigation.navigate("LessonDetail", { lesson });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.courseName}>Course: {courseId}</Text>
      {loading ? (
        <Text>Loading lesson data...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        lessonData.map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            onPress={() => handleLessonPress(lesson)}
          >
            <View>
              <Text style={styles.lessonName}>{lesson.name}</Text>
            </View>
          </TouchableOpacity>
        ))
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
  },
  lessonName: {
    fontWeight: "bold",
    marginBottom: 5
  }
});

export default LessonPage;
