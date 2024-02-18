import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCoinsQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 12 : 128;
  const {data: cryptosList, isFetching } = useGetCoinsQuery(count);
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase())); //filter out only the searched coin in the array of all possible coins
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]) //gets executed whenever one of these two values changes

  if(isFetching) return "Loading...";
  
  return (
    <>
      {!simplified && ( //if no simplified then render this
      <div className="search-crypto">
        <Input placeHolder="Search for a specific cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>
      )}    

      <Row gutter={[32,32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
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