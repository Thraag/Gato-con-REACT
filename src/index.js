import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import "./css.css";  // Importa un archivo de estilos personalizado
import 'bootstrap/dist/css/bootstrap.min.css';  // Importa los estilos de Bootstrap

/* Estableciendo LOS USESTATE INICIALES*/
const TicTacToe = () => {
  // Estado para el turno actual (x u o)
	const [turn, setTurn] = useState('x');
  // Estado para almacenar los valores de las celdas del tablero
	const [cells, setCells] = useState(Array(9).fill(''));
  // Estado para almacenar al ganador del juego
	const [winner, setWinner] = useState();

  /* DANDO LOS PARAMETROS PARA GANAR*/
	const checkForWinner = (squares) => {
    // Definición de combinaciones ganadoras en el tablero
		let combos = {
			across: [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
			],
			down: [
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
			],
			diagnol: [
				[0, 4, 8],
				[2, 4, 6],
			],
		};

    // Itera sobre las combinaciones y verifica si hay un ganador
		for (let combo in combos) {
			combos[combo].forEach((pattern) => {
				if (
					squares[pattern[0]] === '' ||
					squares[pattern[1]] === '' ||
					squares[pattern[2]] === ''
				) {
					// No hacer nada si alguna de las celdas está vacía
				} else if (
					squares[pattern[0]] === squares[pattern[1]] &&
					squares[pattern[1]] === squares[pattern[2]]
				) {
					setWinner(squares[pattern[0]]);
				}
			});
		}
	};

  /* SETEO QUE IMPIDE RECLICKEAR*/
	const handleClick = (num) => {
		if (cells[num] !== '') {
			alert('already clicked');  // Alerta si la celda ya fue seleccionada
			return;
		}

    /* SETEO DEL TURNO DE X " O*/
		let squares = [...cells];
		if (turn === 'x') {
			squares[num] = 'x';
			setTurn('o');
		} else {
			squares[num] = 'o';
			setTurn('x');
		}

		checkForWinner(squares);
		setCells(squares);
	};

  /* COMPONENTE DE RESETEO*/
	const handleRestart = () => {
		setWinner(null);
		setCells(Array(9).fill(''));  // Reinicia el juego al estado inicial
	};

	// Componente funcional Cell que representa una celda del tablero
	const Cell = ({ num }) => {
		return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
	};

	// Devuelve la estructura JSX del juego TicTacToe
	return (
		<div className='container'>
			<table>
      <h1 className='tic-tac-toe-title'>Turn: {turn} </h1>
				<tbody>
					<tr>
						<Cell num={0} />
						<Cell num={1} />
						<Cell num={2} />
					</tr>
					<tr>
						<Cell num={3} />
						<Cell num={4} />
						<Cell num={5} />
					</tr>
					<tr>
						<Cell num={6} />
						<Cell num={7} />
						<Cell num={8} />
					</tr>
				</tbody>
			</table>
			{winner && (
				<>
					<h1 className='tic-tac-toe-title'>{winner} is the winner!</h1>
					<button className='btn btn-primary' onClick={() => handleRestart()}>Play Again</button>
				</>
			)}
		</div>
	);
};  

// Renderiza el componente TicTacToe en el elemento con el id "app"
ReactDOM.render(
  <TicTacToe />,
  document.querySelector("#app")
);
