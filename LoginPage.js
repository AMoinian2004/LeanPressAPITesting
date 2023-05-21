import { TextInput, View, StyleSheet, Pressable, Text } from "react-native";
import { useState } from "react";
import axios from "axios";

const LoginPage = ({ navigation }) => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [allCourses, setAllCourses] = useState([]);

  const authenticateUser = async (user, pass) => {
    // console.log('Button has been pressed!' + `${user}` + `${pass}`);
    try {
      const response = await axios.post(
        "https://myselena.org/wp-json/learnpress/v1/token",
        {
          username: user, //SelenaContent
          password: pass //eattheredpizza
        }
      );
      const resToken = response.data.token;
      const validationStatus = await validateToken(resToken);
      if (validationStatus === 200) {
        finalToken = resToken;
        allCourses = await getAllCourses(finalToken);
        navigation.navigate("Courses", { allCourses });
      }

      console.log(allCourses[0].name);
      console.log(allCourses[0].id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const validateToken = async (token) => {
    try {
      const response = await axios.post(
        "https://myselena.org/wp-json/learnpress/v1/token/validate",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      let resStatus = response.data.data.status;
      return resStatus;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getAllCourses = async (finalToken) => {
    let courses = [];
    let page = 1;
    let perPage = 10;
    while (true) {
      try {
        const response = await axios.get(
          "https://myselena.org/wp-json/learnpress/v1/courses",
          {
            params: {
              page,
              per_page: perPage
            },
            headers: {
              Authorization: `Bearer ${finalToken}`
            }
          }
        );
        courses.push(...response.data);
        if (
          response.headers.link &&
          response.headers.link.includes('rel="next"')
        ) {
          // There are more pages of results
          page++;
        } else {
          // No more pages of results
          break;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    return courses;
  };

  return (
    <View>
      <TextInput
        onChangeText={(text) => setUsername(text)}
        placeholder="Username"
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        secureTextEntry
      />
      <Pressable onPress={() => authenticateUser(username, password)}>
        <Text>Log In</Text>
      </Pressable>
    </View>
  );
};

export default LoginPage;
