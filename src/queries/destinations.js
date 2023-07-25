import { getFirestore, collection, getDocs, updateDoc, arrayUnion  } from "firebase/firestore";
const db = getFirestore();

export const getAllDestinations = async () => {
  try {
    const data = collection(db, "destinations");
    const results = await getDocs(data);

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
  }
};

export const addUserDestination = async (userId, destinationId) => {
  try {
    const db = getFirestore();
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      added: arrayUnion(destinationId),
    });

    console.log("Destination added to the user's 'added' array successfully!");
  } catch (error) {
    console.error("Error adding destination to user's 'added' array:", error);
  }
};