import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../globals/AppContext";

export function CoinList(params) {

    const { setFilteredCoins, setMarketCoins } = useContext(AppContext);


    const getList = async () => {
        try {
            const url = "https://api.coingecko.com/v3/coins/markets?vs_currency=usd&order=market_cap_desc&page=1&sparkline=false";
            const response = await fetch(url);
            const data = await response.json();
            setMarketCoins(data)
            setFilteredCoins(data)
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getList();
    }, []);

}