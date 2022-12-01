import React from 'react';
import './favourites.css';
import whiteHeart from '../../assets/icon_favourite.png';
import profileImg from '../../assets/Oval.png';
import r4 from '../../assets/Rectangle4.png';
import playButton from '../../assets/playButton.png';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Favourites = () => {
  const navigate = useNavigate();
  const favouriteData = JSON.parse(localStorage.getItem("fav") || "[]");
  return (
    <div>
      <div className='photo'>
      <div className="photos-div">
        <div className="photo-row" >
        {favouriteData.map((favPlace: any, i: any) => {
          <div className='photo-part' key={i} onClick={() => navigate('/pmodal')}>
            <img src={favPlace&& favPlace.photos[0] && favPlace.photos[0].src && favPlace.photos[0].src.tiny && favPlace.photos[0].src.tiny} className='p-img' alt="" />
          <div className="heart"><img src={whiteHeart} className='h-img' alt="" /></div>
          <div className="playButton"><img src={playButton} className='play-img' alt="" /></div>
          <div className='user-details'>
          <div className="profile"><img src={profileImg} className='profile-img' alt="" /></div>
          <div className='profile-user-name'>Ariana Barros</div>
          </div>
          </div>})}


        </div>
      </div>
    </div>
    </div>
  )
}

export default Favourites