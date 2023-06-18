import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const LessonDetail = ({ route }) => {
  const { url } = route.params;
  const [pdfLink, setPdfLink] = useState("");

  useEffect(() => {
    const extractPdfLink = () => {
      const regex = /href="(.*?)"/;
      const match = regex.exec(url);
      if (match && match[1]) {
        const link = match[1];
        setPdfLink(link);
        console.log("PDF Link:", link);
      }
    };

    extractPdfLink();
  }, []);

  return (
    <View style={styles.container}>
      <Text>PDF Link: {pdfLink}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default LessonDetail;
