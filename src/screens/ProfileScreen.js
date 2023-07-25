import { StatusBar } from "expo-status-bar";
import { Switch, Text, View, Button } from "react-native";
import { useColorScheme } from "nativewind";
import { getAuth, signOut } from "firebase/auth";

const ProfileScreen = ({ navigation }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const handleSignOut = () => {
    const auth = getAuth();
  signOut(auth).then(() => {
      }).catch((err) => {
        console.error(err)
});
  }
  return (
    <View className="flex-1 justify-center items-center dark:bg-slate-800">
      <Switch value={colorScheme === "dark"} onChange={toggleColorScheme} />
      <Text className="text-2xl dark:text-white"> This is your profile screen. </Text>
      <Button title='Sign Out' onPress={() => handleSignOut()} />
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </View>
  );
};
export default ProfileScreen;