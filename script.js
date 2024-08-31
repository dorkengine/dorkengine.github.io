function runDork(dork) {
    const domain = document.getElementById('domainInput').value;
    if (domain) {
        const finalDork = dork.replace('example.com', domain);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(finalDork)}`, '_blank');
    } else {
        alert('Please enter a target domain.');
    }
}
