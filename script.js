document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.node-btn');
    const modal = document.getElementById('redirectModal');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalUrl = document.getElementById('modalUrl');
    const progressFill = document.querySelector('.progress-fill');

    // Mapping of node targets to specific Phosphor icons
    const icons = {
        'linkedin': 'ph-linkedin-logo',
        'cv': 'ph-file-text',
        'github': 'ph-github-logo'
    };

    const targetNames = {
        'linkedin': 'LinkedIn Network',
        'cv': 'Credentials Archive',
        'github': 'The Project Repository'
    };

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            const url = btn.dataset.url;

            // Prepare modal content
            modalIcon.className = `ph ${icons[target]}`;
            modalTitle.textContent = `Establishing connection to ${targetNames[target]}...`;
            modalUrl.textContent = `Target: ${url}`;

            // Reset progress bar
            progressFill.style.transition = 'none';
            progressFill.style.width = '0%';

            // Show modal
            modal.classList.remove('hidden');

            // Trigger animation in next frame
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    progressFill.style.transition = 'width 2s cubic-bezier(0.65, 0, 0.35, 1)';
                    progressFill.style.width = '100%';
                });
            });

            // Handle the redirect transition
            setTimeout(() => {
                modalTitle.textContent = 'Connection Established. Rerouting...';
                modalTitle.style.color = '#fff';
                modalTitle.style.textShadow = '0 0 20px #00F0FF';
                
                // Simulating actual redirect delay
                setTimeout(() => {
                    if(url.startsWith('http')) {
                        window.open(url, '_blank');
                    } else {
                        console.log('Navigated to: ' + url);
                    }
                    
                    // Reset modal state
                    modal.classList.add('hidden');
                }, 800);
            }, 2000);
        });
        
        // Add cursor hover effects
        btn.addEventListener('mouseenter', () => {
            const cursorRing = document.querySelector('.cursor-ring');
            const cursorDot = document.querySelector('.cursor-dot');
            if(cursorRing && cursorDot) {
                cursorRing.classList.add('hovered');
                cursorDot.classList.add('hovered');
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            const cursorRing = document.querySelector('.cursor-ring');
            const cursorDot = document.querySelector('.cursor-dot');
            if(cursorRing && cursorDot) {
                cursorRing.classList.remove('hovered');
                cursorDot.classList.remove('hovered');
            }
        });
    });

    // Custom Cursor tracking & Parallax Effect
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const glassPanel = document.querySelector('.glass-panel');

    // Handle mouse movement for cursor & parallax
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Instant update for dot
        if (cursorDot) cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

        // Parallax effect on the panel
        if (glassPanel) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const deltaX = (mouseX - centerX) * 0.02; // Small degree rotation
            const deltaY = (mouseY - centerY) * 0.02;
            
            // Reversing Y for natural tilt
            glassPanel.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg)`;
        }
    });

    // Smooth chasing loop for the cursor ring
    function renderCursor() {
        // Interpolation for smooth trailing ring
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        if (cursorRing) cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
        requestAnimationFrame(renderCursor);
    }
    
    // Start cursor loop
    requestAnimationFrame(renderCursor);

    // Quirky Tech Quotes Logic
    const speechBubble = document.querySelector('.speech-bubble');
    const techQuotes = [
        "Training model... loss: 0.042",
        "git push --force",
        "It works on my machine!",
        "Optimizing neural pathways...",
        "Distributing workloads...",
        "Found 0 vulnerabilities.",
        "Scaling inference nodes...",
        "Refactoring legacy code...",
        "Hello, World!"
    ];

    setInterval(() => {
        // Randomly decide to speak
        if (Math.random() > 0.4) {
            const quote = techQuotes[Math.floor(Math.random() * techQuotes.length)];
            speechBubble.textContent = quote;
            speechBubble.classList.add('active');
            
            setTimeout(() => {
                speechBubble.classList.remove('active');
            }, 2500); // Hide after 2.5s
        }
    }, 4000);

});
