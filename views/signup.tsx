import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import auth from '@react-native-firebase/auth';

const SignUpForm = () => {
  const signUpSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });


  const handleSignUp = async (values) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        values.email,
        values.password
      );

      console.log("User signed up:", userCredential.user);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={signUpSchema}
      onSubmit={handleSignUp}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <TextInput
            style={styles.input}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            placeholder="Password"
            secureTextEntry
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}

          <Button
            style={styles.button}
            onPress={handleSubmit}
            title="Sign Up"
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderWidth: 2,
    width: "100%",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20, // Add marginBottom to create space between input fields
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    borderWidth: 20, // Add marginTop to create space between the inputs and the button
  },
});

export default SignUpForm;
