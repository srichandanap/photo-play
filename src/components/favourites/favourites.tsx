import React from 'react';
import './favourites.css';
import whiteHeart from '../../assets/icon_favourite.png';
import profileImg from '../../assets/Oval.png';
import r4 from '../../assets/Rectangle4.png';
import playButton from '../../assets/playButton.png';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import redHeart from '../../assets/redSmall.png';

const Favourites = () => {
  const navigate = useNavigate();
  const [fav, setFav] = useState(false);
  const favouriteData = JSON.parse(localStorage.getItem("fav") || "[]");
  const favouriteVideo = JSON.parse(localStorage.getItem("favVideo") || "[]");

  const removeItem = (data: any) => {
    const favourites = JSON.parse(localStorage.getItem("fav") || "[]");
    console.log("id", favourites);
    let remId = -1;
    for (let i = 0; i < favourites.length; i++) {
      if (favourites[i].id === data.id) {
        remId = i;
      }
    }
    // console.log("remId", remId);
    favourites.splice(remId, 1);
    // console.log("new remId", favourites);
    localStorage.setItem("fav", JSON.stringify(favourites));
    setFav(!fav);

  };

  const removeVideo = (data: any) => {
    const favourites = JSON.parse(localStorage.getItem("favVideo") || "[]");
    console.log("id", favourites);
    let remId = -1;
    for (let i = 0; i < favourites.length; i++) {
      if (favourites[i].id === data.id) {
        remId = i;
      }
    }
    // console.log("remId", remId);
    favourites.splice(remId, 1);
    // console.log("new remId", favourites);
    localStorage.setItem("favVideo", JSON.stringify(favourites));
    setFav(!fav);

  };

  return (
    <div>
      <div className='photo'>
        <div className="photos-div">
          <div className="photo-row" >
            {favouriteData.reverse().map((favPhoto: any, i: "1") => {
              return (<div className='photo-part' key={i}>
                <img src={favPhoto && favPhoto.src && favPhoto.src.small} className='p-img' alt="" />
                {/* <iframe src={favPhoto &&  favPhoto.video_files && favPhoto.video_files.link} className='p-img'></iframe> */}
                <div className="heart"><img src={redHeart} className='h-img' alt="" onClick={() => { removeItem(favPhoto); }} /></div>
                {/* <div className="playButton"><img src={playButton} className='play-img' alt="" /></div> */}
                <div className='user-details'>
                  <div className="profile"><img src={favPhoto && favPhoto.photographer_url} className='profile-img' alt="" /></div>
                  <div className='profile-user-name'>{favPhoto && favPhoto.photographer}</div>
                </div>
              </div>);

            }
            )}

            {favouriteVideo.reverse().map((favVideo: any, i: any) => {
              return (<div className='photo-part' key={i}>
                <img src={favVideo && favVideo.image} className='p-img' alt="" />
                {/* <iframe src={favPhoto &&  favPhoto.video_files && favPhoto.video_files.link} className='p-img'></iframe> */}
                <div className="heart"><img src={redHeart} className='h-img' alt="" onClick={() => { removeVideo(favVideo); }} /></div>
                <div className="playButton"><img src={playButton} className='play-img' alt="" /></div>
                <div className='user-details'>
                  <div className="profile"><img src={favVideo && favVideo.user.url} className='profile-img' alt="" /></div>
                  <div className='profile-user-name'>{favVideo && favVideo.user.name}</div>
                </div>
              </div>);

            })}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Favourites