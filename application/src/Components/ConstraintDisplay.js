import React, {useState} from 'react'

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import DummyConstraints from './DummyConstraints'

const ConstraintDisplay = ({constraints, setConstraints}) => {
    return (
        <ul id="ConstraintDisplay">
            <h3>Constraints are</h3>
            {constraints.map(Display(setConstraints)(constraints))}
        </ul>
    );
}

const Display = setConstraints => 
    constraints => 
        x => {
            return (
            <li>
                {x.mod} {DummyConstraints[x.type].type} {x.time} 
                <IconButton onClick={() => deleteConstraint(setConstraints)(constraints)(x)}>
                    <DeleteIcon />
                </IconButton>
            </li>);
        };

const deleteConstraint = setConstraints => 
    constraints => 
        x => {
            const index = constraints.findIndex(y => y === x);
            setConstraints([
                ...constraints.slice(0, index),
                ...constraints.slice(index + 1, constraints.length)
            ])
        }

export default ConstraintDisplay