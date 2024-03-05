import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-dotenv';
import auth from '@react-native-firebase/auth';
import MyDrawer from './drawer/Drawer';
import SignUpForm from './views/signup';
import Login from './views/login';

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
    });

  

    return unsubscribe;
  });

 

  return (
    <NavigationContainer>
      {user ? (
        <MyDrawer userInfo={user}/>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="SignUpForm" component={SignUpForm} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
