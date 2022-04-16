import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [gameData, setGameData] = useState({
    ticBoard: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    turn: 0,
    icon: ['o', 'x'],
  })

  const pickBox = (x) => {
    if (gameData['ticBoard'][x] === ' ') {
      // console.log(gameData.turn, gameData)
      // let newTurn = gameData['turn'] === 0 ? 1 : 0
      let arr = gameData['ticBoard']
      arr[x] = gameData['icon'][gameData['turn']]

      const newGameData = {
        turn: gameData['turn'] === 0 ? 1 : 0,
        ticBoard: [...arr],
      }

      setGameData((prevGameData) => {
        return {
          ...prevGameData,
          ...newGameData,
        }
      })
    }
  }

  //
  const checkWinner = () => {
    const ticBoard = gameData['ticBoard']
    const turn = gameData['turn'] ? 0 : 1
    const icon = gameData['icon']
    const txt = ticBoard.join()
    const nTxt = icon[turn] + icon[turn] + icon[turn]

    //
    const declareWinner = (x) => {
      const winner = x === 0 ? 'Player One' : 'Player Two'
      console.log(x, winner, 'wins')
      resetGame()
    }

    //
    const declareDraw = () => {
      console.log('No winner')
      resetGame()
    }

    //
    const resetGame = () => {
      setGameData({
        ticBoard: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        turn: gameData['turn'] ? 0 : 1,
        icon: ['o', 'x'],
      })

      // console.log(turn)
    }

    //
    const compVal = (x, y) => {
      if (ticBoard[x] !== ' ' && ticBoard[y] !== ' ') {
        return ticBoard[x] === ticBoard[y] ? true : false
      }
    }

    //
    if (txt !== '         ') {
      if (!txt.includes(' ')) {
        declareDraw()
      } else if (
        (compVal(0, 1) && compVal(1, 2)) ||
        (compVal(3, 4) && compVal(4, 5)) ||
        (compVal(6, 7) && compVal(7, 8)) ||
        (compVal(0, 4) && compVal(4, 8)) ||
        (compVal(2, 4) && compVal(4, 6)) ||
        (compVal(0, 3) && compVal(3, 6)) ||
        (compVal(1, 4) && compVal(4, 7)) ||
        (compVal(2, 5) && compVal(5, 8))
      ) {
        declareWinner(turn)
      }
    }
  }

  useEffect(() => {
    checkWinner()
  }, [gameData])

  return (
    <div className='App'>
      {gameData['ticBoard'].map((datum, item) => {
        return <Boxes key={item} data={[datum, item]} pickBox={pickBox} />
      })}
    </div>
  )
}

const Boxes = ({ data, pickBox }) => {
  return (
    <>
      <div className='boxes' onClick={() => pickBox(data[1])}>
        <span>{data[0]}</span>
      </div>
    </>
  )
}

export default App
