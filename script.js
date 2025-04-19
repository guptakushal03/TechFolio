document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        document.querySelector('.loader-container').style.display = 'none';
        document.querySelector('.content').style.display = 'block';
    }, 2000);
});

document.querySelectorAll('.transparent-button').forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('#contact-me').scrollIntoView({ behavior: 'smooth' });
    });
});

document.querySelector('.handle-contact-navbtn').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('#contact-me').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function(event) {
        if (event.target.tagName.toLowerCase() === 'a') {
            return;
        }

        const targetUrl = this.getAttribute('data-url');
        if (targetUrl) {
            window.open(targetUrl, '_blank');
        }
    });
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