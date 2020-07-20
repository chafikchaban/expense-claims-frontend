import React, { useState, useEffect } from 'react'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import { logic } from '../../kea/logic'
import { useValues } from "kea";

const List = ({ handleEdit, handleDelete }) => {
    const { all_expenses, isLoading, error } = useValues(logic);

    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        setExpenses(all_expenses)
    }, [all_expenses])
    return (
        <div>
            <ListGroup>
                {expenses.map(item => (
                    <ListGroupItem
                        key={item._id}
                        className='list-item m-1'
                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        {item.startDate} / {item.description} - {item.amount} €  / {item.name}
                        <div className='row' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            {item.approved ? <p style={{ color: '#8ed1a4', margin: 0 }}>(approved)</p> : <p style={{ color: '#eb6349', margin: 0 }}>(not approved)</p>}
                            <Button type="submit" style={{ color: 'grey' }} color="link" onClick={() => handleEdit(item._id)}>
                                Edit {'\u270E'}
                            </Button>
                            <Button type="submit" color="link" style={{ color: '#eb6349' }} onClick={() => handleDelete(item._id)}>
                                Delete {'\u274c'}
                            </Button>
                        </div>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    )
}

export default List