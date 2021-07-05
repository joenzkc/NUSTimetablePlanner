import React, { useState } from "react";

import Constraints from "./Constraints";
import TimetableLib from "react-timetable-events";
import moment from "moment";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import IconButton from "@material-ui/core/IconButton";
import {
  Switch,
  FormGroup,
  FormControlLabel,
  Button,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  Tooltip,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
// import Switch from "react-switch";
// import { Button } from "@material-ui/core";

const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// const theme = createMuiTheme()

// theme.

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const Timetable = ({
  constraints,
  actualTimet,
  setActualTimet,
  previousTimetable,
  setPreviousTimetable,
  displayPrevious,
  setDisplayPrevious,
  yearSem,
}) => {
  console.log("actual time t is", actualTimet);
  console.log("constraints are", constraints);
  const [state, setState] = useState({
    lecture: true,
    labs: true,
    tutorial: true,
    others: true,
  });

  const [shownBefore, setShownBefore] = useState(false);

  if (!ConstrictConflict(constraints)) {
    return TimetableMaker(
      null,
      state,
      setState,
      actualTimet,
      setActualTimet,
      previousTimetable,
      setPreviousTimetable,
      displayPrevious,
      setDisplayPrevious,
      yearSem
    ); //return empty timetable
  }
  const sortedConstraints = constraints
    .map((x) => x)
    .sort((x, y) => x.type - y.type);
  const lessonType = actualTimet.map(LessonTypes);
  const noLessonTypesOriginal = lessonType.map((mod) => mod.length);
  let validLessons = [...actualTimet];

  //this double loop filters out invalid classes and also checks at every filter
  //if it still possible to proceed
  for (var i = 0; i < sortedConstraints.length; i++) {
    const currentConstraint = sortedConstraints[i];
    validLessons =
      Constraints[currentConstraint.type].filterMods(currentConstraint)(
        validLessons
      );
    console.log(
      "valid lessons are",
      validLessons,
      "constraint is",
      currentConstraint
    );
    const noLessonTypesFiltered = validLessons
      .map(LessonTypes)
      .map((x) => x.length);
    for (var j = 0; j < noLessonTypesFiltered.length; j++) {
      const filteredNo = noLessonTypesFiltered[j];
      const originalNo = noLessonTypesOriginal[j];
      if (filteredNo !== originalNo) {
        window.alert(
          "Not possible. Consider removing " +
            Constraints[currentConstraint.type].displayCode(
              currentConstraint,
              false
            )
        );
        return TimetableMaker(
          null,
          state,
          setState,
          actualTimet,
          setActualTimet,
          previousTimetable,
          setPreviousTimetable,
          displayPrevious,
          setDisplayPrevious,
          [],
          yearSem
        );
      }
    }
  }

  let Timetable = new Array(5).fill(0).map(() => new Array(28).fill(null)); // a 5 x 28 array for each weekday and from 7am to 9pm
  const confirmedLessons = GeneratePossible(
    Timetable,
    validLessons,
    lessonType,
    [],
    previousTimetable
  );
  if (confirmedLessons === null) {
    if (previousTimetable.length === 0) {
      window.alert("Not possible to generate timetable due to clashes");
      return TimetableMaker(
        null,
        state,
        setState,
        actualTimet,
        setActualTimet,
        previousTimetable,
        setPreviousTimetable,
        displayPrevious,
        setDisplayPrevious,
        [],
        yearSem
      );
    }
    if (!shownBefore) {
      window.alert("All possible combinations are shown");
      setShownBefore(true);
    }
    return TimetableMaker(
      previousTimetable[previousTimetable.length - 1],
      state,
      setState,
      actualTimet,
      setActualTimet,
      previousTimetable,
      setPreviousTimetable,
      displayPrevious,
      setDisplayPrevious,
      [],
      yearSem
    );
  }

  const events = EventGenerator(confirmedLessons);

  return TimetableMaker(
    events,
    state,
    setState,
    actualTimet,
    setActualTimet,
    previousTimetable,
    setPreviousTimetable,
    displayPrevious,
    setDisplayPrevious,
    confirmedLessons,
    yearSem
  );
};

const TimetableMaker = (
  events,
  state,
  setState,
  actualTimet,
  setActualTimet,
  previousTimetable,
  setPreviousTimetable,
  displayPrevious,
  setDisplayPrevious,
  confirmedLessons,
  yearSem
) => {
  if (events === null) {
    return (
      <div style={{ marginTop: "7px", marginBottom: "7px" }}>
        {/* <Card> */}
        <div className="timetable control">
          <Grid
            container
            spacing={2}
            direction="row"
            alignItems="center"
            justify="center"
          >
            <Grid
              item
              xs={2}
              container
              direction="row"
              spacing={2}
              alignItems="center"
              alignContent="center"
              justify="center"
            >
              <Grid item xs={9}>
                <Typography
                  variant="button"
                  style={{ fontSize: "20px", fontWeight: "bolder" }}
                >
                  Filters
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography variant="subtitle">
                        {" "}
                        Filters are for you to easily view only the specific
                        classes you wish to view.
                      </Typography>
                      <br />
                      <br />
                      <Typography variant="subtitle">
                        Generate another allows you to generate another version
                        of the timetable. See the help page for more details.
                      </Typography>
                      <br />
                      <br />
                      <Typography variant="subtitle">
                        Export to NUSMods allows you to view this timetable on
                        NUSMods.
                      </Typography>
                    </React.Fragment>
                  }
                >
                  <IconButton>
                    <HelpOutlineIcon />
                  </IconButton>
                </HtmlTooltip>
              </Grid>
              <Grid item xs={12}>
                <ViewSwitches state={state} setState={setState} />

                <ViewPreviousButton
                  displayPrevious={displayPrevious}
                  setDisplayPrevious={setDisplayPrevious}
                />
              </Grid>
              <Grid item xs={12}>
                <GenerateAnotherButton
                  actualTimet={actualTimet}
                  setActualTimet={setActualTimet}
                  events={events}
                  previousTimetable={previousTimetable}
                  setPreviousTimetable={setPreviousTimetable}
                />
              </Grid>
              <Grid item xs={12}>
                <DisplayLessons lessons={confirmedLessons} />
              </Grid>
              <Grid item xs={12}>
                <NUSModsExportButton
                  lessons={confirmedLessons}
                  yearSem={yearSem}
                />
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <TimetableLib
                events={{
                  monday: [],
                  tuesday: [],
                  wednesday: [],
                  thursday: [],
                  friday: [],
                }}
              />
            </Grid>
          </Grid>
        </div>
        {/* </Card> */}
      </div>
    );
  }
  let filterEvents = {
    monday: events.monday,
    tuesday: events.tuesday,
    wednesday: events.wednesday,
    thursday: events.thursday,
    friday: events.friday,
  };
  if (!state.lecture) {
    const filteredMon = filterEvents.monday.filter((x) => x.type !== "Lecture");

    const filteredTue = filterEvents.tuesday.filter(
      (x) => x.type !== "Lecture"
    );
    const filteredWed = filterEvents.wednesday.filter(
      (x) => x.type !== "Lecture"
    );
    const filteredThu = filterEvents.thursday.filter(
      (x) => x.type !== "Lecture"
    );
    const filteredFri = filterEvents.friday.filter((x) => x.type !== "Lecture");
    filterEvents = {
      monday: filteredMon,
      tuesday: filteredTue,
      wednesday: filteredWed,
      thursday: filteredThu,
      friday: filteredFri,
    };
  }

  if (!state.tutorial) {
    const filteredMon = filterEvents.monday.filter(
      (x) => x.type !== "Tutorial"
    );
    const filteredTue = filterEvents.tuesday.filter(
      (x) => x.type !== "Tutorial"
    );
    const filteredWed = filterEvents.wednesday.filter(
      (x) => x.type !== "Tutorial"
    );
    const filteredThu = filterEvents.thursday.filter(
      (x) => x.type !== "Tutorial"
    );
    const filteredFri = filterEvents.friday.filter(
      (x) => x.type !== "Tutorial"
    );
    filterEvents = {
      monday: filteredMon,
      tuesday: filteredTue,
      wednesday: filteredWed,
      thursday: filteredThu,
      friday: filteredFri,
    };
  }

  if (!state.labs) {
    const filteredMon = filterEvents.monday.filter(
      (x) => x.type !== "Laboratory"
    );
    const filteredTue = filterEvents.tuesday.filter(
      (x) => x.type !== "Laboratory"
    );
    const filteredWed = filterEvents.wednesday.filter(
      (x) => x.type !== "Laboratory"
    );
    const filteredThu = filterEvents.thursday.filter(
      (x) => x.type !== "Laboratory"
    );
    const filteredFri = filterEvents.friday.filter(
      (x) => x.type !== "Laboratory"
    );
    filterEvents = {
      monday: filteredMon,
      tuesday: filteredTue,
      wednesday: filteredWed,
      thursday: filteredThu,
      friday: filteredFri,
    };
  }

  if (!state.others) {
    const filteredMon = filterEvents.monday.filter(
      (x) =>
        x.type === "Lecture" || x.type === "Tutorial" || x.type === "Laboratory"
    );
    const filteredTue = filterEvents.tuesday.filter(
      (x) =>
        x.type === "Lecture" || x.type === "Tutorial" || x.type === "Laboratory"
    );
    const filteredWed = filterEvents.wednesday.filter(
      (x) =>
        x.type === "Lecture" || x.type === "Tutorial" || x.type === "Laboratory"
    );
    const filteredThu = filterEvents.thursday.filter(
      (x) =>
        x.type === "Lecture" || x.type === "Tutorial" || x.type === "Laboratory"
    );
    const filteredFri = filterEvents.friday.filter(
      (x) =>
        x.type === "Lecture" || x.type === "Tutorial" || x.type === "Laboratory"
    );
    filterEvents = {
      monday: filteredMon,
      tuesday: filteredTue,
      wednesday: filteredWed,
      thursday: filteredThu,
      friday: filteredFri,
    };
  }

  return (
    <div style={{ marginTop: "7px", marginBottom: "7px" }}>
      {/* <Card> */}
      <div className="timetable control">
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid
            item
            xs={2}
            container
            direction="row"
            spacing={2}
            alignItems="center"
            alignContent="center"
            justify="center"
          >
            <Grid item xs={9}>
              <Typography
                variant="button"
                style={{ fontSize: "20px", fontWeight: "bolder" }}
              >
                Filters
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography variant="subtitle">
                      {" "}
                      Filters are for you to easily view only the specific
                      classes you wish to view.
                    </Typography>
                    <br />
                    <br />
                    <Typography variant="subtitle">
                      Generate another allows you to generate another version of
                      the timetable. See the help page for more details.
                    </Typography>
                    <br />
                    <br />
                    <Typography variant="subtitle">
                      Export to NUSMods allows you to view this timetable on
                      NUSMods.
                    </Typography>
                  </React.Fragment>
                }
              >
                <IconButton>
                  <HelpOutlineIcon />
                </IconButton>
              </HtmlTooltip>
            </Grid>
            <Grid item xs={12}>
              <ViewSwitches state={state} setState={setState} />

              <ViewPreviousButton
                displayPrevious={displayPrevious}
                setDisplayPrevious={setDisplayPrevious}
              />
            </Grid>
            <Grid item xs={12}>
              <GenerateAnotherButton
                actualTimet={actualTimet}
                setActualTimet={setActualTimet}
                events={events}
                previousTimetable={previousTimetable}
                setPreviousTimetable={setPreviousTimetable}
              />
            </Grid>
            <Grid item xs={12}>
              <DisplayLessons lessons={confirmedLessons} />
            </Grid>
            <Grid item xs={12}>
              <NUSModsExportButton
                lessons={confirmedLessons}
                yearSem={yearSem}
              />
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <TimetableLib events={filterEvents} />
          </Grid>
        </Grid>
      </div>
      {/* </Card> */}
    </div>
  );
};

