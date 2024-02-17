import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { Navbar, Portfolio, Homepage, Cryptocurrencies, News, CryptoDetails } from './components';
import './App.css'

const App = () => {
  return (
    <div className="app">
        <div className="navbar">
            <Navbar/>
        </div>
        <div className="main">
            <Layout>
                <div className="routes">
                    <Routes> {/* routes allows you to have multiple routes*/}
                        <Route exact path="/" element = {<Homepage/>}/>
                        <Route exact path="/portfolio" element = {<Portfolio/>}/>
                        <Route exact path="/cryptocurrencies" element = {<Cryptocurrencies/>}/>
                        <Route exact path="/crypto/:coinId" element = {<CryptoDetails/>}/> {/*:coinId means the link can be dynamic (id can be 1, 2, etc.)*/}
                        <Route exact path="/news" element = {<News/>}/>
                    </Routes>
                </div>
            </Layout>
            <div className="footer">
                <Typography.Title level={5} style={{ color: 'white', textAlign: 'center'}}>
                    Powered by Synergy <br/>
                    All right reserved.
                </Typography.Title>
                <Space>
                    <Link to="/">Home</Link>
                    <Link to="/portfolio">Portfolio Builder</Link>
                    <Link to="/news">News</Link>
                </Space>
            </div>
        </div>
    </div>
  );
}

export default App