
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Signin from './pages/Signin';
import { ProfileProvider } from "./context/profilecontext";







function App() {
  return (
    <ProfileProvider>
     <Routes>
  <Route element = {<PrivateRoute/>}>

  
  <Route path="/" element = {<Home/>}></Route>
 </Route>
 <Route element = {<PublicRoute/>}>
 <Route path="/Signin" element ={<Signin/>}></Route>

 </Route>
  </Routes>

    </ProfileProvider>
    
 
  );
}

export default App;
