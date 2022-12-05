import React from 'react';
import './tabs.css';
import { NavLink } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import Photos from '../photos/photos';
import Videos from '../videos/videos';
import Favourites from '../favourites/favourites';
import Pmodal from '../pmodal/pmodal';

const Tabs = () => {
    return (
        <div className='tab-container'>
            <div className="tabs-div">
                <div className="tabs">
                    <div className='tab'><NavLink to='/'>Photos</NavLink></div>
                    <div className='tab'><NavLink to='/video'>Videos</NavLink></div>
                </div>
                <div className='tabf'><NavLink to='/fav'>Favourites</NavLink></div>
            </div>

            <Routes>
                <Route path="/" element={<Photos />} />
                <Route path="/video" element={<Videos />} />
                <Route path="/fav" element={<Favourites />} />
            </Routes>
        </div>
    )
}

export default Tabs;