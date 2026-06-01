import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';

const Home = () => {

  const { allCoin, currency } = useContext(CoinContext);

  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (allCoin && allCoin.length > 0) {
      setDisplayCoin(allCoin);
    }
  }, [allCoin]);

  const inputHandler = (e) => {
    setInput(e.target.value);

    if (e.target.value === "") {
      setSearch("");
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    setSearch(input);
  };

  const filteredCoins = displayCoin.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='home'>

      <div className="hero">
        <h1>Largest <br />Crypto Marketplace</h1>

        <p>
          Welcome to the future of finance — explore the world of cryptocurrency.
        </p>

        <form onSubmit={searchHandler}>
          <input
            onChange={inputHandler}
            value={input}
            type="text"
            placeholder="Search Crypto....."
            list="coinlist"
            required
          />

          <datalist id="coinlist">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-table">

        {/* HEADER */}
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: 'center' }}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>

        {/* DATA ROWS */}
        {filteredCoins.slice(0, 10).map((item) => (
          <Link
            to={`/coin/${item.id}`}
            className="table-layout"
            key={item.id}
          >

            <p>{item.market_cap_rank}</p>

            <div>
              <img src={item.image} alt={item.name} />
              <p>{item.name + " - " + item.symbol?.toUpperCase()}</p>
            </div>

            <p>
              {currency.Symbol} {item.current_price?.toLocaleString()}
            </p>

            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
              {item.price_change_percentage_24h?.toFixed(2)}%
            </p>

            <p className='market-cap'>
              {currency.Symbol} {item.market_cap?.toLocaleString()}
            </p>

          </Link>
        ))}

      </div>

    </div>
  );
};

export default Home;