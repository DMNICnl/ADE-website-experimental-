document.addEventListener("DOMContentLoaded", () => {
    const klantLogHeader = document.getElementById("klantlog");
    const contactHeader = document.getElementById("contact");
    const loginForm = document.getElementById("login-form");
    const contactForm = document.getElementById("contact-form");
    const aanmelden = document.getElementById("aanmelden");

    let atContact = false; // Track if we're at the contact form or not

    // Helper to trigger one-time glow after the form reaches its position
    function triggerGlowOnce(form) {
        setTimeout(() => {
            form.classList.add("contact-glow");
        }, 100); // Delay slightly to ensure the form has finished animating
    }

    // Function to handle flipping animation
    function animateForms() {
        if (atContact) {
            // Moving contactForm to left and loginForm to right at the same time
            gsap.to([contactForm, loginForm], {
                duration: 1,
                rotationY: 180,
                x: "-250px", // Contact form moves to the left
                ease: "power2.inOut"
            });
        } else {
            // Moving loginForm to left and contactForm to right at the same time
            gsap.to([contactForm, loginForm], {
                duration: 1,
                rotationY: 180,
                x: "250px", // Login form moves to the right
                ease: "power2.inOut"
            });
        }
    }

    // When "Klant login" link is clicked
    klantLogHeader.addEventListener("click", () => {
        if (atContact) {
            atContact = false; // We're leaving the contact page

            animateForms(); // Start the animation

            // After animation, trigger glow on loginForm
            triggerGlowOnce(loginForm);
        }
    });

    // When "Aanmelden" link is clicked
    aanmelden.addEventListener("click", () => {
        if (atContact) {
            atContact = false; // We're leaving the contact page

            animateForms(); // Start the animation

            // After animation, trigger glow on loginForm
            triggerGlowOnce(loginForm);
        }
    });

    // When "Contact" link is clicked
    contactHeader.addEventListener("click", () => {
        if (!atContact) {
            atContact = true; // We're going to the contact page

            animateForms(); // Start the animation

            // After animation, trigger glow on contactForm
            triggerGlowOnce(contactForm);
        }
    });
});





// FOR WHEN SHIT BREAKES HERES THE HEADER JS 
  // header animation when clicked stay
  document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".navLinks li a");
    const aanmeldLink = document.getElementById("aanmelden");
    const contactLink = document.querySelector("#contact a");
  
    // Remove all styles on load
    navLinks.forEach(link => {
      link.classList.remove("active", "contact-glow");
    });
  
    // When a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
  
        // Remove styles from all
        navLinks.forEach(l => l.classList.remove("active", "contact-glow"));
  
        // Add active to clicked link
        link.classList.add("active");
  
      
        
      });
    });
  
    // When "Aanmelden" is clicked
    aanmeldLink.addEventListener('click', (e) => {
      e.preventDefault();
  
      // Remove active/glow from all nav links
      navLinks.forEach(link => link.classList.remove("active", "contact-glow"));
  
      // Add glow and active to the contact link
      contactLink.classList.add("active");
  
      contactLink.classList.remove("contact-glow");
      void contactLink.offsetWidth;
      contactLink.classList.add("contact-glow");
    });
    contactLink.addEventListener('click', (e) => {
      e.preventDefault();
  
      // Remove active/glow from all nav links
      navLinks.forEach(link => link.classList.remove("active", "contact-glow"));
  
      // Add glow and active to the contact link
      contactLink.classList.add("active");
  
      contactLink.classList.remove("contact-glow");
      void contactLink.offsetWidth;
      contactLink.classList.add("contact-glow");
    });
  });

// standaard javascript
document.addEventListener("DOMContentLoaded", () => {

  
});

  function flipToContactPage(onComplete) {
    const login = $("#klantLoginPage");
    const contact = $("#contactPage");
  
    // Set initial perspective on parent container
    const parent = login.parent(); // assuming both pages are in same parent
    gsap.set(parent, {
      perspective: 1000
    });
  
    // Prep contact page for flip-in
    gsap.set(contact, {
      rotationY: -90,
      transformOrigin: "left center",
      autoAlpha: 0,
      display: "block"
    });
  
    const tl = gsap.timeline({ onComplete });
  
    tl.set(login, {
      transformOrigin: "right center"
    })
      .to(login, {
        rotationY: 90,
        duration: 0.6,
        ease: "power2.in",
        autoAlpha: 0
      })
      .set(login, { display: "none" })
      .fromTo(contact, {
        rotationY: -90,
        autoAlpha: 0,
      }, {
        rotationY: 0,
        autoAlpha: 1,
        duration: 0.6,
        ease: "power2.out"
      });
  }
  
  function flipToLoginPage(onComplete) {
    const login = $("#klantLoginPage");
    const contact = $("#contactPage");
  
    const parent = contact.parent();
    gsap.set(parent, {
      perspective: 1000
    });
  
    gsap.set(login, {
      rotationY: 90,
      transformOrigin: "right center",
      autoAlpha: 0,
      display: "block"
    });
  
    const tl = gsap.timeline({ onComplete });
  
    tl.set(contact, {
      transformOrigin: "left center"
    })
      .to(contact, {
        rotationY: -90,
        duration: 0.6,
        ease: "power2.in",
        autoAlpha: 0
      })
      .set(contact, { display: "none" })
      .fromTo(login, {
        rotationY: 90,
        autoAlpha: 0,
      }, {
        rotationY: 0,
        autoAlpha: 1,
        duration: 0.6,
        ease: "power2.out"
      });
  }
