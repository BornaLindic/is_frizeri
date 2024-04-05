function checkLoggedIn() {
    console.log("document.cookie");
    console.log(document.cookie);
    var user= Cookies.get('access_token')
    if (user != "") {
      document.getElementById("show-when-not-logged-in").style.display = "block";
    }
}

checkLoggedIn()