const NUSModsExportButton = ({ lessons, yearSem }) => {
  console.log("in nus mods button", lessons);
  var startLink = `https://nusmods.com/timetable/sem-${parseInt(
    yearSem.sem
  )}/share?`;
  const allModCods = lessons
    .map((x) => x.moduleCode)
    .filter(
      (v, i, arr) => arr.findIndex((x) => x.localeCompare(v) === 0) === i
    );
  for (let i = 0; i < allModCods.length; i++) {
    if (i !== 0) {
      startLink += `&`;
    }
    const currentModCod = allModCods[i];
    const lessonsOfMod = lessons.filter(
      (x) => x.moduleCode.localeCompare(currentModCod) === 0
    );
    // console.log("lessons of mods", lessonsOfMod.map(x => x.lesson.lessonType.subString(0, 3)))
    const mappedLessons = lessonsOfMod.map(
      (lesson) =>
        `${lesson.lesson.lessonType.substring(0, 3).toUpperCase()}:${
          lesson.lesson.classNo
        }`
    );
    const modString = mappedLessons.join(",");
    startLink += currentModCod.toUpperCase() + `=` + modString;
  }
  console.log("link is", startLink);
  return (
    <Button target="_blank" variant="contained" href={startLink}>
      Export to NUSMods
    </Button>
  );
};

