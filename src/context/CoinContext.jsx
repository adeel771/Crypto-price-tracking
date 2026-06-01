import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    Symbol: "$"
})

  const fetchAllCoin = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h`
      );

      const data = await response.json();
      setAllCoin(data);

    } catch (error) {
      console.log("API Error:", error);
    }
  };

  useEffect(() => {
   fetchAllCoin()
}, [currency])

  return (
    <CoinContext.Provider
      value={{
        allCoin,
        currency,
        setCurrency,
      }}
    >
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;