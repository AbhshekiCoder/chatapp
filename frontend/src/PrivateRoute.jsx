import React from 'react'
import { Outlet, Navigate, Route } from 'react-router-dom';
import { useProfile } from  './context/profilecontext';
 const PrivateRoute = function(){
    const profile = useProfile();
    console.log(profile)
   return profile?<Outlet/>:<Navigate to = "/Signin"/>

 }
 export default PrivateRoute;