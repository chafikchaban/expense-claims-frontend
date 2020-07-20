import React, { useState, useEffect } from 'react';
import { Jumbotron, Col, } from 'reactstrap';
import { logic } from '../../kea/logic'
import { useValues } from "kea";
import BarChart from '../../components/BarChart';
import LineChart from '../../components/LineChart';
import ChartPerUser from '../../components/LineChart/ChartPerUser';
import PieChart from '../../components/PieChart/PieChart'
import YearlyPieChart from '../../components/PieChart'
import MonthPicker from '../../components/MonthPicker/MonthPicker'
import Total from '../../components/Total'


const Stats = () => {
  const { all_expenses } = useValues(logic);
  const [expenses, setExpenses] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [monthTotal, setMonthTotal] = useState(0)
  const [total, setTotal] = useState(0)


  const handleMonthChange = (newMonth) => {
    setSelectedMonth(newMonth)
  }

  const calculateTotal = () => {
    let tempTotal = 0;
    expenses.map(el => {
      tempTotal += el.amount
    })
    setTotal(tempTotal)
  }

  const calculateMonthTotal = () => {
    let tempTotal = 0;
    expenses.filter((item) => {
      const itemMonth = new Date(Date.parse(item.startDate)).getMonth();
      const targetMonth = selectedMonth.getMonth()
      const itemYear = new Date(Date.parse(item.startDate)).getFullYear();
      const targetYear = selectedMonth.getFullYear()
      return itemMonth === targetMonth && itemYear === targetYear;
    })
      .map(el => {
        tempTotal += el.amount
      })
    setMonthTotal(tempTotal)
  }

  useEffect(() => {
    setExpenses(all_expenses)
  }, [all_expenses])

  useEffect(() => {
    calculateTotal()
  }, [expenses])

  useEffect(() => {
    calculateMonthTotal()
  }, [selectedMonth, expenses])

  return (
    <Jumbotron fluid className="p-3 m-0">
      {expenses && expenses.length > 0 ?
        <>
          <Col className='display-6 row mt-5' style={{ width: '100%', justifyContent: 'space-around' }}>

            <MonthPicker
              selectedMonth={selectedMonth}
              handleMonthChange={handleMonthChange}
            />
            <div style={{ flexDirection: 'row', display: 'flex', minWidth: '40%' }} >
              <Total monthly total={monthTotal} />
              <Total total={total} />

            </div>
          </Col>
          <Col className='display-6 row mt-5'>
            <div style={{ height: 400, width: '50%' }}>
              <div style={{ height: 400, width: '100%' }}>
                <LineChart selectedMonth={selectedMonth} />
              </div>
              <h5 className='display-6 text-center'>
                Total Monthly Expenses Timeline
          </h5>
            </div>
            <div style={{ height: 400, width: '50%' }}>
              <div style={{ height: 400, width: '100%' }}>
                <ChartPerUser selectedMonth={selectedMonth} />
              </div>
              <h5 className='display-6 text-center'>
                Monthly Expenses Per Person
          </h5>
            </div>
          </Col>
          <Col className='display-6 row mt-5'>
            <div style={{ height: 400, width: '50%' }}>
              <div style={{ height: 400, width: '100%' }}>
                <YearlyPieChart />
              </div>
              <h5 className='display-6 text-center'>
                All expenses
          </h5>
            </div>
            <div style={{ height: 400, width: '50%' }}>
              <div style={{ height: 400, width: '100%' }}>
                <PieChart selectedMonth={selectedMonth} />
              </div>
              <h5 className='display-6 text-center'>
                This month
          </h5>
            </div>
          </Col>
          <Col className='display-6 row mt-5'>
            <div style={{ height: 400, width: '50%' }}>
              <div style={{ height: 400, width: '100%' }}>
                <BarChart />
              </div>
              <h5 className='display-6 text-center'>
                Total Approves
          </h5>
            </div>
          </Col>
        </> :
        <div>Please add some expenses in order to show some analytics</div>
      }

    </Jumbotron>
  );
};

export default Stats;
