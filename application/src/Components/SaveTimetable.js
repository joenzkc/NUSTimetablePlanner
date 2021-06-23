import React from 'react'
import Timetable_lib from 'react-timetable-events'

const SaveTimetable = ({previousTimetable}) => {
    console.log(previousTimetable.map(JSON.stringify).filter((v, i, a) => a.indexOf(v) === i).map(JSON.parse));
    return (
        previousTimetable.map((x, index) => {
            return (
            <div>
                <h3>Previous timetable {index + 1}</h3>
                <Timetable_lib events={x}/>
            </div>);
        })
    );;
}

export default SaveTimetable;