import React, {useState, useEffect} from 'react'
import { ScrollView, Text, View, SafeAreaView } from "react-native";
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import ListCard from '../features/ListCard';

const ListScreen = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAdded = async (userId) => {
    try {
      const db = getFirestore();
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      const addedDestinations = userDoc.data().added || [];

      const destinationsRef = collection(db, "destinations");
      const querySnapshot = await getDocs(destinationsRef);

      const destinationsArray = [];
      querySnapshot.forEach((doc) => {
        const destinationData = doc.data();
        if (addedDestinations.includes(doc.id)) {
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
    getAdded('NStFWjztTjbeSivO95euaNBlrdO2')
      .then((destinationsData) => {
        setList(destinationsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const groupDestinationsBySeason = (destinations) => {
    console.log(destinations);
    return destinations.reduce((result, destination) => {
      destination.season.forEach((season) => {
        if (!result[season]) {
          result[season] = [];
        }
        result[season].push(destination);
      });
      return result;
    }, {});
  };

  const destinationsBySeason = loading ? {} : groupDestinationsBySeason(list);

  return (
    <SafeAreaView className="flex-1 items-center dark:bg-slate-800">
      <Text className="text-2xl dark:text-white">My BucketList</Text>
      <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      >
      {loading ? (
        <Text>List is loading...</Text>
      ) : (
        Object.keys(destinationsBySeason).map((season) => (
          <View key={season}>
            <Text className="text-xl font-bold mb-2">{season}</Text>
            {destinationsBySeason[season].map((destination) => (
              <ListCard key={destination.id} destination={destination} />
            ))}
          </View>
        ))
      )}
      </ScrollView>
    </SafeAreaView>
  );
}
export default ListScreen;