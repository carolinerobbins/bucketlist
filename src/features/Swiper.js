import React, {useState, useEffect} from 'react';
import Swiper from "react-native-deck-swiper";
import Card from './Card';
import { Text } from 'react-native'
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Swipe = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  const getAllDestinations = async () => {
    try {
      const destinationsRef = collection(db, "destinations");
      const results = await getDocs(destinationsRef);

      const destinationsArray = [];
      results.forEach((doc) => {
        const destinationData = doc.data();
        destinationsArray.push({
          id: doc.id,
          ...destinationData,
        });
      });
      console.log(destinationsArray);
      return destinationsArray;
    } catch (error) {
      console.error("Error fetching destinations:", error);
      return [];
    }
  };

  useEffect(() => {
    getAllDestinations()
      .then((destinationsData) => {
        console.log(destinationsData);
        setDestinations(destinationsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <>
    {!loading ?
    <Swiper
            cards={destinations}
            renderCard={(card) => <Card destination={card}/>}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
            onSwipedAll={() => {console.log('onSwipedAll')}}
            cardIndex={0}
            backgroundColor={'#1b263b'}
            stackSize= {3}
            verticalSwipe={false}
            stackSeparation={20}
      /> : <Text>Cards are loading...</Text>}
      </>
  )
};

export default Swipe;