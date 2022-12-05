import React from 'react';
import './home.css';
import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import Footer from '../../components/footer/footer';

const Home = () => {
  return (
    <div className='container'>
        <Header/>
        <Tabs/>
        <Footer/>
        </div>
  )
}

export default Home;