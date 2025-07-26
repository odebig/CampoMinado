// Tipo para cada célula do campo minado
type Square = {
  row: number;
  column: number;
  state: "closed" | "opened" | "flagged";
  hasMine: boolean;
  nearMines: number;
};

// Tipo para a matriz (campo minado)
type CampoMinado = Square[][];

// Cria o campo minado inicial
function criarCampoMinado (linhas: number, colunas: number): CampoMinado {
  const campo: CampoMinado = [];

  for (let i = 0; i < linhas; i++) {
    const linha: Square[] = [];
    for (let j = 0; j < colunas; j++) {
      const quadrado: Square = {
        row: i,
        column: j,
        state: "closed",
        hasMine: false,
        nearMines: 0,
      };
      linha.push(quadrado);
    }
    campo.push(linha);
  }

  return campo;
}

// Sorteia minas aleatoriamente no campo
function sortearMinas(matriz: CampoMinado, quantidade: number): void {
  const linhas = matriz.length;
  const colunas = matriz[0].length;
  let minasSorteadas = 0;

  while (minasSorteadas < quantidade) {
    const i = Math.floor(Math.random() * linhas);
    const j = Math.floor(Math.random() * colunas);

    if (!matriz[i][j].hasMine) {
      matriz[i][j].hasMine = true;
      minasSorteadas++;
    }
  }
}

// Conta o número de minas ao redor de uma célula
function contarMinasVizinho(matriz: CampoMinado, linha: number, coluna: number): void {
  const direcoes = [-1, 0, 1];
  let contador = 0;

  for (let dx of direcoes) {
    for (let dy of direcoes) {
      if (dx === 0 && dy === 0) continue;

      const novaLinha = linha + dx;
      const novaColuna = coluna + dy;

      if (
        novaLinha >= 0 &&
        novaLinha < matriz.length &&
        novaColuna >= 0 &&
        novaColuna < matriz[0].length &&
        matriz[novaLinha][novaColuna].hasMine
      ) {
        contador++;
      }
    }
  }

  matriz[linha][coluna].nearMines = contador;
}

// Conta as minas de todo o campo
function contarTodasAsMinas(matriz: CampoMinado): void {
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[0].length; j++) {
      contarMinasVizinho(matriz, i, j);
    }
  }
}

// Exibe o campo no console
function imprimirCampo(matriz: CampoMinado): void {
  for (let linha of matriz) {
    let linhaTexto = "";
    for (let quadrado of linha) {
      if (quadrado.hasMine) {
        linhaTexto += "[*]";
      } else if (quadrado.nearMines > 0) {
        linhaTexto += `[${quadrado.nearMines}]`;
      } else {
        linhaTexto += "[ ]";
      }
    }
    console.log(linhaTexto);
  }
}

// Faz cópia profunda do campo (sem quebrar o tipo)
function copiarCampo(campo: CampoMinado): CampoMinado {
  return campo.map((linha) =>
    linha.map((quadrado) => ({ ...quadrado }))
  );
}

// Código principal
const campoMinado = criarCampoMinado(5, 5);
const gabaritoCampoMinado: CampoMinado = copiarCampo(campoMinado);

sortearMinas(gabaritoCampoMinado, 5);
contarTodasAsMinas(gabaritoCampoMinado);

console.log("Campo vazio:");
imprimirCampo(campoMinado);

console.log("\nCampo com minas:");
imprimirCampo(gabaritoCampoMinado);
