import React from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import { useCart } from "../../../CartContext/CartContext";


const ChartAvg = () => {

    const { cartItems } = useCart();

    const data = [
        { name: "2017", productsales: 32, profit: 87, example: 60 },
        { name: "2018", productsales: 19, profit: 67, example: 75 },
        { name: "2019", productsales: 42, profit: 37, example: 40 },
    ];

    return (
        <div>
            <LineChart width={1000} height={500} data={data}>
                <CartesianGrid stroke="#434342"/>
                <XAxis dataKey={"name"}/>
                <YAxis />
                <Legend />
                <Line type={"monotone"} dataKey={"productsales"} stroke="#2196F3" strokeWidth={3}/>
                <Line type={"monotone"} dataKey={"profit"} stroke="#AA2C30" strokeWidth={3}/>
                <Line type={"monotone"} dataKey={"example"} stroke="#CEC538" strokeWidth={3}/>
            </LineChart>
        </div>
    );
}

export default ChartAvg;