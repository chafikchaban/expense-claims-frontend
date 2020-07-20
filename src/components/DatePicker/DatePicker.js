import React from 'react'
import DatePicker from "react-datepicker";
import './styles.css'
const CustomDatePicker = ({ startDate, handleDateChange }) => {

    return (
        <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
        />

    )
}

export default CustomDatePicker