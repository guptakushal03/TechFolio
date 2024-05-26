document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        document.querySelector('.loader-container').style.display = 'none';
        document.querySelector('.content').style.display = 'block';
    }, 2000);
});

var navLinks = document.getElementById("navLinks");
function showMenu(){
    navLinks.style.right = "0";
}
function hideMenu(){
    navLinks.style.right = "-200px";
}

function showAlert() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";
    alert("GitHub doesn't allow handling forms hence this alert message!");
}