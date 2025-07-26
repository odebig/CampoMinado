// Modelo base de um Square (referência apenas, não usado diretamente como instância)
const Square = {
	row: 0,
	column: 0,
	state: "closed", // closed, opened, flagged
	hasMine: false,
	nearMines: 0
};


function criarCampoMinado(linhas, colunas) {
	const matriz = [];

	for (let i = 0; i < linhas; i++) {
		matriz[i] = [];
		for (let j = 0; j < colunas; j++) {
			// Cria um novo objeto com base no Square original
			matriz[i][j] = {
				row: i,
				column: j,
				state: "closed",
				hasMine: false,
				nearMines: 0
			};
		}
	}

	return matriz;
}


function sortearMinas(matriz, quantidade) {
	const linhas = matriz.length;
	const colunas = matriz[0].length;
	let minasColocadas = 0;

	while (minasColocadas < quantidade) {
		const i = Math.floor(Math.random() * linhas);
		const j = Math.floor(Math.random() * colunas);

		if (!matriz[i][j].hasMine) {
			matriz[i][j].hasMine = true;
			minasColocadas++;
		}
	}
}


function contarMinasVizinhas(matriz, linha, coluna) {
	let contador = 0;

	for (let i = linha - 1; i <= linha + 1; i++) {
		for (let j = coluna - 1; j <= coluna + 1; j++) {
			if (
				i >= 0 && i < matriz.length &&
				j >= 0 && j < matriz[0].length &&
				!(i === linha && j === coluna) &&
				matriz[i][j].hasMine
			) {
				contador++;
			}
		}
	}

	matriz[linha][coluna].nearMines = contador;
}


function contarTodasAsBombas(matriz) {
	for (let i = 0; i < matriz.length; i++) {
		for (let j = 0; j < matriz[0].length; j++) {
			if (!matriz[i][j].hasMine) {
				contarMinasVizinhas(matriz, i, j);
			}
		}
	}
}


function imprimirCampo(matriz) {
	for (let i = 0; i < matriz.length; i++) {
		let linha = "";
		for (let j = 0; j < matriz[0].length; j++) {
			const celula = matriz[i][j];
			let simbolo = " ";

			if (celula.hasMine) {
				simbolo = "*";
			} else if (celula.nearMines > 0) {
				simbolo = celula.nearMines;
			}

			linha += `[${simbolo}]`;
		}
		console.log(linha);
	}
}


function copiarCampo(matriz) {
	return matriz.map(linha =>
		linha.map(square => ({
			row: square.row,
			column: square.column,
			state: square.state,
			hasMine: square.hasMine,
			nearMines: square.nearMines
		}))
	);
}


const campoMinado = criarCampoMinado(5, 5); // 1
const gabaritoCampoMinado = copiarCampo(campoMinado); // 2
sortearMinas(gabaritoCampoMinado, 6); // 3
contarTodasAsBombas(gabaritoCampoMinado); // 4

console.log("Campo vazio:");
imprimirCampo(campoMinado); // 5

console.log("\nCampo com minas:");
imprimirCampo(gabaritoCampoMinado); // 5

