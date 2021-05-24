import React, {useState} from 'react'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

const ModForm = ({searchTerm, setSearchTerm, setDisplaySearchResults, setDisplayConstraintForm}) => {
    return (
    <div id="ModForm">
        <ModInput 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        setDisplaySearchResults={setDisplaySearchResults}
        setDisplayConstraintForm={setDisplayConstraintForm}/>
    </div>
    );
}

const ModInput = ({searchTerm, setSearchTerm, setDisplaySearchResults, setDisplayConstraintForm}) => {
    const defaultValue = "search for your mod"
    
    const [newSearchTerm, setNewSearchTerm] = useState('')

    const handleSubmit= (event) => {
        event.preventDefault();
        setDisplaySearchResults(true);
        setDisplayConstraintForm(false);
        setSearchTerm(newSearchTerm)
    }

    const handleChange = (event) => {
        setNewSearchTerm(event.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            Mod: 
            <input onChange={handleChange}/>
            <IconButton onClick={handleSubmit}>
                <SearchIcon/>
            </IconButton>
        </form>
    );
}


export default ModForm;