import React, {useState, useEffect} from 'react';
import Swiper from "react-native-deck-swiper";
import Card from './Card';
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Swipe = () => {
  const [destinations, setDestinations] = useState([]);
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <Swiper
            cards={destinations}
            renderCard={(card) => <Card destination={card}/>}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
            onSwipedAll={() => {console.log('onSwipedAll')}}
            cardIndex={0}
            backgroundColor={'#1b263b'}
            stackSize= {3}
      />
  )
};

export default Swipe;