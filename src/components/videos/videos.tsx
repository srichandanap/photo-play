import React from 'react';
import './videos.css';
import whiteHeart from '../../assets/icon_favourite.png';
import profileImg from '../../assets/Oval.png';
import r4 from '../../assets/Rectangle4.png';
import playButton from '../../assets/playButton.png';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import redHeart from '../../assets/redSmall.png';
import { AddVideo } from '../../redux/photoSlice';

const Videos = () => {
  const navigate = useNavigate();
  const [podal, setPModal] = useState(false);
  const [fav, setFav] = useState(false);
  const [Searched, setSearched] = useState(false);
  const [fetchedData, setFetchedData] = useState<any>([]);
  const dispatch = useDispatch();
  const [searchInputData, setSearchInputData] = useState();  //to take input data from search bar

  const state = useSelector((state: any) => state.photoVideos.video) // for the data to get from header page
  const photoVideos = useSelector((state: any) => state.photoVideos.video);

  useEffect(() => {  // useEffect for the data to get from header page
    console.log("videos", state.videos);
    // console.log("id", state);
  }, [state]);

  useEffect(() => {
    Searched && dispatch(AddVideo(fetchedData));
    // console.log("searched", setSearched);
  }, [fetchedData]);

  useEffect(() => {
    Searched && navigate("/pmodal");
  }, [photoVideos]);

  // useEffect(() => {  // useEffect for the data to get from header page
  //   console.log("photos", state.videos);
  // }, [state]);

  let previousData = JSON.parse(localStorage.getItem("fav") || "[]");

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
        // window.location.reload();
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
    <div>
      <div className='photo'>
        <div className="photos-div">
          <div className="photo-row" >
            {state && state.videos && state.videos.map((video: any, i: any) => {
              // console.log("500000", state.videos[0].url);

              const favHandler = () => {
                setSearchInputData(video.video_files[1].link);
                setSearched(true);
              };

              let fav = false
              for (let i = 0; i < previousData.length; i++) {
                console.log("asd",)
                if (previousData[i].id === video.id) {
                  fav = true
                  break
                } else {
                  fav = false
                }
              }

              const toComponentB = (video: any) => {
                navigate('/vmodal', { state: { url: video.video_files[0].link, id: video.video_files[0].id, usernmae: video.photographer, userphoto: video.user.url } });

              }
              return (
                // <>
                // {console.log(video &&  video.url && video.url)}
                <div className='photo-part' key={i} onClick={() => { favHandler(); }} >
                  <Link to="/vmodal" state={{ url: video.video_files[0].link, usernmae: video.user.name, id: video.video_files[0].id, userphoto: video.user.url }} key={video.id} className="linkButton">
                    <img src={video && video.image} width="320" height="300" className='p-img' ></img></Link>
                  {!fav ? (<div className="heart" onClick={() => { addFav(video); }} >
                    <img src={whiteHeart} className='h-img' alt="" />
                  </div>) :
                    (<div className="heart" onClick={() => { removeItem(video); }}>
                      <img src={redHeart} className='h-img' alt="" />
                    </div>)}
                  <div className="playButton"><img src={playButton} className='play-img' onClick={() => { toComponentB(video) }} alt="" /></div>
                  <div className='user-details'>
                    <div className="profile"><img src={video && video.user && video.user.url} className='profile-img' alt="" /></div>
                    <div className='profile-user-name'>{video && video.user && video.user.name}</div>
                  </div>
                </div>
                // </>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Videos;