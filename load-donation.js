function loadDonationSection() {
    const placeholder = document.getElementById('donation-placeholder');
    if (placeholder) {
        fetch('donation-snippet.html')
            .then(response => response.text())
            .then(data => {
                placeholder.style.opacity = 0; // Start invisible
                placeholder.innerHTML = data;
                
                // Smooth fade-in effect
                setTimeout(() => {
                    placeholder.style.transition = "opacity 0.8s ease-in";
                    placeholder.style.opacity = 1;
                }, 100);
            })
            .catch(err => console.error('Error:', err));
    }
}

window.onload = loadDonationSection;