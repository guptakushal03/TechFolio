document.addEventListener("DOMContentLoaded", () => {

    // ── Loader ──
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => loader.classList.add("hidden"), 2000);
    }

    // ── Mobile nav ──
    const navLinks = document.getElementById("navLinks");

    // Inject backdrop overlay into body once
    const overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    document.body.appendChild(overlay);

    function openMenu() {
        if (!navLinks) return;
        navLinks.classList.add("open");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        if (!navLinks) return;
        navLinks.classList.remove("open");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    // Expose globally for onclick attributes
    window.showMenu = openMenu;
    window.hideMenu = closeMenu;

    // Tap backdrop to close
    overlay.addEventListener("click", closeMenu);

    // Each link inside drawer: close drawer, then let the browser navigate normally
    if (navLinks) {
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                closeMenu();
            });
        });
    }

    // ── Smooth scroll — only for #contact-me links that are on the SAME page ──
    document.querySelectorAll('a[href="#contact-me"]').forEach(btn => {
        btn.addEventListener("click", e => {
            const target = document.querySelector("#contact-me");
            if (target) {
                e.preventDefault();
                closeMenu();
                // Small delay lets drawer animation finish before scrolling
                setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 80);
            }
            // If #contact-me doesn't exist (different page), do nothing — let href redirect
        });
    });

    // ── Card click to open URL ──
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", e => {
            if (e.target.closest("a")) return; // Let link handle itself
            const url = card.dataset.url;
            if (url) window.open(url, "_blank");
        });
    });

    // ── Contact Form ──
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", async e => {
        e.preventDefault();
        const submitBtn = form.querySelector(".form-submit");
        const originalText = submitBtn.value;
        submitBtn.value = "Sending…";
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
            showToast(`Sent successfully. Thanks, ${payload.name}!`, "success");
            form.reset();
        } catch (err) {
            console.error(err);
            showToast("Unable to send message right now. Please try again later or email me at guptakushal2003@gmail.com", "error");
        } finally {
            submitBtn.value = originalText;
            submitBtn.disabled = false;
        }
    });
});

function showToast(text, type) {
    document.querySelector(".form-message")?.remove();
    const msg = document.createElement("div");
    msg.className = `form-message ${type}`;
    msg.textContent = text;
    document.body.appendChild(msg);
    setTimeout(() => {
        msg.style.opacity = "0";
        setTimeout(() => msg.remove(), 400);
    }, 4000);
}

const navbar = document.querySelector(".navbar");

function updateNav() {
    const scrolled = document.documentElement.scrollTop || document.body.scrollTop;

    if (scrolled > 10) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateNav, { passive: true });
updateNav();