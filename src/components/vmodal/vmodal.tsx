import React from 'react';
import { Component } from 'react'
import './vmodal.css';
import Footer from '../footer/footer';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AddPhoto } from '../../redux/photoSlice';
import bigHeart from '../../assets/bigHeart.png';
import oval from '../../assets/Oval.png';
import zoomplus from '../../assets/zoomPlus.png';
import zoomminus from '../../assets/zoomMinus.png';
import { useLocation } from 'react-router-dom';
import redHeart from '../../assets/redSmall.png';
import whiteHeart from '../../assets/icon_favourite.png';
import { AddVideo } from '../../redux/photoSlice';



const Vmodal = (props: any) => {
    const [searchInputData, setSearchInputData] = useState();  //to take input data from search bar
    const [fav, setFav] = useState(false);
    const [Searched, setSearched] = useState(false);
    const [fetchedData, setFetchedData] = useState<any>([]);
    const dispatch = useDispatch();
    const photoVideos = useSelector((state: any) => state.photoVideos.video);

    const location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        Searched && dispatch(AddVideo(fetchedData));
        // console.log("searched", setSearched);
    }, [fetchedData]);

    useEffect(() => {
        Searched && navigate("/pmodal");
    }, [photoVideos]);

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
        <div className='pmodal-container'>
            <div className="header">
                <div className="brownLogo">
                    <img src={require("../../assets/brownLogo.png")} alt="image" />
                </div>
                <div className='searchPosition'>
                    <form action="" className='modal-search' onSubmit={(event: any) => {
                        event.preventDefault();
                        setSearchInputData(event.target.searchInputData.value);
                        localStorage.setItem("searchTerm", JSON.stringify(searchInputData));
                    }}>
                        <input type="text" name='searchInputData' placeholder='Search photos, videos, artists' className='modal-search-input' />
                        <button className='search-button'>SEARCH</button>
                    </form>
                </div>
            </div>
            <div className="displayPhoto">
                <div className="big-image">


                    <video className='modalvideo' controls><source src={location.state.url} type="video/mp4" /></video>
                </div>

                <div className="photo-details">
                    <div className="first-line">
                        {!fav ? (<div className="heart">
                            <img src={whiteHeart} className='h-img' alt="" />
                        </div>) :
                            (<div className="heart">
                                <img src={redHeart} className='h-img' alt="" />
                            </div>)}
                        {/* <div className="zoom-button">
            <button className='plus'><img src={zoomplus} alt="" /></button>
            <button className='minus'><img src={zoomminus} alt="" /></button>
            </div> */}
                        {/* <div className="about-imag">{location.state.alt}</div> */}
                    </div>
                    <div className="big-user-profile">
                        <div className="pro-img"><img src={location.state.userphoto} alt="" /></div>
                        <div className="photographer-name">{location.state.usernmae}</div>
                    </div>
                </div>

            </div>
            <div className="foot2">
                <div className='robo-text'>© Robosoft Technologies 1996-2021</div>
            </div>
        </div>
    )
}

export default Vmodal;