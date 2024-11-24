const toggleButton = document.getElementById('theme_button');

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark_theme');
});
