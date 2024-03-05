

import Login from "./components/Login";
import {AuthProvider} from "./context/Authcontext"
import PrivateRoute from "./utils/PrivateRoute"
import Signup from "./components/Signup";
import Mainheader from "./components/Mainheader";
import Home from "./components/Home";
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
            <Route path="/Home" element={<Home/>}/>
          </Route>
      
        </Routes>
      </AuthProvider>
    </>
    
    
  );
}
export default App;