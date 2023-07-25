import { StatusBar } from "expo-status-bar";
import { Switch, Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import MainTabs from './src/navigation/BottomTabNav';
import NavStack from './src/navigation/NavStack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator headerShown="false">
      <Stack.Screen name="BucketList" component={MainTabs} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;
