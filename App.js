import React, {useState, useEffect} from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import MainTabs from './src/navigation/BottomTabNav';
import NavStack from './src/navigation/NavStack';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import * as firebaseConfig from './firebaseConfig';
import { getAuth, onAuthStateChanged } from "firebase/auth";


const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null)
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  return (
    <NavigationContainer>
    <Stack.Navigator headerShown="false">
    { user ? (
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }}/>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;
