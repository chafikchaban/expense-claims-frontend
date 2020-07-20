import React, { useState, useEffect, } from 'react'
import { logic } from '../../kea/logic'
import { useValues } from "kea";

import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'

const NamesPicker = ({ selectedName, onSelectName }) => {
    const { names } = useValues(logic);
    const [namesList, setNamesList] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    useEffect(() => {
        setNamesList(names)
    }, [names])

    return (
        <Dropdown  isOpen={dropdownOpen} toggle={toggle} >
            <DropdownToggle caret style={{ width: '100%' }}>
                {selectedName}
            </DropdownToggle>
            <DropdownMenu style={{ width: '100%' }}>
                {namesList.map(el => (
                    <DropdownItem key={el} onClick={() => onSelectName(el)}>{el}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}

export default NamesPicker