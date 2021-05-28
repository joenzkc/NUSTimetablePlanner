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
                        <Dropdown.Item eventKey="0800">0800</Dropdown.Item>
                        <Dropdown.Item eventKey="0900">0900</Dropdown.Item>
                        <Dropdown.Item eventKey="1000">1000</Dropdown.Item>
                        <Dropdown.Item eventKey="1100">1100</Dropdown.Item>
                        <Dropdown.Item eventKey="1200">1200</Dropdown.Item>
                        <Dropdown.Item eventKey="1300">1300</Dropdown.Item>
                        <Dropdown.Item eventKey="1400">1400</Dropdown.Item>
                        <Dropdown.Item eventKey="1500">1500</Dropdown.Item>
                        <Dropdown.Item eventKey="1600">1600</Dropdown.Item>
                        <Dropdown.Item eventKey="1700">1700</Dropdown.Item>
                        <Dropdown.Item eventKey="1800">1800</Dropdown.Item>
                        <Dropdown.Item eventKey="1900">1900</Dropdown.Item>
        </Fragment>
const DayOption = 
    <Fragment>
        <Dropdown.Item eventKey ="Monday">Monday</Dropdown.Item>
        <Dropdown.Item eventKey ="Tuesday">Tuesday</Dropdown.Item>
        <Dropdown.Item eventKey ="Wednesday">Wednesday</Dropdown.Item>
        <Dropdown.Item eventKey ="Thursday">Thursday</Dropdown.Item>
        <Dropdown.Item eventKey ="Friday">Friday</Dropdown.Item>
    </Fragment>

const Constraints = [
    {id: 0, 
    type: "Fix a class: ", 
    defaultTime: DefaultTimeFixClass,
    needToSpecifyMod: true,
    optionCode:   (setTime, time, mod, yearSem) => 
            optionCodeForFixClass(setTime, time, mod, yearSem), 
    displayCode: constraint => standardDisplayCode(constraint, "Fix a class: "), 
    checkValid: (time) => time != "Choose a class"}, 
    {id: 1, 
    type: "No lessons before",
    defaultTime: (mod, yearSem) => "0600",
    needToSpecifyMod: false,
    optionCode:   (setTime, time, mod, yearSem) =>
                <Dropdown>
                    <DropdownButton title={time} onSelect={handleChangeTime(setTime)}>
                        {TimeOption}
                    </DropdownButton>
                </Dropdown>, 
    displayCode: constraint => standardDisplayCode(constraint, "No lessons before"), 
    checkValid: (time) => true},
    {id: 2, 
    type: "No lessons on", 
    defaultTime: (mod, yearSem) => "Monday",
    needToSpecifyMod: false,
    optionCode:   (setTime, time, mod, yearSem) => 
                <Dropdown>
                    <DropdownButton title={time} onSelect={handleChangeTime(setTime)}>
                        {DayOption}
                    </DropdownButton>
                </Dropdown>, 
    displayCode: constraint => standardDisplayCode(constraint, "No lessons on"),
    checkValid: (time) => true}, 
    {id: 3, 
    type: "No lessons on __ from __ to __", 
    defaultTime: (mod, yearSem) => ["Monday", "0600", "0600"],
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
    checkValid: (time) => parseInt(time[1]) <= parseInt(time[2])
                },
    {id: 4, 
        type: "End as early as possible",
        defaultTime: (mod, yearSem) => null,
        needToSpecifyMod: false,
        optionCode:   (setTime, time, mod, yearSem) => 
                        <span></span>, 
        displayCode: constraint => standardDisplayCode(constraint, "End as early as possible"), 
        checkValid: (time) => true},
    {id: 5, 
        type: "Start as late as possible", 
        defaultTime: (mod, yearSem) => null, 
        needToSpecifyMod: false, 
        optionCode: (setTime, time, mod, yearSem) => <span></span>, 
        displayCode: constraint => standardDisplayCode(constraint, "Start as late as possible"), 
        checkValid: (time) => true}
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


const optionCodeForFixClass = (setTime, time, mod, yearSem) => {
    return (
        <Dropdown>
            <DropdownButton title={time} onSelect={handleChangeTime(setTime)}>
                <ClassesDisplay mod={mod} yearSem={yearSem}/>
            </DropdownButton>
        </Dropdown>
    );
}

const ClassesDisplay = ({mod, yearSem}) => {
    const link = 'https://api.nusmods.com/v2/' + yearSem.year + "/modules/" + mod.moduleCode + ".json";
    const [timetable, setTimetable] = useState([])
    useEffect(() => {
        axios
          .get(link)
          .then(response => {
            const SemesterData = response.data.semesterData;
            const thisSemData = SemesterData.filter(x => x.semester === parseInt(yearSem.sem))
            setTimetable(thisSemData[0].timetable)
          })
      }, [])
    return timetable.map(lesson => 
        <Dropdown.Item eventKey={lesson.lessonType + " " + lesson.day + " from " + lesson.startTime + " to " + lesson.endTime}>
            {lesson.lessonType + " " + lesson.day + " from " + lesson.startTime + " to " + lesson.endTime}
        </Dropdown.Item>)
}



export default Constraints