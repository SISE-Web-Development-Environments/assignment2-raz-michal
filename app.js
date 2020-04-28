var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var canvas;
var life_left;
var time_left;
var balls_eaten;
var audio= new Audio('src/pacmanSong.mp3');

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

var pacmanAngle = 2;
var wall;
var ghost;
var angel;
var newClock;
var medicine;
var ghost1_x = -1;
var ghost1_y = -1;
var ghost2_x = -1;
var ghost2_y = -1;
var ghost3_x = -1;
var ghost3_y = -1;
var ghost4_x = -1;
var ghost4_y = -1;
var angel_x = -1;
var angel_y = -1;

var interval;
var ghostsInterval;
var angelInteval;

$(document).ready(function () {
    wall = new Image();
    wall.src = "src/wall.png";
    ghost = new Image();
    ghost.src = "src/ghost.png";
    newClock = new Image();
    newClock.src = "src/clock.png";
    medicine = new Image();
    medicine.src = "src/madicine.png";
    angel = new Image();
    angel.src = "src/angel.png";
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    audio.pause();
    const left = document.getElementById('moveleft');
    left.addEventListener("keydown", function(event) {
        event.preventDefault();
        moveleft=event.keyCode;
        left.placeholder=event.key;
    });
    const right = document.getElementById('moveright');
    right.addEventListener("keydown", function(event1) {
        event1.preventDefault();
        moveright=event1.keyCode;
        right.placeholder=event1.key;
    });
    const up = document.getElementById('moveup');
    up.addEventListener("keydown", function(event2) {
        event2.preventDefault();
        moveup=event2.keyCode;
        up.placeholder=event2.key;
    });
    const down = document.getElementById('movedown');
    down.addEventListener("keydown", function(event3) {
        event3.preventDefault();
        movedown=event3.keyCode;
        down.placeholder=event3.key;
    });


    $("#btnSaveSettings").click(function (event) {
            event.preventDefault();
            colorfive = $("#colorfive").val();
            colorfifteen = $("#colorfifteen").val();
            colortwentyfive = $("#colortwentyfive").val();
            numofballs = $("#numofballs").val();
            gametime = $("#gametime").val();
            numofghosts = $("#numofghosts").val();
            life_left = 5;
            time_left = gametime;
            if (moveup == '' || movedown == '' || moveright == '' || moveleft == '' || colorfive == '' || colorfifteen == '' || colortwentyfive == '' || numofballs == '' || gametime == '' || numofghosts == '') {
                alert("Please fill all fields!");
                show_game_settings();
            } else if (numofballs < 50 || numofballs >90) {
                alert("Number of balls must be between 50 and 90!");
                show_game_settings();
            } else if (gametime < 60) {
                alert("Minimal game time is 60 seconds!");
                show_game_settings();
            } else if (numofghosts < 1 || numofghosts > 4) {
                alert("Number of ghosts must be between 1 and 4!");
                show_game_settings();
            }else if (colorfive==colorfifteen || colorfifteen == colortwentyfive || colortwentyfive == colorfive) {
                alert("The colors of the balls must be different!");
                show_game_settings();
            }else if (moveup==movedown || movedown == moveright || moveright == moveleft || moveleft == moveup || moveup == moveright || movedown == moveleft) {
                alert("The moving keys must be different!");
                show_game_settings();
            } else {
                document.getElementById('username').value = null;
                document.getElementById('password').value = null;
                lblInfoballs.value = numofballs;
                lblInfoRoundTime.value = gametime;
                lblInfo.value = "the game is on :) ";
                lblLifeLeft.value = life_left;
                show_only_game();
                Start();
            }
        });

        $("#btnRandom").click(function (event) {
            event.preventDefault();
            show_only_game();
            moveup = 38;
            movedown = 40;
            moveright = 39;
            moveleft = 37;
            colorfive = "blue";
            colorfifteen = "purple";
            colortwentyfive = "red";
            numofballs = Math.floor(Math.random() * 41) + 50;
            gametime = Math.floor(Math.random() * 120) + 60;
            numofghosts = Math.floor(Math.random() * 4) + 1;
            life_left = 5;
            time_left = gametime;
            lblInfoballs.value = numofballs;
            lblInfoRoundTime.value = gametime;
            lblInfo.value = "the game is on :) ";
            lblLifeLeft.value = life_left;
            Start();
        });

});


