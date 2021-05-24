import React, { useState } from 'react'

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const ModDisplay = ({mods, setMods}) => {
    console.log(mods)
    return (
        <ul id="ModDisplay">
            {mods.map(Display(setMods)(mods))}
        </ul>
    );
}

const Display = setMods => 
    mods => 
        x => {
            return (
            <li key={x}>
                {x}
                <IconButton onClick={() => deleteMod(setMods)(mods)(x)}>
                    <DeleteIcon />
                </IconButton>
            </li>);
        };

const deleteMod = setMods => 
    mods => 
        x => {
            const index = mods.findIndex(y => y === x);
            setMods([
                ...mods.slice(0, index),
                ...mods.slice(index + 1, mods.length)
            ])
        }

export default ModDisplay