import React from 'react'
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import {Link} from 'react-router-dom';

import { useGetCoinsQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News} from '../components';

const { Title } = Typography;
const Homepage = () => {
  const { data, isFetching } = useGetCoinsQuery(12);
  const globalStats = data?.data?.stats;

  if(isFetching) return 'Loading...';

  return (
    <>
      <Title level={2} className="heading"> Global Crypto Stats</Title>
      <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total}/></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/></Col>
        <Col span={12}><Statistic title="Global Market Cap" value={millify(globalStats.totalMarketCap)}/></Col>
        <Col span={12}><Statistic title="Total Volume (24h)" value={millify(globalStats.total24hVolume)}/></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/></Col>
        
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Coins in the world</Title>
        <Title level={3} className="home-title"><Link to="/cryptocurrencies">Show More</Link></Title>
      </div>
      <Cryptocurrencies simplified = {true} />
      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest News</Title>
        <Title level={3} className="home-title"><Link to="/news">Show More</Link></Title>
      </div>
      <News simplified />
    </>
  )
}

export default Homepage