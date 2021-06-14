import React, { Fragment, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  ListGroup,
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import { FormControl, InputLabel, NativeSelect } from "@material-ui/core";

//maybe condense the filter mods code now got a lot of repeats
const standardDisplayCode = (constraint, type, needSpan) => {
  if (needSpan) {
    return (
      <span>
        {" "}
        {type}{" "}
        {Constraints[constraint.type].needToSpecifyMod &&
          constraint.mod.moduleCode}{" "}
        {constraint.time !== null && constraint.time}
      </span>
    );
  } else {
    return Constraints[constraint.type].needToSpecifyMod
      ? constraint.time !== null
        ? type + constraint.mod.moduleCode + " " + constraint.time
        : type + constraint.mod.moduleCode
      : constraint.time !== null
      ? type + " " + constraint.time
      : type;
  }
};

const TimeOption = (
  <Fragment>
    {/* <Dropdown.Item eventKey="0600">0600</Dropdown.Item>
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
                        <Dropdown.Item eventKey="0600">0600</Dropdown.Item> */}
    {/* <Dropdown.Item eventKey="0700">0700</Dropdown.Item> */}
    <option value="0800">0800</option>
    <option value="0900">0900</option>
    <option value="1000">1000</option>
    <option value="1100">1100</option>
    <option value="1200">1200</option>
    <option value="1300">1300</option>
    <option value="1400">1400</option>
    <option value="1500">1500</option>
    <option value="1600">1600</option>
    <option value="1700">1700</option>
    <option value="1800">1800</option>
    <option value="1900">1900</option>
  </Fragment>
);

const DayOption = (
  <Fragment>
    {/* <Dropdown.Item eventKey ="Monday" key="Monday">Monday</Dropdown.Item>
        <Dropdown.Item eventKey ="Tuesday" key="Tuesday">Tuesday</Dropdown.Item>
        <Dropdown.Item eventKey ="Wednesday" key="Wednesday">Wednesday</Dropdown.Item>
        <Dropdown.Item eventKey ="Thursday" key="Thursday">Thursday</Dropdown.Item>
        <Dropdown.Item eventKey ="Friday" key="Friday">Friday</Dropdown.Item> */}
    <option value="Monday">Monday</option>
    <option value="Tuesday">Tuesday</option>
    <option value="Wednesday">Wednesday</option>
    <option value="Thursday">Thursday</option>
    <option value="Friday">Friday</option>
  </Fragment>
);

const BubbleSort = (array, compareFunction) => {
  const copy = JSON.parse(JSON.stringify(array));
  for (let i = 0; i < copy.length; i++) {
    for (let j = 0; j < copy.length - i - 1; j++) {
      if (compareFunction(copy[j], copy[j + 1]) > 0) {
        const temp = copy[j];
        copy[j] = copy[j + 1];
        copy[j + 1] = temp;
      }
    }
  }
  return copy;
};

//Filters mods if users decides to fix a class
const filterClassesForFixClass = (constraint) => (mod) => {
  const modCode = constraint.mod.moduleCode;
  if (mod.moduleCode !== modCode) {
    return mod;
  }
  const classTiming = constraint.time;
  const lessonNumber = classTiming.split(" ")[0];
  const lessonType = classTiming.split(" ")[1];
  const promiseLessons = mod.lessons.filter(
    (lesson) =>
      lesson.classNo === lessonNumber || lesson.lessonType !== lessonType
  );
  return {
    moduleCode: modCode,
    lessons: promiseLessons,
  };
};

//Filters mods if users decides to have no lessons before a certain time
const filterClassesForNoLessonsBefore = (constraint) => (mod) => {
  const time = parseInt(constraint.time);
  const rejectLessons = mod.lessons
    .filter((lesson) => parseInt(lesson.startTime) < time)
    .map((lesson) => lesson.classNo);
  const promiseLessons = mod.lessons.filter(
    (lesson) => rejectLessons.findIndex((x) => x === lesson.classNo) === -1
  );
  return {
    moduleCode: mod.moduleCode,
    lessons: promiseLessons,
  };
};

//Filters mods if users decides to have no lessons on certain day
const filterClassesForNoLessonsOn = (constraint) => (mod) => {
  const day = constraint.time;
  const rejectLessons = mod.lessons
    .filter((lesson) => lesson.day === day)
    .map((x) => x.classNo);
  const promiseLessons = mod.lessons.filter(
    (lesson) => rejectLessons.findIndex((x) => x === lesson.classNo) === -1
  );
  return {
    moduleCode: mod.moduleCode,
    lessons: promiseLessons,
  };
};

//Filters mods if users decides to have no lessons on certain day and on certain time
const filterClassesForNoLessonsFromTo = (constraint) => (mod) => {
  const time = constraint.time;
  const day = time[0];
  const startTime = parseInt(time[1]);
  const endTime = parseInt(time[2]);
  const rejectLessons = mod.lessons
    .filter(
      (lesson) =>
        lesson.day === day &&
        ((lesson.endTime <= endTime && lesson.endTime > startTime) ||
          (lesson.startTime < endTime && lesson.startTime >= startTime))
    )
    .map((x) => x.classNo);
  const promiseLessons = mod.lessons.filter(
    (lesson) => rejectLessons.findIndex((x) => x === lesson.classNo) === -1
  );
  return {
    moduleCode: mod.moduleCode,
    lessons: promiseLessons,
  };
};

const Constraints = [
  {
    id: 0,
    type: "Fix a class: ",
    defaultTime: "Choose a class",
    needToSpecifyMod: true,
    optionCode: (setTime, time, actualTimet) =>
      optionCodeForFixClass(setTime, time, actualTimet),
    displayCode: (constraint, needSpan) =>
      standardDisplayCode(constraint, "Fix a class: ", needSpan),
    checkValid: (time, currentConstraints) => {
      return { valid: time != "Choose a class", message: "Choose a class" };
    },
    filterMods: (constraint) => (mods) =>
      mods.map(filterClassesForFixClass(constraint)),
  },
  {
    id: 1,
    type: "No lessons before",
    defaultTime: "0600",
    needToSpecifyMod: false,
    optionCode: (setTime, time, actualTimet) => (
      // <Dropdown>
      //     <DropdownButton title={time} onSelect={handleChangeTime(setTime)}>
      //         {TimeOption}
      //     </DropdownButton>
      // </Dropdown>,
      <FormControl>
        <InputLabel>{time}</InputLabel>
        <NativeSelect onChange={handleChangeTime(setTime)}>
          {TimeOption}
        </NativeSelect>
      </FormControl>
    ),
    displayCode: (constraint, needSpan) =>
      standardDisplayCode(constraint, "No lessons before", needSpan),
    checkValid: (time, currentConstraints) => {
      return { valid: true, message: "I shouldnt be appearing" };
    },
    filterMods: (constraint) => (mods) =>
      mods.map(filterClassesForNoLessonsBefore(constraint)),
  },
  {
    id: 2,
    type: "No lessons on",
    defaultTime: "Monday",
    needToSpecifyMod: false,
    optionCode: (setTime, time, actualTimet) => (
      // <Dropdown>
      //     <DropdownButton title={time} onSelect={handleChangeTime(setTime)}>
      //         {DayOption}
      //     </DropdownButton>
      // </Dropdown>,
      <FormControl>
        <InputLabel>{time}</InputLabel>
        <NativeSelect onChange={handleChangeTime(setTime)}>
          {DayOption}
        </NativeSelect>
      </FormControl>
    ),
    displayCode: (constraint, needSpan) =>
      standardDisplayCode(constraint, "No lessons on", needSpan),
    checkValid: (time, currentConstraints) => {
      return { valid: true, message: "I shouldnt be appearing" };
    },
    filterMods: (constraint) => (mods) =>
      mods.map(filterClassesForNoLessonsOn(constraint)),
  },
  {
    id: 3,
    type: "No lessons on __ from __ to __",
    defaultTime: ["Monday", "0600", "0600"],
    needToSpecifyMod: false,
    optionCode: (setTime, time, actualTimet) => (
      // <Dropdown>
      //     <div className="btn-group">
      //     <DropdownButton title={time[0]} onSelect={handleStartTimeChange(setTime, time, 0)}>
      //         {DayOption}
      //     </DropdownButton>
      //     <DropdownButton title={time[1]} onSelect={handleStartTimeChange(setTime, time, 1)}>
      //         {TimeOption}
      //     </DropdownButton>
      //     <DropdownButton title={time[2]} onSelect={handleStartTimeChange(setTime, time, 2)}>
      //         {TimeOption}
      //     </DropdownButton>
      //     </div>
      // </Dropdown>,
      <div>
        <FormControl>
          <InputLabel>{time[0]}</InputLabel>
          <NativeSelect
            native
            onChange={handleStartTimeChange(setTime, time, 0)}
          >
            {DayOption}
          </NativeSelect>
        </FormControl>
        <FormControl>
          <InputLabel>title={time[1]}</InputLabel>
          <NativeSelect
            native
            onChange={handleStartTimeChange(setTime, time, 1)}
          >
            {TimeOption}
          </NativeSelect>
        </FormControl>
        <FormControl>
          <InputLabel>{time[2]}</InputLabel>
          <NativeSelect
            native
            onChange={handleStartTimeChange(setTime, time, 2)}
          >
            {TimeOption}
          </NativeSelect>
        </FormControl>
      </div>
    ),
    displayCode: (constraint, needSpan) => {
      if (needSpan) {
        return (
          <span>
            No lessons on {constraint.time[0]} from {constraint.time[1]} to{" "}
            {constraint.time[2]}{" "}
          </span>
        );
      } else {
        return (
          "No lessons on " +
          constraint.time[0] +
          " from " +
          constraint.time[1] +
          " to " +
          constraint.time[2]
        );
      }
    },
    checkValid: (time, currentConstraints) => {
      return {
        valid: parseInt(time[1]) <= parseInt(time[2]),
        message: "Starting time is before ending time",
      };
    },
    filterMods: (constraint) => (mods) =>
      mods.map(filterClassesForNoLessonsFromTo(constraint)),
  },
  {
    id: 4,
    type: "End as early as possible",
    defaultTime: null,
    needToSpecifyMod: false,
    optionCode: (setTime, time, actualTimet) => <span></span>,
    displayCode: (constraint, needSpan) =>
      standardDisplayCode(constraint, "End as early as possible", needSpan),
    checkValid: (time, currentConstraints) => {
      return {
        valid: currentConstraints.findIndex((x) => x.type === 4) === -1,
        message: "Already added!",
      };
    },
    filterMods: (constraint) => (mods) =>
      mods.map((x) => {
        return {
          moduleCode: x.moduleCode,
          lessons: BubbleSort(
            x.lessons,
            (z, y) => parseInt(z.endTime) - parseInt(y.endTime)
          ),
        };
      }),
  },
  {
    id: 5,
    type: "Start as late as possible",
    defaultTime: null,
    needToSpecifyMod: false,
    optionCode: (setTime, time, actualTimet) => <span></span>,
    displayCode: (constraint, needSpan) =>
      standardDisplayCode(constraint, "Start as late as possible", needSpan),
    checkValid: (time, currentConstraints) => {
      return {
        valid: currentConstraints.findIndex((x) => x.type === 5) === -1,
        message: "Already added!",
      };
    },
    filterMods: (constraint) => (mods) =>
      mods.map((x) => {
        return {
          moduleCode: x.moduleCode,
          lessons: BubbleSort(
            x.lessons,
            (z, y) => parseInt(y.startTime) - parseInt(z.startTime)
          ),
        };
      }),
  },
  {
    id: 6,
    type: "Maximise online classes",
    defaultTime: null,
    needToSpecifyMod: false,
    optionCode: (setTime, time, actualTimet) => <span></span>,
    displayCode: (constraint, needSpan) =>
      standardDisplayCode(constraint, "Maximise online classes", needSpan),
    checkValid: (time, currentConstraints) => {
      return {
        valid: currentConstraints.findIndex((x) => x.type === 6) === -1,
        message: "Already added!",
      };
    },
    filterMods: (constraint) => (mods) =>
      mods.map((mod) => {
        return {
          moduleCode: mod.moduleCode,
          lessons: BubbleSort(mod.lessons, (x, y) => {
            if (x.venue === "E-Learn_C" && y.venue === "E-Learn_C") {
              return 0;
            } else if (x.venue === "E-Learn_C") {
              return -1;
            } else {
              return 1;
            }
          }),
        };
      }),
  },
  {
    id: 7,
    type: "Maximise offline classes",
    defaultTime: null,
    needToSpecifyMod: false,
    optionCode: (setTime, time, actualTimet) => <span></span>,
    displayCode: (constraint, needSpan) =>
      standardDisplayCode(constraint, "Maximise offline classes", needSpan),
    checkValid: (time, currentConstraints) => {
      return {
        valid: currentConstraints.findIndex((x) => x.type === 7) === -1,
        message: "Already added!",
      };
    },
    filterMods: (constraint) => (mods) =>
      mods.map((mod) => {
        return {
          moduleCode: mod.moduleCode,
          lessons: BubbleSort(mod.lessons, (x, y) => {
            if (x.venue === "E-Learn_C" && y.venue === "E-Learn_C") {
              return 0;
            } else if (x.venue === "E-Learn_C") {
              return 1;
            } else {
              return -1;
            }
          }),
        };
      }),
  },
];

const handleChangeTime = (setTime) => (event) => {
  setTime(event.target.value);
};

const handleStartTimeChange = (setTime, time, index) => (input) => {
  setTime([
    ...time.slice(0, index),
    input,
    ...time.slice(index + 1, time.length),
  ]);
};

const optionCodeForFixClass = (setTime, time, actualTimet) => {
  return (
    // <Dropdown>
    //     <DropdownButton title={time} onSelect={handleChangeTime(setTime)}>
    //         <ClassesDisplay actualTimet={actualTimet}/>
    //     </DropdownButton>
    // </Dropdown>
    <FormControl>
      <InputLabel>{time}</InputLabel>
      <NativeSelect onChange={handleChangeTime(setTime)}>
        <ClassesDisplay actualTimet={actualTimet} />
      </NativeSelect>
    </FormControl>
  );
};

const ClassesDisplay = ({ actualTimet }) => {
  const classString = (lesson) =>
    lesson.classNo +
    " " +
    lesson.lessonType +
    " " +
    lesson.day +
    " from " +
    lesson.startTime +
    " to " +
    lesson.endTime;
  const copy = { ...actualTimet }.lessons.sort((x, y) =>
    x.classNo.localeCompare(y.classNo)
  );
  return copy.map((lesson) => (
    <option value={classString(lesson)}>{classString(lesson)}</option>
  ));
};

export default Constraints;
