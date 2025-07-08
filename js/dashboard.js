// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize payment history chart
    initializePaymentChart();
    
    // Initialize sidebar interactions
    initializeSidebar();
    
    // Initialize notifications
    initializeNotifications();
    
    // Initialize chart period selector
    initializeChartControls();
});

// Payment History Chart
function initializePaymentChart() {
    const ctx = document.getElementById('paymentChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
            datasets: [{
                label: 'Loyers payés',
                data: [800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800],
                borderColor: '#1A237E',
                backgroundColor: 'rgba(26, 35, 126, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }, {
                label: 'Charges',
                data: [120, 110, 125, 115, 130, 120, 125, 120, 115, 125, 120, 120],
                borderColor: '#388E3C',
                backgroundColor: 'rgba(56, 142, 60, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
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
                point: {
                    radius: 4,
                    hoverRadius: 6
                }
            }
        }
    });
}

// Sidebar Interactions
function initializeSidebar() {
    // Mobile menu toggle
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Add mobile menu button if not exists
    if (window.innerWidth <= 1024 && !document.querySelector('.mobile-menu-btn')) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        mobileMenuBtn.style.cssText = `
            position: fixed;
            top: 1rem;
            left: 1rem;
            z-index: 200;
            background: var(--color-blue);
            color: white;
            border: none;
            padding: 0.8rem;
            border-radius: 0.5rem;
            cursor: pointer;
            display: none;
        `;
        
        document.body.appendChild(mobileMenuBtn);
        
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
        
        // Show mobile menu button on small screens
        if (window.innerWidth <= 1024) {
            mobileMenuBtn.style.display = 'block';
        }
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024 && 
            !sidebar.contains(e.target) && 
            !e.target.closest('.mobile-menu-btn')) {
            sidebar.classList.remove('open');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (window.innerWidth > 1024) {
            sidebar.classList.remove('open');
            if (mobileMenuBtn) mobileMenuBtn.style.display = 'none';
        } else {
            if (mobileMenuBtn) mobileMenuBtn.style.display = 'block';
        }
    });
    
    // Navigation link interactions
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('open');
            }
        });
    });
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
                    <h4>Paiement en retard</h4>
                    <p>Votre loyer de janvier 2024 n'a pas encore été payé.</p>
                    <span class="notification-time">Il y a 2 heures</span>
                </div>
            </div>
            <div class="notification-item unread">
                <div class="notification-icon">
                    <i class="fa-solid fa-info-circle"></i>
                </div>
                <div class="notification-content">
                    <h4>Nouveau message</h4>
                    <p>Votre bailleur a ajouté un nouveau message.</p>
                    <span class="notification-time">Il y a 1 jour</span>
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

// Chart Controls
function initializeChartControls() {
    const chartPeriod = document.querySelector('.chart-period');
    if (!chartPeriod) return;
    
    chartPeriod.addEventListener('change', function() {
        const period = this.value;
        // Here you would typically update the chart data
        // For now, we'll just show a notification
        showToast(`Période changée : ${period} derniers mois`, 'info');
    });
}

// Toast Notification System
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

// Payment button interactions
document.addEventListener('click', function(e) {
    if (e.target.textContent.includes('Payer') || e.target.closest('.btn-primary')) {
        if (e.target.textContent.includes('Payer')) {
            e.preventDefault();
            window.location.href = 'paiement.html';
        }
    }
}); 