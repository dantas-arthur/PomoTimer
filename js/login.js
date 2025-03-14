const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const mobileButtons = document.querySelectorAll('.mobile-button');
const signInForm = container.querySelector('.sign-in');
const signUpForm = container.querySelector('.sign-up');

// Verifica se é mobile
const isMobile = () => window.innerWidth <= 610;

console.log('Mobile buttons encontrados:', mobileButtons.length);

// Desktop
registerBtn.addEventListener('click', () => {
    if (!isMobile()) {
        container.classList.add('active');
        console.log('Desktop: Ativando Sign Up');
    }
});

loginBtn.addEventListener('click', () => {
    if (!isMobile()) {
        container.classList.remove('active');
        console.log('Desktop: Ativando Sign In');
    }
});

// Mobile
mobileButtons.forEach((button, index) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(`Botão ${index} clicado`);
        if (isMobile()) {
            console.log('É mobile. Sign In visível?', signInForm.classList.contains('visible'));
            if (signInForm.classList.contains('visible')) {
                signInForm.classList.remove('visible');
                signUpForm.classList.add('visible');
                console.log('Mostrando Sign Up');
            } else {
                signInForm.classList.add('visible');
                signUpForm.classList.remove('visible');
                console.log('Mostrando Sign In');
            }
        } else {
            console.log('Não é mobile');
        }
    });
});

// Estado inicial
window.addEventListener('load', () => {
    console.log('Página carregada. Mobile?', isMobile());
    if (isMobile()) {
        signInForm.classList.add('visible');
        signUpForm.classList.remove('visible');
        console.log('Mobile: Sign In visível inicialmente');
    } else {
        signInForm.classList.remove('visible');
        signUpForm.classList.remove('visible');
        console.log('Desktop: Estado inicial');
    }
});