// game function


function Start() {
    audio.play();
    board = new Array();
    score = 0;
    pac_color = "yellow";
    balls_eaten = 0;
    var cnt = 150;
    var food_remain = numofballs;
    var m_food = Math.floor(food_remain * 0.3);
    var l_food = Math.floor(food_remain * 0.1);
    var s_food = numofballs - l_food - m_food ;
    var pacman_remain = 1;
    var medeicine = 1;
    start_time = new Date();
    intializeGhostPosition();
    for (var i = 0; i < 15; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 15; j++) {
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
                (i == 5 && j == 2) ||

                (i == 8 && j == 11) ||
                (i == 8 && j == 10) ||
                (i == 8 && j == 9) ||
                (i == 8 && j == 8) ||
                (i == 9 && j == 8) ||
                (i == 10 && j == 8) ||
                (i == 11 && j == 8) ||
                (i == 11 && j == 9) ||
                (i == 11 && j == 10) ||
                (i == 12 && j == 10) ||
                (i == 12 && j == 11) ||
                (i == 12 && j == 12) ||
                (i == 13 && j == 12)
            ) {
                board[i][j] = 4;
            } else if
            ((i == 0 && j == 0) || (i == 0 && j == 14) && numofghosts > 1 || (i == 14 && j == 14) && numofghosts > 2 || (i == 14 && j == 0) && numofghosts > 3) {
                board[i][j] = 0;
            } else {
                var randomNum = Math.random();
                if (randomNum <= (1.0 * food_remain) / cnt) {
                    var randomFood = Math.floor(Math.random() * 3);
                    if (randomFood == 0 && s_food > 0) {
                        s_food--;
                        food_remain--;
                        board[i][j] = 5;
                    } else if (randomFood == 1 && m_food > 0) {
                        m_food--;
                        food_remain--;
                        board[i][j] = 6;
                    } else if (randomFood == 2 && l_food > 0) {
                        l_food--;
                        food_remain--;
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
        var emptyCell = findRandomEmptyCell();
        if (s_food > 0) {
            s_food--;
            food_remain--;
            board[emptyCell[0]][emptyCell[1]] = 5;
        } else if (m_food > 0) {
            m_food--;
            food_remain--;
            board[emptyCell[0]][emptyCell[1]] = 6;
        } else if (l_food > 0) {
            l_food--;
            food_remain--;
            board[emptyCell[0]][emptyCell[1]] = 7;
        }
    }
    if(medeicine > 0){
        var emptyCell = findRandomEmptyCell();
        board[emptyCell[0]][emptyCell[1]] = 8;
    }
    var emptyCell = findRandomEmptyCell();
    board[emptyCell[0]][emptyCell[1]] = 3;
    var emptyCell = findRandomEmptyCell();
    angel_x=emptyCell[0];
    angel_y=emptyCell[1];
    intializeGhostPosition();
    initiateKeyListener();
    interval = setInterval(UpdatePosition, 150);
    ghostsInterval = setInterval(moveAllTheGhosts, 1500);
    angelInteval = setInterval(angelMove,250);

}

function findRandomEmptyCell() {
    var i = Math.floor(Math.random() * 14 + 1);
    var j = Math.floor(Math.random() * 14 + 1);
    while (board[i][j] != 0) {
        i = Math.floor(Math.random() * 14 + 1);
        j = Math.floor(Math.random() * 14 + 1);
    }
    return [i, j];
}

function findRandomEmptyCellInMiddle() {
    var i = Math.floor(Math.random() * 8 + 3);
    var j = Math.floor(Math.random() * 8 + 3);
    while (board[i][j] != 0) {
        i = Math.floor(Math.random() * 8 + 3);
        j = Math.floor(Math.random() * 8 + 3);
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
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            var center = new Object();
            center.x = i * 40 + 20;
            center.y = j * 40 + 20;
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
            } else if (board[i][j] == 4) {
                context.drawImage(wall, center.x - 20, center.y - 20, 40, 40);
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
                context.drawImage(newClock, center.x - 20, center.y - 20, 40, 40);
            } else if (board[i][j] == 8) {
                context.drawImage(medicine, center.x - 20, center.y - 20, 40, 40);
            }
        }
    }
    if (ghost1_x!=-1) {
        context.drawImage(ghost, ghost1_x*40, ghost1_y*40, 50, 50);
    }
    if (ghost2_x!=-1) {
        context.drawImage(ghost, ghost2_x*40, ghost2_y*40, 50, 50);
    }
    if (ghost3_x!=-1) {
        context.drawImage(ghost, ghost3_x*40, ghost3_y*40, 50, 50);
    }
    if (ghost4_x!=-1) {
        context.drawImage(ghost, ghost4_x*40, ghost4_y*40, 50, 50);
    }
    if (angel_x!=-1) {
        context.drawImage(angel, angel_x *40, angel_y *40, 50, 50);
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
        if (shape.j < 14 && board[shape.i][shape.j + 1] != 4) {
            shape.j++;
            pacmanAngle = 2;
        }
    } else if (x == 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
            shape.i--;
            pacmanAngle = 3;
        }
    } else if (x == 4) {
        if (shape.i < 14 && board[shape.i + 1][shape.j] != 4) {
            shape.i++;
            pacmanAngle = 4;
        }
    }
    if ((shape.i==ghost1_x && shape.j == ghost1_y) || (shape.i==ghost2_x && shape.j == ghost2_y) ||
        (shape.i==ghost3_x && shape.j == ghost3_y) || (shape.i==ghost4_x && shape.j == ghost4_y)) {
        ghostTouch();
    } else if (board[shape.i][shape.j] == 3) {
        time_left += 30;
        //window.alert("you have earned extra time :) ");
        lblInfo.value = "you earned extra time :)";
        board[shape.i][shape.j] = 2;
    } else if (board[shape.i][shape.j] > 4) {
        if (board[shape.i][shape.j] == 5) {
            score += 5;
            balls_eaten++;
        } else if (board[shape.i][shape.j] == 6) {
            score += 15;
            balls_eaten++;
        } else if (board[shape.i][shape.j] == 7) {
            score += 25;
            balls_eaten++;
        } else if (board[shape.i][shape.j] == 8) {
            life_left++;
            lblInfo.value = "you earned extra life :)";
            lblLifeLeft.value = life_left;
            //window.alert("you have earned extra life :) ");
        }
    }
    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    time_left = gametime - time_elapsed;
    if (time_left <= 15) {
        pac_color = "grey";
        lblInfo.value = "ou ou time is running out";
    }
    if (balls_eaten == numofballs) {
        endGame();
    } else if (time_left <= 0) {
        endGame();
    } else {
        Draw();
    }
}


