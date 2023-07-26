import {  Text, View, StatusBar } from "react-native";
import Swipe from '../features/Swiper'

const HomeScreen = ({navigation}) => {

  return (
    <>
    <StatusBar backgroundColor="#1b263b" barStyle="light-content" />
    <View className="flex-1 items-center dark:bg-slate-800">
      <Swipe />
    </View>
    </>
  );
};
export default HomeScreen;
