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
import { Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [time, setTime] = useState({
    year: 2021,
    sem: 1,
  });

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
          <TimeForm time={time} setTime={setTime} />
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
              />
              <ModDisplay mods={mods} setMods={setMods} />
              <ModSubmit
                mods={mods}
                setDisplaySearchResults={setDisplaySearchResults}
                setDisplayConstraintForm={setDisplayConstraintForm}
              />
            </Col>
            <Col>
              <SearchResults
                searchTerm={searchTerm}
                setMods={setMods}
                mods={mods}
                displaySearchResults={displaySearchResults}
              />
              <ConstraintForm
                displayConstraintForm={displayConstraintForm}
                mods={mods}
                constraints={constraints}
                setConstraints={setConstraints}
              />
            </Col>
          </Row>
        </Form>
        <Footer />
      </Container>
      {/* <Header />
      <TimeForm time={time} setTime={setTime} />
      <h2>Select your mods</h2>
      <SplitPane split="vertical" minSize={50} defaultSize={400}>
        <div>
          <ModForm 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          setDisplaySearchResults={setDisplaySearchResults} 
          setDisplayConstraintForm={setDisplayConstraintForm}/>
          <ModDisplay mods={mods} setMods={setMods} />
          <ModSubmit mods={mods} setDisplaySearchResults={setDisplaySearchResults} setDisplayConstraintForm={setDisplayConstraintForm}/>
          <Footer />
        </div>
        <div>
          <SearchResults searchTerm={searchTerm} setMods={setMods} mods={mods} displaySearchResults={displaySearchResults}/>
          <ConstraintForm 
          displayConstraintForm={displayConstraintForm} 
          mods={mods} 
          constraints={constraints} 
          setConstraints={setConstraints}/>
        </div>
      </SplitPane> */}
    </div>
  );
}

export default App;
