import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Constraints from "./Constraints"
import Timetable_lib from 'react-timetable-events'
import moment from 'moment';

const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Timetable = ({constraints, actualTimet}) => {
    if (!ConstrictConflict(constraints)) {
        return <h1><Timetable_lib/></h1> //return empty timetable
    }
    const sortedConstraints = constraints.map(x => x).sort((x, y) => x.type - y.type);
    console.log("constraints are", sortedConstraints)
    const lessonType = actualTimet.map(LessonTypes)
    const noLessonTypesOriginal = lessonType.map(mod => mod.length)
    let validLessons = [...actualTimet];

    //this double loop filters out invalid classes and also checks at every filter 
    //if it still possible to proceed
    for (var i = 0; i < sortedConstraints.length; i++) {
        const currentConstraint = sortedConstraints[i];
        //validLessons = validLessons.map(Constraints[currentConstraint.type].filterMods(currentConstraint))
        console.log("before filtering", validLessons)
        validLessons = Constraints[currentConstraint.type].filterMods(currentConstraint)(validLessons)
        console.log("valid lessons are", validLessons)
        const noLessonTypesFiltered = validLessons.map(LessonTypes).map(x => x.length);
        for (var j = 0; j < noLessonTypesFiltered.length; j++) {
            const filteredNo = noLessonTypesFiltered[j];
            const originalNo = noLessonTypesOriginal[j];
            if (filteredNo !== originalNo) {
                window.alert("Not possible. Consider removing " +
                    Constraints[currentConstraint.type].displayCode(currentConstraint, false))
                return <Timetable_lib />
            }
        }
    }

    let Timetable = new Array(5).fill(0).map(() => new Array(28).fill(null)); // a 5 x 28 array for each weekday and from 7am to 9pm
    const confirmedLessons = GeneratePossible(Timetable, validLessons, lessonType, [])
    if (confirmedLessons === null) {
        window.alert("Not possible to generate timetable due to clashes")
        return <Timetable_lib />
    }
    return TimetableGenerator(confirmedLessons);
}

const TimetableGenerator = (confirmedLessons) => {
    let events = {
        monday: [], 
        tuesday: [], 
        wednesday: [], 
        thursday: [], 
        friday: []
    }
    let currentId = 1
    for (let i = 0; i < confirmedLessons.length; i++) {
        const currentLesson = confirmedLessons[i];
        const newEvent = {
            id: currentId, 
            name: currentLesson.moduleCode + " " + 
                currentLesson.lesson.classNo + " " + currentLesson.lesson.lessonType + 
                " " + currentLesson.lesson.venue,
            type: currentLesson.lesson.lessonType, 
            startTime: moment(currentLesson.lesson.startTime.substring(0, 2) + ":" + 
                currentLesson.lesson.startTime.substring(2, 4), 'HH:mm'), 
            endTime: moment(currentLesson.lesson.endTime.substring(0, 2) + ":" + 
                currentLesson.lesson.endTime.substring(2, 4), 'HH:mm')
        }
        switch (Days.findIndex(x => x === currentLesson.lesson.day)) {
            case 0: 
                events = {
                    ...events, monday: [...events.monday, newEvent]
                }
            break; 
            case 1: 
                events = {
                    ...events, tuesday: [...events.tuesday, newEvent]
                }
            break;
            case 2: 
                events = {
                    ...events, wednesday: [...events.wednesday, newEvent]
                }
            break;
            case 3: 
                events = {
                    ...events, thursday: [...events.thursday, newEvent]
                }
            break;
            case 4: 
                events = {
                    ...events, friday: [...events.friday, newEvent]
                }
        }
    }
    return <Timetable_lib events={events} />
}

