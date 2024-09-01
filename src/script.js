function runDork(dork) {
    const domain = document.getElementById('domainInput').value;
    if (domain) {
        // Replace 'example.com' with the actual domain
        const finalDork = dork.replace('example.com', domain);
        
        // Check if the dork is a URL that should be opened directly
        if (finalDork.startsWith('http://') || finalDork.startsWith('https://')) {
            window.open(finalDork, '_blank');
        } else {
            // Otherwise, treat it as a Google search query
            window.open(`https://www.google.com/search?q=${encodeURIComponent(finalDork)}`, '_blank');
        }
    } else {
        alert('Please enter a target domain.');
    }
}
