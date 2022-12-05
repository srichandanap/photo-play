import React from 'react';
import { Component } from 'react'
import './pmodal.css';
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

const Pmodal = (props: any) => {
  const [searchInputData, setSearchInputData] = useState();
  const [findHeart, setFindHeart] = useState(false);

  const location = useLocation();
  let navigate = useNavigate();
  const findFav = JSON.parse(localStorage.getItem("fav") || "[]");



  // findFav.map((user: any, i: number) => {
  //   if (location.state.id === (user && user.id)) {
  //     setFindHeart(true);
  //   }
  //   else {
  //     setFindHeart(false);
  //   }
  // })


  return (
    <div className='pmodal-container'>
      <div className='modal-iner'>
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
      </div>
      <div className="displayPhoto">
        <div className="big-image">
          <img src={location.state.srcc} alt="image" className='modalPhoto' />
        </div>

        <div className="photo-details">
          <div className="first-line">
            <div className="big-heart">
              <img src={require("../../assets/bigHeart.png")} alt="" />
              <img src={require("../../assets/bigHeart.png")} alt="" />
            </div>
            {/* {findFav.map((user: any, i: number) => {

              if (({ location.state.p_id }) === (user && user.id)) {
                <div className="big-heart">
                  <img src={require("../../assets/redBig.png")} alt="" />
                </div>
              }
              else {
                <div className="big-heart">
                  <img src={require("../../assets/bigHeart.png")} alt="" />
                </div>
              }

            } */}
            {/* )} */}
            <div className="zoom-button">
              <button className='plus'><img src={zoomplus} alt="" /></button>
              <button className='minus'><img src={zoomminus} alt="" /></button>
            </div>
            <div className="about-imag">{location.state.userphoto}</div>
          </div>
          <div className="big-user-profile">
            <div className="pro-img"><img src={oval} alt="" /></div>
            <div className="photographer-name">{location.state.usernmae}</div>
          </div>
        </div>

      </div>

      <Footer />
      {/* <div className="foot2">
        <div className='robo-text'>© Robosoft Technologies 1996-2021</div>
      </div> */}
    </div>
  )
}

export default Pmodal;
