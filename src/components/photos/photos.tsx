import React from 'react';
import './photos.css';
import whiteHeart from '../../assets/icon_favourite.png';
import profileImg from '../../assets/Oval.png';
import Pmodal from '../pmodal/pmodal';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import redHeart from '../../assets/redSmall.png';
import { AddPhoto } from '../../redux/photoSlice';
import { Link } from 'react-router-dom';

const Photos = (props: any) => {
  const navigate = useNavigate();
  const [fav, setFav] = useState(false);
  const [favActive, setFavActive] = useState(false);
  const [Searched, setSearched] = useState(false);
  const [fetchedData, setFetchedData] = useState<any>([]);
  const dispatch = useDispatch();
  const [searchInputData, setSearchInputData] = useState();  //to take input data from search bar

  const state = useSelector((state: any) => state.photoVideos.photo) // for the data to get from header page
  const photoVideos = useSelector((state: any) => state.photoVideos.photo);

  useEffect(() => {
    Searched && dispatch(AddPhoto(fetchedData));
    // console.log("searched", setSearched);
  }, [fetchedData]);

  useEffect(() => {
    Searched && navigate("/");
  }, [photoVideos]);

  useEffect(() => {  // useEffect for the data to get from header page
    console.log("photos", state.photos);
  }, [state]);

  const previousData = JSON.parse(localStorage.getItem("fav") || "[]");
  // console.log("previ", previousData);

  // useEffect(() => {
  //   for (let i = 0; i <= previousData.length; i++) {
  //     for (let j = 0; j <= state.photos; j++) {
  //       if ((previousData[i].id) === (state && state.photos && state.photos.id)
  //       ) {
  //         setFav(true);
  //         break;
  //       } else {
  //         setFav(false);
  //         break;
  //       }
  //     }
  //   }

  // });

  // const navigate = useNavigate();

  const addFav = (data: any) => {
    console.log(data);
    const previousData = JSON.parse(localStorage.getItem("fav") || "[]");
    const arr: any[] = [];
    previousData.map((user: any, i: number) => {

      if ((user && user.id) === (data && data.id)) {
        arr.push("exists");
      }
    });
    if (arr.includes("exists")) {
      alert("already exists");
    }
    else {
      if (data !== "" && data.message !== "Internal Server Error") {
        previousData.push(data);
        // setFav(fav);
        localStorage.setItem("fav", JSON.stringify(previousData));
        // setFav(true);
      }
      else {
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
          {state && state.photos && state.photos.map((data: any, i: any, id: any) => {

            const favHandler = () => {
              setSearchInputData(data.src.small);
              setSearched(true);
            };

            let fav = false;
            for (let i = 0; i < previousData.length; i++) {
              if (previousData[i].id === data.id) {
                fav = true
                break
              } else {
                fav = false
              }
            }

            const toComponentB = (data: any) => {
              navigate('/pmodal', { state: { srcc: data.src.landscape, usernmae: data.photographer, alt: data.alt, userphoto: data.photographer_url } });
              // <Link to={pathname: "/pmodal", state:{data}}></Link>
            }
            // console.log("photodata", state)

            // console.log("pmodal", data.id);
            return (<div className='photo-part' key={i} onClick={() => { favHandler(); }}>
              <Link to="/pmodal" state={{ srcc: data.src.landscape, usernmae: data.photographer, alt: data.alt, userphoto: data.photographer_url }} key={data.id} className="linkButton">
                <img src={data && data.src && data.src.small} className='p-img' onClick={() => { toComponentB(data) }} alt="" /></Link>
              {!fav ? (<div className="heart" >
                <img src={whiteHeart} className='h-img' alt="" onClick={() => { addFav(data); }} />
              </div>) :
                (<div className="heart" >
                  <img src={redHeart} className='h-img' alt="" onClick={() => { removeItem(data); }} />
                </div>)
              }

              <div className='user-details'>
                <div className="profile"><img src={data && data.photographer_url} className='profile-img' alt="" /></div>
                <div className='profile-user-name'>{data && data.photographer}</div>
              </div>
            </div>)
          })}

        </div>
      </div>
    </div>
  )
}

export default Photos