const DisplayLessons = ({ lessons }) => {
  const moduleCodes = lessons
    .map((x) => x.moduleCode)
    .filter((item, i, ar) => ar.indexOf(item) === i)
    .sort((x, y) => x.localeCompare(y));
  const lessonsByMod = moduleCodes.map((modCod) =>
    lessons
      .filter((lesson) => lesson.moduleCode === modCod)
      .sort((x, y) => x.lesson.lessonType.localeCompare(y.lesson.lessonType))
  );
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Typography
          variant="button"
          style={{ fontSize: "20px", fontWeight: "bolder" }}
        >
          Lessons
        </Typography>
      </Grid>
      <Grid item>
        {lessonsByMod.map((lessonsOfMod) => {
          return (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontSize: "15px", fontWeight: "bold" }}>
                  {lessonsOfMod[0].moduleCode}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* <ol>
                {lessonsOfMod.map((x) => {
                  return (
                    <li>
                      {x.moduleCode} {x.lesson.lessonType} {x.lesson.classNo}{" "}
                      {" on "} {x.lesson.day} {" from "}
                      {x.lesson.startTime} {" to "} {x.lesson.endTime}
                    </li>
                  );
                })}
              </ol> */}
                <List>
                  {lessonsOfMod.map((mod) => {
                    return (
                      <ListItem button>
                        {mod.lesson.lessonType} {mod.lesson.classNo} {" on "}{" "}
                        {mod.lesson.day} {" from "} {mod.lesson.startTime}{" "}
                        {" to "} {mod.lesson.endTime}
                      </ListItem>
                    );
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Grid>
    </Grid>
  );
};

const GenerateAnotherButton = ({
  actualTimet,
  setActualTimet,
  events,
  previousTimetable,
  setPreviousTimetable,
}) => {
  return (
    <Button
      variant="contained"
      onClick={() => {
        reshuffle(actualTimet, setActualTimet);
        if (
          events !== null &&
          previousTimetable.findIndex(
            (x) => JSON.stringify(x).localeCompare(events) === 0
          ) === -1
        ) {
          setPreviousTimetable([...previousTimetable, events]);
        }
      }}
    >
      Generate another
    </Button>
  );
};

const reshuffle = (actualTimet, setActualTimet) => {
  const copyTimetable = JSON.parse(JSON.stringify(actualTimet));
  const mapped = copyTimetable.map((x) => {
    const shuffled = shuffleArray(x.lessons);
    return {
      moduleCode: x.moduleCode,
      lessons: shuffled,
    };
  });
  shuffleArray(mapped);
  setActualTimet(mapped);
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const ViewPreviousButton = ({ displayPrevious, setDisplayPrevious }) => {
  const handleChange = (event) => {
    setDisplayPrevious(event.target.checked);
  };
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={displayPrevious}
            onChange={handleChange}
            name="lecture"
            color="primary"
            id="material-switch"
            label="Primary"
          />
        }
        label="View previous"
      />
    </FormGroup>
  );
};
const ViewSwitches = ({ state, setState }) => {
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={state.lecture}
            onChange={handleChange}
            name="lecture"
            color="primary"
            id="material-switch"
            label="Primary"
          />
        }
        label="View lectures"
      />
      <FormControlLabel
        control={
          <Switch
            checked={state.labs}
            onChange={handleChange}
            name="labs"
            color="primary"
            id="material-switch"
            label="Primary"
          />
        }
        label="View labs"
      />
      <FormControlLabel
        control={
          <Switch
            checked={state.tutorial}
            onChange={handleChange}
            name="tutorial"
            color="primary"
            id="material-switch"
            label="Primary"
          />
        }
        label="View tutorials"
      />
      <FormControlLabel
        control={
          <Switch
            checked={state.others}
            onChange={handleChange}
            name="others"
            color="primary"
            id="material-switch"
            label="Primary"
          />
        }
        label="View others"
      />
    </FormGroup>
  );
};

