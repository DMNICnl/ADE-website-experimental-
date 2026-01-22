let currentPage = "#homePage";
let isAnimating = false;
let hasAnimatedHome = false; // Track if the homepage animation has already run

// Utility: Hide all main pages
function hideAllPages() {
    $("#homePage, #overOnsPage, #dienstenPage, #contactPage, #klantLoginPage, #webshopPage").hide();
}


// Page Switcher
function switchPage(_hideSelector, showSelector, enterAnimation) {
    if (isAnimating || currentPage === showSelector) return;

    isAnimating = true;
    const exitAnimation = getExitAnimation(currentPage);

    // Store the current page in a variable before hiding it
    const previousPage = currentPage;
    
    exitAnimation(() => {
        $(previousPage).hide();
        $(showSelector).show();
        
        // Update currentPage immediately after showing the new page
        currentPage = showSelector;

        // Special case for home page
        if (showSelector === "#homePage") {
            if (!hasAnimatedHome) {
                // First time showing home page - run full animation
                homePageAnimations(() => {
                    isAnimating = false;
                });
                hasAnimatedHome = true;
            } else {
                // Subsequent times - just show the page without animation
                isAnimating = false;
            }
        } else {
            // For other pages, run their enter animation
            if (showSelector === "#contactPage") {
                triggerGlow($("#contact-form")); // Trigger glow immediately before animation starts
            } else if (showSelector === "#klantLoginPage") {
                triggerGlow($("#login-form")); // Trigger glow immediately before animation starts
            }

            enterAnimation(() => {
                isAnimating = false;
            });
        }
    });
}
// Exit animation dispatcher
function getExitAnimation(pageId) {
    switch (pageId) {
        case "#homePage": return homePageExit;
        case "#overOnsPage": return aboutUsPageExit;
        case "#contactPage": return contactPageExit;
        case "#dienstenPage": return dienstenPageExit;
        case "#klantLoginPage": return klantLoginPageExit;
        default: return cb => cb();
    }
}
function triggerGlow(form) {
    if (!form.length) {
        console.warn("Form element not found");
        return;
    }

    // Remove any existing glow class
    form.removeClass('glow');

    // Force reflow to restart the animation
    void form[0].offsetWidth;

    // Add the glow class to trigger the animation
    form.addClass('glow');
}

// On load animations
function homePageAnimations(onComplete) {
    const h1 = $("#h1");
    const openingstijden = $("#opTijden");
    const adres = $("#p1");
    const optijden = $(".openingsTijden li");
    const adressinfo = $(".openingsTijden p:not(#p1)");
    const map = $("#map");

    gsap.set("#homePage", { visibility: "visible" }); // Set visibility before animation starts
    gsap.set([h1, openingstijden, adres, optijden, adressinfo, map], { clearProps: "all" });

    const tl = gsap.timeline({ onComplete });
    tl.from(h1, { opacity: 0, yPercent: 100, duration: 1.5, ease: "power4" })
      .from(openingstijden, { opacity: 0, y: -54, duration: 1.5, ease: "power4" }, "-=1.2")
      .from(adres, { opacity: 0, y: -50, duration: 1, ease: "power4" }, "-=1.2")
      .from(optijden, { x: -50, opacity: 0, duration: 0.5, ease: "power1.out", stagger: 0.1 }, "-=0.9")
      .from(adressinfo, { x: -50, opacity: 0, duration: 0.5, ease: "power1.out", stagger: 0.1 }, "-=0.8")
      .from(map, { opacity: 0, duration: 1, ease: "power1.out" }, "-=0.5");
}

// Other page animations
function aboutUsPageAnimations(onComplete) {
    const title = $("#overOnsPage h2");
    const paragraphs = $("#overOnsPage p");

    gsap.set([title, ...paragraphs], { clearProps: "all" });

    gsap.timeline({ onComplete })
        .from(title, { delay: 0.2, opacity: 0, y: -50, duration: 1, ease: "power4" })
        .from(paragraphs, { opacity: 0, x: -30, duration: 1, ease: "power4", stagger: 0.1 }, "-=0.6");
}

function klantLoginPageAnimations(onComplete) {
    gsap.set("#klantLoginPage", { clearProps: "all" });
    gsap.timeline({ onComplete })
        .from("#klantLoginPage", { opacity: 0, duration: 0.5, ease: "power2.out" });
}

function contactPageAnimations(onComplete) {
    const title = $("#contactPage h2");
    const paragraphs = $("#contactPage p");
    const form = $("#contact-form"); // Target the entire contact form

    gsap.set([title, ...paragraphs, form], { clearProps: "all" });

    gsap.timeline({ onComplete })
        .from(title, {
            delay: 0.2,
            opacity: 0,
            y: -30,
            duration: 1,
            ease: "power4"
        })
        .from(paragraphs, {
            opacity: 0,
            x: -30,
            duration: 1,
            ease: "power4",
            stagger: 0.19
        }, "-=0.7")
        .from(form, {
            opacity: 0,
            // Add scale animation for the entire form
            duration: 0.7,
            ease: "power2.out"
        }, "-=0.6"); // Overlap slightly with last paragraph
}

