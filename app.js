var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var canvas;
var life_left;
var maxScore;
var time_left;
var audio = new Audio('src/pacmanSong.mp3');

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
var ghost1_x = -1;
var ghost1_y = -1;
var ghost2_x = -1;
var ghost2_y = -1;
var ghost3_x = -1;
var ghost3_y = -1;
var ghost4_x = -1;
var ghost4_y = -1;

var interval;
var ghostsInterval;
var timeInteval;


function saveUp(event) {
    moveup = event.keyCode;
    if (moveup == 27) {  // 27 is the ESC key
        alert("You pressed the Escape key!");
    }
}

function saveDown(event) {
    movedown = event.keyCode;
    if (movedown == 27) {  // 27 is the ESC key
        alert("You pressed the Escape key!");
    }
}

function saveRight(event) {
    moveright = event.keyCode;
    if (moveright == 27) {  // 27 is the ESC key
        alert("You pressed the Escape key!");
    }
}

function saveLeft(event) {
    moveleft = event.keyCode;
    if (moveleft == 27) {  // 27 is the ESC key
        alert("You pressed the Escape key!");
    }
}

$(document).ready(function () {
    wall = new Image();
    wall.src = "src/wall.png";
    newClock = new Image();
    newClock.src = "src/clock.png";
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    audio.pause();
    /* DELETE IT !!!! */
    moveup = 38;
    moveright = 39;
    movedown = 40;
    moveleft = 37;
    colorfive = "red";
    colorfifteen = "blue"
    colortwentyfive = "green"
    numofballs = 70;
    gametime = 60;
    numofghosts = 4;
    life_left = 5;
    maxScore = (numofballs * 0.6 * 5) + (numofballs * 0.3 * 15) + (numofballs * 0.1 * 25);
    time_left = gametime;
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
            life_left = 5;
            maxScore = (numofballs*0.6*5) + (numofballs*0.3*15) + (numofballs*0.1*25);
            time_left = gametime;
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
            life_left = 5;
            maxScore = (numofballs*0.6*5) + (numofballs*0.3*15) + (numofballs*0.1*25);
            time_left = gametime;
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
    audio.play();
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
    intializeGhostPosition();
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
            } else if
            ((i == 0 && j == 0) || (i == 0 && j == 9) && numofghosts > 1 || (i == 9 && j == 9) && numofghosts > 2 || (i == 9 && j == 0) && numofghosts > 3) {
                board[i][j] = 1;
            } else {
                var randomNum = Math.random();
                if (randomNum <= (1.0 * food_remain) / cnt) {
                    food_remain--;
                    var randomFood = Math.floor(Math.random() * 3);
                    if (randomFood == 0 && s_food > 0) {
                        s_food--;
                        board[i][j] = 5;
                    } else if (randomFood == 1 && m_food > 0) {
                        m_food--;
                        board[i][j] = 6;
                    } else if (randomFood == 2 && l_food > 0) {
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
        if (s_food > 0) {
            s_food--;
            board[emptyCell[0]][emptyCell[1]] = 5;
        } else if (m_food > 0) {
            m_food--;
            board[emptyCell[0]][emptyCell[1]] = 6;
        } else if (l_food > 0) {
            l_food--;
            board[emptyCell[0]][emptyCell[1]] = 7;
        }
    }
    var emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = 3;
    keysDown = {};
    addEventListener(
        "keydown",
        function (e) {
            keysDown[e.keyCode] = true;
        },
        false
    );
    addEventListener(
        "keyup",
        function (e) {
            keysDown[e.keyCode] = false;
        },
        false
    );
    interval = setInterval(UpdatePosition, 100);
    ghostsInterval = setInterval(moveAllTheGhosts, 500);
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
    audio.play();
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
                if (pacmanAngle == 1) {
                    context.arc(center.x, center.y, 20, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
                }
                if (pacmanAngle == 2) {
                    context.arc(center.x, center.y, 20, 0.75 * Math.PI, 0.25 * Math.PI); // half circle
                }
                if (pacmanAngle == 3) {
                    context.arc(center.x, center.y, 20, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
                }
                if (pacmanAngle == 4) {
                    context.arc(center.x, center.y, 20, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                }
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                if (pacmanAngle == 1 || pacmanAngle == 2) {
                    context.arc(center.x + 10, center.y - 10, 3, 0, 2 * Math.PI); // circle
                }
                if (pacmanAngle == 3 || pacmanAngle == 4) {
                    context.arc(center.x + 5, center.y - 15, 3, 0, 2 * Math.PI); // circle
                }
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] == 1) {
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
            } else if (board[i][j] == 4) {
                context.drawImage(wall, center.x - 30, center.y - 30, 60, 60);
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
            } else if (board[i][j] == 3) {
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
            pacmanAngle = 1;
        }
    } else if (x == 2) {
        if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
            shape.j++;
            pacmanAngle = 2;
        }
    } else if (x == 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
            shape.i--;
            pacmanAngle = 3;
        }
    } else if (x == 4) {
        if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
            shape.i++;
            pacmanAngle = 4;
        }
    }
    if (board[shape.i][shape.j] == 1) {
        ghostTouch();
    } else if (board[shape.i][shape.j] == 3) {
        time_left += 30;
    } else if (board[shape.i][shape.j] > 4) {
        if (board[shape.i][shape.j] == 5) {
            score += 5;
        } else if (board[shape.i][shape.j] == 6) {
            score += 15;
        } else if (board[shape.i][shape.j] == 7) {
            score += 25;
        }
    }
    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    time_left = gametime - time_elapsed;
    if (score >= 20 && time_left <= 10) {
        pac_color = "grey";
    }
    if (score >= 400) {
        window.clearInterval(interval);
        window.alert("Game completed, you win!");
        audio.pause();
    } else if (time_left <= 0) {
        window.clearInterval(interval);
        alert("time out, your time is out");
    } else {
        Draw();
    }
}


