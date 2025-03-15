// Navbar Fixed 
window.onscroll = function() {
    const header = document.querySelector('header');
    const toTop = document.querySelector('#to-top');
    const navFixed = header.offsetTop;

    if (window.pageYOffset > navFixed){
        header.classList.add('navbar-fixed');
        toTop.classList.remove('hidden');
        toTop.classList.add('flex');
    }else{
        header.classList.remove('navbar-fixed');
        toTop.classList.remove('flex');
        toTop.classList.add('hidden');
    }
}

// Hamburger
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function(){
    hamburger.classList.toggle('hamburger-active')
    navMenu.classList.toggle('hidden')
});

// Klik diluar hamburger
window.addEventListener('click', function(e){
    if(e.target != hamburger && e.target != navMenu){
        hamburger.classList.remove('hamburger-active')
        navMenu.classList.add('hidden')
    }
});

// Darkmode Toggle
const darkToggle = document.querySelector('#dark-toggle');
const html = document.querySelector('html');

darkToggle.addEventListener('click', function(){
    if(darkToggle.checked){
        html.classList.add('dark');
        localStorage.theme = 'dark'
    }else{
        html.classList.remove('dark');
        localStorage.theme = 'light';
    }
});

// Pindahkan toggle sesuai mode
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) 
{
    darkToggle.checked = true;
} else {
    darkToggle.checked = false;
}

// Portfolio Dynamic Loading
async function loadPortfolio() {
    try {
        const response = await fetch('dist/portfolio.json');
        const data = await response.json();
        const portfolioContainer = document.getElementById('portfolio-container');

        data.projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'mb-12 p-4 md:w-1/2';

            const content = `
                <div class="rounded-md shadow-md overflow-hidden">
                    <img src="${project.image}" alt="${project.title}" width="w-full">
                </div>
                ${project.link 
                    ? `<a href="${project.link}" target="_blank"><h3 class="font-semibold text-xl text-dark mt-5 mb-3 dark:text-white">${project.title}</h3></a>`
                    : `<h3 class="font-semibold text-xl text-dark mt-5 mb-3 dark:text-white">${project.title}</h3>`
                }
                <p class="font-medium text-base text-secondary">${project.description}</p>
            `;

            projectElement.innerHTML = content;
            portfolioContainer.appendChild(projectElement);
        });
    } catch (error) {
        console.error('Error loading portfolio:', error);
    }
}

// Load portfolio when DOM is ready
document.addEventListener('DOMContentLoaded', loadPortfolio);
