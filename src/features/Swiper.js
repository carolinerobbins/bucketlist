import React from 'react';
import Swiper from "react-native-deck-swiper";
import Card from './Card';

const Swipe = () => {
  return (
    <Swiper
            cards={['Paris', 'London', 'Dublin', 'Budapest']}
            renderCard={(card) => <Card destination={card}/>}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
            onSwipedAll={() => {console.log('onSwipedAll')}}
            cardIndex={0}
            backgroundColor={'#4FD0E9'}
            stackSize= {3}
      />
  )
};

export default Swipe;