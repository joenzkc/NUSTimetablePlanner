import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import TimeForm from "./Components/TimeForm";
import ModInput from "./Components/ModInput";
import ModDisplay from "./Components/ModDisplay";
import ModSubmit from "./Components/ModSubmit";
import SearchResults from "./Components/SearchResults";
import ConstraintForm from "./Components/ConstraintForm";
import ConstraintDisplay from "./Components/ConstraintDisplay";
import Timetable from "./Components/Timetable";
import Help from "./Components/Help";
import { Container, Row, Col, Form, ListGroup, Button } from "react-bootstrap";
import CssBaseline from "@material-ui/core/CssBaseline";
import { FormGroup, Paper, Icon, makeStyles, Card } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ClearModsButton from "./Components/ClearModsButton";
import SubmitConstraint from "./Components/SubmitConstraint";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    marginBottom: theme.spacing(1),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

function App() {
  const classes = useStyles();
  const [time, setTime] = useState({
    year: "2020-2021",
    sem: "1",
  });
  const [tentativeTime, setTentativeTime] = useState({
    year: "2020-2021",
    sem: "1",
  });

  const [mods, setMods] = useState([]);
  const [promiseTimetable, setPromiseTimetable] = useState([]); //this stores a promise of the mod timetable
  const [searchTerm, setSearchTerm] = useState("");
  const [displaySearchResults, setDisplaySearchResults] = useState(false);
  const [displayConstraintForm, setDisplayConstraintForm] = useState(false);
  const [displayTimetable, setDisplayTimetable] = useState(false);
  const [constraints, setConstraints] = useState([]);
  const [tentativeConstraints, setTentativeConstraints] = useState([]);

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
  }, [mods.length]);

  const [actualTimet, setActualTimet] = useState(
    new Array(promiseTimetable.length)
  );

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
  };

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  const reshuffle = () => {
    const copyTimetable = JSON.parse(JSON.stringify(actualTimet));
    const mapped = copyTimetable.map((x) => {
      shuffleArray(x.lessons);
      return {
        moduleCode: x.moduleCode,
        lessons: x.lessons,
      };
    });
    shuffleArray(mapped);
    setActualTimet(mapped);
  };

  return (
    <Router>
      <div className="App">
        <Container>
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
                          />
                        </Col>
                      </Row>
                    </Card>
                    <ModDisplay mods={mods} setMods={setMods} />
                    <ModSubmit
                      mods={mods}
                      setDisplaySearchResults={setDisplaySearchResults}
                      setDisplayConstraintForm={setDisplayConstraintForm}
                    />
                    <ClearModsButton
                      setMods={setMods}
                      setDisplayConstraintForm={setDisplayConstraintForm}
                      setDisplayTimetable={setDisplayTimetable}
                      setConstraints={setConstraints}
                    />
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
                    {displayConstraintForm && (
                      <ConstraintForm
                        mods={mods}
                        tentativeConstraints={tentativeConstraints}
                        setTentativeConstraints={setTentativeConstraints}
                        actualTimet={actualTimet}
                        setConstraints={setConstraints}
                      />
                    )}
                    {displayConstraintForm &&
                      tentativeConstraints.length !== 0 && (
                        <ConstraintDisplay
                          constraints={tentativeConstraints}
                          setConstraints={setTentativeConstraints}
                          setDisplayTimetable={setDisplayTimetable}
                        />
                      )}
                    {displayConstraintForm &&
                      tentativeConstraints.length !== 0 && (
                        <div class="btn-group">
                          <Button
                            id="Clear constraints"
                            onClick={() => {
                              confirmAlert({
                                title: "Confirm to delete",
                                message:
                                  "Are you sure you want to clear constraints?",
                                buttons: [
                                  {
                                    label: "Yes",
                                    onClick: () => {
                                      setConstraints([]);
                                      setTentativeConstraints([]);
                                      setDisplayTimetable(false);
                                    },
                                  },
                                  {
                                    label: "No",
                                    onClick: () => {},
                                  },
                                ],
                              });
                            }}
                          >
                            Clear constraints
                          </Button>
                        </div>
                      )}
                    {displayConstraintForm && (
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
                />
              )}
              {displayTimetable && (
                <Button onClick={reshuffle}>Generate another</Button>
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