const EventGenerator = (confirmedLessons) => {
  let events = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  };
  let currentId = 1;
  for (let i = 0; i < confirmedLessons.length; i++) {
    const currentLesson = confirmedLessons[i];
    const newEvent = {
      id: currentId,
      name:
        currentLesson.moduleCode +
        " " +
        currentLesson.lesson.classNo +
        " " +
        currentLesson.lesson.lessonType +
        " " +
        currentLesson.lesson.venue,
      type: currentLesson.lesson.lessonType,
      startTime: moment(
        currentLesson.lesson.startTime.substring(0, 2) +
          ":" +
          currentLesson.lesson.startTime.substring(2, 4),
        "HH:mm"
      ),
      endTime: moment(
        currentLesson.lesson.endTime.substring(0, 2) +
          ":" +
          currentLesson.lesson.endTime.substring(2, 4),
        "HH:mm"
      ),
    };
    currentId++;
    switch (Days.findIndex((x) => x === currentLesson.lesson.day)) {
      case 0:
        events = {
          ...events,
          monday: [...events.monday, newEvent],
        };
        break;
      case 1:
        events = {
          ...events,
          tuesday: [...events.tuesday, newEvent],
        };
        break;
      case 2:
        events = {
          ...events,
          wednesday: [...events.wednesday, newEvent],
        };
        break;
      case 3:
        events = {
          ...events,
          thursday: [...events.thursday, newEvent],
        };
        break;
      case 4:
        events = {
          ...events,
          friday: [...events.friday, newEvent],
        };
        break;
      default:
        console.log("lesson is not on weekdays");
    }
  }
  return events;
};

