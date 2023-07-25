import { StatusBar } from "expo-status-bar";
import { Switch, Text, View, Button } from "react-native";
import { useColorScheme } from "nativewind";

const ProfileScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  
  return (
    <View className="flex-1 justify-center items-center dark:bg-slate-800">
      <Switch value={colorScheme === "dark"} onChange={toggleColorScheme} />
      <Text className="text-2xl dark:text-white"> This is your profile screen. </Text>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </View>
  );
};
export default ProfileScreen;