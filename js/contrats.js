// JavaScript pour la page Contrats

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const typeFilter = document.getElementById('typeFilter');
    const sortFilter = document.getElementById('sortFilter');
    const contractsList = document.querySelector('.contracts-list');
    
    // Données des contrats (simulation)
    const contracts = [
        {
            id: 1,
            contractNumber: 'CTR-2024-001',
            propertyName: 'Appartement T3 - Rue de la Paix',
            tenantName: 'Jean Dupont',
            tenantPhone: '06 12 34 56 78',
            tenantEmail: 'jean.dupont@email.com',
            startDate: '2023-09-01',
            endDate: '2026-08-31',
            rent: 800,
            charges: 50,
            type: 'residential',
            furnished: false,
            status: 'active',
            signatureDate: '2023-08-15',
            deposit: 1600
        },
        {
            id: 2,
            contractNumber: 'CTR-2024-002',
            propertyName: 'Appartement T2 - Avenue des Champs',
            tenantName: 'Sophie Bernard',
            tenantPhone: '06 98 76 54 32',
            tenantEmail: 'sophie.bernard@email.com',
            startDate: '2023-03-01',
            endDate: '2025-02-28',
            rent: 650,
            charges: 40,
            type: 'residential',
            furnished: true,
            status: 'active',
            signatureDate: '2023-02-15',
            deposit: 1300
        },
        {
            id: 3,
            contractNumber: 'CTR-2024-003',
            propertyName: 'Studio - Boulevard Central',
            tenantName: 'Pierre Durand',
            tenantPhone: '06 11 22 33 44',
            tenantEmail: 'pierre.durand@email.com',
            startDate: '2023-06-01',
            endDate: '2024-05-31',
            rent: 500,
            charges: 30,
            type: 'residential',
            furnished: true,
            status: 'active',
            signatureDate: '2023-05-15',
            deposit: 1000
        },
        {
            id: 4,
            contractNumber: 'CTR-2024-004',
            propertyName: 'Maison T4 - Rue du Parc',
            tenantName: 'Lucie Moreau',
            tenantPhone: '06 55 66 77 88',
            tenantEmail: 'lucie.moreau@email.com',
            startDate: '2023-01-01',
            endDate: '2025-12-31',
            rent: 1200,
            charges: 80,
            type: 'residential',
            furnished: false,
            status: 'active',
            signatureDate: '2022-12-15',
            deposit: 2400
        },
        {
            id: 5,
            contractNumber: 'CTR-2024-005',
            propertyName: 'Appartement T2 - Place de la République',
            tenantName: null,
            tenantPhone: null,
            tenantEmail: null,
            startDate: null,
            endDate: null,
            rent: 750,
            charges: 45,
            type: 'residential',
            furnished: false,
            status: 'pending',
            signatureDate: null,
            deposit: 1500
        }
    ];
    
    // Filtres actifs
    let activeFilters = {
        search: '',
        status: '',
        type: '',
        sort: 'date-desc'
    };
    
    // Initialisation
    initializeFilters();
    renderContracts(contracts);
    
    // Événements de filtrage
    searchInput.addEventListener('input', function() {
        activeFilters.search = this.value.toLowerCase();
        filterContracts();
    });
    
    statusFilter.addEventListener('change', function() {
        activeFilters.status = this.value;
        filterContracts();
    });
    
    typeFilter.addEventListener('change', function() {
        activeFilters.type = this.value;
        filterContracts();
    });
    
    sortFilter.addEventListener('change', function() {
        activeFilters.sort = this.value;
        filterContracts();
    });
    
    // Initialiser les filtres
    function initializeFilters() {
        // Charger les filtres sauvegardés
        const savedFilters = localStorage.getItem('contractFilters');
        if (savedFilters) {
            activeFilters = { ...activeFilters, ...JSON.parse(savedFilters) };
            
            // Appliquer les filtres sauvegardés
            searchInput.value = activeFilters.search;
            statusFilter.value = activeFilters.status;
            typeFilter.value = activeFilters.type;
            sortFilter.value = activeFilters.sort;
        }
    }
    
    // Filtrer les contrats
    function filterContracts() {
        let filteredContracts = [...contracts];
        
        // Filtre de recherche
        if (activeFilters.search) {
            filteredContracts = filteredContracts.filter(contract => 
                contract.contractNumber.toLowerCase().includes(activeFilters.search) ||
                contract.propertyName.toLowerCase().includes(activeFilters.search) ||
                (contract.tenantName && contract.tenantName.toLowerCase().includes(activeFilters.search))
            );
        }
        
        // Filtre de statut
        if (activeFilters.status) {
            filteredContracts = filteredContracts.filter(contract => 
                contract.status === activeFilters.status
            );
        }
        
        // Filtre de type
        if (activeFilters.type) {
            if (activeFilters.type === 'furnished') {
                filteredContracts = filteredContracts.filter(contract => contract.furnished);
            } else if (activeFilters.type === 'unfurnished') {
                filteredContracts = filteredContracts.filter(contract => !contract.furnished);
            } else {
                filteredContracts = filteredContracts.filter(contract => 
                    contract.type === activeFilters.type
                );
            }
        }
        
        // Tri
        filteredContracts.sort((a, b) => {
            switch (activeFilters.sort) {
                case 'date-desc':
                    return new Date(b.startDate || 0) - new Date(a.startDate || 0);
                case 'date':
                    return new Date(a.startDate || 0) - new Date(b.startDate || 0);
                case 'rent':
                    return (a.rent + a.charges) - (b.rent + b.charges);
                case 'rent-desc':
                    return (b.rent + b.charges) - (a.rent + a.charges);
                default:
                    return 0;
            }
        });
        
        // Sauvegarder les filtres
        localStorage.setItem('contractFilters', JSON.stringify(activeFilters));
        
        // Afficher les résultats
        renderContracts(filteredContracts);
    }
    
    // Afficher les contrats
    function renderContracts(contractsToRender) {
        if (contractsToRender.length === 0) {
            contractsList.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-file-contract"></i>
                    <h3>Aucun contrat trouvé</h3>
                    <p>Aucun contrat ne correspond à vos critères de recherche.</p>
                    <button class="btn btn-primary" onclick="clearFilters()">
                        <i class="fa-solid fa-times"></i>
                        Effacer les filtres
                    </button>
                </div>
            `;
            return;
        }
        
        contractsList.innerHTML = contractsToRender.map(contract => {
            const progress = calculateProgress(contract);
            const monthsElapsed = calculateMonthsElapsed(contract);
            const totalMonths = calculateTotalMonths(contract);
            
            return `
                <div class="contract-card" data-contract-id="${contract.id}">
                    <div class="contract-header">
                        <div class="contract-info">
                            <h3>${contract.contractNumber}</h3>
                            <p>${contract.propertyName} • ${contract.tenantName || 'En attente'}</p>
                        </div>
                        <div class="contract-status ${contract.status}">
                            <i class="fa-solid ${getStatusIcon(contract.status)}"></i>
                            <span>${getStatusText(contract.status)}</span>
                        </div>
                    </div>
                    
                    <div class="contract-details">
                        <div class="detail-row">
                            <div class="detail-item">
                                <i class="fa-solid fa-calendar"></i>
                                <span>Début : ${contract.startDate ? formatDate(contract.startDate) : 'À définir'}</span>
                            </div>
                            <div class="detail-item">
                                <i class="fa-solid fa-calendar-check"></i>
                                <span>Fin : ${contract.endDate ? formatDate(contract.endDate) : 'À définir'}</span>
                            </div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-item">
                                <i class="fa-solid fa-euro-sign"></i>
                                <span>Loyer : ${formatCurrency(contract.rent)}/mois</span>
                            </div>
                            <div class="detail-item">
                                <i class="fa-solid fa-home"></i>
                                <span>Type : ${getTypeText(contract.type, contract.furnished)}</span>
                            </div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-item">
                                <i class="fa-solid fa-user"></i>
                                <span>Locataire : ${contract.tenantName || 'À définir'}</span>
                            </div>
                            <div class="detail-item">
                                <i class="fa-solid fa-phone"></i>
                                <span>${contract.tenantPhone || '-'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="contract-footer">
                        <div class="contract-progress">
                            <div class="progress-info">
                                <span>${contract.status === 'pending' ? 'Contrat en préparation' : `Progression : ${monthsElapsed} mois / ${totalMonths} mois`}</span>
                                <span class="progress-percentage">${progress}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progress}%"></div>
                            </div>
                        </div>
                        <div class="contract-actions">
                            ${getActionButtons(contract)}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Mettre à jour les statistiques
        updateStats(contractsToRender);
    }
    
    // Obtenir l'icône du statut
    function getStatusIcon(status) {
        const iconMap = {
            'active': 'fa-check-circle',
            'expired': 'fa-times-circle',
            'pending': 'fa-clock',
            'terminated': 'fa-ban'
        };
        return iconMap[status] || 'fa-question-circle';
    }
    
    // Obtenir le texte du statut
    function getStatusText(status) {
        const statusMap = {
            'active': 'Actif',
            'expired': 'Expiré',
            'pending': 'En attente',
            'terminated': 'Terminé'
        };
        return statusMap[status] || status;
    }
    
    // Obtenir le texte du type
    function getTypeText(type, furnished) {
        const typeMap = {
            'residential': 'Résidentiel',
            'commercial': 'Commercial'
        };
        const baseType = typeMap[type] || type;
        return furnished ? `${baseType} meublé` : `${baseType} non meublé`;
    }
    
    // Obtenir les boutons d'action
    function getActionButtons(contract) {
        if (contract.status === 'pending') {
            return `
                <button class="btn btn-outline btn-sm" onclick="viewContract(${contract.id})">
                    <i class="fa-solid fa-eye"></i>
                    Voir
                </button>
                <button class="btn btn-outline btn-sm" onclick="editContract(${contract.id})">
                    <i class="fa-solid fa-edit"></i>
                    Modifier
                </button>
                <button class="btn btn-primary btn-sm" onclick="finalizeContract(${contract.id})">
                    <i class="fa-solid fa-check"></i>
                    Finaliser
                </button>
            `;
        } else {
            return `
                <button class="btn btn-outline btn-sm" onclick="viewContract(${contract.id})">
                    <i class="fa-solid fa-eye"></i>
                    Voir
                </button>
                <button class="btn btn-outline btn-sm" onclick="editContract(${contract.id})">
                    <i class="fa-solid fa-edit"></i>
                    Modifier
                </button>
                <button class="btn btn-primary btn-sm" onclick="downloadContract(${contract.id})">
                    <i class="fa-solid fa-download"></i>
                    Télécharger
                </button>
            `;
        }
    }
    
    // Calculer la progression
    function calculateProgress(contract) {
        if (contract.status === 'pending' || !contract.startDate || !contract.endDate) {
            return 0;
        }
        
        const start = new Date(contract.startDate);
        const end = new Date(contract.endDate);
        const now = new Date();
        
        if (now < start) return 0;
        if (now > end) return 100;
        
        const total = end - start;
        const elapsed = now - start;
        return Math.round((elapsed / total) * 100);
    }
    
    // Calculer les mois écoulés
    function calculateMonthsElapsed(contract) {
        if (!contract.startDate) return 0;
        
        const start = new Date(contract.startDate);
        const now = new Date();
        
        if (now < start) return 0;
        
        const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
        return Math.max(0, months);
    }
    
    // Calculer le nombre total de mois
    function calculateTotalMonths(contract) {
        if (!contract.startDate || !contract.endDate) return 0;
        
        const start = new Date(contract.startDate);
        const end = new Date(contract.endDate);
        
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        return Math.max(1, months);
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
    
    // Mettre à jour les statistiques
    function updateStats(contractsToRender) {
        const totalContracts = contractsToRender.length;
        const activeContracts = contractsToRender.filter(c => c.status === 'active').length;
        const pendingContracts = contractsToRender.filter(c => c.status === 'pending').length;
        const expiringContracts = contractsToRender.filter(c => {
            if (c.status !== 'active' || !c.endDate) return false;
            const end = new Date(c.endDate);
            const now = new Date();
            const monthsUntilExpiry = (end.getFullYear() - now.getFullYear()) * 12 + (end.getMonth() - now.getMonth());
            return monthsUntilExpiry <= 6 && monthsUntilExpiry > 0;
        }).length;
        
        // Mettre à jour les cartes de statistiques
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length >= 4) {
            statCards[0].querySelector('h3').textContent = totalContracts;
            statCards[1].querySelector('h3').textContent = activeContracts;
            statCards[2].querySelector('h3').textContent = expiringContracts;
            statCards[3].querySelector('h3').textContent = pendingContracts;
        }
    }
    
    // Actions sur les contrats
    window.viewContract = function(contractId) {
        const contract = contracts.find(c => c.id === contractId);
        if (contract) {
            showContractModal(contract, 'view');
        }
    };
    
    window.editContract = function(contractId) {
        const contract = contracts.find(c => c.id === contractId);
        if (contract) {
            showContractModal(contract, 'edit');
        }
    };
    
    window.downloadContract = function(contractId) {
        const contract = contracts.find(c => c.id === contractId);
        if (contract) {
            // Simuler le téléchargement
            showMessage('Téléchargement du contrat en cours...', 'success');
            // Ici vous pourriez déclencher le téléchargement réel
        }
    };
    
    window.finalizeContract = function(contractId) {
        const contract = contracts.find(c => c.id === contractId);
        if (contract) {
            showContractModal(contract, 'finalize');
        }
    };
    
    window.createContract = function() {
        showContractModal(null, 'create');
    };
    
    window.clearFilters = function() {
        activeFilters = {
            search: '',
            status: '',
            type: '',
            sort: 'date-desc'
        };
        
        searchInput.value = '';
        statusFilter.value = '';
        typeFilter.value = '';
        sortFilter.value = 'date-desc';
        
        localStorage.removeItem('contractFilters');
        filterContracts();
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
    
    // Modal de contrat
    function showContractModal(contract, mode) {
        const modal = document.createElement('div');
        modal.className = 'contract-modal';
        
        let modalContent = '';
        
        if (mode === 'view' && contract) {
            modalContent = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${contract.contractNumber}</h3>
                        <button class="modal-close" onclick="closeContractModal()">
                            <i class="fa-solid fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="contract-details">
                        <h4>Informations du bien</h4>
                        <p><strong>Bien :</strong> ${contract.propertyName}</p>
                        <p><strong>Type :</strong> ${getTypeText(contract.type, contract.furnished)}</p>
                        <p><strong>Loyer :</strong> ${formatCurrency(contract.rent)}/mois</p>
                        <p><strong>Charges :</strong> ${formatCurrency(contract.charges)}/mois</p>
                        <p><strong>Dépôt de garantie :</strong> ${formatCurrency(contract.deposit)}</p>
                        
                        <h4>Informations du locataire</h4>
                        <p><strong>Nom :</strong> ${contract.tenantName || 'À définir'}</p>
                        <p><strong>Téléphone :</strong> ${contract.tenantPhone || '-'}</p>
                        <p><strong>Email :</strong> ${contract.tenantEmail || '-'}</p>
                        
                        <h4>Période de location</h4>
                        <p><strong>Début :</strong> ${contract.startDate ? formatDate(contract.startDate) : 'À définir'}</p>
                        <p><strong>Fin :</strong> ${contract.endDate ? formatDate(contract.endDate) : 'À définir'}</p>
                        <p><strong>Signature :</strong> ${contract.signatureDate ? formatDate(contract.signatureDate) : 'En attente'}</p>
                        
                        <h4>Statut</h4>
                        <p><strong>Statut :</strong> <span class="contract-status ${contract.status}">${getStatusText(contract.status)}</span></p>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn btn-outline" onclick="closeContractModal()">Fermer</button>
                        <button class="btn btn-primary" onclick="downloadContract(${contract.id})">
                            <i class="fa-solid fa-download"></i>
                            Télécharger
                        </button>
                    </div>
                </div>
            `;
        } else if (mode === 'edit' || mode === 'create' || mode === 'finalize') {
            modalContent = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${mode === 'create' ? 'Nouveau contrat' : mode === 'finalize' ? 'Finaliser le contrat' : 'Modifier le contrat'}</h3>
                        <button class="modal-close" onclick="closeContractModal()">
                            <i class="fa-solid fa-times"></i>
                        </button>
                    </div>
                    
                    <form id="contractForm">
                        <div class="form-group">
                            <label for="propertySelect">Bien immobilier</label>
                            <select id="propertySelect" name="propertyId" required>
                                <option value="">Sélectionnez un bien</option>
                                <option value="1">Appartement T3 - Rue de la Paix</option>
                                <option value="2">Appartement T2 - Avenue des Champs</option>
                                <option value="3">Studio - Boulevard Central</option>
                                <option value="4">Maison T4 - Rue du Parc</option>
                                <option value="5">Appartement T2 - Place de la République</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="tenantSelect">Locataire</label>
                            <select id="tenantSelect" name="tenantId" required>
                                <option value="">Sélectionnez un locataire</option>
                                <option value="1">Jean Dupont</option>
                                <option value="2">Sophie Bernard</option>
                                <option value="3">Pierre Durand</option>
                                <option value="4">Lucie Moreau</option>
                            </select>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="startDate">Date de début</label>
                                <input type="date" id="startDate" name="startDate" required>
                            </div>
                            <div class="form-group">
                                <label for="endDate">Date de fin</label>
                                <input type="date" id="endDate" name="endDate" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="rent">Loyer mensuel (€)</label>
                                <input type="number" id="rent" name="rent" min="0" step="0.01" required>
                            </div>
                            <div class="form-group">
                                <label for="charges">Charges mensuelles (€)</label>
                                <input type="number" id="charges" name="charges" min="0" step="0.01">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="deposit">Dépôt de garantie (€)</label>
                            <input type="number" id="deposit" name="deposit" min="0" step="0.01" required>
                        </div>
                        
                        <div class="form-group">
                            <label>
                                <input type="checkbox" id="furnished" name="furnished">
                                Bien meublé
                            </label>
                        </div>
                        
                        <div class="modal-actions">
                            <button type="button" class="btn btn-outline" onclick="closeContractModal()">Annuler</button>
                            <button type="submit" class="btn btn-primary">
                                ${mode === 'create' ? 'Créer' : mode === 'finalize' ? 'Finaliser' : 'Modifier'}
                            </button>
                        </div>
                    </form>
                </div>
            `;
        }
        
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
        
        // Gérer la soumission du formulaire
        const form = modal.querySelector('#contractForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simuler la sauvegarde
                const submitBtn = form.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sauvegarde...';
                
                setTimeout(() => {
                    closeContractModal();
                    showMessage('Contrat sauvegardé avec succès', 'success');
                    filterContracts();
                }, 1500);
            });
        }
    }
    
    window.closeContractModal = function() {
        const modal = document.querySelector('.contract-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    };
    
    // Exporter les contrats
    window.exportContracts = function() {
        const filteredContracts = contracts.filter(contract => {
            if (activeFilters.search && !contract.contractNumber.toLowerCase().includes(activeFilters.search)) return false;
            if (activeFilters.status && contract.status !== activeFilters.status) return false;
            if (activeFilters.type) {
                if (activeFilters.type === 'furnished' && !contract.furnished) return false;
                if (activeFilters.type === 'unfurnished' && contract.furnished) return false;
                if (activeFilters.type !== 'furnished' && activeFilters.type !== 'unfurnished' && contract.type !== activeFilters.type) return false;
            }
            return true;
        });
        
        const csvContent = generateCSV(filteredContracts);
        downloadCSV(csvContent, 'contrats.csv');
    };
    
    function generateCSV(contracts) {
        const headers = ['Numéro', 'Bien', 'Locataire', 'Début', 'Fin', 'Loyer', 'Charges', 'Type', 'Statut', 'Signature'];
        const rows = contracts.map(c => [
            c.contractNumber,
            c.propertyName,
            c.tenantName || 'À définir',
            c.startDate ? formatDate(c.startDate) : '',
            c.endDate ? formatDate(c.endDate) : '',
            c.rent,
            c.charges,
            getTypeText(c.type, c.furnished),
            getStatusText(c.status),
            c.signatureDate ? formatDate(c.signatureDate) : ''
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
            filterContracts();
        }, 300);
    });
}); 