//this function generates a possible timetable
function GeneratePossible(
  Timetable,
  validLessons,
  lessonType,
  confirmedLesson,
  previousTimetable
) {
  //When all lessonTypes are done and lesson type is an empty arr
  if (lessonType.map((x) => x.length).reduce((x, y) => x + y, 0) === 0) {
    return confirmedLesson;
  }

  //when there are no valid lessons left
  if (validLessons.map((x) => x.length).reduce((x, y) => x + y, 0) === 0) {
    return null;
  }

  const firstIndex = lessonType.map((x) => x.length).findIndex((x) => x !== 0);
  const firstMod = validLessons[firstIndex]; //this is the first mod in which there is still unconfirmed lesson types
  const firstLessonTypes = lessonType[firstIndex];
  const firstLessonT = firstLessonTypes[0];
  const lessonsOfMod = firstMod.lessons;
  const lessonOfThatType = lessonsOfMod.filter(
    (x) => x.lessonType === firstLessonT
  );
  const classNoOfThatType = lessonOfThatType
    .map((x) => x.classNo)
    .filter((item, i, ar) => ar.indexOf(item) === i);

  for (let i = 0; i < classNoOfThatType.length; i++) {
    const copyTimetable = JSON.parse(JSON.stringify(Timetable));
    const classNo = classNoOfThatType[i];
    const classOfClassNo = lessonOfThatType.filter(
      (x) => x.classNo === classNo
    );

    if (
      !classOfClassNo.reduce(
        (x, y) => AddClass(y, copyTimetable, firstMod.moduleCode) && x,
        true
      )
    ) {
      continue;
    }

    const removeConfirmed = firstMod.lessons.filter(
      (x) => x.lessonType !== firstLessonT
    );

    const copyLessonType = JSON.parse(JSON.stringify(lessonType));
    const copyFirstLessonTypes = firstLessonTypes.map((x) => x);
    const removeLessonT = copyFirstLessonTypes.filter(
      (x) => x !== firstLessonT
    );
    copyLessonType.splice(firstIndex, 1, removeLessonT);

    let firstSlice = validLessons.slice(0, firstIndex);
    let secondSlice = validLessons.slice(firstIndex + 1, validLessons.length);

    for (let k = 0; k < classOfClassNo.length; k++) {
      const dummyConstraint = {
        id: null,
        type: 3,
        time: [
          classOfClassNo[k].day,
          classOfClassNo[k].startTime,
          classOfClassNo[k].endTime,
        ],
      };
      firstSlice = Constraints[3].filterMods(dummyConstraint)(firstSlice);
      secondSlice = Constraints[3].filterMods(dummyConstraint)(secondSlice);
    }
    const newValidLesson = [
      ...firstSlice,
      {
        moduleCode: firstMod.moduleCode,
        lessons: removeConfirmed,
      },
      ...secondSlice,
    ];

    const copyConfirmedLesson = JSON.parse(JSON.stringify(confirmedLesson));

    for (let i = 0; i < classOfClassNo.length; i++) {
      copyConfirmedLesson.push({
        moduleCode: firstMod.moduleCode,
        lesson: classOfClassNo[i],
      });
    }

    const Possible = GeneratePossible(
      copyTimetable,
      newValidLesson,
      copyLessonType,
      copyConfirmedLesson,
      previousTimetable
    );
    if (Possible !== null) {
      const mapped = EventGenerator(Possible);
      if (
        previousTimetable.findIndex(
          (x) => JSON.stringify(x).localeCompare(JSON.stringify(mapped)) === 0
        ) === -1
      ) {
        return Possible;
      }
    }
  }
  return null;
}

