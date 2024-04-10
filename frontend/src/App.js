

import Login from "./components/Login";
import {AuthProvider} from "./context/Authcontext"
import PrivateRoute from "./utils/PrivateRoute"
import Signup from "./components/Signup";
import Mainheader from "./components/Mainheader";
import Home from "./components/Home";
import Profile from "./components/profile";
import Productdetails from "./components/Productdetails";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Navbar/>
      <Routes>
        <Route path="/" element={<Mainheader />}>
          <Route index element={<Home/>}/>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/Home" element={<Home/>}></Route>
        </Route>
    
      </Routes> */}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Mainheader />}>
            <Route index element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/product/:productParams" element={<Productdetails/>} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/Home" element={<Home/>}/>
            
          </Route>
          
      
        </Routes>
      </AuthProvider>
    </>
    
    
  );
}
export default App;