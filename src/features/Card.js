import React from 'react';
import {View, Text, Image} from 'react-native'

const Card = ({destination}) => {
return (
  <View>
    <Text className="text-slate-50 font-bold text-xl justify-center">{destination.name}</Text>
    <Image
            style={{ width: "100%", height: 500, borderRadius: 10 }}
            source={{
              uri: destination.image
            }}
    />
  </View>
)
}

export default Card;