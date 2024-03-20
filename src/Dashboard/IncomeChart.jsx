import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment';
import '../Dashboard/CSS/incomechart.css';

const IncomeChart = () => {
    const [incomeData, setIncomeData] = useState([]);

    useEffect(() => {
        const fetchIncomeData = async () => {
            try {
                const incomeCollectionRef = collection(db, 'Income');
                const snapshot = await getDocs(incomeCollectionRef);

                const dataArr = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    const formattedTimestamp = moment(data.PurchaseTime.toDate()).format('MMMM');
                    const newData = {
                        PurchaseTime: formattedTimestamp,
                        coin: data.coin,
                        Title: data.title // Add title data to the chart
                    };
                    dataArr.push(newData);
                });

                setIncomeData(dataArr);
            } catch (error) {
                console.error('Error fetching income data:', error);
            }
        };

        fetchIncomeData();
    }, []);

    return (
        <div className="income-container">
            <h1>Income Data</h1>
            <div className="bar">
                <BarChart width={800} height={400} data={incomeData} title="Income Chart">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="PurchaseTime" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="coin" fill="#E46C88" name="รายได้" />
                    <Bar dataKey="Title" fill="#82ca9d" name="ชื่อเรื่อง" /> {/* Display Title in the bar */}
                </BarChart>
            </div>
        </div>
    );
};

export default IncomeChart;
