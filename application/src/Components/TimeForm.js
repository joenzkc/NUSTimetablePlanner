import React from 'react-dom'

const TimeForm = ({time, setTime}) => {
    return (
        <div id="TimeForm">
            <YearForm setTime={setTime} time={time}/>
            <SemForm setTime={setTime} time={time}/>
        </div>
    );
}

const YearForm = ({setTime, time}) => {
    const handleChange = (event) => {
        setTime({
            year: event.target.value, 
            sem: time.sem
        })
    }

    return (
        <form>
            Year: 
            <select id="YearInput" onChange={handleChange}>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
            </select>
        </form>
    );
}

const SemForm = ({setTime, time}) => {
    const handleChange = (event) => {
        setTime({
            year: time.year, 
            sem: event.target.value
        })
    }
    return (
        <form>
            Sem: 
            <select id="SemInput" onChange={handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
        </form>
    );
}

export default TimeForm