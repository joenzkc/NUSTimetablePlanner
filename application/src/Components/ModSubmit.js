import React from 'react'

const ModSubmit = ({mods, setDisplaySearchResults, setDisplayConstraintForm}) => {
    const handleSubmit= () => {
        setDisplaySearchResults(false)
        setDisplayConstraintForm(true)
    }
    
    return (
        <button id="SubmitMod" onClick={handleSubmit}>
            Submit mods!
        </button>
    );
}


export default ModSubmit