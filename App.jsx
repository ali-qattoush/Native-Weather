import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from "./drawer/Drawer"
import auth from '@react-native-firebase/auth';
import { useState, useEffect } from 'react';



import { StyleSheet } from 'react-native';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
    });

 
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
       <MyDrawer />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: "100%"
  }
});

export default App;
