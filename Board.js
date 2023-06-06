

let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  
  let unfilled =  9;
  let canvas;
  let player = ["X", "O"];
  let m;
  let result;
  let currentPlayer;
  let human = "X";
  let ai = 'O';
  

  
  function setup() {
    result = document.getElementById("won");
    canvas = createCanvas(400, 400);
    m = width / 3;
    canvas.mousePressed(Assign);
  }
  
  //it is executed in loop
  function draw() {
    background(0);
    drawboard();
    drawshape();

    //check every time for termination state
    if (unfilled!= 9) 
      won();
    checkDraw();
  }
  
  //when the human click on specific square it assigns the specific value
  function Assign() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        //checks if it is empty and correct position
          if (
            mouseX > m * i &&
            mouseY > m * j &&
            mouseX < m * (i + 1) &&
            mouseY < m * (j + 1) && 
            board[j][i] == ''
          ) {
            board[j][i] = human;
            unfilled--;
          if(unfilled>0){
            won();
            AI();  //after human play AI is executed
          }
          }
      }
    }
  }
  
  
  //check for the win condition
  function won() {
    if (check(board[0][0], board[1][1], board[2][2])) {
      noLoop();
      result.textContent = "WON " + board[1][1];
      console.log("1");
      stroke(255, 0, 0);
      strokeWeight(15);
      line(0, 0, width, height);
    }
    if (check(board[0][2], board[1][1], board[2][0])) {
      noLoop();
      result.textContent = "THE WINNER IS " + board[1][1];
      console.log("2");
      stroke(255, 0, 0);
      strokeWeight(15);
      line(width, 0, 0, height);
    }
    for (let i = 0; i < 3; i++) {
      if (check(board[i][0], board[i][1], board[i][2])) {
        noLoop();
        result.textContent = "WON " + board[i][0];
        console.log("3");
        stroke(255, 0, 0);
        strokeWeight(15);
        line(0, (m * i + m * (i + 1)) / 2, height, (m * i + m * (i + 1)) / 2);
      }
      if (check(board[0][i], board[1][i], board[2][i])) {
        noLoop();
        result.textContent = "WON " + board[0][i];
        console.log("4");
        stroke(255, 0, 0);
        strokeWeight(15);
        line((m * i + m * (i + 1)) / 2, 0, (m * i + m * (i + 1)) / 2, height);
      }
    }
  }
  
  
  //checks if the specific space is filled or not filled
  function check(a, b, c) {
    if (a != "" && b != "" && c != "") {
      if (a == b && b == c) return true;
    }
    return false;
  }
  
  
  //draws board on the canvas
  function drawboard() {
    for (let i = 1; i < 3; i++) {
      for (let j = 1; j < 3; j++) {
        stroke(255);
        strokeWeight(10);
        line(0, m * i, width, m * i);
        line(m * j, 0, m * j, height);
      }
    }
  }
  
  
  //it Draws X or O based on the turn
  function drawshape() {
    stroke(5);
    let o = 20;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (player[1] == board[j][i]) {
          stroke(255);
          noFill();
          ellipse(m / 2 + m * i, m / 2 + m * j, 100, 100);
        }
        if (player[0] == board[j][i]) {
            stroke(255);
          line((m * i)+o, (m * j)+o,((i + 1) * m)-o, ((j + 1) * m)-o);
          line((m * (i + 1))-o, (m * j)+o, (i * m)+o, ((j + 1) * m)-o);
        }
      }
    }
  }
  
  //checks if there is a draw and black the canvas
  function checkDraw() {
    if (unfilled == 0) {
      fill(255);
      // rect(width, height, 400, 400);
      rect(0,0,width,height)
      fill(0);
      textSize(30);
      textAlign(CENTER)
      text("Draw", width / 2, height / 2);
    }
  }
  