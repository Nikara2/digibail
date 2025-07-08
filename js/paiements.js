// Paiements Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializePaiementsPage();
});

function initializePaiementsPage() {
    // Initialize search functionality
    initializeSearch();
    
    // Initialize filters
    initializeFilters();
    
    // Initialize payment actions
    initializePaymentActions();
    
    // Initialize pagination
    initializePagination();
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const paymentRows = document.querySelectorAll('.payment-row');
        
        paymentRows.forEach(row => {
            const refNumber = row.querySelector('.ref-number').textContent.toLowerCase();
            const refDetail = row.querySelector('.ref-detail').textContent.toLowerCase();
            
            if (refNumber.includes(searchTerm) || refDetail.includes(searchTerm)) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Filter functionality
function initializeFilters() {
    const statusFilter = document.getElementById('statusFilter');
    const periodFilter = document.getElementById('periodFilter');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', filterPayments);
    }
    
    if (periodFilter) {
        periodFilter.addEventListener('change', filterPayments);
    }
}

function filterPayments() {
    const statusFilter = document.getElementById('statusFilter');
    const periodFilter = document.getElementById('periodFilter');
    const paymentRows = document.querySelectorAll('.payment-row');
    
    const selectedStatus = statusFilter ? statusFilter.value : '';
    const selectedPeriod = periodFilter ? periodFilter.value : '';
    
    paymentRows.forEach(row => {
        const status = row.querySelector('.status-badge').classList.contains('paid') ? 'paid' : 
                      row.querySelector('.status-badge').classList.contains('overdue') ? 'overdue' : 'pending';
        
        const period = row.querySelector('.ref-detail').textContent.includes('2024') ? '2024' :
                      row.querySelector('.ref-detail').textContent.includes('2023') ? '2023' : '2022';
        
        const statusMatch = !selectedStatus || status === selectedStatus;
        const periodMatch = !selectedPeriod || period === selectedPeriod;
        
        if (statusMatch && periodMatch) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });
}

// Payment actions
function initializePaymentActions() {
    // Add click event listeners to payment rows
    const paymentRows = document.querySelectorAll('.payment-row');
    paymentRows.forEach(row => {
        row.addEventListener('click', function(e) {
            // Don't trigger if clicking on buttons
            if (e.target.closest('.actions')) {
                return;
            }
            
            // Show payment details
            const refNumber = this.querySelector('.ref-number').textContent;
            viewDetails(refNumber);
        });
    });
}

// Pay now function
function payNow(refNumber) {
    showToast(`Redirection vers le paiement ${refNumber}...`, 'info');
    
    setTimeout(() => {
        window.location.href = `paiement.html?ref=${refNumber}`;
    }, 1000);
}

// View payment details
function viewDetails(refNumber) {
    showToast(`Affichage des détails du paiement ${refNumber}...`, 'info');
    
    // In a real application, this would open a modal with payment details
    setTimeout(() => {
        showToast('Détails du paiement affichés', 'success');
    }, 1000);
}

// Download receipt
function downloadReceipt(refNumber) {
    showToast(`Téléchargement du reçu ${refNumber}...`, 'info');
    
    // Simulate download process
    setTimeout(() => {
        showToast('Reçu téléchargé avec succès !', 'success');
        
        // Create a fake download link
        const link = document.createElement('a');
        link.href = '#';
        link.download = `receipt-${refNumber}.pdf`;
        link.click();
    }, 2000);
}

// Export payments
function exportPayments() {
    showToast('Export des paiements en cours...', 'info');
    
    // Simulate export process
    setTimeout(() => {
        showToast('Export terminé ! Fichier téléchargé.', 'success');
        
        // Create a fake download link
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'paiements-export.csv';
        link.click();
    }, 3000);
}

// Pagination
function initializePagination() {
    const prevBtn = document.querySelector('.pagination-btn:first-child');
    const nextBtn = document.querySelector('.pagination-btn:last-child');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (!this.disabled) {
                goToPage('prev');
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (!this.disabled) {
                goToPage('next');
            }
        });
    }
}

function goToPage(direction) {
    const currentPage = 1; // In a real app, this would be tracked
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    
    showToast(`Navigation vers la page ${newPage}...`, 'info');
    
    // In a real application, this would load new data
    setTimeout(() => {
        showToast(`Page ${newPage} chargée`, 'success');
    }, 1000);
}

// Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fa-solid ${getToastIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${getToastColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        animation: slideUp 0.3s ease;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                transform: translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
}

function getToastIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getToastColor(type) {
    switch(type) {
        case 'success': return '#388E3C';
        case 'error': return '#d32f2f';
        case 'warning': return '#f57c00';
        default: return '#1A237E';
    }
} 