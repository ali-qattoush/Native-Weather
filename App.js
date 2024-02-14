import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import SignUpForm from "./views/signup"
import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <SignUpForm/>

      
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: "100%"
  }
});

