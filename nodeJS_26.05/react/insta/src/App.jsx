import Cookies from 'universal-cookie';
import { useState } from 'react';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./Home";
import LoginPage from './login/loginPage';
import SendPhoto from './sendPhoto/sendphoto';
import EditProfile from './editProfile/editProfile';
import './index.css'
import userImage from './pictograms/user.png'
import enterImage from './pictograms/enter.png'
import moreImage from './pictograms/more.png'
import homeImage from './pictograms/home.png'
import OtherProfile from './otherUsers/otherProfile';
import NewProfilePhoto from './NewProfilePhoto';
import UpdateTags from './updateTags';

// DONE 1. Wysłanie zdjęcia/posta - wykorzystanie API - 2pkt /2pkt
// DONE 2. Prezentacja zdjęć zawartych w wybranym folderze/danego usera - wykorzystanie API - 2pkt /2pkt
// DONE 3. Prezentacja wybranego zdjęcia - wykorzystanie API - 2pkt /2pkt
// TODO 4. Otagowanie zdjęć - wykorzystanie API - 2pkt /2pkt
// TODO 5. Filtry do zdjęć - wykorzystanie API - 2pkt /2pkt
// DONE 6. Logowanie i rejestracja - wykorzystanie API - 2pkt /2pkt
// DONE 7. Edycja profilu (zdjęcie, dane) - wykorzystanie API - 2pkt /2pkt
// DONE 7.5 Wyslanie zdjecia jako profil uzytkownika
// DONE 8. layout - dopracowany, spójny, funkcjonalny

// 7 i 2 razem
// 1
// 3
// 4 i 5

const App = () => {

    const setCookies = async (data) => {
        let token = data.Authorization
        let jwt = (token.split(' '))[1]
        localStorage.setItem('JWT', jwt)
        console.log(localStorage);
        
    }

    const removeCookies = () => {
        console.log('cookies removed');
        localStorage.clear()
    }

    return (
        <>
            <Router>
                <div className='bar'>
                    <Link to="/"><img src={homeImage} alt="home" /></Link>
                    <Link to="/login"><img src={enterImage} alt="login" /></Link>
                    <Link to="/sendphoto"><img src={moreImage} alt='send photo' /></Link>
                    <Link to="/edycjaprofilu"><img src={userImage} alt="edit user" /></Link>
                </div>

                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<LoginPage setCookies={setCookies} removeCookies={removeCookies} />} />
                    <Route exact path="/edycjaprofilu" element={<EditProfile />} />
                    <Route exact path="/sendphoto" element={<SendPhoto />} />
                    <Route exact path='/otherprofile' element={<OtherProfile />}/>
                    <Route exact path='/newprofilephoto' element={<NewProfilePhoto />} />
                    <Route exact path='/updatetags' element={<UpdateTags />}/>
                </Routes>
            </Router>
        </>
    );

}

export default App;
