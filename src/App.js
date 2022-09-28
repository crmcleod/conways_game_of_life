import './App.css';
import GridContainer from './Grid/GridContainer';
import { useState } from 'react'

function App() {
  const [blankGrid, setBlankGrid] = useState(
    [...Array(25)].map(_ => [...Array(25)].map(x => { return 0 }))
  )
  const [startingGrid, setStartingGrid] = useState(
    (JSON.parse(JSON.stringify(blankGrid)))
  )
  return (
    <div className="App">
      <GridContainer setStartingGrid={setStartingGrid} startingGrid={startingGrid} blankGrid={blankGrid} />
    </div>
  );
}

export default App;
