
const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".options .playerX"),
selectOBtn = selectBox.querySelector(".options .playerO"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");
window.onload = ()=>{
    for (let i = 0; i < allBox.length; i++) {
       allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}
selectXBtn.onclick = ()=>{
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
}
selectOBtn.onclick = ()=>{ 
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
}
let playerXIcon = "fas fa-times",
playerOIcon = "far fa-circle",
playerSign = "X",
runAuto = true;
function clickedBox(element){
    if(players.classList.contains("player")){
        playerSign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        element.setAttribute("id", playerSign);
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    }
    winner();
    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";
    let timeDelay = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(()=>{
        auto(runAuto);
    }, timeDelay);
}
function auto(){
    let array = [];
    if(runAuto){
        playerSign = "O";
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0){
                array.push(i);
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if(array.length > 0){
            if(players.classList.contains("player")){ 
                playerSign = "X";
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                allBox[randomBox].setAttribute("id", playerSign);
                players.classList.add("active");
            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            winner();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";
    }
}
function getId(idname){
    return document.querySelector(".box" + idname).id;
}
function checkId(val1, val2, val3, sign){ 
    if(getId(val1) == sign && getId(val2) == sign && getId(val3) == sign){
        return true;
    }
}
function winner(){
    if(checkId(1,2,3,playerSign) || checkId(4,5,6, playerSign) || checkId(7,8,9, playerSign) || checkId(1,4,7, playerSign) || checkId(2,5,8, playerSign) || checkId(3,6,9, playerSign) || checkId(1,5,9, playerSign) || checkId(3,5,7, playerSign)){
        runAuto = false;
        auto(runAuto);
        setTimeout(()=>{
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700);
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    }else{
        if(getId(1) != "" && getId(2) != "" && getId(3) != "" && getId(4) != "" && getId(5) != "" && getId(6) != "" && getId(7) != "" && getId(8) != "" && getId(9) != ""){
            runAuto = false;
            auto(runAuto);
            setTimeout(()=>{
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700);
            wonText.innerHTML = "Match has been drawn!";
        }
    }
}
replayBtn.onclick = ()=>{
    window.location.reload();
}