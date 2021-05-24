import React, {useState} from 'react'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

const ModForm = ({mods, setMods}) => {
    return (
    <div id="ModForm">
        <h2>Select your mods</h2>
        <ModInput mods={mods} setMods={setMods} />
    </div>
    );
}

const ModInput = ({mods, setMods}) => {
    const defaultValue = "search for your mod"
    const [newMod, setNewMod] = useState(
        defaultValue
    )
    const handleSubmit= (event) => {
        event.preventDefault();
        setMods([
            ...mods, 
            newMod
        ])
        setNewMod(defaultValue)
        console.log(mods)
    }

    const handleChange = (event) => {
        setNewMod(event.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            Mod: 
            <input value={newMod} onChange={handleChange}/>
            <IconButton onClick={handleSubmit}>
                <SearchIcon/>
            </IconButton>
        </form>
    );
}


export default ModForm;