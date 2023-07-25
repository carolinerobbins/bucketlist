import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native'

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLoginPress = () => {

  }

  const navigateRegister = () => {
    navigation.navigate('SignUp')
  }

  return (
    <View className="grid gap-6 mb-6 md:grid-cols-2">
      <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Email </Text>
      <TextInput
        placeholder='joe@gmail.com'
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setEmail(text)}
        value={email}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Password </Text>
      <TextInput
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <Button
        title="Log In"
        onPress={handleLoginPress}
      />
      <Button
        title="Not registered? Register Here"
        onPress={navigateRegister}
      />
    </View>
  )
};

export default LoginScreen;