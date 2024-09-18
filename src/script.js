function runDork(dork) {
    const domain = document.getElementById('domainInput').value;
    if (domain) {
        const finalDork = dork.replace('example.com', domain);
        
        if (finalDork.startsWith('http://') || finalDork.startsWith('https://')) {
            window.open(finalDork, '_blank');
        } else {

            window.open(`https://www.google.com/search?q=${encodeURIComponent(finalDork)}`, '_blank');
        }
    } else {
        alert('Please enter a target domain.');
    }
}

// Get the theme switch input and label
const themeSwitch = document.getElementById('theme-switch');
const themeLabel = document.getElementById('theme-label');

// Check for saved theme preference in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeSwitch.checked = savedTheme === 'dark';
    themeLabel.textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
}

// Function to switch themes
function toggleTheme() {
    if (themeSwitch.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeLabel.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeLabel.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    }
}

// Add event listener for theme switch
themeSwitch.addEventListener('change', toggleTheme);
