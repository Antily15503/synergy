import React, { useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCoinsQuery } from '../services/cryptoApi';

const Cryptocurrencies = () => {
  const {data: cryptosList, isFetching } = useGetCoinsQuery();
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins)

  
  return (
    <>
      <Row gutter={[32,32]} className="crypto-card-container">
        {cryptos.map((currency) => (
          <Col xs={24} sm={12} lg={6} classname="crypto-card" key={currency.uuid}>
            <Link to = {`/crypto/${currency.uuid}`}>
              <Card title={`${currency.rank}. ${currency.name}`} 
                    extra={<img className="crypto-image"src={currency.iconUrl}/>}
                    hoverable
                    className="crypto-card">
                      <p>Current Price: {millify(currency.price)}</p>
                      <p>Market Cap: {millify(currency.marketCap)}</p>
                      <p>Today's Change: {millify(currency.price)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies