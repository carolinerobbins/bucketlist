import React from 'react';
import { View, Text, Image } from 'react-native';

const ListCard = ({ destination }) => {
  return (
    <View className="w-80 h-48 border border-black rounded overflow-hidden mb-4">
      <View className="h-1/2">
        <Image className="w-full h-full object-cover" source={{ uri: destination.image }} />
      </View>
      <View className="h-1/2 bg-white p-2">
        <Text className="text-lg font-bold text-black">{destination.name}</Text>
        <Text className="text-md text-black">{destination.name}</Text>
      </View>
    </View>
  );
};

export default ListCard;