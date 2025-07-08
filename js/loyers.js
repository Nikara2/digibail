// JavaScript pour la page Loyers

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const monthFilter = document.getElementById('monthFilter');
    const sortFilter = document.getElementById('sortFilter');
    const rentalsList = document.querySelector('.rentals-list');
    
    // Données des loyers (simulation)
    const rentals = [
        {
            id: 1,
            propertyName: 'Appartement T3 - Rue de la Paix',
            tenantName: 'Jean Dupont',
            tenantPhone: '06 12 34 56 78',
            tenantEmail: 'jean.dupont@email.com',
            dueDate: '2024-01-05',
            receivedDate: null,
            amount: 800,
            charges: 50,
            status: 'overdue',
            paymentMethod: null,
            quittanceGenerated: false,
            month: '2024-01'
        },
        {
            id: 2,
            propertyName: 'Appartement T2 - Avenue des Champs',
            tenantName: 'Sophie Bernard',
            tenantPhone: '06 98 76 54 32',
            tenantEmail: 'sophie.bernard@email.com',
            dueDate: '2024-01-05',
            receivedDate: '2024-01-15',
            amount: 650,
            charges: 40,
            status: 'received',
            paymentMethod: 'virement',
            quittanceGenerated: true,
            month: '2024-01'
        },
        {
            id: 3,
            propertyName: 'Studio - Boulevard Central',
            tenantName: 'Pierre Durand',
            tenantPhone: '06 11 22 33 44',
            tenantEmail: 'pierre.durand@email.com',
            dueDate: '2024-01-05',
            receivedDate: '2024-01-10',
            amount: 500,
            charges: 30,
            status: 'received',
            paymentMethod: 'virement',
            quittanceGenerated: true,
            month: '2024-01'
        },
        {
            id: 4,
            propertyName: 'Maison T4 - Rue du Parc',
            tenantName: 'Lucie Moreau',
            tenantPhone: '06 55 66 77 88',
            tenantEmail: 'lucie.moreau@email.com',
            dueDate: '2024-01-05',
            receivedDate: '2024-01-08',
            amount: 1200,
            charges: 80,
            status: 'received',
            paymentMethod: 'virement',
            quittanceGenerated: true,
            month: '2024-01'
        }
    ];
    
    // Filtres actifs
    let activeFilters = {
        search: '',
        status: '',
        month: '2024-01',
        sort: 'date-desc'
    };
    
    // Initialisation
    initializeFilters();
    renderRentals(rentals);
    
    // Événements de filtrage
    searchInput.addEventListener('input', function() {
        activeFilters.search = this.value.toLowerCase();
        filterRentals();
    });
    
    statusFilter.addEventListener('change', function() {
        activeFilters.status = this.value;
        filterRentals();
    });
    
    monthFilter.addEventListener('change', function() {
        activeFilters.month = this.value;
        filterRentals();
    });
    
    sortFilter.addEventListener('change', function() {
        activeFilters.sort = this.value;
        filterRentals();
    });
    
    // Initialiser les filtres
    function initializeFilters() {
        // Charger les filtres sauvegardés
        const savedFilters = localStorage.getItem('rentalFilters');
        if (savedFilters) {
            activeFilters = { ...activeFilters, ...JSON.parse(savedFilters) };
            
            // Appliquer les filtres sauvegardés
            searchInput.value = activeFilters.search;
            statusFilter.value = activeFilters.status;
            monthFilter.value = activeFilters.month;
            sortFilter.value = activeFilters.sort;
        }
    }
    
    // Filtrer les loyers
    function filterRentals() {
        let filteredRentals = [...rentals];
        
        // Filtre de recherche
        if (activeFilters.search) {
            filteredRentals = filteredRentals.filter(rental => 
                rental.propertyName.toLowerCase().includes(activeFilters.search) ||
                rental.tenantName.toLowerCase().includes(activeFilters.search)
            );
        }
        
        // Filtre de statut
        if (activeFilters.status) {
            filteredRentals = filteredRentals.filter(rental => 
                rental.status === activeFilters.status
            );
        }
        
        // Filtre de mois
        if (activeFilters.month) {
            filteredRentals = filteredRentals.filter(rental => 
                rental.month === activeFilters.month
            );
        }
        
        // Tri
        filteredRentals.sort((a, b) => {
            switch (activeFilters.sort) {
                case 'date-desc':
                    return new Date(b.dueDate) - new Date(a.dueDate);
                case 'date':
                    return new Date(a.dueDate) - new Date(b.dueDate);
                case 'amount':
                    return (a.amount + a.charges) - (b.amount + b.charges);
                case 'amount-desc':
                    return (b.amount + b.charges) - (a.amount + a.charges);
                default:
                    return 0;
            }
        });
        
        // Sauvegarder les filtres
        localStorage.setItem('rentalFilters', JSON.stringify(activeFilters));
        
        // Afficher les résultats
        renderRentals(filteredRentals);
    }
    
    // Afficher les loyers
    function renderRentals(rentalsToRender) {
        if (rentalsToRender.length === 0) {
            rentalsList.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-credit-card"></i>
                    <h3>Aucun loyer trouvé</h3>
                    <p>Aucun paiement ne correspond à vos critères de recherche.</p>
                    <button class="btn btn-primary" onclick="clearFilters()">
                        <i class="fa-solid fa-times"></i>
                        Effacer les filtres
                    </button>
                </div>
            `;
            return;
        }
        
        rentalsList.innerHTML = rentalsToRender.map(rental => `
            <div class="rental-card" data-rental-id="${rental.id}">
                <div class="rental-header">
                    <div class="rental-info">
                        <h3>${rental.propertyName}</h3>
                        <p>${rental.tenantName} • ${formatDate(rental.receivedDate || rental.dueDate)}</p>
                    </div>
                    <div class="rental-status ${rental.status}">
                        <i class="fa-solid ${getStatusIcon(rental.status)}"></i>
                        <span>${getStatusText(rental.status)}</span>
                    </div>
                </div>
                
                <div class="rental-details">
                    <div class="detail-row">
                        <div class="detail-item">
                            <i class="fa-solid fa-calendar"></i>
                            <span>Échéance : ${formatDate(rental.dueDate)}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fa-solid ${rental.status === 'overdue' ? 'fa-clock' : 'fa-check'}"></i>
                            <span>${rental.status === 'overdue' ? `Retard : ${calculateDelay(rental.dueDate)} jours` : `Reçu le : ${formatDate(rental.receivedDate)}`}</span>
                        </div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-item">
                            <i class="fa-solid fa-phone"></i>
                            <span>${rental.tenantPhone}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fa-solid fa-envelope"></i>
                            <span>${rental.tenantEmail}</span>
                        </div>
                    </div>
                </div>
                
                <div class="rental-footer">
                    <div class="rental-amount">
                        <span class="amount">${formatCurrency(rental.amount)}</span>
                        <span class="charges">+ ${formatCurrency(rental.charges)} charges</span>
                    </div>
                    <div class="rental-actions">
                        ${getActionButtons(rental)}
                    </div>
                </div>
            </div>
        `).join('');
        
        // Mettre à jour les statistiques
        updateStats(rentalsToRender);
    }
    
    // Obtenir l'icône du statut
    function getStatusIcon(status) {
        const iconMap = {
            'received': 'fa-check-circle',
            'overdue': 'fa-exclamation-triangle',
            'pending': 'fa-clock'
        };
        return iconMap[status] || 'fa-question-circle';
    }
    
    // Obtenir le texte du statut
    function getStatusText(status) {
        const statusMap = {
            'received': 'Reçu',
            'overdue': 'En retard',
            'pending': 'En attente'
        };
        return statusMap[status] || status;
    }
    
    // Obtenir les boutons d'action
    function getActionButtons(rental) {
        if (rental.status === 'overdue') {
            return `
                <button class="btn btn-outline btn-sm" onclick="sendReminder(${rental.id})">
                    <i class="fa-solid fa-bell"></i>
                    Relancer
                </button>
                <button class="btn btn-primary btn-sm" onclick="recordPayment(${rental.id})">
                    <i class="fa-solid fa-check"></i>
                    Enregistrer paiement
                </button>
            `;
        } else if (rental.status === 'received') {
            return `
                <button class="btn btn-outline btn-sm" onclick="viewQuittance(${rental.id})">
                    <i class="fa-solid fa-file-pdf"></i>
                    Voir quittance
                </button>
                <button class="btn btn-primary btn-sm" onclick="downloadQuittance(${rental.id})">
                    <i class="fa-solid fa-download"></i>
                    Télécharger
                </button>
            `;
        }
        return '';
    }
    
    // Formater la date
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    }
    
    // Formater la monnaie
    function formatCurrency(amount) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0
        }).format(amount);
    }
    
    // Calculer le retard
    function calculateDelay(dueDate) {
        const due = new Date(dueDate);
        const today = new Date();
        const diffTime = today - due;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(0, diffDays);
    }
    
    // Mettre à jour les statistiques
    function updateStats(rentalsToRender) {
        const totalAmount = rentalsToRender.reduce((sum, rental) => sum + rental.amount + rental.charges, 0);
        const receivedCount = rentalsToRender.filter(r => r.status === 'received').length;
        const overdueCount = rentalsToRender.filter(r => r.status === 'overdue').length;
        const recoveryRate = rentalsToRender.length > 0 ? Math.round((receivedCount / rentalsToRender.length) * 100) : 0;
        
        // Mettre à jour les cartes de statistiques
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length >= 4) {
            statCards[0].querySelector('h3').textContent = formatCurrency(totalAmount);
            statCards[1].querySelector('h3').textContent = receivedCount;
            statCards[2].querySelector('h3').textContent = overdueCount;
            statCards[3].querySelector('h3').textContent = recoveryRate + '%';
        }
    }
    
    // Actions sur les loyers
    window.sendReminder = function(rentalId) {
        const rental = rentals.find(r => r.id === rentalId);
        if (rental) {
            // Simuler l'envoi de relance
            const rentalCard = document.querySelector(`[data-rental-id="${rentalId}"]`);
            rentalCard.classList.add('loading');
            
            setTimeout(() => {
                rentalCard.classList.remove('loading');
                showMessage('Relance envoyée avec succès à ' + rental.tenantName, 'success');
            }, 1000);
        }
    };
    
    window.recordPayment = function(rentalId) {
        showPaymentModal(rentalId);
    };
    
    window.viewQuittance = function(rentalId) {
        // Simuler l'affichage de la quittance
        showMessage('Ouverture de la quittance...', 'info');
        // Ici vous pourriez ouvrir une modal avec la quittance
    };
    
    window.downloadQuittance = function(rentalId) {
        // Simuler le téléchargement
        const rental = rentals.find(r => r.id === rentalId);
        if (rental) {
            showMessage('Téléchargement de la quittance...', 'success');
            // Ici vous pourriez déclencher le téléchargement réel
        }
    };
    
    window.clearFilters = function() {
        activeFilters = {
            search: '',
            status: '',
            month: '2024-01',
            sort: 'date-desc'
        };
        
        searchInput.value = '';
        statusFilter.value = '';
        monthFilter.value = '2024-01';
        sortFilter.value = 'date-desc';
        
        localStorage.removeItem('rentalFilters');
        filterRentals();
    };
    
    // Afficher un message
    function showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `
            <i class="fa-solid ${getMessageIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        const header = document.querySelector('.dashboard-header');
        header.parentNode.insertBefore(messageDiv, header.nextSibling);
        
        setTimeout(() => {
            messageDiv.remove();
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
    
    // Modal de paiement
    function showPaymentModal(rentalId) {
        const rental = rentals.find(r => r.id === rentalId);
        if (!rental) return;
        
        const modal = document.createElement('div');
        modal.className = 'payment-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Enregistrer le paiement</h3>
                    <button class="modal-close" onclick="closePaymentModal()">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>
                
                <div class="message info">
                    <i class="fa-solid fa-info-circle"></i>
                    <span>Enregistrement du paiement pour ${rental.propertyName}</span>
                </div>
                
                <form id="paymentForm">
                    <div class="form-group">
                        <label for="paymentDate">Date de paiement</label>
                        <input type="date" id="paymentDate" name="paymentDate" value="${new Date().toISOString().split('T')[0]}" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="paymentMethod">Méthode de paiement</label>
                        <select id="paymentMethod" name="paymentMethod" required>
                            <option value="">Sélectionnez</option>
                            <option value="virement">Virement bancaire</option>
                            <option value="cheque">Chèque</option>
                            <option value="especes">Espèces</option>
                            <option value="carte">Carte bancaire</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="paymentAmount">Montant reçu</label>
                        <input type="number" id="paymentAmount" name="paymentAmount" value="${rental.amount + rental.charges}" step="0.01" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="paymentNotes">Notes</label>
                        <textarea id="paymentNotes" name="paymentNotes" rows="3" placeholder="Informations complémentaires..."></textarea>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn btn-outline" onclick="closePaymentModal()">Annuler</button>
                        <button type="submit" class="btn btn-primary">Enregistrer</button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
        
        // Gérer la soumission du formulaire
        const form = modal.querySelector('#paymentForm');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simuler l'enregistrement
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enregistrement...';
            
            setTimeout(() => {
                closePaymentModal();
                showMessage('Paiement enregistré avec succès', 'success');
                
                // Mettre à jour le statut
                rental.status = 'received';
                rental.receivedDate = new Date().toISOString().split('T')[0];
                rental.paymentMethod = form.paymentMethod.value;
                rental.quittanceGenerated = true;
                
                filterRentals();
            }, 1500);
        });
    }
    
    window.closePaymentModal = function() {
        const modal = document.querySelector('.payment-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    };
    
    // Générer quittance
    window.generateQuittance = function() {
        showMessage('Génération de la quittance en cours...', 'info');
        // Ici vous pourriez implémenter la génération de quittance
    };
    
    // Exporter les données
    window.exportRentals = function() {
        const filteredRentals = rentals.filter(rental => {
            if (activeFilters.search && !rental.propertyName.toLowerCase().includes(activeFilters.search)) return false;
            if (activeFilters.status && rental.status !== activeFilters.status) return false;
            if (activeFilters.month && rental.month !== activeFilters.month) return false;
            return true;
        });
        
        const csvContent = generateCSV(filteredRentals);
        downloadCSV(csvContent, 'loyers.csv');
    };
    
    function generateCSV(rentals) {
        const headers = ['Bien', 'Locataire', 'Échéance', 'Date reçue', 'Montant', 'Charges', 'Total', 'Statut', 'Méthode de paiement'];
        const rows = rentals.map(r => [
            r.propertyName,
            r.tenantName,
            formatDate(r.dueDate),
            r.receivedDate ? formatDate(r.receivedDate) : '',
            r.amount,
            r.charges,
            r.amount + r.charges,
            getStatusText(r.status),
            r.paymentMethod || ''
        ]);
        
        return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    }
    
    function downloadCSV(content, filename) {
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }
    
    // Recherche en temps réel
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            activeFilters.search = this.value.toLowerCase();
            filterRentals();
        }, 300);
    });
}); 