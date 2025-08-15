import React from "react";
import {Routes,Route } from 'react-router-dom';
import Home from '../pages/home';
import AboutUs from '../pages/about';
import Contact from '../pages/contact';
import BrowseDevelopers from '../pages/browse'
import RegisterAsDeveloper from '../pages/register';
import { MyProfile } from "../pages/myProfile";
const AppRoutes=()=>{
    return(
        <div class='col-lg-8 gy-5 gx-5 '>
        <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<AboutUs/>} />
      <Route path='/register' element={<RegisterAsDeveloper/>}/>
      <Route path='/browse' element={<BrowseDevelopers/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path="/myprofile" element={<MyProfile/>}/>
     
    </Routes>
    </div>
    )
}
export default AppRoutes;