import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Alert } from 'reactstrap';
import { useValues, useActions } from "kea";
import Form from '../../components/Form/Form';
import List from '../../components/List/List';
import ModalEdit from '../../components/ModalEdit/ModalEdit'
import { logic } from '../../kea/logic'


const HomePage = () => {
  const { all_expenses } = useValues(logic);
  const { addExpenseRequest, updateExpenseRequest, removeExpenseRequest } = useActions(logic);

  const [name, setName] = useState('Name')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [startDate, setstartDate] = useState(new Date())
  const [modal, setModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null)

  const toggle = () => {
    setModal(!modal)
  };
  const handleName = value => {
    console.log('Name ', value)
    setName(value)
  }
  const handleDescription = event => {
    setDescription(event.target.value)
  }

  const handleAmount = event => {
    console.log('Amount ', event.target.value)
    setAmount(event.target.value)
  }

  const handleDateChange = (date) => {
    setstartDate(date)
  }

  const handleEdit = id => {
    setSelectedExpense(
      all_expenses.find(item => item._id === id)
    )
    toggle()
  }

  const onConfirmEdit = editedExpense => {
    updateExpenseRequest(editedExpense)
    toggle()
  }

  const onCancelEdit = editedExpense => {
    console.log(editedExpense)
    toggle()
  }

  const handleDelete = id => {
    console.log("delete expense")
    removeExpenseRequest(id)
  }
  const handleSubmitForm = event => {
    event.preventDefault()
    //check whether the name is not empty and the amount is not negative
    if (name !== 'Name' && amount > 0) {
      // single expense object
      const dateString = startDate.toDateString()
      const expense = { name, amount, description, startDate: dateString, approved: false }
      addExpenseRequest(expense)
      // clean input fields
      setName('')
      setAmount('')
      setDescription('')
      setstartDate(new Date())
    } else {
      alert('Name and Amount are required !')
      console.log('Invalid expense name or the amount')
    }
  }




  return (
    <Jumbotron fluid className="p-3 m-0">
      <h3 className='display-6 mb-5'>
        Add an expense
      </h3>
      <Form
        name={name}
        description={description}
        amount={amount}
        startDate={startDate}
        handleName={handleName}
        handleDescription={handleDescription}
        handleAmount={handleAmount}
        handleDateChange={handleDateChange}
        handleSubmitForm={handleSubmitForm}
      />
      {selectedExpense && <ModalEdit
        isOpen={modal}
        expense={selectedExpense}
        toggle={toggle}
        onConfirm={onConfirmEdit}
        onCancel={onCancelEdit}
      />}
      <h3 className='display-6 mb-5 mt-5'>
        Expenses List {all_expenses.length === 0 ? '( empty )' : `( ${all_expenses.length} )` }
      </h3>
      <List
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Jumbotron>
  );
};

export default HomePage;
