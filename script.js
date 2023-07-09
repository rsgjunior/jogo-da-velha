let casas = document.querySelectorAll(".casa");
let msg = document.querySelector("#msg");
let btReiniciar = document.querySelector("#reiniciar");
let btReiniciarPlacar = document.querySelector("#reiniciarPlacar");
let vitoriasX = document.querySelector("#vitoriasX");
let vitoriasO = document.querySelector("#vitoriasO");
let velhas = document.querySelector("#velhas");

window.addEventListener('load', iniciarJogo);
btReiniciar.addEventListener('click', reiniciarJogo);
btReiniciarPlacar.addEventListener('click', reiniciarPlaca);

let movimentos = 0;
let turno = Math.round(Math.random());
let matriz = [  [0,0,0],
                [0,0,0],
                [0,0,0]];
let acabou = 0;
let qtdVelha = 0;
let qtdX = 0;
let qtdO = 0;

function iniciarJogo(){
    atualizarTurno();

    for(let casa of casas){
        casa.addEventListener('click', () => { preencher(casa) });
    }
}

function preencher(casa){
    if(casa.innerText == '' && acabou != 1){
        if(turno == 0 || turno % 2 == 0){
            casa.innerText = "X";
            let linha = casa.closest("tr");

            matriz[linha.id-1][casa.id-1] = 1;

            console.log(matriz);
        }else{
            casa.innerText = "O";
            let linha = casa.closest("tr");

            matriz[linha.id-1][casa.id-1] = 2;

            console.log(matriz);
        }

        turno++;
        movimentos++;
        atualizarTurno();
        verificarJogo();
    }
}

function checkX(value){
    return value == 1;
}

function checkO(value){
    return value == 2;
}

function verificarJogo(){
    let diagonal = [];
    diagonal[0] = [matriz[0][0], matriz[1][1], matriz[2][2]];
    diagonal[1] = [matriz[0][2], matriz[1][1], matriz[2][0]];

    let col = [];
    col[0] = [matriz[0][0], matriz[1][0], matriz[2][0]];
    col[1] = [matriz[0][1], matriz[1][1], matriz[2][1]];
    col[2] = [matriz[0][2], matriz[1][2], matriz[2][2]];

    for(let i = 0; i < 3; i++){
        let countLinhaX = matriz[i].filter(checkX);
        let countLinhaO = matriz[i].filter(checkO);
        let countColX = col[i].filter(checkX);
        let countColO = col[i].filter(checkO);

        let countDiagX = 0;
        let countDiagO = 0;

        if(i < 2){
            countDiagX = diagonal[i].filter(checkX);
            countDiagO = diagonal[i].filter(checkO);
        }

        if(countLinhaX.length == 3 || countColX.length == 3 || countDiagX.length == 3){
            return terminarJogo(1);
        }else if(countLinhaO.length == 3 || countColO.length == 3 || countDiagO.length == 3){
            return terminarJogo(2);
        }
    }

    if(movimentos >= 9){
        return terminarJogo();
    }
}

function terminarJogo(vencedor){
    acabou = 1;

    if(vencedor == undefined){
        texto = "Empate"
        msg.innerText = texto;
        qtdVelha++;
        velhas.innerText = qtdVelha;
        return alert(texto);
    }else if(vencedor == 1){
        texto = "X ganhou!"
        msg.innerText = texto;
        qtdX++;
        vitoriasX.innerText = qtdX;
        return alert(texto);
    }else if(vencedor == 2){
        texto = "O ganhou!"
        msg.innerText = texto;
        qtdO++;
        vitoriasO.innerText = qtdO;
        return alert(texto);
    }
}

function atualizarTurno(){
    if(turno % 2 == 0){
        msg.innerText = "Turno do X";
    }else{
        msg.innerText = "Turno do O";
    }
}

function reiniciarJogo(){
    for(let casa of casas){
        casa.innerText = "";
    }

    acabou = 0;
    turno = Math.round(Math.random());
    movimentos = 0;
    matriz = [  [0,0,0],
                [0,0,0],
                [0,0,0]];

    atualizarTurno();
}

function reiniciarPlaca(){
    reiniciarJogo();

    qtdVelha = 0;
    qtdX = 0;
    qtdO = 0;
    vitoriasX.innerText = 0;
    vitoriasO.innerText = 0;
    velhas.innerText = 0;
}