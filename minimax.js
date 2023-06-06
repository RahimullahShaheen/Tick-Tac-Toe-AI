//GUI of Board

let scores = {
    X: 1,
    O: -1,
    tie: 0
  };

  //logic to assign AI's turn
function AI(){
    let bestScore = Infinity;
    let bestMove;
      for(let i =0;i<3;i++){
        for(let j=0;j<3;j++){
          if(board[i][j]==''){
            board[i][j]= ai;
            let score = minimax(board,0,false);
            board[i][j] = '';
            if(score<bestScore){
              bestScore = score;
              bestMove = {i,j};
            }
          }
        }
      }
      //assigns and remove that spot from unfilled array
    board[bestMove.i][bestMove.j] = ai;
    unfilled--;
  }
  
  
  function minimax(board,depth,isMax){
    //if it is terminal state
    let result = checkWinner();
    if(result!==null){
      return scores[result];
    }

    //if it is maxmizing's turn
    if(isMax){
      let bestScore = Infinity;
      for(let i =0;i<3;i++){
        for(let j=0;j<3;j++){
          if(board[i][j]==''){
            board[i][j] = ai;
            let score = minimax(board,depth + 1, false);
            board[i][j] = '';
            bestScore = min(score,bestScore);
          }
        }
      }
      return bestScore;
    }
    //if it is minimizing's turn
    else{
      let bestScore = -Infinity;
      for(let i =0;i<3;i++){
        for(let j=0;j<3;j++){
          if(board[i][j]==''){
            board[i][j] = human;
            let score = minimax(board,depth + 1, true);
            board[i][j] = '';
            bestScore = max(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }
  
//checks if it is a terminal state
function checkWinner() {
    let winner = null;
    if (check(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0]
    }
    if (check(board[0][2], board[1][1], board[2][0])) {
        winner = board[2][0];
    }
    for (let i = 0; i < 3; i++) {
      if (check(board[i][0], board[i][1], board[i][2])) {
          winner = board[i][0];
      }
      if (check(board[0][i], board[1][i], board[2][i])) {
          winner = board[0][i];
      }
    }

    let freeSpots = 0;
    for(let i=0;i<3;i++){
      for(let j=0;j<3;j++){
        if(board[i][j] == ''){
          freeSpots++;
        }
      }
    }

    if(winner == null && freeSpots == 0){
      return 'tie';
    }
    else{
      return winner
    }
  }
  
