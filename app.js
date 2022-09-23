// Scroll reveal
window.sr = ScrollReveal();
const DURATION = 1500;
const DISTANCE = '10rem';
const SHORT_DISTANCE = '3rem';

sr.reveal('.animate-left', {
    origin: 'left',
    duration: DURATION,
    distance: DISTANCE,
    delay: 300,
});

sr.reveal('.animate-right', {
    origin: 'right',
    duration: DURATION,
    distance: DISTANCE,
    delay: 600,
});

sr.reveal('.animate-top', {
    origin: 'top',
    duration: DURATION,
    distance: SHORT_DISTANCE,
    delay: 600,
});

sr.reveal('.animate-bottom', {
    origin: 'bottom',
    duration: DURATION,
    distance: DISTANCE,
    delay: 600,
});
