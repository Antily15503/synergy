import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams(); //gets the id from the website URL and lets us use it as a variable
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId) //calls the API that gets all the detail regarding one specific coin
  const { data: coinHistory } = useGetCryptoHistoryQuery({coinId, timePeriod}) //calls the API that gets historical values of a specific coin
  const cryptoDetails = data?.data?.coin;

  if(isFetching) return "Loading...";

  //an array of all possible times that the chart can display
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y']; 
  
  //functions that gets the stats of each cryptocurrency (depending on what the user wants)
  //each stat block has a title, value, and icon section
  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ]; 

  //functions that gets other stats about the cryptocurrency
  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name"> 
          {cryptoDetails.name} {cryptoDetails.slug} {/*Displays the name of the crypto (slug is just any alternate name for the coin)*/}
        </Title>
        {/*Inserts a brief description of bitcoin*/}
        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={4} className="coin-details-heading"> 
              What is {cryptoDetails.name}?
            </Title>
            {HTMLReactParser(cryptoDetails.description)}
          </Row>
        </Col>
        <p>
          {cryptoDetails.name} Live Price (In USD). View value statistics, market cap and bitcoin supply.
        </p>
        <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Time Period" onChange={(value) => setTimePeriod(value)}>
          {time.map((date) => {<Option key={date}>{date}</Option>})} 
        </Select>

        {/*Inserts a chart using LineChart.jsx */}
        <LineChart coinHistory = {coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />

        {/*Displays Relevant Bitcoin Information */}
        <Col className="stats-container">
          {/*Displays the "stats" portion of the coin info */}
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                {cryptoDetails.name} Value Statistics
              </Title>
              <p>
                An overview of {cryptoDetails.name}
              </p>
            </Col>
            {stats.map(({ icon, title, value}) =>( //shows the current information of the coin the user is on. 
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
          {/*Displays the "generalStats" portion of the coin info */}
          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                Extra {cryptoDetails.name} Statistics
              </Title>
            </Col>
            {genericStats.map(({ icon, title, value}) =>( //shows the current information of the coin the user is on. 
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {CryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map((link) => {  //loops through all links available to a cryptocurrency and renders them all accordingly
          <Row className="coin-link" key={link.name}>
            <Title level={5} className="link-name">
              {link.type}
            </Title>
            <a href={link.url} target="_blank" rel="norefer">{link.name}</a>
          </Row> 
          })}
      </Col>

      </Col>
    </Col>
  )
}

export default CryptoDetails