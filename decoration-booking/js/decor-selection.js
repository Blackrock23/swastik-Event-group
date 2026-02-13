/* ===== DECORATION SELECTION PAGE LOGIC ===== */

document.addEventListener('DOMContentLoaded', function() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const readyMadeView = document.getElementById('readyMadeView');
    const customView = document.getElementById('customView');
    const decorationsGrid = document.getElementById('decorationsGrid');
    const continueCustomBtn = document.getElementById('continueCustomBtn');

    let selectedDecorId = null;

    // Load existing selection if available
    loadExistingSelection();

    // Render ready-made decorations
    renderDecorations();

    // View toggle buttons
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Update view
            const view = this.dataset.view;
            
            if (view === 'ready-made') {
                readyMadeView.style.display = 'block';
                customView.style.display = 'none';
            } else {
                readyMadeView.style.display = 'none';
                customView.style.display = 'block';
            }
        });
    });

    // Continue to custom decoration
    continueCustomBtn.addEventListener('click', function() {
        Storage.set('decorationType', 'custom');
        window.location.href = 'custom-decor.html';
    });

    // Function to render decoration cards
    function renderDecorations() {
        decorationsGrid.innerHTML = '';

        DecorationPackages.forEach(decor => {
            const card = document.createElement('div');
            card.className = 'decoration-card';
            if (selectedDecorId === decor.id) {
                card.classList.add('selected');
            }

            card.innerHTML = `
                <img src="${decor.image}" alt="${decor.name}" class="decoration-image">
                <div class="decoration-info">
                    <div class="decoration-name">${decor.name}</div>
                    <p class="decoration-description">${decor.description}</p>
                    <div class="decoration-price">₹${decor.price.toLocaleString()}</div>
                    <div class="decoration-items">
                        <h4>Includes:</h4>
                        <ul>
                            ${decor.includedItems.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    <button class="select-btn ${selectedDecorId === decor.id ? 'selected' : ''}" onclick="selectDecoration(${decor.id})">
                        ${selectedDecorId === decor.id ? '✓ Selected' : 'Select This Design'}
                    </button>
                </div>
            `;

            decorationsGrid.appendChild(card);
        });
    }

    // Function to select a decoration
    window.selectDecoration = function(decorId) {
        selectedDecorId = decorId;
        const selectedPackage = DecorationPackages.find(d => d.id === decorId);

        // Save selection to localStorage
        Storage.updateBooking({
            selectedDecor: {
                id: selectedPackage.id,
                name: selectedPackage.name,
                price: selectedPackage.price,
                description: selectedPackage.description,
                includedItems: selectedPackage.includedItems
            },
            decorationType: 'ready-made',
            decorationPrice: selectedPackage.price
        });

        // Show success message and redirect
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success';
        successDiv.style.position = 'fixed';
        successDiv.style.top = '80px';
        successDiv.style.right = '20px';
        successDiv.style.zIndex = '1000';
        successDiv.textContent = `${selectedPackage.name} selected! Redirecting to summary...`;
        document.body.appendChild(successDiv);

        // Re-render to update buttons
        renderDecorations();

        // Redirect to client details
        setTimeout(() => {
            window.location.href = 'client-details.html';
        }, 1500);
    };

    // Function to load existing selection
    function loadExistingSelection() {
        const booking = Storage.getBooking();
        if (booking.selectedDecor && booking.selectedDecor.id) {
            selectedDecorId = booking.selectedDecor.id;
        }
    }
});
