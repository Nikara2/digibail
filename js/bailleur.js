// Bailleur Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeBailleurDashboard();
});

function initializeBailleurDashboard() {
    // Initialize revenue chart
    initializeRevenueChart();
    
    // Initialize chart period selector
    initializeChartControls();
    
    // Initialize quick actions
    initializeQuickActions();
    
    // Initialize notifications
    initializeNotifications();
}

// Revenue Chart
function initializeRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
            datasets: [{
                label: 'Revenus locatifs',
                data: [3200, 3200, 3200, 3200, 3200, 3200, 3200, 3200, 3200, 3200, 3200, 3200],
                backgroundColor: 'rgba(26, 35, 126, 0.8)',
                borderColor: '#1A237E',
                borderWidth: 1,
                borderRadius: 4,
                borderSkipped: false,
            }, {
                label: 'Charges',
                data: [480, 480, 480, 480, 480, 480, 480, 480, 480, 480, 480, 480],
                backgroundColor: 'rgba(56, 142, 60, 0.8)',
                borderColor: '#388E3C',
                borderWidth: 1,
                borderRadius: 4,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            family: 'Poppins',
                            size: 12
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        font: {
                            family: 'Poppins',
                            size: 12
                        },
                        callback: function(value) {
                            return value + ' €';
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        font: {
                            family: 'Poppins',
                            size: 12
                        }
                    }
                }
            },
            elements: {
                bar: {
                    borderRadius: 4
                }
            }
        }
    });
}

// Chart Controls
function initializeChartControls() {
    const chartPeriod = document.querySelector('.chart-period');
    if (!chartPeriod) return;
    
    chartPeriod.addEventListener('change', function() {
        const period = this.value;
        showToast(`Période changée : ${period} derniers mois`, 'info');
        
        // In a real application, this would update the chart data
        // For now, we'll just show a notification
    });
}

// Quick Actions
function initializeQuickActions() {
    // Add click event listeners to quick action buttons
    const quickActions = document.querySelectorAll('.quick-action .btn');
    quickActions.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.closest('.quick-action').querySelector('h4').textContent;
            handleQuickAction(action);
        });
    });
}

function handleQuickAction(action) {
    switch(action) {
        case 'Ajouter un bien':
            showToast('Ouverture du formulaire d\'ajout de bien...', 'info');
            setTimeout(() => {
                // In a real app, this would open a modal or navigate to add property page
                showToast('Formulaire d\'ajout de bien ouvert', 'success');
            }, 1000);
            break;
            
        case 'Nouveau contrat':
            showToast('Création d\'un nouveau contrat...', 'info');
            setTimeout(() => {
                // In a real app, this would open a modal or navigate to contract creation
                showToast('Formulaire de création de contrat ouvert', 'success');
            }, 1000);
            break;
            
        case 'Rapport mensuel':
            generateReport();
            break;
            
        case 'Support':
            showToast('Ouverture du support...', 'info');
            setTimeout(() => {
                // In a real app, this would open support chat or contact form
                showToast('Support ouvert', 'success');
            }, 1000);
            break;
    }
}

// Generate Report
function generateReport() {
    showToast('Génération du rapport en cours...', 'info');
    
    // Simulate report generation
    setTimeout(() => {
        showToast('Rapport généré ! Téléchargement en cours...', 'success');
        
        // Create a fake download link
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'rapport-bailleur-janvier-2024.pdf';
        link.click();
    }, 3000);
}

// Notifications System
function initializeNotifications() {
    const notificationBtn = document.querySelector('.notifications');
    if (!notificationBtn) return;
    
    notificationBtn.addEventListener('click', function() {
        showNotificationPanel();
    });
}

