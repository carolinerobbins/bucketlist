import React from 'react';
import {View, Text, Image} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Card = ({destination, handledVisited}) => {
return (
  <View className="flex-1 justify-center items-center">
    <Text className="text-slate-50 font-bold text-xl">{destination.name}</Text>
    <Image
            style={{ width: "100%", height: 500, borderRadius: 10 }}
            source={{
              uri: destination.image
            }}
    />
    <View className="w-full bg-opacity-80 p-4 absolute bottom-0 left-0 right-0">
          <Text className="text-slate-50 font-bold mb-2">{destination.tag1}</Text>
          <Text className="text-slate-50 font-bold mb-2">{destination.tag2}</Text>
    </View>

  </View>
)
}

export default Card;