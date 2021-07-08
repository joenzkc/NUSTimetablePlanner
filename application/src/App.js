import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Header from "./Components/Header";
import TimeForm from "./Components/TimeForm";
import ModInput from "./Components/ModInput";
import ModDisplay from "./Components/ModDisplay";
import ModSubmit from "./Components/ModSubmit";
import SearchResults from "./Components/SearchResults";
import ConstraintForm from "./Components/ConstraintForm";
import ConstraintDisplay from "./Components/ConstraintDisplay";
import Timetable from "./Components/Timetable";
import Help from "./Components/Help";
import { Container, Row, Col, Form } from "react-bootstrap";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, Card } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import ClearModsButton from "./Components/ClearModsButton";
import SubmitConstraint from "./Components/SubmitConstraint";
import ClearConstraintsButton from "./Components/ClearConstraintsButton";
import SaveTimetable from "./Components/SaveTimetable";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    marginBottom: theme.spacing(1),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();
  const [time, setTime] = useState(
    JSON.parse(localStorage.getItem("time")) || {
      year: "2021-2022",
      sem: "1",
    }
  );
  const [tentativeTime, setTentativeTime] = useState({
    year: "2021-2022",
    sem: "1",
  });

  const [mods, setMods] = useState(
    JSON.parse(localStorage.getItem("mods")) || []
  );
  const [promiseTimetable, setPromiseTimetable] = useState([]); //this stores a promise of the mod timetable
  const [searchTerm, setSearchTerm] = useState("");
  const [displaySearchResults, setDisplaySearchResults] = useState(false);
  const [displayConstraintForm, setDisplayConstraintForm] = useState(false);
  const [displayTimetable, setDisplayTimetable] = useState(false);
  const [constraints, setConstraints] = useState([]);
  const [tentativeConstraints, setTentativeConstraints] = useState(
    JSON.parse(localStorage.getItem("tentativeConstraints")) || []
  );
  const [actualTimet, setActualTimet] = useState(
    JSON.parse(localStorage.getItem("actualTimet")) ||
      new Array(promiseTimetable.length)
  );
  const [displayPrevious, setDisplayPrevious] = useState(false);

  const [previousTimetable, setPreviousTimetable] = useState([]);

  useEffect(() => {
    localStorage.setItem("mods", JSON.stringify(mods));
  }, [mods]);

  useEffect(() => {
    localStorage.setItem(
      "tentativeConstraints",
      JSON.stringify(tentativeConstraints)
    );
  }, [tentativeConstraints]);

  useEffect(() => {
    localStorage.setItem("time", JSON.stringify(time));
  }, [time]);

  useEffect(() => {
    localStorage.setItem("actualTimet", JSON.stringify(actualTimet));
  }, [actualTimet]);

  useEffect(() => {
    const Mapped = mods.map((mod) => {
      return {
        moduleCode: mod.moduleCode,
        lessons: axios
          .get(
            "https://api.nusmods.com/v2/" +
              time.year +
              "/modules/" +
              mod.moduleCode +
              ".json"
          )
          .then((response) => {
            const SemesterData = response.data.semesterData;
            const filteredData = SemesterData.filter(
              (x) => x.semester === parseInt(time.sem)
            );
            const FinalTimetable = filteredData[0].timetable;
            return FinalTimetable;
          }),
      };
    });
    setPromiseTimetable(Mapped);
    localStorage.setItem("promiseTimetable", JSON.stringify(Mapped));
  }, [mods, time.year, time.sem]);

  useEffect(() => {
    for (let i = 0; i < promiseTimetable.length; i++) {
      const promiseT = promiseTimetable[i].lessons;
      const index = i;
      promiseT.then((timet) => {
        const newActual = [...actualTimet];
        newActual.splice(index, 1, {
          moduleCode: promiseTimetable[i].moduleCode,
          lessons: timet,
        });
        if (newActual.length === mods.length) {
          setActualTimet(newActual);
        }
      });
    }
  }, [promiseTimetable.length]);

  const restart = () => {
    setDisplayConstraintForm(false);
    setDisplaySearchResults(false);
    setDisplayTimetable(false);
    setMods([]);
    setTentativeConstraints([]);
    setConstraints([]);
    setPromiseTimetable([]);
    setActualTimet([]);
    setPreviousTimetable([]);
  };

  return (
    <Router>
      <div className="App">
        <Container fluid="lg">
          <CssBaseline />
          <Header />
          <Switch>
            <Route exact path="/">
              <Form inline>
                <Row>
                  <Col>
                    <Card className={classes.root}>
                      <Row>
                        <Col lg={3}>
                          <TimeForm
                            setTime={setTentativeTime}
                            restart={restart}
                          />
                        </Col>
                        <Col lg={9}>
                          <ModInput
                            setSearchTerm={setSearchTerm}
                            setDisplaySearchResults={setDisplaySearchResults}
                            setDisplayConstraintForm={setDisplayConstraintForm}
                            tentativeTime={tentativeTime}
                            setTime={setTime}
                            setDisplayTimetable={setDisplayTimetable}
                          />
                        </Col>
                      </Row>
                    </Card>
                    <ModDisplay 
                      mods={mods} 
                      setMods={setMods}
                      tentativeConstraints={tentativeConstraints}
                      constraints={constraints}
                      setTentativeConstraints={setTentativeConstraints}
                      setConstraints={setConstraints}
                      setActualTimet={setActualTimet}
                      actualTimet={actualTimet}
                      setDisplayConstraintForm={setDisplayConstraintForm} 
                      setDisplayTimetable={setDisplayTimetable}
                      setDisplayPrevious={setDisplayPrevious}/>
                    <ModSubmit
                      className={classes.button}
                      mods={mods}
                      setDisplaySearchResults={setDisplaySearchResults}
                      setDisplayConstraintForm={setDisplayConstraintForm}
                    />
                    <ClearModsButton restart={restart} />
                  </Col>
                  <Col>
                    {displaySearchResults && (
                      <SearchResults
                        searchTerm={searchTerm}
                        setMods={setMods}
                        mods={mods}
                        time={time}
                      />
                    )}
                    {displayConstraintForm && 
                    mods.length !== 0 && (
                      <ConstraintForm
                        mods={mods}
                        tentativeConstraints={tentativeConstraints}
                        setTentativeConstraints={setTentativeConstraints}
                        actualTimet={actualTimet}
                        setConstraints={setConstraints}
                        yearSem={time}
                        setActualTimet={setActualTimet}
                      />
                    )}
                    {displayConstraintForm &&
                    mods.length !== 0 && 
                      tentativeConstraints.length !== 0 && (
                        <ConstraintDisplay
                          constraints={tentativeConstraints}
                          setConstraints={setTentativeConstraints}
                          setDisplayTimetable={setDisplayTimetable}
                        />
                      )}
                    {displayConstraintForm &&
                    mods.length !== 0 &&
                      tentativeConstraints.length !== 0 && (
                        <ClearConstraintsButton
                          setConstraints={setConstraints}
                          setTentativeConstraints={setTentativeConstraints}
                          setDisplayTimetable={setDisplayTimetable}
                        />
                      )}
                    {displayConstraintForm && (
                      mods.length !== 0 &&
                      <SubmitConstraint
                        setDisplayTimetable={setDisplayTimetable}
                        setConstraints={setConstraints}
                        tentativeConstraints={tentativeConstraints}
                      />
                    )}
                  </Col>
                </Row>
              </Form>
              {displayTimetable && (
                <Timetable
                  constraints={constraints}
                  actualTimet={actualTimet}
                  setActualTimet={setActualTimet}
                  previousTimetable={previousTimetable}
                  setPreviousTimetable={setPreviousTimetable}
                  displayPrevious={displayPrevious}
                  setDisplayPrevious={setDisplayPrevious}
                  yearSem={time}
                />
              )}
              {displayPrevious && previousTimetable.length !== 0 && (
                <SaveTimetable previousTimetable={previousTimetable} />
              )}
            </Route>
            <Route exact path="/help" component={Help} />
          </Switch>
          {/* <Footer /> */}
        </Container>
      </div>
      <script src="scripts/timetable.min.js"></script>
    </Router>
  );
}

export default App;