//this function generates a possible timetable
function GeneratePossible(Timetable, validLessons, lessonType, confirmedLesson) {
    //When all lessonTypes are done and lesson type is an empty arr
    if (lessonType.map(x => x.length).reduce((x, y) => x + y, 0) === 0) {
        return confirmedLesson;
    }

    //when there are no valid lessons left
    if (validLessons.map(x => x.length).reduce((x, y) => x + y, 0) === 0) {
        return null;
    }
    const firstIndex = lessonType.map(x => x.length).findIndex(x => x !== 0);
    const firstMod = validLessons[firstIndex]; //this is the first mod in which there is still unconfirmed lesson types
    const firstLessonTypes = lessonType[firstIndex];
    const firstLessonT = firstLessonTypes[0];
    const lessonsOfMod = firstMod.lessons;
    const lessonOfThatType = lessonsOfMod.filter(x => x.lessonType === firstLessonT);
    const classNoOfThatType = lessonOfThatType.map(x => x.classNo).filter((item, i, ar) => ar.indexOf(item) === i);
    let store = [];
    for (let i = 0; i < classNoOfThatType.length; i++) {
        const copyTimetable = JSON.parse(JSON.stringify(Timetable))
        const classNo = classNoOfThatType[i];
        const classOfClassNo = lessonOfThatType.filter(x => x.classNo === classNo);
        if (!(classOfClassNo.reduce((x, y) => AddClass(y, copyTimetable, firstMod.moduleCode) && x, true))) {
            continue;
        };

        const removeConfirmed = firstMod.lessons.filter(x => x.classNo !== classNo);

        const copyLessonType = JSON.parse(JSON.stringify(lessonType))
        const copyFirstLessonTypes = firstLessonTypes.map(x => x);
        const removeLessonT = copyFirstLessonTypes.filter(x => x !== firstLessonT);
        copyLessonType.splice(firstIndex, 1, removeLessonT);

        let firstSlice = validLessons.slice(0, firstIndex)
        let secondSlice = validLessons.slice(firstIndex + 1, validLessons.length)
        for (let k = 0; k < classOfClassNo.length; k++) {
            const dummyConstraint = {
                id: null,
                type: 3,
                time: [classOfClassNo[k].day, classOfClassNo[k].startTime, classOfClassNo[k].endTime]
            }
            firstSlice = Constraints[3].filterMods(dummyConstraint)(firstSlice)
            secondSlice = Constraints[3].filterMods(dummyConstraint)(secondSlice)
        }
        const newValidLesson = [...firstSlice, {
            moduleCode: firstMod.moduleCode, 
            lessons: removeConfirmed
        }
            , ...secondSlice]

        store = [...store, {
            timetable: copyTimetable, 
            validLessons: newValidLesson, 
            lessonType: removeLessonT
        }]

        const copyConfirmedLesson = JSON.parse(JSON.stringify(confirmedLesson))
        const allLessonsToPush = firstMod.lessons.filter(x => x.classNo === classNo);
        for (let i = 0; i < allLessonsToPush.length; i++) {
            copyConfirmedLesson.push({moduleCode: firstMod.moduleCode, lesson: allLessonsToPush[i]})
        }
        const Possible = GeneratePossible(copyTimetable, newValidLesson, 
            copyLessonType, copyConfirmedLesson);
        if (Possible !== null) {
            return Possible;
        }
    }
    return null;
}

//This function adds classes of which it is the only valid class of its lessontype in its mod
// const SetConfirmed = (Timetable, validLesson, lessonType) => {
//     let newValidLesson = [...validLesson]
//     for (let i = 0; i < validLesson.length; i++) {
//         const currentLessons = validLesson[i].lessons;
//         const modLessonType = lessonType[i];
//         for (let j = 0; j < modLessonType.length; j++) {
//             const currentLessonType = modLessonType[j];
//             const lessonOfThatType = currentLessons.filter(lesson => lesson.lessonType === currentLessonType)
//             const uniqueLessonNo = lessonOfThatType.map(x => x.classNo).filter((item, i, ar) => ar.indexOf(item) === i)
//             if (uniqueLessonNo.length === 1) {
//                 if (!(lessonOfThatType.reduce((x, y) => AddClass(y, Timetable, validLesson[i].moduleCode) && x, true))) {
//                     window.alert("Not possible due to clashes");
//                     return null;
//                 };
//                 const newLessonT =  modLessonType.filter(x => x !== currentLessonType)
//                 lessonType.splice(i, 1, 
//                    newLessonT)
//                 const removeConfirmed = 
//                     currentLessons.filter(lesson => uniqueLessonNo.findIndex(each => each === lesson.classNo) === -1)
//                 let firstSlice = validLesson.slice(0, i)
//                 let secondSlice = validLesson.slice(i + 1, validLesson.length)
                
//                 for (let k = 0; k < lessonOfThatType.length; k++) {
//                     const dummyConstraint = {
//                         id: null,
//                         type: 3,
//                         time: [lessonOfThatType[k].day, lessonOfThatType[k].startTime, lessonOfThatType[k].endTime]
//                     }
//                     firstSlice = firstSlice.map(Constraints[3].filterMods(dummyConstraint))
//                     secondSlice = secondSlice.map(Constraints[3].filterMods(dummyConstraint))
//                 }
//                 newValidLesson = [...firstSlice, {
//                     moduleCode: validLesson[i].moduleCode, 
//                     lessons: removeConfirmed
//                 }
//                     , ...secondSlice]
//             }
//         }
//     }
//     return newValidLesson;
// }


//This function is to generate a array of lesson types for this mod
const LessonTypes = mod => mod.lessons.
    map(lesson => lesson.lessonType).filter((item, i, ar) => ar.indexOf(item) === i)


//this function is to add the lesson into the timetable if there is space
//return true if there is space else return false
const AddClass = (Lesson, Timetable, moduleCode) => {
    const arrIndex = TimetableIndex(Lesson);
    const newTimetable = [...Timetable];
    const row = Timetable[arrIndex[0]];
    for (let i = arrIndex[1]; i <= arrIndex[2]; i++) {
        if (row[i] === null) {
            newTimetable[arrIndex[0]][i] = {
                moduleCode: moduleCode, 
                lesson: Lesson
            } 
        } else {
            return false;
        }
    }
    Timetable = [...newTimetable]
    return true;
}    

