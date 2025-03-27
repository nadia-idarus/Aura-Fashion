document.addEventListener('DOMContentLoaded', function() {
    // Dropdown Menu
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown'); // Get parent li

    if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            // Close other open dropdowns if any (optional, good practice if multiple dropdowns exist)
            document.querySelectorAll('.dropdown.active').forEach(openDropdown => {
                if (openDropdown !== dropdown) {
                    openDropdown.classList.remove('active');
                }
            });
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });

        // Close dropdown if clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    // Burger Menu (Mobile Navigation)
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('nav'); // Target the nav element itself

    if (burgerMenu && nav) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Accordion
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const accordionItem = button.closest('.accordion-item'); // Use closest to find parent item
            const accordionContent = accordionItem.querySelector('.accordion-content'); // Find content within item
            const currentlyActive = accordionItem.classList.contains('active');

            // Close all other accordion items first
            document.querySelectorAll('.accordion-item.active').forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-button').classList.remove('active'); // Also remove active from button
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle the clicked item
            if (!currentlyActive) {
                accordionItem.classList.add('active');
                button.classList.add('active'); // Add active class to button too
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionItem.classList.remove('active');
                button.classList.remove('active');
                accordionContent.style.maxHeight = null;
            }
        });
    });


    // Image Slider (Basic - Simple Fade)
    const slides = document.querySelectorAll('.hero-slider .slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Automatic slider change every 5 seconds
    if (slides.length > 1) { // Only run slider if more than one slide
        setInterval(nextSlide, 5000);
        showSlide(currentSlide); // Show initial slide
    } else if (slides.length === 1) {
        showSlide(0); // Ensure the single slide is active
    }


    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const messageError = document.getElementById('message-error');

            let isValid = true;
            nameError.textContent = ''; // Clear previous errors
            emailError.textContent = '';
            messageError.textContent = '';

            // Name Validation
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Name is required';
                isValid = false;
            }

            // Email Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                 emailError.textContent = 'Email is required';
                 isValid = false;
            } else if (!emailRegex.test(emailInput.value)) {
                emailError.textContent = 'Please enter a valid email address';
                isValid = false;
            }

            // Message Validation
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Message cannot be empty';
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission
                alert('Thank you for your message! We will get back to you soon. (Simulated)');
                contactForm.reset(); // Clear the form
            }
        });
    }

    // Modal Popup for Gallery Images
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeButton = modal.querySelector('.close-button'); // Select close button within modal

    // Make functions globally accessible (alternative: attach event listeners directly in DOMContentLoaded)
    window.openModal = function(imageSrc) {
        if (modal && modalImage) {
            modal.style.display = "block";
            modalImage.src = imageSrc;
            // Optional: Add class to body to prevent scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }
    }

    window.closeModal = function() {
        if (modal) {
            modal.style.display = "none";
            modalImage.src = ""; // Clear src
            // Optional: Remove body class
            document.body.style.overflow = '';
        }
    }

    // Close modal when clicking the close button
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside the modal content (image)
    if (modal) {
        modal.addEventListener('click', (event) => {
            // Check if the click is on the modal background itself, not the image
            if (event.target === modal) {
                closeModal();
            }
        });
    }

     // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && modal.style.display === "block") {
            closeModal();
        }
    });

});