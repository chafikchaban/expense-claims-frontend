import React, { useState, useEffect } from 'react';
import { logic } from '../../kea/logic'
import { useValues } from "kea";
import { ResponsiveBar } from '@nivo/bar';

const BarChart = () => {
    const { all_expenses, isLoading, error } = useValues(logic);

    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        setExpenses(all_expenses)
    }, [all_expenses])
    let approvedValue = 0;
    let notApprovedValue = 0;


    expenses.map(el => {
        const { approved } = el;
        approved ? approvedValue += 1 : notApprovedValue += 1
    })

    const result = [
        {
            type: "Approved",
            expenses: approvedValue
        },
        {
            type: "Pending",
            expenses: notApprovedValue
        }
    ];

    console.log(result)

    return (
        <ResponsiveBar
            data={result}
            keys={['Approved', 'Pending', 'expenses']}
            indexBy="type"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            colors={{ scheme: 'spectral' }}
            defs={[
                {
                    id: 'Approved',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'Pending',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'Approved'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'expenses'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'number',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />

    )
}
export default BarChart;