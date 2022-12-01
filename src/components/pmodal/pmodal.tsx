import React from 'react';
import './pmodal.css';
import Footer from '../footer/footer';

const Pmodal = (props: any) => {
  return (
    <div className='pmodal-container'>
       <div className="header">
                <div className="brownLogo">
                    <img src={require("../../assets/brownLogo.png")} alt="image" />
                </div>
                <div className='searchPosition'>
                  <form action="" className='modal-search'>
                    <input type="text" placeholder='Search photos, videos, artists' className='modal-search-input' />
                  </form>
                    <button className='search-button'>SEARCH</button>
                </div>
            </div>
            <div className="displayPhoto">
                <img src={require("../../assets/photoModal.png")} alt="image" className='modalPhoto'/>
            </div>
            <div className="foot2">
        <div className='robo-text'>© Robosoft Technologies 1996-2021</div>
      </div>
    </div>
  )
}

export default Pmodal;