function ghostTouch() {
    if (life_left > 0) {
        alert("You have been eaten by a ghost!");
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 2;
        life_left--;
        score -= 10;
        resetGhostLocation();
        Draw();
    } else {
        audio.pause();
        alert("Sorry Game Over, you lost");
        window.clearInterval(ghostsInterval);
        window.clearInterval(interval);
    }
}


function resetGhostLocation() {
    intializeGhostPosition();
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if ((i == 0 && j == 0) ||  (i == 0 && j == 9) && numofghosts > 1 || (i == 9 && j == 9) && numofghosts > 2 || (i == 9 && j == 0) && numofghosts > 3) {
                board[i][j] = 1
            } else if (board[i][j] == 1) {
                board[i][j] = 0
            } else if (board[i][j] == 2) {
                board[i][j] = 0;
            }
        }
    }
}

function intializeGhostPosition() {
    if (numofghosts >= 1) {
        ghost1_x = 0;
        ghost1_y = 0;
    }
    if (numofghosts >= 2) {
        ghost2_x = 0;
        ghost2_y = 9;
    }
    if (numofghosts >= 3) {
        ghost3_x = 9;
        ghost3_y = 9;
    }
    if (numofghosts == 4) {
        ghost4_x = 9;
        ghost4_y = 0;
    }
}


function moveAllTheGhosts() {
    if (numofghosts >= 1) {
        FindBestPathForGhost(1, ghost1_x, ghost1_y);
    }
    if (numofghosts >= 2) {
        FindBestPathForGhost(2, ghost2_x, ghost2_y);
    }
    if (numofghosts >= 3) {
        FindBestPathForGhost(3, ghost3_x, ghost3_y);
    }
    if (numofghosts >= 4) {
        FindBestPathForGhost(4, ghost4_x, ghost4_y);
    }


}

function FindBestPathForGhost(ghostNumber, X, Y) {
    var left = getTheBestMove(X - 1, Y);
    var down = getTheBestMove(X, Y - 1);
    var right = getTheBestMove(X + 1, Y);
    var up = getTheBestMove(X, Y + 1);
    board[X][Y] = 0;
    var bestMove = Math.min(left, down, right, up);
    if (bestMove == left){
        moveSingleGhost(ghostNumber, X - 1, Y);
    }
    else if (bestMove == down) {
        moveSingleGhost(ghostNumber, X, Y - 1);
    }
    else if (bestMove == right) {
        moveSingleGhost(ghostNumber, X + 1, Y);
    }
    else if (bestMove == up) {
        moveSingleGhost(ghostNumber, X, Y + 1);
    }
}


function getTheBestMove(X, Y) {
    if (!checkMoveForGhost(X, Y)) {
        return 10000;
    }
    return Math.sqrt((shape.i - X) * (shape.i - X) + (shape.j - Y) * (shape.j - Y));
}

function checkMoveForGhost(X, Y) {
    if (X < 0 || Y < 0 || X > 9 || Y > 9 || board[X][Y] == 4 || (X == ghost1_x && Y == ghost1_y) ||
        (X == ghost2_x && Y == ghost2_y) || (X == ghost3_x && Y == ghost3_y) || (X == ghost4_x && Y == ghost4_y)) {
        return false;
    }
    return true;
}

function moveSingleGhost(ghostNumber, X, Y) {
    if (ghostNumber == 1) {
        ghost1_x = X;
        ghost1_y = Y;
    } else if (ghostNumber == 2) {
        ghost2_x = X;
        ghost2_y = Y;
    } else if (ghostNumber == 3) {
        ghost3_x = X;
        ghost3_y = Y;
    } else if (ghostNumber == 4) {
        ghost4_x = X;
        ghost4_y = Y;
    }
    if (board[X][Y]==2){
        ghostTouch();
    }
    else {
        board[X][Y] = 1;
    }
}

function updateTime(){
    start_time=new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    time_left = gametime - time_elapsed;


}




