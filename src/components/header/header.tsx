import React from 'react';
import './header.css';
import logo from '../../assets/Logo.png';
import Tabs from '../tabs/tabs';
import search from '../../assets/Search.png';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddPhoto } from '../../redux/photoSlice';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchInputData, setSearchInputData] = useState('');
  const [fetchedData, setFetchedData] = useState<any>([]);
  const [photoData, setPhotoData] = useState([] as any);
  const dispatch = useDispatch();

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "563492ad6f917000010000011c84a4f2e21644b5a7e9df7302de0e94",
    },
  };

  const [searchedData, setSearchedData] = useState(false);

  useEffect(() => {
    const url = `https://api.pexels.com/v1/search?query= ${searchInputData}&per_page=12`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setFetchedData(data);
        //    setFetchedData(data && data.photos);
        console.log(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [searchInputData]);

  useEffect(() => {
    dispatch(AddPhoto(fetchedData));
    recentSearchHandler();
    // console.log("ghfsytd",fetchedData)
  }, [fetchedData]);

  const searchData = JSON.parse(localStorage.getItem("searchInputData") || "[]");
  console.log("searchInputData ", searchData);

  // const state = useSelector((state: any) => state.photoVideos.photo) // for the data to get from header page

  // useEffect(() => {  // useEffect for the data to get from header page
  //   console.log("photos", state.photos);
  // }, [state]);

  // console.log("fetchedData.state.photos", fetchedData.state.photos);

  const arr: any[] = [];
  const recentSearchHandler = () => {
    if (JSON.stringify(fetchedData) !== "[]") {
      searchData.map((user: any, fetchedData: any) => {
        console.log(
          "fetchedData",
          (user && user.state && user.state.photos && user.state.photos.id) === (fetchedData && fetchedData.state && fetchedData.state.photos && fetchedData.state.photos.id)
        );

        if (
          (user && user.state && user.state.photos && user.state.photos.id) === (fetchedData && fetchedData.state && fetchedData.state.photos && fetchedData.state.photos.id)
        ) {
          arr.push("exists");
        }
      });

      if (arr.includes("exists")) {
        //alert("already exists");
      } else {
        if (searchInputData !== "") {
          fetchedData && searchData.push(fetchedData);
          localStorage.setItem("searchInputData", JSON.stringify(searchData));
        }// else {
        //   alert("Enter Valid cities");
        // }
      }
    } //else {
    // }
  };


  useEffect(() => {
    const searchItem = JSON.parse(localStorage.getItem("searchTerm") || "[]");
    setSearchInputData(searchItem);
  }, []);

  return (
    <div className='background'>
      <div className="maskImage">
        <div className="mask-inner">
          <div className="logo-img">
            <img src={logo} className='logo' alt="" />
          </div>
          <div className="written-content">
            <div className='w1'>Discover the world's best photos & videos</div>
            <div className='mob-w1'>Discover the world's <br /> best photos & videos</div>
            <div className='w2'>Best memories online</div>
          </div>

          <div className='searchPosition'>
            <form className='search-form' onSubmit={(event: any) => {
              event.preventDefault();
              setSearchInputData(event.target.searchInputData.value);
              localStorage.setItem("searchTerm", JSON.stringify(searchInputData));
            }}>
              <input type="text" name='searchInputData' placeholder='Search photos, videos, artists' className='search-input' />
            </form>
            <button className='searchButton'>SEARCH</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;