import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import BlockIcon from '@material-ui/icons/Block';

const SearchResults = ({searchTerm, setMods, mods, displaySearchResults}) => {
    if (!displaySearchResults) {
        console.log("whether results are displayed", displaySearchResults)
        return (<div></div>);
    }

    const dummyMods = ["EC2101", "CS2040S", "CS2030S", "CS2100"]

    const filterMods = dummyMods.filter(x => x.toUpperCase().includes(searchTerm.toUpperCase()));

    return (
        <div>
            {
                filterMods.map(DisplayMod(setMods)(mods))
            }
        </div>
    );
}

const DisplayMod = setMods => 
    mods => 
        mod => {
            return (
                <li key={mod}>
                    {mod}
                    {mods.findIndex(x => x === mod) === -1 
                        ? <AddButton setMods={setMods} mods={mods} mod={mod}/>
                        : <CannotAddButton />
                    }

                </li>
            );
        }

const AddButton = ({setMods, mods, mod}) => {
    return (
        <IconButton onClick={() => addMod(setMods)(mods)(mod)}>
            <AddIcon />
        </IconButton>
    );
}

const CannotAddButton = () => {
    return (
        <IconButton>
            <BlockIcon/>
        </IconButton>
    );
}

const addMod = setMods => 
    mods => 
        mod => {
                const newMods = [...mods, mod]
                setMods(newMods)
            }



export default SearchResults