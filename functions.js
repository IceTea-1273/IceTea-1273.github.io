const toggleButton = document.getElementById('theme_button');

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark_theme');
});

const goToTopButton = document.getElementById('go_to_top');

window.addEventListener('scroll', checkHeight);

function checkHeight() {
    if (window.scrollY > 200) {
        goToTopButton.style.display = 'block';
    } else {
        goToTopButton.style.display = 'none';
    }
}

goToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const sidebar = document.getElementById('sidebar');
const sidebarButton = document.getElementById('sidebar_button');

sidebarButton.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    sidebarButton.classList.toggle('active');
    if (sidebarButton.classList.contains('active')) {
        sidebarButton.innerHTML = '<i class="bx bx-x"></i>';
    }
    else {
        sidebarButton.innerHTML = '<i class="bx bx-menu"></i>';
    }
});




