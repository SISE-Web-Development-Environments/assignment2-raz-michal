var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var canvas;

var moveup;
var movedown;
var moveright;
var moveleft;
var colorfive;
var colorfifteen;
var colortwentyfive;
var numofballs;
var gametime;
var numofghosts;

var pacmanAngle = 4;
var wall;
var newClock;
var xTime;
var yTime;

function saveUp(event) {
	moveup = event.keyCode;
	if (moveup == 27) {  // 27 is the ESC key
		alert ("You pressed the Escape key!");
	}
}
function saveDown(event) {
	movedown = event.keyCode;
	if (movedown == 27) {  // 27 is the ESC key
		alert ("You pressed the Escape key!");
	}
}
function saveRight(event) {
	moveright = event.keyCode;
	if (moveright == 27) {  // 27 is the ESC key
		alert ("You pressed the Escape key!");
	}
}
function saveLeft(event) {
	moveleft = event.keyCode;
	if (moveleft == 27) {  // 27 is the ESC key
		alert ("You pressed the Escape key!");
	}
}

$(document).ready(function() {
	wall= new Image();
	wall.src="src/wall.png";
	newClock=new Image();
	newClock.src="src/clock.png";
	canvas=document.getElementById("canvas");
	context = canvas.getContext("2d");

	/* DELETE IT !!!! */
	moveup=38;
	moveright=39;
	movedown=40;
	moveleft=37;
	colorfive = "red";
	colorfifteen = "blue"
	colortwentyfive = "green"
	numofballs= 70;
	gametime= 60;
	numofghosts= 3;
	/* DELETE IT!!! */


	/*
        $("#btnSaveSettings").click(function (event) {
            event.preventDefault();
            moveup = $("#moveup").val();
            movedown = $("#movedown").val();
            moveright = $("#moveright").val();
            moveleft = $("#moveleft").val();
            colorfive = $("#colorfive").val();
            colorfifteen = $("#colorfifteen").val();
            colortwentyfive = $("#colortwentyfive").val();
            numofballs = $("#numofballs").val();
            gametime = $("#gametime").val();
            numofghosts = $("#numofghosts").val();
            if (moveup == '' || movedown == '' || moveright == '' || moveleft == '' || colorfive == '' || colorfifteen == '' || colortwentyfive == '' || numofballs == '' || gametime == '' || numofghosts == '') {
                alert("Please fill all fields!");
            } else if (numofballs < 50 || numofballs >90) {
                alert("Number of balls must be between 50 and 90!");
            } else if (gametime < 60) {
                alert("Minimal game time is 60 seconds!");
            } else if (numofghosts < 1 || numofghosts > 4) {
                alert("Number of ghosts must be between 1 and 4!");
            }else if (colorfive==colorfifteen || colorfifteen == colortwentyfive || colortwentyfive == colorfive) {
                alert("The colors of the balls must be different!");
            }else if (moveup==movedown || movedown == moveright || moveright == moveleft || moveleft == moveup || moveup == moveright || movedown == moveleft) {
                alert("The moving keys must be different!");
            } else {
                document.getElementById('username').value = null;
                document.getElementById('password').value = null;
                var e1 = document.getElementById("choosesettings");
                e1.style.display = 'none';
                var e2 = document.getElementById("gamewindow");
                e2.style.display = 'block';
                Start();
            }
        });

        $("#btnSaveRandom").click(function (event) {
            event.preventDefault();
            moveup = 38;
            movedown = 40;
            moveright = 39;
            moveleft = 37;
            colorfive = "#ddeedd";
            colorfifteen = "#c2d4dd";
            colortwentyfive = "#b0aac0";
            numofballs = Math.floor(Math.random() * 41) + 50;
            gametime = Math.floor(Math.random() * 120) + 60;
            numofghosts = Math.floor(Math.random() * 4) + 1;
            var e1 = document.getElementById("choosesettings");
            e1.style.display = 'none';
            var e2 = document.getElementById("gamewindow");
            e2.style.display = 'block';
            Start();
        });

    */
	Start();
});


