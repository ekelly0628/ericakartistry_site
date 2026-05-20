function sendMail() {
    if (typeof emailjs === 'undefined') {
        alert("Booking email service is unavailable right now. Please try again in a moment.");
        return;
    }

    let parms = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        service: document.getElementById("Service").value,
    };

    emailjs.send("service_hfr7z7b", "template_i2o4wzb", parms)
        .then(() => {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("date").value = "";
            document.getElementById("time").value = "";
            document.getElementById("Service").value = "";
            window.location.href = "confirmbookingPage.html";
        })
        .catch((error) => {
            console.error("Error booking session:", error);
            alert("Failed to book session. Please try again.");
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('ScheduleSession');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendMail();
        });
    }

    const galleryLinks = document.querySelectorAll('#work a.image.fit');
    if (galleryLinks.length) {
        const lightbox = document.createElement('div');
        lightbox.className = 'gallery-lightbox';
        lightbox.setAttribute('aria-hidden', 'true');
        lightbox.innerHTML = `
            <button type="button" class="gallery-lightbox__close" aria-label="Close image preview">×</button>
            <img class="gallery-lightbox__image" alt="">
        `;

        document.body.appendChild(lightbox);

        const lightboxImage = lightbox.querySelector('.gallery-lightbox__image');
        const closeButton = lightbox.querySelector('.gallery-lightbox__close');

        const closeLightbox = () => {
            lightbox.classList.remove('is-open');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('gallery-lightbox-open');
            lightboxImage.removeAttribute('src');
            lightboxImage.alt = '';
        };

        galleryLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                const image = link.querySelector('img');
                e.preventDefault();

                lightboxImage.src = link.href;
                lightboxImage.alt = image?.alt || 'Selected gallery image';
                lightbox.classList.add('is-open');
                lightbox.setAttribute('aria-hidden', 'false');
                document.body.classList.add('gallery-lightbox-open');
                closeButton.focus();
            });
        });

        closeButton.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
                closeLightbox();
            }
        });
    }
});
