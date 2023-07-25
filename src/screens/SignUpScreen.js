import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const SignUpScreen = ({ navigation }) => {
  const [values, setValues] = useState({
    uid: '',
    password: '',
    first: '',
    last: '',
    email: '',
    iata: ''
  });

  let inputStyle="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSignUpPress = async () => {
    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);

      const user = userCredential.user;
      console.log("User account created with ID: ", user.uid);
      const userData = {
        uid: user.uid,
        first: values.first,
        last: values.last,
        email: values.email,
        iata: values.iata,
      };

      const db = getFirestore();
      const docRef = await addDoc(collection(db, "users"), userData);
      console.log("User data added to Firestore with ID: ", docRef.id);
    } catch (error) {
      console.error("Error creating user account: ", error);
    }
  };

  return (
    <View className="grid gap-6 mb-6 md:grid-cols-2">
      <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {" "}
        First Name{" "}
      </Text>
      <TextInput
        placeholder="Joe"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => handleChange('first', text)}
        value={values.first}
        className={inputStyle}
      />
      <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {" "}
        Last Name{" "}
      </Text>
      <TextInput
        placeholder="Smith"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => handleChange('last', text)}
        value={values.last}
        className={inputStyle}
      />
      <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {" "}
        Home Airport{" "}
      </Text>
      <TextInput
        placeholder="SFO"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => handleChange('iata', text)}
        value={values.iata}
        className={inputStyle}
      />
      <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {" "}
        Email{" "}
      </Text>
      <TextInput
        placeholder="joe@gmail.com"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => handleChange('email', text)}
        value={values.email}
        className={inputStyle}
      />
      <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {" "}
        Password{" "}
      </Text>
      <TextInput
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => handleChange('password', text)}
        value={values.password}
        secureTextEntry
        className={inputStyle}
      />
      <Button title="Sign Up" onPress={handleSignUpPress} />
      <Button title="Already Registered? Log In here" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default SignUpScreen;