//This function is to generate a array of lesson types for this mod
const LessonTypes = (mod) =>
  mod.lessons
    .map((lesson) => lesson.lessonType)
    .filter((item, i, ar) => ar.indexOf(item) === i);

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
        lesson: Lesson,
      };
    } else {
      return false;
    }
  }
  Timetable = [...newTimetable];
  return true;
};

//This function is to generate the index of where this lesson should be in the timetable
const TimetableIndex = (Lesson) => {
  const dayIndex = Days.findIndex((eachDay) => eachDay === Lesson.day);
  const sTimeHr = Math.floor((parseInt(Lesson.startTime) - 700) / 100) * 2;
  const sTimeMin = Math.floor((parseInt(Lesson.startTime) % 100) / 30);
  const eTimeHr = Math.floor((parseInt(Lesson.endTime) - 700) / 100) * 2;
  const eTimeMin = Math.ceil((parseInt(Lesson.endTime) % 100) / 30);
  return [dayIndex, sTimeHr + sTimeMin, eTimeHr + eTimeMin - 1];
};

//Checks if there are direct conflicts between constraints eg. Fix a class on Monday and No lessons on Monday
const ConstrictConflict = (constraints) => {
  //Check for conflict between FixClass and No lessons on
  const FixClassConstraints = constraints.filter(
    (constraint) => constraint.type === 0
  );
  const NoLessonsOnDay = constraints.filter(
    (constraint) => constraint.type === 2
  );
  const NoLessonsBefore = constraints.filter(
    (constraint) => constraint.type === 1
  );
  const NoLessonsFrom = constraints.filter(
    (constraint) => constraint.type === 3
  );
  for (let i = 0; i < FixClassConstraints.length; i++) {
    const CurrentFixClassConstraints = FixClassConstraints[i];
    const startTime = parseInt(CurrentFixClassConstraints.time.split(" ")[4]);
    const endTime = parseInt(CurrentFixClassConstraints.time.split(" ")[6]);
    const day = CurrentFixClassConstraints.time.split(" ")[2];
    for (let j = i + 1; j < FixClassConstraints.length; j++) {
      const otherFixClass = FixClassConstraints[j];
      const otherSTime = parseInt(otherFixClass.time.split(" ")[4]);
      const otherETime = parseInt(otherFixClass.time.split(" ")[6]);
      const otherDay = otherFixClass.time.split(" ")[2];
      if (
        otherDay === day &&
        ((otherSTime < endTime && otherSTime >= startTime) ||
          (otherETime <= endTime && otherETime > startTime))
      ) {
        Alert(otherFixClass, CurrentFixClassConstraints);
        return false;
      } else {
        continue;
      }
    }
    for (let j = 0; j < NoLessonsOnDay.length; j++) {
      if (NoLessonsOnDay[j].time === day) {
        Alert(NoLessonsOnDay[j], CurrentFixClassConstraints);
        return false;
      } else {
        continue;
      }
    }
    for (let j = 0; j < NoLessonsBefore.length; j++) {
      const time = parseInt(NoLessonsBefore[j].time);
      if (time > startTime) {
        Alert(NoLessonsBefore[j], CurrentFixClassConstraints);
        return false;
      } else {
        continue;
      }
    }
    for (let j = 0; j < NoLessonsFrom.length; j++) {
      const cDay = NoLessonsFrom[j].time[0];
      const sTime = parseInt(NoLessonsFrom[j].time[1]);
      const eTime = parseInt(NoLessonsFrom[j].time[2]);
      if (
        cDay === day &&
        ((startTime >= sTime && startTime <= eTime) ||
          (endTime >= sTime && endTime <= eTime))
      ) {
        Alert(NoLessonsFrom[j], CurrentFixClassConstraints);
        return false;
      } else {
        continue;
      }
    }
  }

  //checks if there is conflict between maximise online class and offline classes
  const type6 = constraints.findIndex((x) => x.type === 6);
  const type7 = constraints.findIndex((x) => x.type === 7);
  if (type6 !== -1 && type7 !== -1) {
    Alert(constraints[type6], constraints[type7]);
    return false;
  }
  return true;
};

//To alert users if there is a direct conflict between constraints
const Alert = (constraint1, constraint2) => {
  const displayCode1 = Constraints[constraint1.type].displayCode(
    constraint1,
    false
  );
  window.alert(
    "Clash between " +
      displayCode1 +
      " and " +
      Constraints[constraint2.type].displayCode(constraint2, false)
  );
};

export default Timetable;
