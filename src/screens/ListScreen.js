import React, {useState, useEffect} from 'react'
import { ScrollView, Text, View, SafeAreaView, Switch } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import ListCard from '../features/ListCard';
import {getNonStop} from '../apis/flights';
import SelectDropdown from 'react-native-select-dropdown'

const ListScreen = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nonstop, setNonstop] = useState([]);
  const [nonstopOnly, setNonstopOnly] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedTripLength, setSelectedTripLength] = useState('');

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
    // getNonStop('SFO')
    //   .then((data) => {
    //     setNonstop(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  }, []);

  useEffect(() => {
    getAdded('NStFWjztTjbeSivO95euaNBlrdO2')
      .then((destinationsData) => {
        console.log(nonstop);
        const updatedList = destinationsData.map((destination) => ({
          ...destination,
          nonstop: nonstop.includes(destination.iata),
        }));
        setList(updatedList);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [nonstop]);

  const filteredDestinations = list.filter((destination) => {
    // Nonstop Filter
    if (nonstopOnly && !destination.nonstop) {
      return false;
    }

    // Season Filter
    if (selectedSeason && !destination.season.includes(selectedSeason)) {
      return false;
    }

    // Trip Length Filter
    // if (selectedTripLength && destination.tripLength !== selectedTripLength) {
    //   return false;
    // }
    return true;
  });

  return (
    <SafeAreaView className="flex-1 items-center dark:bg-slate-800">
      <Text className="text-3xl font-bold first-line:mb-2 dark:text-slate-50">My BucketList</Text>
      <View className="flex-row mb-2 items-center">
        <Text className="mr-1 text-lg  dark:text-slate-50">Nonstop Flights Only:</Text>
        <Switch value={nonstopOnly} onValueChange={(value) => setNonstopOnly(value)}/>
      </View>

      <Text className="text-lg  dark:text-slate-50"> Filter to narrow down your list: </Text>
      <View className="flex-row items-center">
        <SelectDropdown
        buttonStyle={{flex: 1,
          height: 30,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#444',
          margin: 5}}
         dropdownTextStyle={{ fontSize: 10 }}
         onBlur={false}
        data={['Spring','Summer','Fall','Winter']}
        onSelect={(selectedItem, index) => {
          setSelectedSeason(selectedItem);
        }}
        defaultButtonText={'Season'}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
      <SelectDropdown
      buttonStyle={{flex: 1,
        height: 30,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
        margin: 5}}
         dropdownTextStyle={{ fontSize: 10 }}
        data={['Weekend','Week','Two Weeks']}
        onSelect={(selectedItem, index) => {
          setSelectedTripLength(selectedItem);
        }}
        defaultButtonText={'Trip Length'}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
      </View>

      <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      >
      {loading ? (
        <Text>List is loading...</Text>
      ) : (
        filteredDestinations.map((destination) => (
              <ListCard key={destination.id} destination={destination}/>
            )
        ))
      }
      </ScrollView>
    </SafeAreaView>
  );
}
export default ListScreen;