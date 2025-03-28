// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const fileInputs = document.querySelectorAll('input[type="file"]');
const searchForm = document.querySelector('.search-form');
const reportForms = document.querySelectorAll('.report-form form');
const itemCards = document.querySelectorAll('.item-card');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Tab Switching Functionality
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// File Input Display
fileInputs.forEach(input => {
    const fileNameDisplay = input.nextElementSibling.nextElementSibling;
    
    input.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            fileNameDisplay.textContent = e.target.files[0].name;
        } else {
            fileNameDisplay.textContent = 'No file chosen';
        }
    });
});

// Search Form Submission
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchInput = searchForm.querySelector('input[type="text"]');
        const categorySelect = searchForm.querySelector('select:first-of-type');
        const locationSelect = searchForm.querySelector('select:last-of-type');
        
        // Get search values
        const searchTerm = searchInput.value.trim();
        const category = categorySelect.value;
        const location = locationSelect.value;
        
        // Here you would typically make an AJAX request to your backend
        console.log('Searching for:', { searchTerm, category, location });
        
        // For demo purposes, just show an alert
        alert(`Searching for "${searchTerm}" in ${category !== '' ? category : 'all categories'} at ${location !== '' ? location : 'all locations'}`);
        
        // In a real implementation, you would:
        // 1. Send the search criteria to your backend
        // 2. Receive matching items
        // 3. Update the listings section with the results
    });
}

// Form Submissions
reportForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const formType = form.id.includes('lost') ? 'Lost' : 'Found';
        
        // Basic validation
        let isValid = true;
        form.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'red';
                
                // Remove error style after 2 seconds
                setTimeout(() => {
                    field.style.borderColor = '';
                }, 2000);
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Here you would typically send the data to your backend
        console.log(`${formType} Item Report:`, Object.fromEntries(formData));
        
        // For demo purposes, just show a success message
        alert(`${formType} item report submitted successfully!\n\nWe'll notify you if there's a match.`);
        
        // Reset form after submission
        form.reset();
        
        // Reset file name displays
        form.querySelectorAll('.file-name').forEach(el => {
            el.textContent = 'No file chosen';
        });
        
        // In a real implementation, you would:
        // 1. Send the form data to your backend (possibly with AJAX/Fetch)
        // 2. Handle the response (success/error)
        // 3. Update the UI accordingly
    });
});

// Item Card Interactions
itemCards.forEach(card => {
    const detailsBtn = card.querySelector('.details-btn');
    const claimBtn = card.querySelector('.claim-btn');
    
    // View Details Button
    detailsBtn.addEventListener('click', () => {
        const itemName = card.querySelector('h3').textContent;
        const status = card.querySelector('.status-badge').textContent;
        const location = card.querySelector('.location').textContent;
        const date = card.querySelector('.date').textContent;
        const description = card.querySelector('.description').textContent;
        
        // In a real app, this would open a modal or redirect to a details page
        alert(`Item Details:\n\nName: ${itemName}\nStatus: ${status}\n${location}\n${date}\n\nDescription: ${description}`);
    });
    
    // Claim/Found Button
    claimBtn.addEventListener('click', () => {
        const itemName = card.querySelector('h3').textContent;
        const status = card.querySelector('.status-badge').textContent;
        
        if (status === 'LOST') {
            // "I Found This" button clicked
            const response = confirm(`Have you found "${itemName}"? We'll help you contact the owner.`);
            if (response) {
                // In a real app, this would open a contact form
                alert('Please provide your contact information so we can connect you with the owner.');
            }
        } else {
            // "This Is Mine" button clicked
            const response = confirm(`Is "${itemName}" yours? We'll help you contact the finder.`);
            if (response) {
                // In a real app, this would open a contact form
                alert('Please provide proof of ownership and contact information.');
            }
        }
    });
});

// Modal functionality (for future implementation)
function openModal(content) {
    // This would create and show a modal with the specified content
    console.log('Opening modal with:', content);
}

function closeModal() {
    // This would close the currently open modal
    console.log('Closing modal');
}

// Sample data for demonstration (would come from backend in real app)
const sampleItems = [
    {
        id: 1,
        name: "Black Leather Wallet",
        type: "lost",
        location: "Central Park",
        date: "March 28, 2025",
        description: "Contains credit cards and ID. Reward offered for return.",
        image: "item1.jpg"
    },
    {
        id: 2,
        name: "iPhone 13",
        type: "found",
        location: "Metro Station",
        date: "March 27, 2025",
        description: "Found near ticket counter. Has blue case with star pattern.",
        image: "item2.jpg"
    }
];

// Function to render items (for dynamic loading)
function renderItems(items) {
    const itemsGrid = document.querySelector('.items-grid');
    if (!itemsGrid) return;
    
    itemsGrid.innerHTML = items.map(item => `
        <div class="item-card" data-id="${item.id}">
            <div class="card-image">
                <img src="${item.image}" alt="${item.name}">
                <span class="status-badge ${item.type === 'lost' ? 'lost' : 'found'}">
                    ${item.type === 'lost' ? 'LOST' : 'FOUND'}
                </span>
            </div>
            <div class="card-content">
                <h3>${item.name}</h3>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${item.location}</p>
                <p class="date"><i class="far fa-calendar-alt"></i> ${item.date}</p>
                <p class="description">${item.description}</p>
                <div class="card-footer">
                    <button class="details-btn"><i class="fas fa-info-circle"></i> View Details</button>
                    <button class="claim-btn">
                        <i class="fas fa-hand-holding-heart"></i> 
                        ${item.type === 'lost' ? 'I Found This' : 'This Is Mine'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Reattach event listeners to new cards
    document.querySelectorAll('.item-card').forEach(card => {
        const detailsBtn = card.querySelector('.details-btn');
        const claimBtn = card.querySelector('.claim-btn');
        
        detailsBtn.addEventListener('click', () => {
            const item = items.find(i => i.id === parseInt(card.dataset.id));
            openModal(item);
        });
        
        claimBtn.addEventListener('click', () => {
            const item = items.find(i => i.id === parseInt(card.dataset.id));
            handleClaimClick(item);
        });
    });
}

// Initialize with sample data (in a real app, this would come from an API)
document.addEventListener('DOMContentLoaded', () => {
    renderItems(sampleItems);
});

// Handle claim button clicks
function handleClaimClick(item) {
    if (item.type === 'lost') {
        // "I Found This" button clicked
        const response = confirm(`Have you found "${item.name}"? We'll help you contact the owner.`);
        if (response) {
            openModal({ type: 'found', item });
        }
    } else {
        // "This Is Mine" button clicked
        const response = confirm(`Is "${item.name}" yours? We'll help you contact the finder.`);
        if (response) {
            openModal({ type: 'claim', item });
        }
    }
}

// Form validation helper
function validateForm(form) {
    let isValid = true;
    form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            
            // Remove error class after 2 seconds
            setTimeout(() => {
                field.classList.remove('error');
            }, 2000);
        }
    });
    return isValid;
}

// Add to your CSS:
// .error { border-color: red !important; }