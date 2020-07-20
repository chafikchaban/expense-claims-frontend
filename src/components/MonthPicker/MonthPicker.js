import React from 'react'
import DatePicker from "react-datepicker";

const CustomDatePicker = ({ selectedMonth, handleMonthChange }) => {
    console.log(selectedMonth)
    return (
        <DatePicker
            selected={selectedMonth}
            onChange={date => handleMonthChange(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            inline
        />

    )
}

export default CustomDatePicker