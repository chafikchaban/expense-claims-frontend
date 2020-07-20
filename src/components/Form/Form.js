import React, { useState, useEffect, } from 'react'

import {
  Form as BTForm,
  FormGroup,
  Input,
  Label,
  Col,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

import NamesPicker from '../NamesPicker'
import CustomDatePicker from '../DatePicker/DatePicker'

const Form = ({ editMode, approved, name, description, amount, startDate, handleName, handleApproved, handleDescription, handleAmount, handleDateChange, handleSubmitForm }) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const renderApproved = (props) => {

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret style={{ width: '100%' }}>
          {approved.toString().charAt(0).toUpperCase() + approved.toString().slice(1)}
        </DropdownToggle>
        <DropdownMenu style={{ width: '100%' }}>
          <DropdownItem onClick={() => handleApproved(true)}>True</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => handleApproved(false)}>False</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  return (
    <BTForm style={{ margin: 10 }} onSubmit={handleSubmitForm}>
      <FormGroup className="row">
        <Label for="exampleEmail" sm={editMode ? 4 : 3}>
          Name
        </Label>
        <Col sm={editMode ? 8 : 6}>
          <NamesPicker selectedName={name} onSelectName={handleName} />
        </Col>
      </FormGroup>
      <FormGroup className="row">
        <Label for="exampleEmail" sm={editMode ? 4 : 3}>
          Description
        </Label>
        <Col sm={editMode ? 8 : 6}>
          <Input
            type="text"
            name="details"
            id="expenseDetails"
            placeholder="Expense details"
            value={description}
            onChange={handleDescription}
          />
        </Col>
      </FormGroup>
      <FormGroup className="row">
        <Label for="exampleEmail" sm={editMode ? 4 : 3}>
          Amount ( € )
      </Label>
        <Col sm={editMode ? 8 : 6}>
          <Input
            type="number"
            name="amount"
            id="expenseAmount"
            placeholder="0.00"
            value={amount}
            onChange={handleAmount}
          />
        </Col>
      </FormGroup>
      <FormGroup className="row">
        <Label for="exampleEmail" sm={editMode ? 4 : 3}>
          date
        </Label>
        <Col sm={editMode ? 8 : 6}>
          <CustomDatePicker
            startDate={startDate}
            handleDateChange={handleDateChange}
          />
        </Col>
      </FormGroup>
      {editMode ?
        <FormGroup className="row">
          <Label for="exampleEmail" sm={editMode ? 4 : 3}>
            approved
           </Label>
          <Col sm={editMode ? 8 : 6}>
            {renderApproved()}
          </Col>
        </FormGroup> :
        null}
      {!editMode ?
        <FormGroup className="row">
          <Col sm={editMode ? 12 : 9}>
          <Button type="submit" color="primary" style={{ width: '100%' }}>
            Add {'\u002b'}
          </Button>
          </Col>
         
        </FormGroup>
        :
        null}
    </BTForm>
  )
}

export default Form