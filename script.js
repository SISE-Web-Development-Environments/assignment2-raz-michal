// user-Details
var database = new Array();

// menu and login functions:
database[0] = {username: "p", password: "p"};

function show_only_welcome() {
    var e1 = document.getElementById("welcome");
    e1.style.display = 'block';
    var e2 = document.getElementById("register");
    e2.style.display = 'none';
    var e3 = document.getElementById("login");
    e3.style.display = 'none';
    var e4 = document.getElementById("myModal");
    e4.style.display = 'none';
}

function show_only_register() {
    var e1 = document.getElementById("welcome");
    e1.style.display = 'none';
    var e2 = document.getElementById("register");
    e2.style.display = 'block';
    var e3 = document.getElementById("login");
    e3.style.display = 'none';
}

function show_only_login() {
    var e1 = document.getElementById("welcome");
    e1.style.display = 'none';
    var e2 = document.getElementById("register");
    e2.style.display = 'none';
    var e3 = document.getElementById("login");
    e3.style.display = 'block';
}

$(document).ready(function () {
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
            database[database.length] = {username: username, password: password};
            document.getElementById('username').value = null;
            document.getElementById('password').value = null;
            var e2 = document.getElementById("register");
            e2.style.display = 'none';
            var e3 = document.getElementById("login");
            e3.style.display = 'block';
        }
    });
});

$(document).ready(function () {
    $("#btnLogin").click(function () {
        var boolean = false;
        var thisuser = $("#username").val();
        var thispassword = $("#password").val();

        for (var i = 0; i < database.length; i++) {
            if (database[i].username == thisuser && database[i].password == thispassword) {
                boolean = true;
            }
        }

        if (boolean == false) {
            alert("Wrong details. Please try again");
        } else {
            var e3 = document.getElementById("login");
            e3.style.display = 'none';
            var e4 = document.getElementById("gamewindow");
            e4.style.display = 'block';
        }
    });
});


$(document).ready(function () {
    // When the user clicks anywhere outside of the modal, close it
    var model = document.getElementById("myModal");
    window.onclick = function (event) {
        if (event.target == model) {
            show_only_welcome()
        }
    }
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        show_only_welcome()
    }
});

function show_about() {
    var e1 = document.getElementById("welcome");
    e1.style.display = 'none';
    var e2 = document.getElementById("register");
    e2.style.display = 'none';
    var e3 = document.getElementById("login");
    e3.style.display = 'none';
    var e4 = document.getElementById("myModal");
    e4.style.display = 'block';
}




