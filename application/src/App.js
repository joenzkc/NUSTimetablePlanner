import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import TimeForm from "./Components/TimeForm";
import ModInput from "./Components/ModInput";
import ModDisplay from "./Components/ModDisplay";
import ModSubmit from "./Components/ModSubmit";
import SearchResults from "./Components/SearchResults";
import ConstraintForm from "./Components/ConstraintForm";
import ConstraintDisplay from "./Components/ConstraintDisplay";
import Help from "./Components/Help";
import { Container, Row, Col, Form, ListGroup, Button } from "react-bootstrap";
import CssBaseline from "@material-ui/core/CssBaseline";
import { FormGroup, Paper, Icon, makeStyles } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
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
  const [searchTerm, setSearchTerm] = useState("");
  const [displaySearchResults, setDisplaySearchResults] = useState(false);
  const [displayConstraintForm, setDisplayConstraintForm] = useState(false);
  const [constraints, setConstraints] = useState([]);
  const [modTimetables, setModTimetables] = useState([]);
  console.log("mods timetables are", modTimetables)

  return (
    <Router>
      <div className="App">
        <Container>
          <CssBaseline />
          <Header />
          {/* <Row>
            <TimeForm time={tentativeTime} setTime={setTentativeTime} />
          </Row> */}
          <Switch>
            <Route exacth path="/">
              <Form inline>
                <Row>
                  <Col>
                    <Paper className={classes.root}>
                      <Row>
                        <Col lg={3}>
                          <TimeForm
                            time={tentativeTime}
                            setTime={setTentativeTime}
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
                    </Paper>
                    <ModDisplay mods={mods} setMods={setMods} />
                    <ModSubmit
                      mods={mods}
                      setDisplaySearchResults={setDisplaySearchResults}
                      setDisplayConstraintForm={setDisplayConstraintForm}
                    />
                    <Button id="Clear mods" onClick={() => {setMods([]); setDisplayConstraintForm(false)}}>
                      Clear mods
                    </Button>
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
                        constraints={constraints}
                        setConstraints={setConstraints}
                        yearSem={time}
                        setModTimetables={setModTimetables}
                        modTimetables={modTimetables}
                      />
                    )}
                    {displayConstraintForm && constraints.length !== 0 && (
                      <ConstraintDisplay
                        constraints={constraints}
                        setConstraints={setConstraints}
                      />
                    )}
                    {displayConstraintForm && constraints.length !== 0 && (
                      <div class="btn-group">
                        <Button
                          id="Clear constraints"
                          onClick={() => setConstraints([])}
                        >
                          Clear constraints
                        </Button>
                        <Button
                          id="Submit constraints"
                          onClick={() => console.log("timetable")}
                        >
                          Submit constraints
                        </Button>
                      </div>
                    )}
                  </Col>
                </Row>
              </Form>
            </Route>
            <Route exact path="/help">
              <Help />
            </Route>
          </Switch>
          <Footer />
        </Container>
      </div>
    </Router>
  );
}

export default App;
