import React, { useState, useEffect } from 'react';
import { logic } from '../../kea/logic'
import { useValues } from "kea";
import { ResponsivePie } from '@nivo/pie';

const YearlyPieChart = () => {
    const { all_expenses, isLoading, error } = useValues(logic);

    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        setExpenses(all_expenses)
    }, [all_expenses])
    let result = [];

    expenses.map(el => {
        const { amount, name } = el;
        return (
            {
                "id": name,
                "label": name,
                "value": amount,
            }
        )
    }).forEach(function (a) {
        if (!this[a.id]) {
            this[a.id] = { id: a.id, value: a.value, label: a.id };
            result.push(this[a.id]);
        } else {
            this[a.id].value += a.value;
            result.map(obj => a.id === obj.id ? this[a.id] : obj);
        }

    }, Object.create(null))

    return (
        <ResponsivePie
            data={result}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: 'spectral' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: 'color' }}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            //TODO
            fill={result.map(el => {
                const array = ['dots', 'lines', '']
                return ({
                    match: {
                        id: el.id
                    },
                    id: array[Math.floor(Math.random() * array.length)]
                })
            })
            }
            tooltip={(point) => {
                const { color, label, value } = point;
                return (
                    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 5, padding: 5 }} >
                        <p style={{ color: color, marginRight: 5 }}>{'\u2B24'}</p>
                        <div>
                            <strong >{label} </strong>
                            <br />
                            total spent: <strong >{value} €</strong>
                        </div>
                    </div>
                )
            }}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    translateY: 56,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />

    )
}
export default YearlyPieChart;