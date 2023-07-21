import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

const LessonDetail = ({ navigation, route }) => {
  const { lessonId, accessToken } = route.params;
  const [lesson, setLesson] = useState({});
  const [pdfLink, setPdfLink] = useState("");
  const [pdf, setPdf] = useState();

  useEffect(() => {
    const extractDownloadLink = (content) => {
      const start = content.indexOf('href="') + 6;
      const end = content.indexOf('">download<') - 2;
      const string = content.substring(start, end);

      return string;
    };

    const getLesson = async () => {
      try {
        const response = await axios.get(
          `https://myselena.org/wp-json/learnpress/v1/lessons/${lessonId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        setPdfLink(extractDownloadLink(response.data.content));
        setLesson(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getLesson();
  }, []);

  const getPdf = async () => {
    const result = await WebBrowser.openBrowserAsync(pdfLink);
    setPdf(result);
  };

  return (
    <View>
      <Text>{lessonId}</Text>
      <Text>{pdf}</Text>
      <Text>{pdfLink}</Text>
    </View>
  );
};

export default LessonDetail;
