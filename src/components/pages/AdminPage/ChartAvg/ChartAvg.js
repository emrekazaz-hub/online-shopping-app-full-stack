import React, { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import { useCart } from "../../../CartContext/CartContext";


const ChartAvg = () => {

    const { purchasedProducts } = useCart();
    const [date, setDates] = useState("");
    

    /*
        const data = dates.map((date, index) => ({
        name: date,
        productsales: purchasedProducts[index] ? purchasedProducts[index].productsales : 0,
        profit: purchasedProducts[index] ? purchasedProducts[index].profit : 0,
        example: purchasedProducts[index] ? purchasedProducts[index].example : 0
    }));

    */

    const calculateAvgProfit = () => {
        let toplamSatilanUrunSayisi = 110;
        let toplamSatilanUrunFiyati = 5;
    }

    const data = [
        { purchaseDate: date[0], productsales: 32, profit: 87, category: 60 },
        { purchaseDate: date[2], productsales: 19, profit: 67, category: 75 },
        { purchaseDate: "2019", productsales: 42, profit: 37, category: 40 },
    ];

    useEffect(() => {
        const formattedDates = purchasedProducts.map(purchasedProduct => purchasedProduct.purchased_date.substring(0, 4));
        setDates(formattedDates);
    }, [purchasedProducts]);

    return (
        <div>
            <LineChart width={1000} height={500} data={data}>
                <CartesianGrid stroke="#434342" />
                <XAxis dataKey={"purchaseDate"} />
                <YAxis />
                <Legend />
                <Line type={"monotone"} dataKey={"productsales"} stroke="#2196F3" strokeWidth={3} />
                <Line type={"monotone"} dataKey={"profit"} stroke="#AA2C30" strokeWidth={3} />
                <Line type={"monotone"} dataKey={"category"} stroke="#CEC538" strokeWidth={3} />
            </LineChart>
        </div>
    );
}

export default ChartAvg;