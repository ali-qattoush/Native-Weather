import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import auth from "@react-native-firebase/auth";

const SignUpForm = ({navigation}) => {
  const signUpSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const handleSignUp = async (values) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        values.email,
        values.password
      );

      console.log("User signed up");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Sign Up</Text>
      </View>
      <View style={styles.formContainer}>
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={signUpSchema}
          onSubmit={handleSignUp}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
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

              <TextInput
                style={styles.input}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                placeholder="Confirm Password"
                secureTextEntry
              />
              {errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}

              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.signupText}>
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 50,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  formContainer: {
    width: "80%",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#521be3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 20,
    color: "#521be3",
    textAlign: "center",
  },
});

export default SignUpForm;
