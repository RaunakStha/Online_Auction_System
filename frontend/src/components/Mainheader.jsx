import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer1 from "./Footer1";


const Mainheader = () =>{
    return <div className="h-screen justify-between flex flex-col">
        <Navbar/>
        <Outlet/>
        <Footer1 />
    </div>
}

export default Mainheader;