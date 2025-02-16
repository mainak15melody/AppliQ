// For extra interactivity, you can add a fading effect for the page content after a few seconds

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        const footer = document.querySelector('.footer');
        footer.style.opacity = '1'; // Make the footer visible after a short delay
    }, 4000);
});
