import React, {useEffect} from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const ModSubmit = ({
  mods,
  setDisplaySearchResults,
  setDisplayConstraintForm,
  setModTimetable, 
  yearSem
}) => {
  
  const HandleSubmit = () => {
    if (mods.length === 0) {
      window.alert("No mods selected! Please select some mods")
    } else {
      setDisplaySearchResults(false);
      setDisplayConstraintForm(true);
    }
  };

  return (
    <Button id="SubmitMod" onClick={HandleSubmit}>
      Submit mods!
    </Button>
  );
};

// const ClassesDisplay = ({mod, yearSem}) => {
//   const link = 'https://api.nusmods.com/v2/' + yearSem.year + "/modules/" + mod.moduleCode + ".json";
//   const [timetable, setTimetable] = useState([])
//       axios
//         .get(link)
//         .then(response => {
//           const SemesterData = response.data.semesterData;
//           const thisSemData = SemesterData.filter(x => x.semester === parseInt(yearSem.sem))
//           setTimetable(thisSemData[0].timetable)
//         })
//   return timetable.map(lesson => 
//       <Dropdown.Item eventKey={lesson.lessonType + " " + lesson.day + " from " + lesson.startTime + " to " + lesson.endTime}>
//           {lesson.lessonType + " " + lesson.day + " from " + lesson.startTime + " to " + lesson.endTime}
//       </Dropdown.Item>)
// }

export default ModSubmit;
