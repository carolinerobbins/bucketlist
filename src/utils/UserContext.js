import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Create a user context
export const UserContext = createContext();

// Create a user provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  const getUser = async (userId) => {
    try {
      const db = getFirestore();
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      return userDoc.data();
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUser(user.uid);
        setUser(userData);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {children}
    </UserContext.Provider>
  );
};


