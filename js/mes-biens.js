// JavaScript pour la page Mes biens

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const typeFilter = document.getElementById('typeFilter');
    const sortFilter = document.getElementById('sortFilter');
    const propertiesList = document.querySelector('.properties-list');
    
    // Données des biens (simulation)
    const properties = [
        {
            id: 1,
            name: 'Appartement T3 - Rue de la Paix',
            address: '123 Rue de la Paix, 75001 Paris',
            surface: 75,
            rooms: 3,
            bedrooms: 2,
            type: 'appartement',
            status: 'occupied',
            tenant: 'Jean Dupont',
            rent: 800,
            rentStatus: 'received',
            contractStart: '2023-09-01',
            contractEnd: '2026-08-31',
            image: 'assets/property1.jpg'
        },
        {
            id: 2,
            name: 'Appartement T2 - Avenue des Champs',
            address: '456 Avenue des Champs, 75008 Paris',
            surface: 55,
            rooms: 2,
            bedrooms: 1,
            type: 'appartement',
            status: 'occupied',
            tenant: 'Sophie Bernard',
            rent: 650,
            rentStatus: 'received',
            contractStart: '2023-03-01',
            contractEnd: '2025-02-28',
            image: 'assets/property2.jpg'
        },
        {
            id: 3,
            name: 'Studio - Boulevard Central',
            address: '789 Boulevard Central, 75011 Paris',
            surface: 25,
            rooms: 1,
            bedrooms: 0,
            type: 'studio',
            status: 'occupied',
            tenant: 'Pierre Durand',
            rent: 500,
            rentStatus: 'received',
            contractStart: '2023-06-01',
            contractEnd: '2024-05-31',
            image: 'assets/property3.jpg'
        },
        {
            id: 4,
            name: 'Maison T4 - Rue du Parc',
            address: '321 Rue du Parc, 92100 Boulogne-Billancourt',
            surface: 120,
            rooms: 4,
            bedrooms: 3,
            type: 'maison',
            status: 'occupied',
            tenant: 'Lucie Moreau',
            rent: 1200,
            rentStatus: 'received',
            contractStart: '2023-01-01',
            contractEnd: '2025-12-31',
            image: 'assets/property4.jpg'
        },
        {
            id: 5,
            name: 'Appartement T2 - Place de la République',
            address: '654 Place de la République, 75003 Paris',
            surface: 60,
            rooms: 2,
            bedrooms: 1,
            type: 'appartement',
            status: 'vacant',
            tenant: null,
            rent: 750,
            rentStatus: 'vacant',
            contractStart: null,
            contractEnd: null,
            image: 'assets/property5.jpg'
        }
    ];
    
    // Filtres actifs
    let activeFilters = {
        search: '',
        status: '',
        type: '',
        sort: 'name'
    };
    
    // Initialisation
    initializeFilters();
    renderProperties(properties);
    
    // Événements de filtrage
    searchInput.addEventListener('input', function() {
        activeFilters.search = this.value.toLowerCase();
        filterProperties();
    });
    
    statusFilter.addEventListener('change', function() {
        activeFilters.status = this.value;
        filterProperties();
    });
    
    typeFilter.addEventListener('change', function() {
        activeFilters.type = this.value;
        filterProperties();
    });
    
    sortFilter.addEventListener('change', function() {
        activeFilters.sort = this.value;
        filterProperties();
    });
    
    // Initialiser les filtres
    function initializeFilters() {
        // Charger les filtres sauvegardés
        const savedFilters = localStorage.getItem('propertyFilters');
        if (savedFilters) {
            activeFilters = { ...activeFilters, ...JSON.parse(savedFilters) };
            
            // Appliquer les filtres sauvegardés
            searchInput.value = activeFilters.search;
            statusFilter.value = activeFilters.status;
            typeFilter.value = activeFilters.type;
            sortFilter.value = activeFilters.sort;
        }
    }
    
    // Filtrer les propriétés
    function filterProperties() {
        let filteredProperties = [...properties];
        
        // Filtre de recherche
        if (activeFilters.search) {
            filteredProperties = filteredProperties.filter(property => 
                property.name.toLowerCase().includes(activeFilters.search) ||
                property.address.toLowerCase().includes(activeFilters.search) ||
                (property.tenant && property.tenant.toLowerCase().includes(activeFilters.search))
            );
        }
        
        // Filtre de statut
        if (activeFilters.status) {
            filteredProperties = filteredProperties.filter(property => 
                property.status === activeFilters.status
            );
        }
        
        // Filtre de type
        if (activeFilters.type) {
            filteredProperties = filteredProperties.filter(property => 
                property.type === activeFilters.type
            );
        }
        
        // Tri
        filteredProperties.sort((a, b) => {
            switch (activeFilters.sort) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'rent':
                    return a.rent - b.rent;
                case 'rent-desc':
                    return b.rent - a.rent;
                case 'date':
                    return new Date(b.contractStart || 0) - new Date(a.contractStart || 0);
                default:
                    return 0;
            }
        });
        
        // Sauvegarder les filtres
        localStorage.setItem('propertyFilters', JSON.stringify(activeFilters));
        
        // Afficher les résultats
        renderProperties(filteredProperties);
    }
    
    // Afficher les propriétés
    function renderProperties(propertiesToRender) {
        if (propertiesToRender.length === 0) {
            propertiesList.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-building"></i>
                    <h3>Aucun bien trouvé</h3>
                    <p>Aucun bien ne correspond à vos critères de recherche.</p>
                    <button class="btn btn-primary" onclick="clearFilters()">
                        <i class="fa-solid fa-times"></i>
                        Effacer les filtres
                    </button>
                </div>
            `;
            return;
        }
        
        propertiesList.innerHTML = propertiesToRender.map(property => `
            <div class="property-card" data-property-id="${property.id}">
                <div class="property-image">
                    <img src="${property.image}" alt="${property.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwTDEyMCA3MEgxODBMMTUwIDEwMFoiIGZpbGw9IiM5RUE5QUIiLz4KPHN2ZyB4PSIxMzAiIHk9IjgwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDMwSDEwVjIwSDEwVjEwSDIwVjIwSDMwVjMwSDIwWiIgZmlsbD0iIzlFQTlBQiIvPgo8L3N2Zz4KPC9zdmc+'">
                    <div class="property-status ${property.status}">${getStatusText(property.status)}</div>
                </div>
                
                <div class="property-content">
                    <div class="property-header">
                        <h3>${property.name}</h3>
                        <div class="property-actions">
                            <button class="btn-icon" title="Modifier" onclick="editProperty(${property.id})">
                                <i class="fa-solid fa-edit"></i>
                            </button>
                            <button class="btn-icon" title="Supprimer" onclick="deleteProperty(${property.id})">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="property-details">
                        <div class="detail-item">
                            <i class="fa-solid fa-map-marker-alt"></i>
                            <span>${property.address}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fa-solid fa-ruler-combined"></i>
                            <span>${property.surface} m² • ${property.rooms} pièces${property.bedrooms > 0 ? ` • ${property.bedrooms} chambres` : ''}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fa-solid fa-user"></i>
                            <span>Locataire : ${property.tenant || 'Aucun'}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fa-solid fa-calendar"></i>
                            <span>${property.contractStart ? `Contrat : ${formatDate(property.contractStart)} - ${formatDate(property.contractEnd)}` : 'Disponible depuis : ' + formatDate(new Date().toISOString().split('T')[0])}</span>
                        </div>
                    </div>
                    
                    <div class="property-footer">
                        <div class="rent-info">
                            <span class="rent-amount">${formatCurrency(property.rent)}/mois</span>
                            <span class="rent-status ${property.rentStatus}">${getRentStatusText(property.rentStatus)}</span>
                        </div>
                        <div class="property-buttons">
                            <button class="btn btn-outline btn-sm" onclick="viewPropertyDetails(${property.id})">Voir détails</button>
                            <button class="btn btn-primary btn-sm" onclick="manageProperty(${property.id})">${property.status === 'vacant' ? 'Louer' : 'Gérer'}</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Mettre à jour les statistiques
        updateStats(propertiesToRender);
    }
    
    // Obtenir le texte du statut
    function getStatusText(status) {
        const statusMap = {
            'occupied': 'Occupé',
            'vacant': 'Libre',
            'maintenance': 'En maintenance'
        };
        return statusMap[status] || status;
    }
    
    // Obtenir le texte du statut de loyer
    function getRentStatusText(status) {
        const statusMap = {
            'received': 'Reçu',
            'overdue': 'En retard',
            'vacant': 'Disponible'
        };
        return statusMap[status] || status;
    }
    
    // Formater la date
    function formatDate(dateString) {
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
    function updateStats(propertiesToRender) {
        const totalProperties = propertiesToRender.length;
        const occupiedProperties = propertiesToRender.filter(p => p.status === 'occupied').length;
        const vacantProperties = propertiesToRender.filter(p => p.status === 'vacant').length;
        const totalRent = propertiesToRender.filter(p => p.status === 'occupied').reduce((sum, p) => sum + p.rent, 0);
        
        // Mettre à jour les cartes de statistiques
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length >= 4) {
            statCards[0].querySelector('h3').textContent = totalProperties;
            statCards[1].querySelector('h3').textContent = occupiedProperties;
            statCards[2].querySelector('h3').textContent = vacantProperties;
            statCards[3].querySelector('h3').textContent = formatCurrency(totalRent);
        }
    }
    
    // Actions sur les propriétés
    window.editProperty = function(propertyId) {
        // Simuler l'édition
        console.log('Éditer la propriété:', propertyId);
        // Rediriger vers la page d'édition
        // window.location.href = `ajouter-bien.html?edit=${propertyId}`;
    };
    
    window.deleteProperty = function(propertyId) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) {
            // Simuler la suppression
            const propertyCard = document.querySelector(`[data-property-id="${propertyId}"]`);
            propertyCard.classList.add('loading');
            
            setTimeout(() => {
                propertyCard.remove();
                // Mettre à jour les données
                const index = properties.findIndex(p => p.id === propertyId);
                if (index > -1) {
                    properties.splice(index, 1);
                }
                filterProperties();
            }, 1000);
        }
    };
    
    window.viewPropertyDetails = function(propertyId) {
        // Simuler l'affichage des détails
        console.log('Voir les détails de la propriété:', propertyId);
        // Ouvrir une modal ou rediriger vers une page de détails
    };
    
    window.manageProperty = function(propertyId) {
        const property = properties.find(p => p.id === propertyId);
        if (property.status === 'vacant') {
            // Rediriger vers la page de location
            window.location.href = `nouveau-client.html?property=${propertyId}`;
        } else {
            // Rediriger vers la page de gestion
            window.location.href = `contrats.html?property=${propertyId}`;
        }
    };
    
    window.clearFilters = function() {
        activeFilters = {
            search: '',
            status: '',
            type: '',
            sort: 'name'
        };
        
        searchInput.value = '';
        statusFilter.value = '';
        typeFilter.value = '';
        sortFilter.value = 'name';
        
        localStorage.removeItem('propertyFilters');
        filterProperties();
    };
    
    // Recherche en temps réel
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            activeFilters.search = this.value.toLowerCase();
            filterProperties();
        }, 300);
    });
    
    // Export des données
    window.exportProperties = function() {
        const filteredProperties = properties.filter(property => {
            if (activeFilters.search && !property.name.toLowerCase().includes(activeFilters.search)) return false;
            if (activeFilters.status && property.status !== activeFilters.status) return false;
            if (activeFilters.type && property.type !== activeFilters.type) return false;
            return true;
        });
        
        const csvContent = generateCSV(filteredProperties);
        downloadCSV(csvContent, 'mes-biens.csv');
    };
    
    function generateCSV(properties) {
        const headers = ['Nom', 'Adresse', 'Surface', 'Pièces', 'Chambres', 'Type', 'Statut', 'Locataire', 'Loyer', 'Début contrat', 'Fin contrat'];
        const rows = properties.map(p => [
            p.name,
            p.address,
            p.surface,
            p.rooms,
            p.bedrooms,
            p.type,
            getStatusText(p.status),
            p.tenant || '',
            p.rent,
            p.contractStart ? formatDate(p.contractStart) : '',
            p.contractEnd ? formatDate(p.contractEnd) : ''
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
}); 