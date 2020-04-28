
var database = new Array();
database[0] = {username: "p", password: "p"};


$(document).ready(function() {
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
			database[database.length] = {username: vusername, password: vpassword};
			document.getElementById('username').value = null;
			document.getElementById('password').value = null;
			var e2 = document.getElementById("register");
			e2.style.display = 'none';
			var e3 = document.getElementById("login");
			e3.style.display = 'block';
		}
	});

	$("#btnLogin").click(function (event) {
		event.preventDefault();
		var boolean = false;
		var thisuser = $("#loguser").val();
		var thispassword = $("#logpassword").val();
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
			var e4 = document.getElementById("choosesettings");
			e4.style.display = 'block';
		}
	});


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


// menu function
function show_only_welcome() {
	var e1 = document.getElementById("welcome");
	e1.style.display = 'block';
	var e2 = document.getElementById("register");
	e2.style.display = 'none';
	var e3 = document.getElementById("login");
	e3.style.display = 'none';
	var e4 = document.getElementById("myModal");
	e4.style.display = 'none';
	var e5 = document.getElementById("gamewindow");
	e5.style.display = 'none';
	var e6 = document.getElementById("choosesettings");
	e6.style.display = 'none';
	var e7 = document.getElementById("gameEndModal");
	e7.style.display = 'none';

}

function show_only_register() {
	var e1 = document.getElementById("welcome");
	e1.style.display = 'none';
	var e2 = document.getElementById("register");
	e2.style.display = 'block';
	var e3 = document.getElementById("login");
	e3.style.display = 'none';
	var e5 = document.getElementById("gamewindow");
	e5.style.display = 'none';
	var e6 = document.getElementById("choosesettings");
	e6.style.display = 'none';
}

function show_only_login() {
	var e1 = document.getElementById("welcome");
	e1.style.display = 'none';
	var e2 = document.getElementById("register");
	e2.style.display = 'none';
	var e3 = document.getElementById("login");
	e3.style.display = 'block';
	var e5 = document.getElementById("gamewindow");
	e5.style.display = 'none';
	var e6 = document.getElementById("choosesettings");
	e6.style.display = 'none';

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
	var e5 = document.getElementById("myGame");
	e5.style.display = 'none';
	var e6 = document.getElementById("choosesettings");
	e6.style.display = 'none';

}






