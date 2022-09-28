import React, { useState, useMemo, useEffect, startTransition } from 'react'
import './Grid.css'
import '../App.css'

const GridContainer = ({ startingGrid, setStartingGrid, blankGrid }) => {

    const [started, setStarted] = useState(false)
    const [pixelChance, setPixelChance] = useState(2)
    const [speed, setSpeed] = useState(15)
    const [cellSplit] = useState(25)

    const handleSelect = (x, y) => {
        let newGrid = [...startingGrid]
        newGrid[x][y] === 1 ? newGrid[x][y] = 0 : newGrid[x][y] = 1
        setStartingGrid([...newGrid])
    }

    useEffect(() => {
        setSquares()
    }, [pixelChance])


    useEffect(() => {
        started &&
            startProcess()
    }, [startingGrid])

    const setSquares = () => {
        let newArray = [...startingGrid]
        newArray.forEach((row, rowIndex) => {
            row.forEach((_, cellIndex) => {
                newArray[rowIndex][cellIndex] = !!Math.round(Math.random() * pixelChance) ? 0 : 1
            })
        })
        setStartingGrid([...newArray])
    }
    let timer;
    const startProcess = () => {
        /* 
        
        Any live cell with two or three live neighbours survives.
       Any dead cell with three live neighbours becomes a live cell.
       All other live cells die in the next generation. Similarly, all other dead cells stay dead.
        */
        // let newGrid = JSON.parse(JSON.stringify(startingGrid))
        let newGrid = JSON.parse(JSON.stringify(startingGrid))
        startingGrid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (!!cell) {
                    let count = 0;
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            if (colIndex - 1 >= 0 && rowIndex - 1 >= 0) {
                                if (i === 0 && j === 0) {
                                    // console.log('Origin cell')
                                }
                                else if (!!startingGrid?.[rowIndex + i]?.[colIndex + j]) { count++; }
                            }
                        }
                    }
                    console.log(count)
                    if (count < 2 || count > 3) { newGrid[rowIndex][colIndex] = 0 }
                    if (count === 2 || count === 3) { (newGrid[rowIndex][colIndex] = 1) }
                    // }
                } else
                    if (!cell) {
                        let count = 0;
                        for (let i = -1; i <= 1; i++) {
                            for (let j = -1; j <= 1; j++) {
                                // if(colIndex -1 >= 0 && rowIndex-1 >= 0){
                                if (i === 0 && j === 0) {
                                    // console.log('Origin cell')
                                } else
                                    if (!!startingGrid?.[rowIndex + i]?.[colIndex + j]) {
                                        count++
                                    }
                                // }
                            }
                        }
                        count === 3 &&
                            (newGrid[rowIndex][colIndex] = 1)

                    }
            })
        })
        timer = setTimeout(() => {
            setStarted(true)
            setStartingGrid([...newGrid]
            )
        }, speed * speed)
    }

    const handleSetPixelChance = (e) => {
        setPixelChance(e.target.value)
    }

    const handleSetSpeed = (e) => {
        setSpeed(e.target.value)
    }

    const handleClearTheField = () => {
        setStartingGrid(JSON.parse(JSON.stringify(blankGrid)))
    }

    return (
        <div className='App'>

            <div id='grid'>
                {
                    startingGrid && startingGrid.map((row, colIndex) => {
                        return (
                            <div key={row.toString() + colIndex} style={{ width: '50vw', height: 50 / cellSplit + 'vw', position: 'relative', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', boxSizing: 'border-box' }} className='row'>
                                {
                                    row.map((cell, rowIndex, arrayThis) => {
                                        return (
                                            <div key={'' + rowIndex + cell + colIndex} onClick={() => handleSelect(colIndex, rowIndex)} style={{ transition: '0.2s all ease', width: 50 / cellSplit + 'vw', height: 50 / cellSplit + 'vw', backgroundColor: !!cell ? 'purple' : 'cornflowerblue', position: 'relative', display: 'flex', flexWrap: 'wrap', flexDirection: 'column', border: ' 1px solid white', borderRadius: '5px', boxSizing: 'border-box' }} className='cell'>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
            <span id='controls'>
                <p>Pixel density</p>
                <span style={{ display: 'flex', flexDirection: 'row' }}>
                    High
                    <input disabled={started} value={pixelChance} onChange={handleSetPixelChance} type='range' min='1' max='5' scale='0.5' />
                    Low
                </span>
                <p>Speed</p>
                <span style={{ display: 'flex', flexDirection: 'row' }}>
                    High
                <input value={speed} onChange={handleSetSpeed} type='range' min='1' max='30' scale='1' />
                    Low
                </span>
                <button disabled={started} onClick={startProcess}>LIVE</button>
                <button disabled={!started} onClick={() =>{ clearTimeout(timer); setStarted(false)}}>PAUSE</button>
                <button disabled={started} onClick={handleClearTheField}>CLEAR</button>
            </span>
        </div>
    )
}

export default GridContainer