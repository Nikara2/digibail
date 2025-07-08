// Quittances Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeQuittancesPage();
});

function initializeQuittancesPage() {
    // Initialize search functionality
    initializeSearch();
    
    // Initialize filters
    initializeFilters();
    
    // Initialize receipt actions
    initializeReceiptActions();
    
    // Initialize pagination
    initializePagination();
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const receiptCards = document.querySelectorAll('.receipt-card');
        
        receiptCards.forEach(card => {
            const receiptTitle = card.querySelector('.receipt-content h3').textContent.toLowerCase();
            const receiptPeriod = card.querySelector('.receipt-period').textContent.toLowerCase();
            const receiptInfo = card.querySelector('.receipt-info').textContent.toLowerCase();
            
            if (receiptTitle.includes(searchTerm) || receiptPeriod.includes(searchTerm) || receiptInfo.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Filter functionality
function initializeFilters() {
    const yearFilter = document.getElementById('yearFilter');
    const monthFilter = document.getElementById('monthFilter');
    
    if (yearFilter) {
        yearFilter.addEventListener('change', filterReceipts);
    }
    
    if (monthFilter) {
        monthFilter.addEventListener('change', filterReceipts);
    }
}

function filterReceipts() {
    const yearFilter = document.getElementById('yearFilter');
    const monthFilter = document.getElementById('monthFilter');
    const receiptCards = document.querySelectorAll('.receipt-card');
    
    const selectedYear = yearFilter ? yearFilter.value : '';
    const selectedMonth = monthFilter ? monthFilter.value : '';
    
    receiptCards.forEach(card => {
        const period = card.querySelector('.receipt-period').textContent;
        const year = period.includes('2024') ? '2024' : period.includes('2023') ? '2023' : '2022';
        
        // Extract month number from period text
        const monthMap = {
            'Janvier': '1', 'Février': '2', 'Mars': '3', 'Avril': '4',
            'Mai': '5', 'Juin': '6', 'Juillet': '7', 'Août': '8',
            'Septembre': '9', 'Octobre': '10', 'Novembre': '11', 'Décembre': '12'
        };
        
        let month = '';
        for (const [monthName, monthNum] of Object.entries(monthMap)) {
            if (period.includes(monthName)) {
                month = monthNum;
                break;
            }
        }
        
        const yearMatch = !selectedYear || year === selectedYear;
        const monthMatch = !selectedMonth || month === selectedMonth;
        
        if (yearMatch && monthMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Receipt actions
function initializeReceiptActions() {
    // Add click event listeners to receipt cards
    const receiptCards = document.querySelectorAll('.receipt-card');
    receiptCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on buttons
            if (e.target.closest('.receipt-actions')) {
                return;
            }
            
            // Show receipt details
            const period = this.querySelector('.receipt-period').textContent;
            viewReceipt(period);
        });
    });
}

// Download receipt
function downloadReceipt(period) {
    showToast(`Téléchargement de la quittance ${period}...`, 'info');
    
    // Simulate download process
    setTimeout(() => {
        showToast('Quittance téléchargée avec succès !', 'success');
        
        // Create a fake download link
        const link = document.createElement('a');
        link.href = '#';
        link.download = `quittance-${period}.pdf`;
        link.click();
        
        // Update status badge to downloaded
        const receiptCard = document.querySelector(`[onclick*="${period}"]`).closest('.receipt-card');
        if (receiptCard) {
            const statusBadge = receiptCard.querySelector('.status-badge');
            if (statusBadge) {
                statusBadge.textContent = 'Téléchargée';
                statusBadge.className = 'status-badge downloaded';
            }
        }
    }, 2000);
}

// View receipt
function viewReceipt(period) {
    showToast(`Affichage de la quittance ${period}...`, 'info');
    
    // In a real application, this would open a modal or new window with the receipt
    setTimeout(() => {
        showToast('Quittance affichée', 'success');
        
        // For demo purposes, we could open a new window with a receipt preview
        // window.open(`receipt-preview.html?period=${period}`, '_blank');
    }, 1000);
}

// Export all receipts
function exportAllReceipts() {
    showToast('Export de toutes les quittances en cours...', 'info');
    
    // Simulate export process
    setTimeout(() => {
        showToast('Export terminé ! Archive ZIP téléchargée.', 'success');
        
        // Create a fake download link
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'quittances-export.zip';
        link.click();
    }, 3000);
}

// Generate annual receipt
function generateAnnualReceipt() {
    showToast('Génération de la quittance annuelle en cours...', 'info');
    
    // Simulate generation process
    setTimeout(() => {
        showToast('Quittance annuelle générée ! Téléchargement en cours...', 'success');
        
        // Create a fake download link
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'quittance-annuelle-2023.pdf';
        link.click();
    }, 4000);
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

// Receipt statistics update
function updateReceiptStats() {
    const totalReceipts = document.querySelectorAll('.receipt-card').length;
    const downloadedReceipts = document.querySelectorAll('.status-badge.downloaded').length;
    
    // Update stats in the UI
    const totalStat = document.querySelector('.receipt-stats .stat-card:nth-child(1) .stat-content h3');
    const downloadedStat = document.querySelector('.receipt-stats .stat-card:nth-child(2) .stat-content h3');
    
    if (totalStat) totalStat.textContent = totalReceipts;
    if (downloadedStat) downloadedStat.textContent = downloadedReceipts;
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