document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector('.loader-container');
    if (loader) {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 2000);
    }
});


document.querySelectorAll('.transparent-button').forEach(function (button) {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector('#contact-me').scrollIntoView({ behavior: 'smooth' });
    });
});

document.querySelector('.handle-contact-navbtn').addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('#contact-me').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function (event) {
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
function showMenu() {
    navLinks.style.right = "0";
}
function hideMenu() {
    navLinks.style.right = "-200px";
}

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.querySelector('.loader-container');
    if (loader) {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 2000);
    }

    document.querySelectorAll('.transparent-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('#contact-me')?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const contactNavBtn = document.querySelector('.handle-contact-navbtn');
    if (contactNavBtn) {
        contactNavBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('#contact-me')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;

            const url = card.dataset.url;
            if (url) window.open(url, '_blank');
        });
    });

    const navLinks = document.getElementById("navLinks");
    window.showMenu = () => { if (navLinks) navLinks.style.right = "0"; };
    window.hideMenu = () => { if (navLinks) navLinks.style.right = "-200px"; };

    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('input[type="submit"]');
        const originalText = submitBtn.value;

        submitBtn.value = "Sending...";
        submitBtn.disabled = true;

        const payload = {
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value
        };

        try {
            const res = await fetch(
                "https://n8n-zg5r.onrender.com/webhook/techfolio-contact",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                }
            );

            if (!res.ok) throw new Error("Webhook failed");

            showSuccessMessage(payload.name);
            form.reset();

        } catch (err) {
            console.error(err);
            showErrorMessage();
        } finally {
            submitBtn.value = originalText;
            submitBtn.disabled = false;
        }
    });
});


function showSuccessMessage(name) {
    removeExistingMessage();

    const msg = document.createElement("div");
    msg.className = "form-message success";
    msg.innerHTML = `<strong>Thank you, ${name}!</strong><br>Your message has been sent.`;

    document.body.appendChild(msg);
    autoRemove(msg);
}

function showErrorMessage() {
    removeExistingMessage();

    const msg = document.createElement("div");
    msg.className = "form-message error";
    msg.innerHTML = `<strong>Error!</strong><br>Please try again later.`;

    document.body.appendChild(msg);
    autoRemove(msg);
}

function removeExistingMessage() {
    document.querySelector('.form-message')?.remove();
}

function autoRemove(el) {
    setTimeout(() => {
        el.style.opacity = "0";
        setTimeout(() => el.remove(), 300);
    }, 4000);
}