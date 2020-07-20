import React from 'react';

const Total = ({ monthly, total }) => (
    <div style={{
        backgroundColor: '#fff',
        borderRadius: '3px 3px',
        boxShadow: '0 0 5px 1px grey',
        textAlign: 'center',
        padding: '26px 0',
        width: '100%',
        margin: '0 10px',
    }}>
        <div style={{
            marginBottom: '14px'
        }}>
            {monthly ? 'THIS MONTH' : 'TOTAL SPENT'}
        </div>
        <div style={{
            fontSize: '36px',
            color: '#eb6349',
        }}>
            {total} €
        </div>
    </div>
)

export default Total;