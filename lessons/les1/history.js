const backButton = document.querySelector('.back_button');
const forwardButton = document.querySelector('.forward_button');

backButton.addEventListener('click', () => {
    window.history.back();
});

forwardButton.addEventListener('click', () => {
    window.history.forward();
});
