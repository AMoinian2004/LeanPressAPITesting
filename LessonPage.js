import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import axios from "axios";

const LessonPage = ({ navigation, route }) => {
  const { courseId, accessToken } = route.params;
  const [lessons, setLessons] = useState({});
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
  }, []);

  const goToLessonDetail = (lesson) => {
    navigation.navigate("LessonDetail", { lessonId: lesson.id, accessToken });
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
            <Pressable onPress={() => goToLessonDetail(item)}>
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  input: {
    fontSize: 24,
    padding: 10,
    marginBottom: 8
  },
  border: {
    borderRadius: 30
  }
});

export default LessonPage;
