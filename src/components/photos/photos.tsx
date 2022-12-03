import React from 'react';
import './photos.css';
import r4 from '../../assets/Rectangle4.png';
import r5 from '../../assets/Rectangle5.png';
import r6 from '../../assets/Rectangle6.png';
import whiteHeart from '../../assets/icon_favourite.png';
import profileImg from '../../assets/Oval.png';
import Pmodal from '../pmodal/pmodal';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import redHeart from '../../assets/redSmall.png';

const Photos = () => {
  const navigate = useNavigate();
  const [podal, setPModal] = useState(false);
  const [newFav, setNewFav] = useState(false);
  const [fav, setFav] = useState(false);
  const [favActive, setFavActive] = useState(false);

  const state = useSelector((state: any) => state.photoVideos.photo) // for the data to get from header page
  let previousData: any = [];
  useEffect(() => {  // useEffect for the data to get from header page
    console.log("photos", state);
    // console.log("id", state);
    previousData = JSON.parse(localStorage.getItem("fav") || "[]");
  }, [state]);


  console.log("previ", typeof previousData)

  useEffect(() => {

  }, [state]);

  // useEffect(()=>{
  //   const previousData = JSON.parse(localStorage.getItem("fav") || "[]");
  // })

  // const addFav = (data: any) => {
  //   console.log(data);


  // }


  const addFav = (data: any) => {
    console.log(data);
    const arr: any[] = [];

    previousData.map((user: any, i: number) => {
      if ((user && user.id) === (data && data.id)) {
        // setFav(true);
        arr.push("exists");
      }
    });
    if (arr.includes("exists")) {
      alert("already exists");
    } else {
      if (data !== "" && data.message !== "Internal Server Error") {
        previousData.push(data);

        localStorage.setItem("fav", JSON.stringify(previousData));
        previousData = JSON.parse(localStorage.getItem("fav") || "[]");
        // setFav(true);
        // setFavActive(!favActive);
      } else {
        alert("Enter correct Data");
      }
    }
  };

  const removeItem = (data: any) => {
    const favourites = JSON.parse(localStorage.getItem("fav") || "[]");
    console.log("id", favourites);
    let remId = -1;
    for (let i = 0; i < favourites.length; i++) {
      if (favourites[i].id === data.id) {
        remId = i;
      }
    }
    console.log("remId", remId);
    favourites.splice(remId, 1);
    console.log("new remId", favourites);
    localStorage.setItem("fav", JSON.stringify(favourites));
    setFav(!fav);
    // window.location.reload();
  };


  return (
    <div className='photo'>
      <div className="photos-div">
        <div className="photo-row">
          {state && state.photos && state.photos.map((data: any) => {

            let fav = false
            // setNewFav(fav);
            for (let i = 0; i < previousData.length; i++) {

              if (previousData[i].id === data.id) {
                fav = true
                break
              } else {
                fav = false
              }
            }


            return (<div className='photo-part'>
              <img src={data && data.src && data.src.small} onClick={() => navigate('/pmodal')} className='p-img' alt="" />
              {!fav ? (<div className="heart" onClick={() => { addFav(data); }} >
                <img src={whiteHeart} className='h-img' alt="" />
              </div>) :
                (<div className="heart">
                  <img src={redHeart} className='h-img' alt="" onClick={() => { removeItem(data); }} />
                </div>)}

              {/* <div className='user-details'>
          <div className="profile"><img src={state && state.photos && state.photos[0].photographer_url} className='profile-img' alt="" /></div>
          <div className='profile-user-name'>{state && state.photos && state.photos[0].photographer}</div>
          </div> */}
            </div>)
          })}

        </div>
      </div>
    </div>
  )
}

export default Photos