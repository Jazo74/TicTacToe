let occupied = [];
let busy = false;
let turn = "x";
let table = "123456789";
let stepsCount = 0;

//for sleep function
function notBusy() {
    busy = false;
}

function stepSaves(id){
    if (turn === "x"){
        table = table.replace(id,"x");
        turn = "o";
    } else {
        table = table.replace(id,"o");
        turn = "x";
    }
    stepsCount++;
    console.log(table);
}
//making divs for cards
function divGenerator(max) {
    let html =``;
    count = 1;
    while (count <= max){
        html += `<div class="cards" id="${count}"></div>`;
        count++;
    }
    return html;
}
//restart the game
function restart(){
    occupied = [];
    busy = false;
    turn = "x";
    table = "123456789";
    stepsCount = 0;
    let currentHeight = window.innerHeight;
    document.querySelector('.playground').style.height = currentHeight - 440;
    const html = divGenerator(9)
    const main = document.querySelector('.playground');
    main.innerHTML = html;
    animPrep();
}
//preparing the table
function animPrep(){
    const allLogos = document.getElementsByClassName('cards');
    for (let i= 0; i< allLogos.length; i++){
        allLogos[i].addEventListener("click", animation.bind(null,i+1));
    }
}
//animation for the steps
function animation(id) {
    if (!occupied.includes(id) && !busy){
        busy = true;
        occupied.push(id);
        const acard = document.getElementById(id);
        if (turn === "x"){
            acard.innerHTML = '<img class="logos" src="./logos/x.png"/>';
            stepSaves(id);
        } else {
            acard.innerHTML = '<img class="logos" src="./logos/o.png"/>';
            stepSaves(id);
        }
        setTimeout(hitChecking, 1000);
        setTimeout(notBusy, 1050);
    }
}
function youWon(winner){
    const allLogos = document.getElementsByClassName('logos');
    for (let i= 0; i< allLogos.length; i++){
        allLogos[i].src= "./backface/cup.png";
        allLogos[i].opacity = 1;
    }
    alert(`The winner is ${winner} !`);
}
//checking the revealed pairs
function hitChecking(){
    if (table.slice(0,3) === "xxx" || 
        table.slice(3,3) === "xxx" || 
        table.slice(6,3) === "xxx" ||
        (table[0] === "x" && table[3] === "x" && table[6] === "x") ||
        (table[1] === "x" && table[4] === "x" && table[7] === "x") ||
        (table[2] === "x" && table[5] === "x" && table[8] === "x") ||
        (table[0] === "x" && table[4] === "x" && table[8] === "x") ||
        (table[2] === "x" && table[4] === "x" && table[6] === "x")){
            youWon('x');
        } else if (table.slice(0,3) === "ooo" || 
            table.slice(3,3) === "ooo" || 
            table.slice(6,3) === "ooo" ||
            (table[0] === "o" && table[3] === "o" && table[6] === "o") ||
            (table[1] === "o" && table[4] === "o" && table[7] === "o") ||
            (table[2] === "o" && table[5] === "o" && table[8] === "o") ||
            (table[0] === "o" && table[4] === "o" && table[8] === "o") ||
            (table[2] === "o" && table[4] === "o" && table[6] === "o")){
                youWon('o');
            } else if (stepsCount === 9){
                youWon('nobody');
        }
}
restart();
const restartButton = document.getElementById('restart-button');
restartButton.onclick = restart;

