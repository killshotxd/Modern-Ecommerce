import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db } from "../Firebase";
import { Timestamp, doc, setDoc } from "firebase/firestore";
// create context
const AuthContext = createContext();

//Provider Context
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign In
  const signInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    // Add user data to the database
    const userRef = doc(db, "users", user.uid);
    const userData = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      uid: user.uid,
    };
    await setDoc(userRef, userData, { merge: true });
  };

  // Sign Out
  const logout = () => {
    signOut(auth);
  };

  const value = {
    currentUser,
    setCurrentUser,
    signInGoogle,
    logout,
  };

  //   set current User

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
