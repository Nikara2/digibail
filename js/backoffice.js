// JavaScript pour le Backoffice Administration

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des graphiques
    initializeCharts();
    
    // Mise à jour des métriques en temps réel
    updateSystemMetrics();
    setInterval(updateSystemMetrics, 30000); // Mise à jour toutes les 30 secondes
    
    // Gestion des formulaires
    initializeForms();
    
    // Gestion des modals
    initializeModals();
});

// Initialisation des graphiques
function initializeCharts() {
    // Graphique des utilisateurs
    const usersCtx = document.getElementById('usersChart');
    if (usersCtx) {
        new Chart(usersCtx, {
            type: 'line',
            data: {
                labels: ['1er', '5', '10', '15', '20', '25', '30'],
                datasets: [{
                    label: 'Nouveaux utilisateurs',
                    data: [12, 19, 15, 25, 22, 30, 28],
                    borderColor: '#1e90ff',
                    backgroundColor: 'rgba(30, 144, 255, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Graphique des transactions
    const transactionsCtx = document.getElementById('transactionsChart');
    if (transactionsCtx) {
        new Chart(transactionsCtx, {
            type: 'bar',
            data: {
                labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                datasets: [{
                    label: 'Volume (k€)',
                    data: [450, 520, 480, 600],
                    backgroundColor: [
                        'rgba(46, 213, 115, 0.8)',
                        'rgba(30, 144, 255, 0.8)',
                        'rgba(255, 165, 2, 0.8)',
                        'rgba(255, 71, 87, 0.8)'
                    ],
                    borderColor: [
                        '#2ed573',
                        '#1e90ff',
                        '#ffa502',
                        '#ff4757'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Graphique de performance
    const performanceCtx = document.getElementById('performanceChart');
    if (performanceCtx) {
        new Chart(performanceCtx, {
            type: 'doughnut',
            data: {
                labels: ['CPU', 'RAM', 'Disque', 'Réseau'],
                datasets: [{
                    data: [67, 78, 85, 45],
                    backgroundColor: [
                        '#2ed573',
                        '#1e90ff',
                        '#ffa502',
                        '#ff4757'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }
    
    // Graphique des biens
    const propertiesCtx = document.getElementById('propertiesChart');
    if (propertiesCtx) {
        new Chart(propertiesCtx, {
            type: 'pie',
            data: {
                labels: ['Appartements', 'Maisons', 'Studios', 'Commerces'],
                datasets: [{
                    data: [45, 25, 20, 10],
                    backgroundColor: [
                        '#1e90ff',
                        '#2ed573',
                        '#ffa502',
                        '#ff4757'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }
}

// Mise à jour des métriques système
function updateSystemMetrics() {
    // Simulation de données en temps réel
    const metrics = {
        cpu: Math.floor(Math.random() * 30) + 50, // 50-80%
        ram: Math.floor(Math.random() * 25) + 65, // 65-90%
        disk: Math.floor(Math.random() * 10) + 80, // 80-90%
        network: Math.floor(Math.random() * 40) + 30 // 30-70%
    };
    
    // Mise à jour des barres de progression
    updateProgressBar('cpu', metrics.cpu);
    updateProgressBar('ram', metrics.ram);
    updateProgressBar('disk', metrics.disk);
    updateProgressBar('network', metrics.network);
    
    // Mise à jour des valeurs
    updateMetricValue('cpu', metrics.cpu + '%');
    updateMetricValue('ram', metrics.ram + '%');
    updateMetricValue('disk', metrics.disk + '%');
    updateMetricValue('network', metrics.network + '%');
}

function updateProgressBar(type, value) {
    const progressFill = document.querySelector(`[data-metric="${type}"] .progress-fill`);
    if (progressFill) {
        progressFill.style.width = value + '%';
        
        // Mise à jour de la couleur selon la valeur
        progressFill.className = 'progress-fill';
        if (value > 80) {
            progressFill.classList.add('danger');
        } else if (value > 70) {
            progressFill.classList.add('warning');
        }
    }
}

function updateMetricValue(type, value) {
    const metricValue = document.querySelector(`[data-metric="${type}"] .metric-value`);
    if (metricValue) {
        metricValue.textContent = value;
    }
}

// Actualisation des métriques
function refreshMetrics() {
    const btn = event.target;
    const icon = btn.querySelector('i');
    
    // Animation de rotation
    icon.style.transform = 'rotate(360deg)';
    icon.style.transition = 'transform 0.5s ease';
    
    setTimeout(() => {
        updateSystemMetrics();
        icon.style.transform = 'rotate(0deg)';
        showMessage('Métriques actualisées', 'success');
    }, 500);
}

// Mise à jour des graphiques
function updateCharts() {
    const period = document.getElementById('chartPeriod').value;
    
    // Simulation de nouvelles données selon la période
    const data = generateChartData(period);
    
    // Ici vous pourriez mettre à jour les graphiques avec de nouvelles données
    showMessage(`Graphiques mis à jour pour ${period} jours`, 'info');
}

function generateChartData(period) {
    // Simulation de génération de données
    const data = [];
    for (let i = 0; i < period; i++) {
        data.push(Math.floor(Math.random() * 50) + 10);
    }
    return data;
}

// Gestion des formulaires
function initializeForms() {
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const userData = Object.fromEntries(formData);
            
            // Simulation de création d'utilisateur
            createUser(userData);
        });
    }
}

function createUser(userData) {
    const submitBtn = document.querySelector('#userForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Création...';
    
    // Simulation d'appel API
    setTimeout(() => {
        closeModal('userModal');
        showMessage(`Utilisateur ${userData.firstName} ${userData.lastName} créé avec succès`, 'success');
        
        // Réinitialiser le formulaire
        document.getElementById('userForm').reset();
        
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Mettre à jour la liste des utilisateurs
        updateUserList();
    }, 1500);
}

// Gestion des modals
function initializeModals() {
    // Fermeture des modals en cliquant à l'extérieur
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });
    
    // Fermeture avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
    });
}

function showUserModal() {
    showModal('userModal');
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Actions rapides
function showBackupModal() {
    showModal('backupModal');
    // Ici vous pourriez initialiser un modal de sauvegarde
    showMessage('Fonctionnalité de sauvegarde en cours de développement', 'info');
}

function showMaintenanceModal() {
    showModal('maintenanceModal');
    // Ici vous pourriez initialiser un modal de maintenance
    showMessage('Fonctionnalité de maintenance en cours de développement', 'info');
}

function showSecurityModal() {
    showModal('securityModal');
    // Ici vous pourriez initialiser un modal de sécurité
    showMessage('Fonctionnalité de sécurité en cours de développement', 'info');
}

function showAnalyticsModal() {
    showModal('analyticsModal');
    // Ici vous pourriez initialiser un modal d'analytics
    showMessage('Fonctionnalité d\'analytics en cours de développement', 'info');
}

function showSettingsModal() {
    showModal('settingsModal');
    // Ici vous pourriez initialiser un modal de paramètres
    showMessage('Fonctionnalité de paramètres en cours de développement', 'info');
}

function showSupportModal() {
    showModal('supportModal');
    // Ici vous pourriez initialiser un modal de support
    showMessage('Fonctionnalité de support en cours de développement', 'info');
}

// Génération de rapport système
function generateSystemReport() {
    const btn = event.target;
    const originalText = btn.innerHTML;
    
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Génération...';
    
    // Simulation de génération de rapport
    setTimeout(() => {
        // Créer un lien de téléchargement simulé
        const link = document.createElement('a');
        link.href = '#';
        link.download = `rapport-systeme-${new Date().toISOString().split('T')[0]}.pdf`;
        link.click();
        
        btn.disabled = false;
        btn.innerHTML = originalText;
        
        showMessage('Rapport système généré avec succès', 'success');
    }, 2000);
}

// Mise à jour de la liste des utilisateurs
function updateUserList() {
    // Ici vous pourriez mettre à jour la liste des utilisateurs récents
    // avec les nouvelles données du serveur
    console.log('Liste des utilisateurs mise à jour');
}

// Gestion des alertes système
function resolveSystemIssue() {
    const alert = event.target.closest('.alert');
    if (alert) {
        alert.style.opacity = '0';
        setTimeout(() => {
            alert.remove();
            showMessage('Problème système résolu', 'success');
        }, 300);
    }
}

function optimizeStorage() {
    const alert = event.target.closest('.alert');
    if (alert) {
        alert.style.opacity = '0';
        setTimeout(() => {
            alert.remove();
            showMessage('Optimisation du stockage en cours...', 'info');
        }, 300);
    }
}

// Affichage des messages
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <i class="fa-solid ${getMessageIcon(type)}"></i>
        <span>${message}</span>
        <button class="message-close" onclick="this.parentElement.remove()">
            <i class="fa-solid fa-times"></i>
        </button>
    `;
    
    // Styles pour les messages
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getMessageColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Auto-suppression après 5 secondes
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => messageDiv.remove(), 300);
        }
    }, 5000);
}

function getMessageIcon(type) {
    const iconMap = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    return iconMap[type] || 'fa-info-circle';
}

function getMessageColor(type) {
    const colorMap = {
        'success': '#2ed573',
        'error': '#ff4757',
        'warning': '#ffa502',
        'info': '#1e90ff'
    };
    return colorMap[type] || '#1e90ff';
}

// Animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .message-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 50%;
        transition: background 0.3s ease;
    }
    
    .message-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(style);

// Gestion des notifications
function updateNotifications() {
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        // Simulation de nouvelles notifications
        const count = Math.floor(Math.random() * 5) + 1;
        badge.textContent = count;
        
        if (count > 0) {
            badge.style.animation = 'pulse 1s infinite';
        } else {
            badge.style.animation = '';
        }
    }
}

// Mise à jour périodique des notifications
setInterval(updateNotifications, 60000); // Toutes les minutes

// Gestion de la navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Supprimer la classe active de tous les liens
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Ajouter la classe active au lien cliqué
        this.classList.add('active');
        
        // Ici vous pourriez charger le contenu correspondant
        const section = this.getAttribute('href').substring(1);
        if (section) {
            loadSection(section);
        }
    });
});

function loadSection(section) {
    // Simulation de chargement de section
    showMessage(`Chargement de la section ${section}...`, 'info');
    
    // Ici vous pourriez charger dynamiquement le contenu
    console.log(`Chargement de la section: ${section}`);
}

// Export des fonctions globales
window.showUserModal = showUserModal;
window.closeModal = closeModal;
window.refreshMetrics = refreshMetrics;
window.updateCharts = updateCharts;
window.generateSystemReport = generateSystemReport;
window.showBackupModal = showBackupModal;
window.showMaintenanceModal = showMaintenanceModal;
window.showSecurityModal = showSecurityModal;
window.showAnalyticsModal = showAnalyticsModal;
window.showSettingsModal = showSettingsModal;
window.showSupportModal = showSupportModal;
window.resolveSystemIssue = resolveSystemIssue;
window.optimizeStorage = optimizeStorage; 