function showNotificationPanel() {
    // Remove existing notification panel
    const existingPanel = document.querySelector('.notification-panel');
    if (existingPanel) {
        existingPanel.remove();
        return;
    }
    
    // Create notification panel
    const panel = document.createElement('div');
    panel.className = 'notification-panel';
    panel.innerHTML = `
        <div class="notification-header">
            <h3>Notifications</h3>
            <button class="close-notifications">
                <i class="fa-solid fa-times"></i>
            </button>
        </div>
        <div class="notification-list">
            <div class="notification-item unread">
                <div class="notification-icon">
                    <i class="fa-solid fa-exclamation-triangle"></i>
                </div>
                <div class="notification-content">
                    <h4>Loyer en retard</h4>
                    <p>Le loyer de l'appartement T3 n'a pas été payé.</p>
                    <span class="notification-time">Il y a 2 heures</span>
                </div>
            </div>
            <div class="notification-item unread">
                <div class="notification-icon">
                    <i class="fa-solid fa-check-circle"></i>
                </div>
                <div class="notification-content">
                    <h4>Paiement reçu</h4>
                    <p>Paiement de 650€ reçu pour l'appartement T2.</p>
                    <span class="notification-time">Il y a 1 jour</span>
                </div>
            </div>
            <div class="notification-item unread">
                <div class="notification-icon">
                    <i class="fa-solid fa-file-contract"></i>
                </div>
                <div class="notification-content">
                    <h4>Contrat renouvelé</h4>
                    <p>Le contrat de l'appartement T3 a été renouvelé.</p>
                    <span class="notification-time">Il y a 2 jours</span>
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    panel.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        width: 350px;
        background: white;
        border-radius: 0.8rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        z-index: 1000;
        border: 1px solid var(--color-grey);
    `;
    
    // Add panel styles
    const style = document.createElement('style');
    style.textContent = `
        .notification-header {
            padding: 1rem 1.5rem;
            border-bottom: 1px solid var(--color-grey);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .notification-header h3 {
            margin: 0;
            color: var(--color-blue);
            font-size: 1.1rem;
        }
        .close-notifications {
            background: none;
            border: none;
            color: var(--color-text-light);
            cursor: pointer;
            padding: 0.5rem;
        }
        .notification-list {
            max-height: 400px;
            overflow-y: auto;
        }
        .notification-item {
            display: flex;
            gap: 1rem;
            padding: 1rem 1.5rem;
            border-bottom: 1px solid var(--color-grey);
            cursor: pointer;
            transition: background 0.3s ease;
        }
        .notification-item:hover {
            background: rgba(26,35,126,0.05);
        }
        .notification-item.unread {
            background: rgba(26,35,126,0.05);
        }
        .notification-icon {
            width: 40px;
            height: 40px;
            background: var(--color-blue);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 0.9rem;
        }
        .notification-content h4 {
            margin: 0 0 0.3rem 0;
            font-size: 0.9rem;
            color: var(--color-text);
        }
        .notification-content p {
            margin: 0 0 0.3rem 0;
            font-size: 0.8rem;
            color: var(--color-text-light);
        }
        .notification-time {
            font-size: 0.7rem;
            color: var(--color-text-light);
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(panel);
    
    // Close button functionality
    const closeBtn = panel.querySelector('.close-notifications');
    closeBtn.addEventListener('click', function() {
        panel.remove();
    });
    
    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (!panel.contains(e.target) && !e.target.closest('.notifications')) {
            panel.remove();
        }
    });
}

// Property management functions
function manageProperty(propertyId) {
    showToast(`Gestion du bien ${propertyId}...`, 'info');
    
    setTimeout(() => {
        // In a real app, this would open property management page
        showToast('Page de gestion du bien ouverte', 'success');
    }, 1000);
}

function rentProperty(propertyId) {
    showToast(`Mise en location du bien ${propertyId}...`, 'info');
    
    setTimeout(() => {
        // In a real app, this would open rental process
        showToast('Processus de location ouvert', 'success');
    }, 1000);
}

function sendReminder(propertyId) {
    showToast(`Envoi de relance pour le bien ${propertyId}...`, 'info');
    
    setTimeout(() => {
        showToast('Relance envoyée avec succès !', 'success');
    }, 2000);
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