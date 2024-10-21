import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';

// Function to create random data in format: [date, amount]
const createData = (num) => {
    const data = [];
    for (let i = 0; i < num; i++) {
        const randomNum = Math.floor(Math.random() * 1000 + 1);
        const d = new Date();
        d.setDate(d.getDate() - i * 30);
        data.push({
            date: d.toLocaleString('default', { month: 'short' }),
            amount: randomNum,
        });
    }
    return data;
};

// Create + Format data
const data = createData(12);

const BarGraph = () => {
    return (
        <div style={{ padding: '1rem 3%' }}>
            <h2 style={{ fontWeight: 300, fontSize: '24px' }}>Monthly Progress</h2>
            <ResponsiveContainer width="80%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#ffc107" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarGraph;
