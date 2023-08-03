import React, {useState, useEffect, useRef, useContext} from 'react';
import Swiper from "react-native-deck-swiper";
import Card from './Card';
import { Text, View } from 'react-native'
import { getFirestore, collection, getDocs, getDoc, doc, arrayUnion, updateDoc, setDoc, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../utils/UserContext'

const Swipe = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const swipeRef = useRef();
  const db = getFirestore();
  const auth = getAuth();


  const getAllDestinations = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      const addedDestinations = userDoc.data().added || [];
      const skippedDestinations = userDoc.data().skipped || [];
      const visitedDestinations = userDoc.data().visited || [];

      const destinationsRef = collection(db, "destinations");
      const querySnapshot = await getDocs(destinationsRef);

      const destinationsArray = [];
      querySnapshot.forEach((doc) => {
        const destinationData = doc.data();
        if (!addedDestinations.includes(doc.id) && !skippedDestinations.includes(doc.id) &&
        !visitedDestinations.includes(doc.id)) {
          destinationsArray.push({
            id: doc.id,
            ...destinationData,
          });
        }
      });
      return destinationsArray;
    } catch (error) {
      console.error("Error fetching destinations:", error);
      return [];
    }
  };

  useEffect(() => {
    getAllDestinations('NStFWjztTjbeSivO95euaNBlrdO2')
      .then((destinationsData) => {
        setDestinations(destinationsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSwipedRight = async (cardIndex) => {
    let destinationId = destinations[cardIndex]["id"];
    try {
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);

      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        if (userDoc.data().added) {
          await updateDoc(userRef, {
            added: arrayUnion(destinationId),
          });
        } else {
          await setDoc(userRef, { added: [destinationId] }, { merge: true });
        }
      }
      setUser((prevUser) => ({
        ...prevUser,
        added: [...prevUser.added, destinationId],
      }));
      console.log("Destination added to the user's 'added' array successfully!");
    } catch (error) {
      console.error("Error adding destination to user's 'added' array:", error);
    }
  };

  const handleSwipedLeft = async (cardIndex) => {
    let destinationId = destinations[cardIndex]["id"];
    try {
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);

      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        if (userDoc.data().skipped) {
          await updateDoc(userRef, {
            skipped: arrayUnion(destinationId),
          });
        } else {
          await setDoc(userRef, { skipped: [destinationId] }, { merge: true });
        }
      }
      setUser((prevUser) => ({
        ...prevUser,
        skipped: [...prevUser.skipped, destinationId], // Make sure to update the 'skipped' property with the new value
      }));
      console.log("Destination added to the user's 'added' array successfully!");
    } catch (error) {
      console.error("Error adding destination to user's 'added' array:", error);
    }
  };

  const handledVisited = async (cardIndex) => {
    let destinationId = destinations[cardIndex]["id"];
    try {
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);

      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        if (userDoc.data().visited) {
          await updateDoc(userRef, {
            visited: arrayUnion(destinationId),
          });
        } else {
          await setDoc(userRef, { visited: [destinationId] }, { merge: true });
        }
      }
      setUser((prevUser) => ({
        ...prevUser,
        visited: [...prevUser.visited, destinationId], // Make sure to update the 'visited' property with the new value
      }));
      console.log("Destination added to the user's 'added' array successfully!");
    } catch (error) {
      console.error("Error adding destination to user's 'added' array:", error);
    }
  };

  return (
    <>
    {!loading ?
    <>
    <Swiper
            cards={destinations}
            renderCard={(card) => <Card destination={card} handledVisited={handledVisited}/>}
            ref={swipeRef}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
            onSwipedAll={() => { return (
              <Text>You've swiped all the cards! Click on the list to pick your next trip</Text>
            )}}
            onSwipedRight={(cardIndex) => {handleSwipedRight(cardIndex)}}
            onSwipedLeft={(cardIndex) => {handleSwipedLeft(cardIndex)}}
            onSwipedTop={handledVisited}
            cardIndex={0}
            backgroundColor={'#1b263b'}
            stackSize= {3}
            verticalSwipe={false}
            stackSeparation={15}
      />
    <View className="flex-1 justify-end">
         <Ionicons
        name="location"
        size={32}
        color="white"
        style={{ position: 'absolute', left: 120, bottom: 25, zIndex: 10 }}
        onPress={() => {swipeRef.current.swipeTop()}}
      />
      </View>
      </> : <Text>Cards are loading...</Text>}
      </>
  )
};

export default Swipe;