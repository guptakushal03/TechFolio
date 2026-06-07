document.addEventListener("DOMContentLoaded", () => {

    // ── Loader ──
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 2000);
    }

    // ── Smooth scroll for Contact buttons ──
    document.querySelectorAll('a[href="#contact-me"]').forEach(btn => {
        btn.addEventListener('click', e => {
            const target = document.querySelector('#contact-me');
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ── Card click (navigate to data-url) ──
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', e => {
            if (e.target.closest('a')) return;
            const url = card.dataset.url;
            if (url) window.open(url, '_blank');
        });
    });

    // ── Mobile nav ──
    const navLinks = document.getElementById("navLinks");
    window.showMenu = () => { if (navLinks) navLinks.style.right = "0"; };
    window.hideMenu = () => { if (navLinks) navLinks.style.right = "-100%"; };

    // Close nav when a link is clicked
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => hideMenu());
        });
    }

    // ── Contact Form ──
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", async e => {
        e.preventDefault();

        const submitBtn = form.querySelector('.form-submit');
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
            showToast(`Message sent — thanks, ${payload.name}!`, "success");
            form.reset();
        } catch (err) {
            console.error(err);
            showToast("Something went wrong. If issue perist, reach out to me at: guptakushal2003@gmail.com", "error");
        } finally {
            submitBtn.value = originalText;
            submitBtn.disabled = false;
        }
    });
});

function showToast(text, type) {
    document.querySelector('.form-message')?.remove();
    const msg = document.createElement("div");
    msg.className = `form-message ${type}`;
    msg.textContent = text;
    document.body.appendChild(msg);
    setTimeout(() => {
        msg.style.opacity = "0";
        setTimeout(() => msg.remove(), 400);
    }, 4000);
}