// game function

function Start() {

	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var s_food = food_remain * 0.6;
	var m_food = food_remain * 0.3;
	var l_food = food_remain * 0.1;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 3 && j == 6) ||
				(i == 4 && j == 6) ||
				(i == 5 && j == 6) ||
				(i == 5 && j == 5) ||
				(i == 5 && j == 4) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2) ||
				(i == 5 && j == 2)

			) {
				board[i][j] = 4;
			}else if((i == 0 && j == 0) ||
				(i == 0 && j == 9) && numofghosts>1||
				(i == 9 && j == 9) && numofghosts>2){
				board[i][j] = 1;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					var randomFood = Math.floor(Math.random() * 3);
					if(randomFood == 0 && s_food>0){
						s_food--;
						board[i][j] = 5;
					}else if(randomFood ==1 && m_food>0) {
						m_food--;
						board[i][j] = 6;
					}else if(randomFood ==2 && l_food>0) {
						l_food--;
						board[i][j] = 7;
					}
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		food_remain--;
		if(s_food>0){
			s_food--;
			board[emptyCell[0]][emptyCell[1]] = 5;
		}else if(m_food>0) {
			m_food--;
			board[emptyCell[0]][emptyCell[1]] = 6;
		}else if(l_food>0) {
			l_food--;
			board[emptyCell[0]][emptyCell[1]] = 7;
		}
	}
	var emptyCell = findRandomEmptyCell(board);
	xTime = emptyCell[0];
	yTime = emptyCell[1];
	board[emptyCell[0]][emptyCell[1]] = 3 ;
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[moveup]) {
		return 1;
	}
	if (keysDown[movedown]) {
		return 2;
	}
	if (keysDown[moveleft]) {
		return 3;
	}
	if (keysDown[moveright]) {
		return 4;
	}
}

function Draw() {
	var background = new Image();
	background.src = "src/Wiki-background.jpg";
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				if (pacmanAngle==1) {
					context.arc(center.x, center.y, 20, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
				}
				if (pacmanAngle==2) {
					context.arc(center.x, center.y, 20, 0.75 * Math.PI, 0.25 * Math.PI); // half circle
				}
				if (pacmanAngle==3) {
					context.arc(center.x, center.y, 20, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
				}
				if (pacmanAngle==4) {
					context.arc(center.x, center.y, 20, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				}
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				if (pacmanAngle==1 || pacmanAngle==2){
					context.arc(center.x + 10, center.y - 10, 3, 0, 2 * Math.PI); // circle
				}
				if (pacmanAngle==3 || pacmanAngle==4){
					context.arc(center.x + 5, center.y - 15, 3, 0, 2 * Math.PI); // circle
				}
				context.fillStyle = "black"; //color
				context.fill();
			}else if (board[i][j] == 1) {
				// pint ghost
				context.beginPath();
				context.arc(center.x, center.y, 20, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = "red"; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 3, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}else if (board[i][j] == 4) {
				context.drawImage(wall,center.x - 30, center.y - 30, 60, 60 );
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = colorfive; //color
				context.fill();
			} else if (board[i][j] == 6) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = colorfifteen; //color
				context.fill();
			} else if (board[i][j] == 7) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = colortwentyfive; //color
				context.fill();
			} else if (board[i][j] == 3){
				context.drawImage(newClock, center.x - 30, center.y - 30, 60, 60);
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
			pacmanAngle=1;
		}
	}
	else if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			pacmanAngle=2;
		}
	}
	else if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			pacmanAngle=3;
		}
	}
	else if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			pacmanAngle=4;
		}
	}
	if (board[shape.i][shape.j] > 4) {
		if(board[shape.i][shape.j] == 5){
			score+=5;
		}
		else if(board[shape.i][shape.j] == 6){
			score+=15;
		}
		else if(board[shape.i][shape.j] == 7){
			score+=25;
		}
	}else if(board[shape.i][shape.j] == 1){
		alert("You have been eaten by a ghost!");
		//add loosing life and back to game if has mor life
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}
