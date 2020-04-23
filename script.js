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
database[0] = {username: "p", password: "p"};

$(document).ready(function () {
    // menu and login functions:
    $("#btnRegister").click(function (event) {
        event.preventDefault();
        var vfirstname = $("#firstname").val();
        var vlastname = $("#lastname").val();
        var vemail = $("#email").val();
        var vpassword = $("#password").val();
        var vusername = $("#username").val();
        var vdate = $("#date").val();
        if (vfirstname == '' || vlastname == '' || vemail == '' || vpassword == '' || vusername == '' || vdate == '') {
            alert("Please fill all fields!");
        } else if (vpassword.length < 6) {
            alert("Password should have at least 6 characters!");
        } else if (!(vpassword.match(/([a-zA-Z])/) && vpassword.match(/([0-9])/))) {
            alert("Password must contain english letters and numbers");
        } else if (vfirstname.match(/([0-9])/) || vlastname.match(/[0-9]/)) {
            alert("Your name must not contain numbers");
        } else if (!vemail.match(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
            alert("Your e-mail is invalid");
        } else {
            database[database.length] = {username: $("#username").val() , password: $("#password").val()};
            database[database.length] = {username: vusername, password: vpassword};
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

    $("#btnLogin").click(function (event) {
        event.preventDefault();
        var boolean = false;
        var thisuser = $("#loguser").val();
        var thispassword = $("#logpassword").val();
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
}


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

function show_about() {
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