//This function is to generate the index of where this lesson should be in the timetable
const TimetableIndex = (Lesson) => {
    const dayIndex = Days.findIndex(eachDay => eachDay === Lesson.day);
    const sTimeHr = Math.floor((parseInt(Lesson.startTime) - 700) / 100) * 2;
    const sTimeMin = Math.floor((parseInt(Lesson.startTime) % 100) / 30);
    const eTimeHr = Math.floor((parseInt(Lesson.endTime) - 700) / 100) * 2;
    const eTimeMin = Math.ceil((parseInt(Lesson.endTime) % 100) / 30);
    return [dayIndex, sTimeHr + sTimeMin, eTimeHr + eTimeMin - 1];
}

//Checks if there are direct conflicts between constraints eg. Fix a class on Monday and No lessons on Monday
const ConstrictConflict = (constraints) => {
    //Check for conflict between FixClass and No lessons on 
    const FixClassConstraints = constraints.filter(constraint => constraint.type === 0);
    const NoLessonsOnDay = constraints.filter(constraint => constraint.type === 2);
    const NoLessonsBefore = constraints.filter(constraint => constraint.type === 1);
    const NoLessonsFrom = constraints.filter(constraint => constraint.type === 3);
    for (let i = 0; i < FixClassConstraints.length; i++) {
        const CurrentFixClassConstraints = FixClassConstraints[i];
        const startTime = parseInt(CurrentFixClassConstraints.time.split(" ")[4]);
        const endTime = parseInt(CurrentFixClassConstraints.time.split(' ')[6]);
        const day = CurrentFixClassConstraints.time.split(' ')[2];
        for (let j = i + 1; j < FixClassConstraints.length; j++) {
            const otherFixClass = FixClassConstraints[j];
            const otherSTime = parseInt(otherFixClass.time.split(" ")[4]);
            const otherETime = parseInt(otherFixClass.time.split(' ')[6]);
            const otherDay = otherFixClass.time.split(' ')[2];
            if (otherDay === day && ((otherSTime < endTime && otherSTime >= startTime) || (otherETime <= endTime && otherETime > startTime))) {
                Alert(otherFixClass, CurrentFixClassConstraints);
                return false;
            } else {continue;}
        }
        for (let j = 0; j < NoLessonsOnDay.length; j++) {
            if (NoLessonsOnDay[j].time === day) {
                Alert(NoLessonsOnDay[j], CurrentFixClassConstraints);
                return false;
            } else {continue;}
        }
        for (let j = 0; j < NoLessonsBefore.length; j++) {
            const time = parseInt(NoLessonsBefore[j].time)
            if (time > startTime) {
                Alert(NoLessonsBefore[j], CurrentFixClassConstraints);
                return false;
            } else { continue;}
        }
        for (let j = 0; j < NoLessonsFrom.length; j++) {
            const cDay = NoLessonsFrom[j].time[0]
            const sTime = parseInt(NoLessonsFrom[j].time[1])
            const eTime = parseInt(NoLessonsFrom[j].time[2])
            if (cDay === day && ((startTime >= sTime && startTime <= eTime) || (endTime >= sTime && endTime <= eTime))) {
                Alert(NoLessonsFrom[j], CurrentFixClassConstraints);
                return false;
            } else {
                continue;   
            }
        }
    }

    //checks if there is conflict between maximise online class and offline classes
    const type6 = constraints.findIndex(x => x.type === 6);
    const type7 = constraints.findIndex(x => x.type === 7)
    if (type6 !== -1 &&  type7 !== -1) {
        Alert(constraints[type6], constraints[type7]);;
        return false;
    }
    return true;
}

//To alert users if there is a direct conflict between constraints
const Alert = (constraint1, constraint2) => {
    const displayCode1 = Constraints[constraint1.type].displayCode(constraint1, false);
    window.alert("Clash between " + displayCode1 +
        " and " + Constraints[constraint2.type].displayCode(constraint2, false));
}

const Times = [...Array(2100).keys()].slice(1).
    filter(x => x >= 700 && (x % 100 === 0 || x % 100 === 30))

// const TimetableGenerator = (lessons) => {
//     return (
//     <table>
//         <tr>
//             <th></th>
//             {Times.map(x => <th>{x}</th>)}
//         </tr>
//         {lessons.map((day, index) => {
//             return (
//                 <tr>
//                     <th>{Days[index]}</th>
//                     {day.map(lesson => {
//                         if (lesson === null) {
//                             return (<th></th>)
//                         } else {
//                             return (<th> {lesson.moduleCode} {lesson.lesson.classNo} {lesson.lesson.venue} </th>)
//                         }
//                         }
//                     )}
//                 </tr>);
//         }
//             )}  
//     </table>
//     );
// }



const BubbleSort = (array, compareFunction) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (compareFunction(array[i], array[j]) > 0) {
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }
}

export default Timetable