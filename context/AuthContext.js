'use client'

import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext,useState,useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser,setCurrentUser] = useState(null);

    const [userDateObj,setUserDataObj ] = useState({})

    const [loading,setLoading ] = useState(true);


    /// AUTH HANDELERS ///

    function signup(email,password) {
        return createUserWithEmailAndPassword(auth,email,password)
    }

    function login (email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }
    

    function logout (){

        setUserDataObj(null)

        setCurrentUser(null)

        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,async user => {

            // set the user to local  context state // 


            try {
              setLoading(true)
              setCurrentUser(user)

              if (!user){
                console.log("No User Found")
                return
              }
              // if user exist , fetch data from firestore database //
            console.log("Fetching User Data")

              const docRef = doc(db,'users',user.uid)
              const docSnap = await getDoc(docRef);

              let firebaseData = {};

              if(docSnap.exists()){
                console.log('Found Userr Data')

                firebaseData = docSnap.data()
              }
              setUserDataObj(firebaseData)
            } catch(err) {
                console.log(err.message)
            } finally{
                setLoading(false)
            }
        })
       
        return unsubscribe
    },[])

    const value = {

        currentUser ,
        userDateObj,
        setUserDataObj,
        signup,
        logout,
        login,
        loading

    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}