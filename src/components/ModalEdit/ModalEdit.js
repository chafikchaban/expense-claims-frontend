import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Form from '../Form/Form';

const ModalExample = ({ isOpen, expense, toggle, onConfirm, onCancel }) => {
    console.log(expense)

    const [name, setName] = useState(expense.name)
    const [description, setDescription] = useState(expense.description)
    const [amount, setAmount] = useState(expense.amount)
    const [startDate, setstartDate] = useState(new Date().toDateString())
    const [approved, setApproved] = useState(expense.approved)

    const handleName = event => {
        console.log('Name ', event.target.value)
        setName(event.target.value)
    }

    const handleDescription = event => {
        setDescription(event.target.value)
    }

    const handleAmount = event => {
        setAmount(event.target.value)
    }

    const handleDateChange = (date) => {
        setstartDate(date)
    }
    const handleApproved = value => {
        setApproved(value)
    }

    const handleSubmitForm = event => {
        event.preventDefault()
        //check whether the name is not empty and the amount is not negative
        if (name !== '' && amount > 0) {
            const dateString = startDate.toDateString()
            const editedExpense = { _id: expense._id, name, amount, description, startDate: dateString, approved }

            onConfirm(editedExpense)
            // clean input fields
            setName('')
            setAmount('')
            setDescription('')
            setstartDate(new Date())
        } else {
            console.log('Invalid expense name or the amount')
        }
    }

    const renderForm = () =>
        <Form
            name={name}
            description={description}
            amount={amount}
            startDate={startDate}
            approved={approved}
            handleName={handleName}
            handleDescription={handleDescription}
            handleAmount={handleAmount}
            handleDateChange={handleDateChange}
            handleSubmitForm={handleSubmitForm}
            handleApproved={handleApproved}
            editMode={true}
        />

    useEffect(() => {
        setName(expense.name)
        setDescription(expense.description)
        setAmount(expense.amount)
        setstartDate(new Date(Date.parse(expense.startDate)))
        setApproved(expense.approved)

    }, [expense])
    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle} >
                <ModalHeader toggle={toggle}>Update Expense</ModalHeader>
                <ModalBody>
                    {renderForm()}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmitForm}>Submit</Button>{' '}
                    <Button color="secondary" onClick={onCancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalExample;