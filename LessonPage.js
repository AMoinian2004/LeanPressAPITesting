import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import axios from "axios";

const LessonPage = ({ route }) => {
  const { courseId, accessToken } = route.params; // Retrieve the courseId and accessToken from route params
  const [lessonData, setLessonData] = useState(null);

  useEffect(() => {
    fetchLessonData();
  }, []);

  const fetchLessonData = async () => {
    try {
      const response = await axios.get(
        `https://myselena.org/wp-json/learnpress/v1/lessons/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      setLessonData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.courseName}>{courseId}</Text>{" "}
      {/* Display the courseId */}
      {lessonData ? (
        <Text>{JSON.stringify(lessonData, null, 2)}</Text>
      ) : (
        <Text>Loading lesson data...</Text>
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
