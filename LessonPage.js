import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import axios from "axios";

const LessonPage = ({ navigation, route }) => {
  const { courseId, accessToken } = route.params;
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLessons = async () => {
      try {
        const response = await axios.get(
          `https://myselena.org/wp-json/learnpress/v1/courses/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        const lessonsResponse = response.data.sections[0].items;
        setLessons(lessonsResponse);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    getLessons();
  }, [courseId, accessToken]);

  const goToLesson = (lesson) => {
    navigation.navigate("Lesson", { lessonId: lesson.id, token: accessToken });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading lessons...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={lessons}
          renderItem={({ item }) => (
            <Pressable onPress={() => goToLesson(item)}>
              <Text style={styles.input}>{item.title}</Text>
            </Pressable>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdf7fa"
  },
  input: {
    fontSize: 24,
    padding: 20,
    textAlign: "center",
    width: "90%",
    backgroundColor: "#57cc99",
    fontWeight: "bold",
    color: "#fdf7fa",
    marginBottom: 8
  },
  border: {
    borderRadius: 30
  }
});

export default LessonPage;
