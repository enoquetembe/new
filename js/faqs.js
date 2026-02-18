// ========================================
// KWELLAA FAQS PAGE INTERACTIVE SCRIPT
// ========================================

class FAQManager {
    constructor() {
        this.searchInput = document.getElementById('faqSearch');
        this.categoryButtons = document.querySelectorAll('.category-btn');
        this.faqItems = document.querySelectorAll('.faq-item');
        this.activeCategory = 'all';
        this.init();
    }

    init() {
        this.setupAccordion();
        this.setupSearch();
        this.setupCategoryFilter();
    }

    // Accordion functionality
    setupAccordion() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items
                this.faqItems.forEach(faq => faq.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Search functionality
    setupSearch() {
        if (!this.searchInput) return;

        this.searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            this.filterFAQs(searchTerm, this.activeCategory);
        });
    }

    // Category filter functionality
    setupCategoryFilter() {
        this.categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                
                // Update active button
                this.categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update active category
                this.activeCategory = category;
                
                // Filter FAQs
                const searchTerm = this.searchInput ? this.searchInput.value.toLowerCase().trim() : '';
                this.filterFAQs(searchTerm, category);
            });
        });
    }

    // Filter FAQs based on search and category
    filterFAQs(searchTerm, category) {
        let visibleCount = 0;

        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question span').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
            const itemCategory = item.getAttribute('data-category');
            
            // Check if item matches search term
            const matchesSearch = !searchTerm || 
                                question.includes(searchTerm) || 
                                answer.includes(searchTerm);
            
            // Check if item matches category
            const matchesCategory = category === 'all' || itemCategory === category;
            
            // Show or hide item
            if (matchesSearch && matchesCategory) {
                item.classList.remove('hidden');
                visibleCount++;
            } else {
                item.classList.add('hidden');
                item.classList.remove('active');
            }
        });

        // Show "no results" message if needed
        this.showNoResults(visibleCount === 0);
    }

    // Show/hide no results message
    showNoResults(show) {
        let noResultsDiv = document.querySelector('.no-results');
        
        if (!noResultsDiv && show) {
            noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'no-results';
            noResultsDiv.innerHTML = `
                <i class="fas fa-search"></i>
                <h3>Nenhum resultado encontrado</h3>
                <p>Tente buscar com palavras diferentes ou entre em contacto conosco</p>
            `;
            document.querySelector('.faq-accordion').appendChild(noResultsDiv);
        }
        
        if (noResultsDiv) {
            noResultsDiv.classList.toggle('show', show);
        }
    }
}

// Contact CTA button handler
class FAQContactHandler {
    constructor() {
        this.contactCta = document.getElementById('contactCta');
        this.init();
    }

    init() {
        if (!this.contactCta) return;

        this.contactCta.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Trigger the contact modal from the main navigation
            const contactBtn = document.getElementById('contactBtn');
            if (contactBtn) {
                contactBtn.click();
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new FAQManager();
    new FAQContactHandler();
    
    console.log('✅ FAQs Page Initialized');
});