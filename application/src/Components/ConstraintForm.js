import React, { Fragment, useState } from 'react'

//htmlCode should be substituted by a function that can generate 
//the code using the information from NUSMods. Eg. (information from NUSMogs) => html code
const dummyConstraints = [
    {id: 0, 
    type: "Fix a class", 
    htmlCode:   setTime => 
                <select onChange={handleChangeTime(setTime)}>
                    <option>9am</option>
                    <option>10am</option>
                    <option>11am</option>
                </select>}, 
    {id: 1, 
    type: "No lessons before",
    htmlCode:   setTime => 
                <select onChange={handleChangeTime(setTime)}>
                    <option>12noon</option>
                    <option>1pm</option>
                </select>},
    {id: 2, 
    type: "End as early as possible",
    htmlCode:   setTime => 
                <select>
                    <option>NIL</option>
                </select>}, 
    {id: 3, 
    type: "No lessons on", 
    htmlCode:   setTime => 
                <select onChange={handleChangeTime}>
                    <option>Monday</option>
                </select>}, 
    {id: 4, 
    type: "No lessons from __ to __", 
    htmlCode:   setTime => 
                <Fragment>
                <select>
                    <option>1am</option>
                </select>
                <select>
                    <option>2am</option>
                </select>
                </Fragment>
                }
]

const handleChangeTime = setTime => 
    (event) => {
        setTime(event.target.value)
    }

const ConstraintForm = ({displayConstraintForm, mods, constraints, setConstraints}) => {
    const [type, setType] = useState(0)
    //dunno why by default it is undefined
    const [mod, setMod] = useState(mods[0])
    //Change default for this.
    const [time, setTime] = useState("9am")
    const defaultMod = mods[0]

    if (!displayConstraintForm) {
        return (<div></div>);
    } else {
        return (
        <div>
            <h2>
                Select your constraints
            </h2>
            <form onSubmit={handleSubmit(setConstraints)(constraints)(type)(mod)(time)(defaultMod)}>
                Mod: 
                <select onChange={handleModChange(setMod)}>
                    {mods.map(ModDisplay)}
                </select>
                Constraint:
                <select onChange={handleConstraintTypeChange(setType)}>
                    {dummyConstraints.map(ConstraintDisplay)}
                </select>
                {dummyConstraints[type].htmlCode(setTime)}
                <button type="submit">
                    submit constraints
                </button>
            </form>
        </div>);
    }
}

const handleModChange = setMod => 
    event => {
        const mod = event.target.value;
        setMod(mod)
    }

const handleSubmit = setConstraints => 
    constraints => 
        type => 
        mod => 
        time => 
        defaultMod => 
        (event) => 
            {   
                console.log(mod)
                event.preventDefault();
                if (typeof mod === 'undefined') {
                    setConstraints([
                        ...constraints, 
                        {
                            type: type, 
                            mod: defaultMod, 
                            time: time
                        }
                    ])
                } else {
                    setConstraints([
                        ...constraints, 
                        {
                            type: type, 
                            mod: mod, 
                            time: time
                        }
                    ])
                }
            }

const handleConstraintTypeChange = setType =>
    (event) => {
        const type = dummyConstraints.map(x => x.type).findIndex(x => x === event.target.value)
        setType(type)
    }

const ModDisplay = mod => {
    return (
        <option key={mod}>{mod}</option>
    );
}

const ConstraintDisplay = constraint => {
    const type = constraint.type;
    return (
        <option key={constraint.id}>{type}</option>
    );
}

export default ConstraintForm