function dienstenPageAnimations(onComplete) {
    // First hide all sections
    hideDiensten();
    
    // Reset all animations and prepare elements
    const sections = ["#onderhoud", "#diagnose", "#Reparaties", "#elektronica", "#fotogalerij"];
    sections.forEach(section => {
        gsap.set(section, { 
            x: 0,
            clearProps: "all" 
        });
    });

    // Only make onderhoud visible and animate it in
    gsap.set("#onderhoud", { opacity: 0 });
    $("#onderhoud").show();
    
    const kroonoil = document.getElementById('kroonOil');
    const shellLogo = document.getElementById('shellLogo');
    const petronasLogo = document.getElementById('petronasLogo');
    const onderhoudInfo = document.getElementsByClassName('onderhoudT');

    const tl = gsap.timeline({ onComplete });
    
    tl.to("#onderhoud", { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" })
      .from(onderhoudInfo, {
        opacity: 0,
        x: -30,
        scale: 0.2,
        duration: 1,
        ease: "power4"
      }, "-=0.4")
      .from([shellLogo, petronasLogo, kroonoil], {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power1.out",
        stagger: 0.1
      }, "-=0.9");
}


function dienstenPageExit(cb) {
    const allSections = $("#onderhoud, #diagnose, #Reparaties, #elektronica, #fotogalerij");
    gsap.timeline({ onComplete: cb })
        .to(allSections, { 
            opacity: 0, 
            x: 100, 
            duration: 0.4, 
            ease: "power2.in",
            onComplete: function() {
                // Reset positions after animation completes
                gsap.set(allSections, { x: 0 });
            }
        });
}

// Update your show functions to properly reset animations


// Similar updates for other show functions (showReparaties, showElektronica, showFotogalerij)
  

// Exit animations
function homePageExit(cb) {
    const h1 = $("#h1");
    const openingstijden = $("#opTijden");
    const adres = $("#p1");
    const optijden = $(".openingsTijden li");
    const adressinfo = $(".openingsTijden p:not(#p1)");
    const map = $("#map");

    gsap.timeline({ onComplete: cb })
        .to(map, { opacity: 0, duration: 0.5, ease: "power1.in" })
        .to(adressinfo, { x: -50, opacity: 0, duration: 0.4, ease: "power1.in", stagger: 0.05 }, "-=0.3")
        .to(optijden, { x: -50, opacity: 0, duration: 0.4, ease: "power1.in", stagger: 0.05 }, "-=0.4")
        .to(adres, { opacity: 0, y: -50, duration: 0.4, ease: "power1.in" }, "-=0.4")
        .to(openingstijden, { opacity: 0, y: -54, duration: 0.4, ease: "power1.in" }, "-=0.4")
        .to(h1, { opacity: 0, yPercent: 100, duration: 0.5, ease: "power4.in" }, "-=0.4");
}

function aboutUsPageExit(cb) {
    const title = $("#overOnsPage h2");
    const paragraphs = $("#overOnsPage p");

    gsap.timeline({ onComplete: cb })
        .to(paragraphs, { opacity: 0, x: -30, duration: 0.5, ease: "power4.in", stagger: 0.05 })
        .to(title, { opacity: 0, y: -50, duration: 0.5, ease: "power4.in" }, "-=0.3");
}

function contactPageExit(cb) {
    const title = $("#contactPage h2");
    const paragraphs = $("#contactPage p");
    const form = $("#contact-form");

    const tl = gsap.timeline({ onComplete: cb });

    if (form.length) {
        tl.to(form, {
            opacity: 0,
            duration: 0.4,
            ease: "power1.in"
        }, "-=0.2");
    } else {
        console.warn("Form not found during exit animation");
    }

    if (paragraphs.length) {
        tl.to(paragraphs, {
            opacity: 0,
            x: -30,
            duration: 0.4,
            ease: "power4.in",
            stagger: 0.05
        }, "-=0.2");
    }

    if (title.length) {
        tl.to(title, {
            opacity: 0,
            y: -30,
            duration: 0.4,
            ease: "power4.in"
        }, "-=0.3");
    }
}



function klantLoginPageExit(cb) {
    gsap.timeline({ onComplete: cb })
        .to("#klantLoginPage", { opacity: 0, duration: 0.5, ease: "power2.in" });
}

// Main page init
$(document).ready(function () {
    hideAllPages();
    gsap.set("#homePage", { visibility: "hidden" });

    // Trigger the home page animation only when needed
    setTimeout(() => {
        $("#homePage").show();
        if (!hasAnimatedHome) {
            homePageAnimations(() => {});  // Ensures homepage animations are triggered
            hasAnimatedHome = true; // Prevents future animations
        }
    }, 1800);

    $("#home").click(() => switchPage(currentPage, "#homePage", homePageAnimations));
    $("#over").click(() => switchPage(currentPage, "#overOnsPage", aboutUsPageAnimations));
    $("#contact").click(() => switchPage(currentPage, "#contactPage", contactPageAnimations));
    $("#diensten").click(() => {
        setupDienstenPage(); // Setup only, no animation
      
        switchPage(currentPage, "#dienstenPage", (done) => {
          dienstenPageAnimations(() => {
            done();
          });
        });
      });
          $("#klantlog").click(() => switchPage(currentPage, "#klantLoginPage", klantLoginPageAnimations));

    // Diensten buttons
    
});
