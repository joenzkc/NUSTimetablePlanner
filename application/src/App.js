import React, { useState } from "react";
import SplitPane from "react-split-pane";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import TimeForm from "./Components/TimeForm";
import ModForm from "./Components/ModForm";
import ModDisplay from "./Components/ModDisplay";
import ModSubmit from "./Components/ModSubmit";
import SearchResults from "./Components/SearchResults";
import ConstraintForm from "./Components/ConstraintForm";
import ConstraintDisplay from "./Components/ConstraintDisplay";
import { Container, Row, Col, Form, ListGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [time, setTime] = useState({
    year: "Year",
    sem: "Sem",
  });
  const [tentativeTime, setTentativeTime] = useState({
    year: "Year", 
    sem: "sem"
  })

  const [mods, setMods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displaySearchResults, setDisplaySearchResults] = useState(false);
  const [displayConstraintForm, setDisplayConstraintForm] = useState(false);
  const [constraints, setConstraints] = useState([]);
  
  return (
    <div className="App">
      <Container>
        <Header />
        <Row>
          <TimeForm time={tentativeTime} setTime={setTentativeTime} />
        </Row>
        <Form>
          <Row>
            <Col>
              <Form.Label>Select your mods</Form.Label>
              <ModForm
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setDisplaySearchResults={setDisplaySearchResults}
                setDisplayConstraintForm={setDisplayConstraintForm}
                tentativeTime={tentativeTime}
                setTime={setTime}
              />
              <ModDisplay mods={mods} setMods={setMods} />
              <ModSubmit
                mods={mods}
                setDisplaySearchResults={setDisplaySearchResults}
                setDisplayConstraintForm={setDisplayConstraintForm}
              />
              <Button id="Clear mods" onClick={() => setMods([])}>
                Clear mods
              </Button>
            </Col>
            <Col>
              {displaySearchResults && 
              <SearchResults
                searchTerm={searchTerm}
                setMods={setMods}
                mods={mods}
                time={time}
              />
              }
              {displayConstraintForm &&               
              <ConstraintForm
                mods={mods}
                constraints={constraints}
                setConstraints={setConstraints}
                yearSem={time}
              />}
              {displayConstraintForm && 
              constraints.length !== 0 && 
              <ConstraintDisplay
              constraints={constraints}
              setConstraints={setConstraints}/>}
              {displayConstraintForm && 
              constraints.length !== 0 && 
              <div class="btn-group">
              <Button id="Clear constraints" onClick={() => setConstraints([])}>
                Clear constraints
              </Button>
              <Button id ="Submit constraints" onClick={() => console.log("timetable")}>
                Submit constraints
              </Button>
              </div>}
            </Col>
          </Row>
        </Form>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