function initiateKeyListener() {
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);
    return keysDown;
}

function ghostTouch() {
    if (life_left > 0) {
        window.alert("You have been eaten by a ghost!");
        initiateKeyListener();
        intializeGhostPosition();
        life_left--;
        score -= 10;
        board[shape.i][shape.j]=0;
        var emptyCell = findRandomEmptyCellInMiddle();
        board[emptyCell[0]][emptyCell[1]] = 2;
        shape.i= emptyCell[0];
        shape.j= emptyCell[1];
        position=3;
        lblInfo.value = "don't let them eat you!";
        lblLifeLeft.value = life_left;
    } else {
        //window.alert("Sorry Game Over, you lost");
        endGame();

    }
}

function intializeGhostPosition() {
    if (numofghosts >= 1) {
        ghost1_x = 0;
        ghost1_y = 0;
    }
    if (numofghosts >= 2) {
        ghost2_x = 0;
        ghost2_y = 14;
    }
    if (numofghosts >= 3) {
        ghost3_x = 14;
        ghost3_y = 14;
    }
    if (numofghosts == 4) {
        ghost4_x = 14;
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

function getTheBestMove(X, Y) {
    if (!checkMoveForGhost(X, Y)) {
        return 10000;
    }
    return Math.sqrt((shape.i - X) * (shape.i - X) + (shape.j - Y) * (shape.j - Y));
}
function checkMoveForGhost(X, Y) {
    if (X < 0 || Y < 0 || X > 14 || Y > 14 || board[X][Y]==4) {
        return false;
    }
    return true;
}

function FindBestPathForGhost(ghostNumber, X, Y) {
    if (X < 0 || Y < 0 || X > 14 || Y > 14) {
        return;
    }
    var left = getTheBestMove(X - 1, Y);
    var down = getTheBestMove( X, Y - 1);
    var right = getTheBestMove(X + 1, Y);
    var up = getTheBestMove( X, Y + 1);
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


function checkMoveForAngel(X, Y) {
    if (X < 0 || Y < 0 || X > 14 || Y > 14 || board[X][Y] == 4 || (X == ghost1_x && Y == ghost1_y) ||
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
    if (shape.i==X && shape.j==Y){
        ghostTouch();
    }
}

function angelMove(){
    if( angel_x!=-1 && angel_y!=-1) {
        var move = Math.floor(Math.random() * Math.floor(4));
        if (move == 3 && checkMoveForAngel(angel_x - 1, angel_y)) {
            angel_x--;
        } else if (move == 1 && checkMoveForAngel(angel_x, angel_y + 1)) {
            angel_y++;
        } else if (move == 4 && checkMoveForAngel(angel_x + 1, angel_y)) {
            angel_x++;
        } else if (move == 0 && checkMoveForAngel(angel_x, angel_y - 1)) {
            angel_y--;
        }
        if (board[angel_x][angel_y] == 2) {
            score += 50;
            angel_x = -1;
            angel_y = -1;
        }
    }
}

function updateTime(){
    start_time=new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    time_left = gametime - time_elapsed;
}

function endGame() {
    audio.pause();
    lblFScore.value = score;
    window.clearInterval(ghostsInterval);
    window.clearInterval(interval);
    window.clearInterval(angelInteval);
    if (score >= 100 && life_left > 0) {
        lblInfo.value = "good job :) ";
        lblpresent1.value = "WINNER!!!";
    }else if(score < 100 && life_left > 0){
        lblInfo.value = "maybe next time";
        lblpresent1.value = "You are better then" + score + " points!";
    }else{
        lblInfo.value = "maybe next time";
        lblpresent1.value = "LOSER";
    }
    var e1 = document.getElementById("gameEndModal");
    e1.style.display = 'block';
    var e2 = document.getElementById("myGame");
    e2.style.display = 'none';
}

function show_only_game() {
    var e1 = document.getElementById("welcome");
    e1.style.display = 'none';
    var e2 = document.getElementById("register");
    e2.style.display = 'none';
    var e3 = document.getElementById("login");
    e3.style.display = 'none';
    var e4 = document.getElementById("myModal");
    e4.style.display = 'none';
    var e5 = document.getElementById("myGame");
    e5.style.display = 'block';
    var e6 = document.getElementById("choosesettings");
    e6.style.display = 'none';
    var e7 = document.getElementById("gamewindow");
    e7.style.display = 'block';
}

function show_game_settings() {
    var e1 = document.getElementById("welcome");
    e1.style.display = 'none';
    var e2 = document.getElementById("register");
    e2.style.display = 'none';
    var e3 = document.getElementById("login");
    e3.style.display = 'none';
    var e4 = document.getElementById("myModal");
    e4.style.display = 'none';
    var e5 = document.getElementById("myGame");
    e5.style.display = 'none';
    var e6 = document.getElementById("choosesettings");
    e6.style.display = 'block';
    var e7 = document.getElementById("gamewindow");
    e7.style.display = 'none';
}