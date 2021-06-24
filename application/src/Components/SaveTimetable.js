import React from 'react'
import TimetableLib from 'react-timetable-events'
import { Fragment } from 'react';


const SaveTimetable = ({previousTimetable}) => {
    const TimetableDisplay = (timetable, index) => {
        return (
            <span key={index}>
                <h2>Timetable {index + 1}</h2>
                <TimetableLib events={timetable}/>
            </span>
        );
    }

    return (
        <Fragment>
            {previousTimetable.map(TimetableDisplay)}
        </Fragment>
    );;
}

export default SaveTimetable;