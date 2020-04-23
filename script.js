// user-Details
var database = new Array();
var userName;

// menu and login functions:
database[0] = {username: "p", password: "p"};

function show_only_welcome(e) {
    var e1 = document.getElementById("welcome");
    e1.style.display = 'block';
    var e2 = document.getElementById("register");
    e2.style.display = 'none';
    var e3 = document.getElementById("login");
    e3.style.display = 'none';
    var e4 = document.getElementById("myModal");
    e4.style.display = 'none';
    e.preventDefault()
}

function show_only_register(e) {
    var e1 = document.getElementById("welcome");
    e1.style.display = 'none';
    var e2 = document.getElementById("register");
    e2.style.display = 'block';
    var e3 = document.getElementById("login");
    e3.style.display = 'none';
    e.preventDefault()
}

function show_only_login(e) {
    var e1 = document.getElementById("welcome");
    e1.style.display = 'none';
    var e2 = document.getElementById("register");
    e2.style.display = 'none';
    var e3 = document.getElementById("login");
    e3.style.display = 'block';
    e.preventDefault()
}

$(document).ready(function (e) {
    $("#btnRegister").click(function () {
        var firstname = $("#firstname").val();
        var lastname = $("#lastname").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var username = $("#username").val();
        var date = $("#date").val();
        if (firstname == '' || lastname == '' || email == '' || password == '' || username == '' || date == '') {
            alert("Please fill all fields!");
        } else if (password.length < 6) {
            alert("Password should have at least 6 characters!");
        } else if (!(password.match(/([a-zA-Z])/) && password.match(/([0-9])/))) {
            alert("Password must contain english letters and numbers");
        } else if (firstname.match(/([0-9])/) || lastname.match(/[0-9]/)) {
            alert("Your name must not contain numbers");
        } else if (!email.match(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
            alert("Your e-mail is invalid");
        } else {
            database[database.length] = {username: $("#username").val() , password: $("#password").val()};
            document.getElementById('username').value = null;
            document.getElementById('password').value = null;
            var e2 = document.getElementById("register");
            e2.style.display = 'none';
            var e3 = document.getElementById("login");
            e3.style.display = 'block';
        }
        e.preventDefault()
    });

    $("#btnLogin").click(function () {
        var boolUser = false;
        var boolPassword = false;
        userName = null;
        userName = $("#username").val();
        var userPassword = $("#password").val();

        for (var i = 0; i < database.length; i++) {
            if (database[i].username == userName){
                boolUser = true;
                if(database[i].password == userPassword) {
                    boolPassword = true;
                }
            }
        }

        if (boolUser == false) {
            alert("Wrong User. Please try again");
        }
        else if (boolPassword == false) {
            alert("Wrong password. Please try again");
        } else {
            alert("connected");
            var e3 = document.getElementById("welcome");
            e3.style.display = 'none';
            var e4 = document.getElementById("gamewindow");
            e4.style.display = 'block';

        }
        e.preventDefault()
    });

    // When the user clicks anywhere outside of the modal, close it
    var model = document.getElementById("myModal");
    window.onclick = function (event) {
        if (event.target == model) {
            show_only_welcome()
        }
    }
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function (event) {
        if (event.target == model) {
            show_only_welcome()
        }
    }

    e.preventDefault()
});

function show_about(e) {
    var e1 = document.getElementById("welcome");
    e1.style.display = 'none';
    var e2 = document.getElementById("register");
    e2.style.display = 'none';
    var e3 = document.getElementById("login");
    e3.style.display = 'none';
    var e4 = document.getElementById("myModal");
    e4.style.display = 'block';
    e.preventDefault()
}




