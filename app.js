const express = require('express');
const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
const url =require("url");
var N;

function isSafe(board, row, col)
{

	// Check this row on left side
	for(let i = 0; i < col; i++){
		if(board[row][i] == 1)
			return false
	}

	// Check upper diagonal on left side
	for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
		if (board[i][j])
			return false

	// Check lower diagonal on left side
	for (i = row, j = col; j >= 0 && i < N; i++, j--)
		if (board[i][j])
			return false

	return true
}

function solveNQUtil(board, col){
	
	if(col >= N)
		return true

	for(let i=0;i<N;i++){

		if(isSafe(board, i, col)==true){
			
			// Place this queen in board[i][col]
			board[i][col] = 1

			// recur to place rest of the queens
			if(solveNQUtil(board, col + 1) == true)
				return true;
			board[i][col] = 0
		}
	}
	return false
}

function solveNQ(board){
    // board[0][0]=5;
    
	if(solveNQUtil(board, 0) == false){
		return false
	}
	return true
}

function matrix(m, n) {
    return Array.from({
      length: m
    }, () => new Array(n).fill(0));
  };
app.get('/',function(req,res){
    res.render("index",{n:0,flag:false});
});
app.post("/",(req,res)=>{
    N=req.body.queen;
    let bs=req.body.boardSize;
    var row=[];
    let board=matrix(N,N);
    for(let i=0;i<N;i++)
    {
        for(let j=1;j<N;j++)
        {
            board[i].push(0);
        }
    }
    
    if(solveNQ(board))
        res.render("index",{mats:board,n:N,flag:false});
     else{
        res.render("index",{mats:board,n:N,flag:true});
     } 
});



const PORT=process.env.PORT||3000


app.listen(PORT, function () {
    console.log(`Server started at ${PORT}`);
});
