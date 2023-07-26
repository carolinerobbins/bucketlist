import React from 'react';
import { View, Text, Image } from 'react-native';

const ListCard = ({ destination }) => {
  return (
    <View className="w-80 h-48 border border-black rounded-lg overflow-hidden mb-4">
      <View className="h-1/2">
        <Image className="w-full h-full object-cover" source={{ uri: destination.image }} />
      </View>
      <View className="h-1/2 bg-white p-2">
        <Text className="text-lg font-bold text-black">{destination.name}</Text>
        {destination.nonstop ? <Text className="text-md text-black">Nonstop Available </Text> : <Text className="text-md text-black">Connection Required</Text>}
        <Text className="text-md text-black">Cheapest Price: {destination.cost} | {destination.dates}</Text>
      </View>
    </View>
  );
};

export default ListCard;