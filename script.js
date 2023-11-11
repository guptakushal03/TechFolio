document.addEventListener("DOMContentLoaded", function () {
    // Simulate loading delay (you can remove this in a real scenario)
    setTimeout(function () {
        document.querySelector('.loader-container').style.display = 'none';
        document.querySelector('.content').style.display = 'block';
    }, 2000); // Adjust the time as needed
});

var navLinks = document.getElementById("navLinks");
function showMenu(){
    navLinks.style.right = "0";
}
function hideMenu(){
    navLinks.style.right = "-200px";
}
