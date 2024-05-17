let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newgame = document.querySelector(".newgame");
let msg = document.querySelector(".msg");
let msgView = document.querySelector(".msg-view");

let turnO = true;
let cnt = 0;
const winPattern =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4 ,8],
    [2, 4, 6]
]
const resetGame =() => {
    turnO = true;
    cnt = 0;
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("over");
    }
    msgView.classList.add("hide");
}
boxes.forEach((box) => {
    box.classList.remove("over");
    box.addEventListener("click", () => {
        cnt++;
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }else{
            box.innerText = "X";
            turnO = true;
        }
        box.classList.remove("over");
        box.disabled = true;
        checkWinner(cnt);
    })
    box.addEventListener("mouseover", () => {
        if(box.disabled === false){
            if(turnO) box.innerText = "O"
            else box.innerText = "X";
            box.classList.add("over");
        }
    } )
    box.addEventListener("mouseout", () => {
        if(box.disabled === false){
            box.textContent = "";
            box.classList.remove("over");
        }
    })
})

const checkWinner = (cnt) => {
    for(let pattern of winPattern){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if(pos1 != "" && pos2 != "" && pos2 != "" ){
            if(pos1 === pos2 && pos2 === pos3){
                
                Winner(pos1);
                cnt = 0;
            }
        }
    }
    if(cnt === 9){
        draw();
    }
}

const Winner = (pos) =>{
    console.log("Winner is ", pos);
    msg.innerText = `Congratulation, Winner is ${pos}`;
    msgView.classList.remove("hide");
    for(let box of boxes){
        box.disabled = true;
    }
}

const draw = () => {
    msg.innerText = "Draw";
    msgView.classList.remove("hide");
}

reset.addEventListener("click", resetGame);
newgame.addEventListener("click", resetGame);