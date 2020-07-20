import React, { useState, useEffect } from 'react';
import { logic } from '../../kea/logic'
import { useValues } from "kea";
import { ResponsiveLine } from '@nivo/line';

const ChartPerUser = ({ selectedMonth }) => {
    const { all_expenses, isLoading, error } = useValues(logic);

    const [expenses, setExpenses] = useState([])
    const [monthFilter, setMonthFilter] = useState(selectedMonth)

    useEffect(() => {
        setExpenses(all_expenses)
        setMonthFilter(selectedMonth)
    }, [all_expenses, selectedMonth])
    let finalData = [];

    const names = ["Chafik", "John", "Selena", "Patrick", "Yasmine"];

    names.map(tagetName => {
        let result = [];

        const filteredByName = expenses.filter(el => el.name === tagetName)
        const data = filteredByName.filter((item) => {
            const itemMonth = new Date(Date.parse(item.startDate)).getMonth();
            const targetMonth = monthFilter.getMonth()
            const itemYear = new Date(Date.parse(item.startDate)).getFullYear();
            const targetYear = monthFilter.getFullYear()
            return itemMonth === targetMonth && itemYear === targetYear;
        }).map(el => {
            const date = new Date(Date.parse(el.startDate))
            return (
                {
                    x: date,
                    y: el.amount
                }
            )
        }).sort(function (a, b) {
            var dateA = a.x, dateB = b.x;
            return dateA - dateB;
        }).map(el => (
            {
                x: `${el.x.getFullYear()}-${el.x.getMonth() + 1}-${el.x.getDate()}`, // 'YYYY-MM-DD'
                y: el.y
            }))
        data.forEach(function (a) {
            if (!this[a.x]) {
                this[a.x] = { x: a.x, y: a.y };
                result.push(this[a.x]);
            } else {
                this[a.x].y += a.y;
                result.push(this[a.x]);
            }

        }, Object.create(null))

        let tempObj = {
            "id": tagetName,
            data: result
        }
        finalData.push(tempObj)
    })

    return (
        <ResponsiveLine
            data={finalData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{
                type: "time",
                format: "%Y-%m-%d"
            }}
            xFormat="time:%Y-%m-%d"
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                legendPosition: 'middle',
                format: "%b %d",
                legend: "Dates",
                legendOffset: 36
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 1,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Amount',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            tooltip={({ point }) => {
                const { serieId, data: { xFormatted, yFormatted }, serieColor } = point;
                return (
                    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 5, padding: 5 }} >
                        <p style={{ color: serieColor, marginRight: 5 }}>{'\u2B24'}</p>
                        <div>
                            {serieId}{'\n'}
                            <br />
                                date:<strong >{xFormatted} </strong>{'\n'}
                            <br />
                            total spent: <strong >{yFormatted} €</strong>
                        </div>
                    </div>
                )
            }}
            colors={{ scheme: 'spectral' }}
            pointSize={3}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    )
}
export default ChartPerUser;