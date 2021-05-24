import React, { useState } from 'react'

import Header from './Components/Header'
import Footer from './Components/Footer'
import TimeForm from './Components/TimeForm'
import ModForm from './Components/ModForm'
import ModDisplay from './Components/ModDisplay'
import ModSubmit from './Components/ModSubmit'

function App() {

  const [time, setTime] = useState({
    year: 2021, sem: 1,
  });

  const [mods, setMods] = useState([]);

  return (
    <div className="App">
      <Header />
      <TimeForm time={time} setTime={setTime} />
      <ModForm mods={mods} setMods={setMods} />
      <ModDisplay mods={mods} setMods={setMods} />
      <ModSubmit mods={mods}/>
      <Footer />
    </div>
  );
}

export default App;
