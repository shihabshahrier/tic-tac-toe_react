import { useState } from 'react'
import "./style.css"


function Square({ onClick, value }) {
  const style = {
    backgroundColor: value === "X" ? "red" : value === "O" ? "green" : "white",
    color: "black",
  };

  return (
    <button className='square' onClick={onClick} style={style}>
      {value}
    </button>
  )
}

function gamePlay(arr) {
  let win_arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ]
  for (const i of win_arr) {
    if (arr[i[0]] === arr[i[1]] && arr[i[1]] === arr[i[2]] && arr[i[0]] !== "" && arr[i[1]] !== "" && arr[i[2]] !== "") {
      return true
    }
  }
  return false
}

function App() {
  const [value, setIndexValue] = useState(Array(10).fill(""))
  const [player, setPlayer] = useState("X")
  const [winner, setWinner] = useState(" ")
  const [moves, setMoves] = useState([])

  const handleWinner = () => {
    if (gamePlay(value)) {
      setWinner(player);
    }
  };

  function handleClick(index) {
    if (winner == " ") {
      if (value[index] === "") {
        value[index] = player
        setIndexValue([...value])
        setMoves(prevMoves => [...prevMoves, `${player} played: ${index}`]);
        setPlayer(player === "X" ? "O" : "X")
      }
      handleWinner()
    }
  }

  function handleNewGame() {
    setIndexValue(Array(10).fill(""));
    setPlayer("X")
    setWinner(" ")
    setMoves([])
  }



  return (
    <>
      <h3>Winner is : {winner}</h3>
      <button style={{ backgroundColor: "SeaGreen" }} onClick={() => handleNewGame()} >Start a New Game</button>

      <div className='row 1'>
        <Square onClick={() => { handleClick(1) }} value={value[1]} />
        <Square onClick={() => { handleClick(2) }} value={value[2]} />
        <Square onClick={() => { handleClick(3) }} value={value[3]} />
      </div>
      <div className='row 2'>
        <Square onClick={() => { handleClick(4) }} value={value[4]} />
        <Square onClick={() => { handleClick(5) }} value={value[5]} />
        <Square onClick={() => { handleClick(6) }} value={value[6]} />
      </div>
      <div className='row 3'>
        <Square onClick={() => { handleClick(7) }} value={value[7]} />
        <Square onClick={() => { handleClick(8) }} value={value[8]} />
        <Square onClick={() => { handleClick(9) }} value={value[9]} />
      </div>

      <div>
        <h4>Moves Played :</h4>
        {moves.map((item, ind) => (
          <li key={ind}>{item}</li>
        ))}
      </div>
    </>
  )
}

export default App
