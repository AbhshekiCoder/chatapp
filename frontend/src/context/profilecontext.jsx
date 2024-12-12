import React, {createContext, useContext, useEffect, useState} from 'react';
const ProfileContext = createContext();
import { auth, database } from '../misc/firebase';



export const ProfileProvider = ({children}) =>{
    const[profile, setProfile] = useState(true);
    
    useEffect(()=>{
        let user = localStorage.getItem("user");
        if(user){
            setProfile(true)
            console.log(user)
        }
        else{
            setProfile(false)
        }
       

    },[profile])



    return(
        <ProfileContext.Provider value={profile}>
        {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);

