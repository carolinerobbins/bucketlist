import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Switch, Text, View, Button } from "react-native";
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
    <SafeAreaView className="flex-1 items-center dark:bg-slate-800">
      <Text className="text-lg dark:text-slate-50">Toggle Dark Mode: </Text>
      <Switch value={colorScheme === "dark"} onChange={toggleColorScheme} />
      <Text className="text-lg dark:text-slate-50"> This is your profile screen. </Text>
      <Button title='Sign Out' onPress={() => handleSignOut()} />
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
};
export default ProfileScreen;