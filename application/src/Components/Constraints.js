import React, {Fragment, useState, useEffect} from 'react'
import { Container, Row, Col, Form, FormGroup, ListGroup, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios'

//htmlCode should be substituted by a function that can generate 
//the code using the information from NUSMods. Eg. (information from NUSMogs) => html code
//defaultTime for fix a class should also be changed from being hardcoded

const standardDisplayCode = (constraint, type) => 
<span> {type} {Constraints[constraint.type].needToSpecifyMod && constraint.mod.moduleCode} {" "} 
        {constraint.time !== null && constraint.time} 
</span>

const DefaultTimeFixClass = (mod, yearSem) => {
    // const link = 'https://api.nusmods.com/v2/' + yearSem.year + "/modules/" + mod.moduleCode + ".json";
    // const [lesson, setLesson] = useState({
    //     lessonType: "hi"
    // })
    // useEffect(() => 
    //     axios
    //       .get(link)
    //       .then(response => {
    //         const SemesterData = response.data.semesterData;
    //         // console.log("semesterdata is ", SemesterData)
    //         const thisSemData = SemesterData.filter(x => x.semester === parseInt(yearSem.sem))
    //         // console.log("this sem data is ", thisSemData)
    //         // console.log("first element timetable is", thisSemData[0].timetable)
    //         // console.log("first class is ", thisSemData[0].timetable[0])
    //         setLesson(thisSemData[0].timetable[0])
    //       })
    //       , [])
    // console.log("lesson is ", lesson)
    // console.log("lessonType is ", lesson.lessonType)
    // return lesson.lessonType
    return "Choose a class"
}

const TimeOption =      
        <Fragment>
            <Dropdown.Item eventKey="0600">0600</Dropdown.Item>
                <Dropdown.Item eventKey="0700">0700</Dropdown.Item>
                        <Dropdown.Item eventKey="0800" key="0800">0800</Dropdown.Item>
                        <Dropdown.Item eventKey="0900" key="0900">0900</Dropdown.Item>
                        <Dropdown.Item eventKey="1000" key="1000">1000</Dropdown.Item>
                        <Dropdown.Item eventKey="1100" key="1100">1100</Dropdown.Item>
                        <Dropdown.Item eventKey="1200" key="1200">1200</Dropdown.Item>
                        <Dropdown.Item eventKey="1300" key="1300">1300</Dropdown.Item>
                        <Dropdown.Item eventKey="1400" key="1400">1400</Dropdown.Item>
                        <Dropdown.Item eventKey="1500" key="1500">1500</Dropdown.Item>
                        <Dropdown.Item eventKey="1600" key="1600">1600</Dropdown.Item>
                        <Dropdown.Item eventKey="1700" key="1700">1700</Dropdown.Item>
                        <Dropdown.Item eventKey="1800" key="1800">1800</Dropdown.Item>
                        <Dropdown.Item eventKey="1900" key="1900">1900</Dropdown.Item>
        </Fragment>

const DayOption = 
    <Fragment>
        <Dropdown.Item eventKey ="Monday" key="Monday">Monday</Dropdown.Item>
        <Dropdown.Item eventKey ="Tuesday" key="Tuesday">Tuesday</Dropdown.Item>
        <Dropdown.Item eventKey ="Wednesday" key="Wednesday">Wednesday</Dropdown.Item>
        <Dropdown.Item eventKey ="Thursday" key="Thursday">Thursday</Dropdown.Item>
        <Dropdown.Item eventKey ="Friday" key="Friday">Friday</Dropdown.Item>
    </Fragment>

const Constraints = [
    {id: 0, 
    type: "Fix a class: ", 
    defaultTime: "Choose a class",
    needToSpecifyMod: true,
    optionCode:   (setTime, time, mod, yearSem, setModTimetables, modTimetables) => 
            optionCodeForFixClass(setTime, time, mod, yearSem, setModTimetables, modTimetables), 
    displayCode: constraint => standardDisplayCode(constraint, "Fix a class: "), 
    checkValid: (time, currentConstraints) => {
        return {valid: time != "Choose a class", 
                message: "Choose a class",} 
        }}, 
    {id: 1, 
    type: "No lessons before",
    defaultTime: "0600",
    needToSpecifyMod: false,
    optionCode:   (setTime, time, mod, yearSem) =>
                <Dropdown>
                    <DropdownButton title={time} onSelect={handleChangeTime(setTime)}>
                        {TimeOption}
                    </DropdownButton>
                </Dropdown>, 
    displayCode: constraint => standardDisplayCode(constraint, "No lessons before"), 
    checkValid: (time, currentConstraints) => {
        return {valid: true, message: "I shouldnt be appearing"}
    }},
    {id: 2, 
    type: "No lessons on", 
    defaultTime: "Monday",
    needToSpecifyMod: false,
    optionCode:   (setTime, time, mod, yearSem) => 
                <Dropdown>
                    <DropdownButton title={time} onSelect={handleChangeTime(setTime)}>
                        {DayOption}
                    </DropdownButton>
                </Dropdown>, 
    displayCode: constraint => standardDisplayCode(constraint, "No lessons on"),
    checkValid: (time, currentConstraints) => {return {valid: true, message: "I shouldnt be appearing"}}}, 
    {id: 3, 
    type: "No lessons on __ from __ to __", 
    defaultTime: ["Monday", "0600", "0600"],
    needToSpecifyMod: false,
    optionCode:   (setTime, time, mod, yearSem) => 
                <Dropdown>
                    <div class="btn-group">
                    <DropdownButton title={time[0]} onSelect={handleStartTimeChange(setTime, time, 0)}>
                        {DayOption}
                    </DropdownButton>
                    <DropdownButton title={time[1]} onSelect={handleStartTimeChange(setTime, time, 1)}>
                        {TimeOption}
                    </DropdownButton>
                    <DropdownButton title={time[2]} onSelect={handleStartTimeChange(setTime, time, 2)}>
                        {TimeOption}
                    </DropdownButton>
                    </div>
                </Dropdown>, 
    displayCode: constraint => 
        <span>No lessons on {constraint.time[0]} from {constraint.time[1]} to {constraint.time[2]} </span>, 
    checkValid: (time, currentConstraints) => {
        return {valid: parseInt(time[1]) <= parseInt(time[2]), message: "Starting time is before ending time"}}
                },
    {id: 4, 
        type: "End as early as possible",
        defaultTime: null,
        needToSpecifyMod: false,
        optionCode:   (setTime, time, mod, yearSem) => 
                        <span></span>, 
        displayCode: constraint => standardDisplayCode(constraint, "End as early as possible"), 
        checkValid: (time, currentConstraints) => {
            return {valid: currentConstraints.findIndex(x => x.type === 4) === -1, 
                    message: "Already added!"}
        }},
    {id: 5, 
        type: "Start as late as possible", 
        defaultTime: null, 
        needToSpecifyMod: false, 
        optionCode: (setTime, time, mod, yearSem) => <span></span>, 
        displayCode: constraint => standardDisplayCode(constraint, "Start as late as possible"), 
        checkValid: (time, currentConstraints) => {
            console.log("current constraints are", currentConstraints )
            return {valid: currentConstraints.findIndex(x => x.type === 5) === -1, 
                    message: "Already added!"}
    }}
]

const handleChangeTime = setTime => 
    (input) => {   
        setTime(input)
    }

const handleStartTimeChange = (setTime, time, index) => 
    (input) => {
        setTime([
            ...time.slice(0, index), 
            input, 
            ...time.slice(index + 1, time.length)
        ])
    }


const optionCodeForFixClass = (setTime, time, mod, yearSem, setModTimetables, modTimetables) => {
    return (
        <Dropdown>
            <DropdownButton title={time} onSelect={handleChangeTime(setTime)}>
                <ClassesDisplay mod={mod} yearSem={yearSem} setModTimetables={setModTimetables} modTimetables={modTimetables}/>
            </DropdownButton>
        </Dropdown>
    );
}

const ClassesDisplay = ({mod, yearSem, setModTimetables, modTimetables}) => {
    const link = 'https://api.nusmods.com/v2/' + yearSem.year + "/modules/" + mod.moduleCode + ".json";
    const [timetable, setTimetable] = useState([])
    useEffect(() => 
        axios
          .get(link)
          .then(response => {
            const SemesterData = response.data.semesterData;
            const thisSemData = SemesterData.filter(x => x.semester === parseInt(yearSem.sem))
            setTimetable(thisSemData[0].timetable)
            setModTimetables([...modTimetables, thisSemData[0].timetable])
          })
    , [mod])
    return timetable.map(lesson => 
        <Dropdown.Item eventKey={lesson.lessonType + " " + lesson.day + " from " + lesson.startTime + " to " + lesson.endTime} 
            key={lesson.lessonType + " " + lesson.day + " from " + lesson.startTime + " to " + lesson.endTime}>
            {lesson.lessonType + " " + lesson.day + " from " + lesson.startTime + " to " + lesson.endTime}
        </Dropdown.Item>)
}



export default Constraints