import React, {useState} from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import MainTabs from './src/navigation/BottomTabNav';
import NavStack from './src/navigation/NavStack';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen'

const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
    <Stack.Navigator headerShown="false">
    { user ? (
          <Stack.Screen name="BucketList" component={MainTabs} />
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
