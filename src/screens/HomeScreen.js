import {  Text, SafeAreaView, Button } from "react-native";
import Swipe from '../features/Swiper'

const HomeScreen = ({navigation}) => {

  return (
    <SafeAreaView className="flex-1 justify-center items-center dark:bg-slate-800">
      <Text className="text-2xl dark:text-white"> BucketList </Text>
      <Swipe />
    </SafeAreaView>
  );
};
export default HomeScreen;
