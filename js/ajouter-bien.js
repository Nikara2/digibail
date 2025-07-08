// JavaScript pour la page Ajouter un bien

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('propertyForm');
    const uploadArea = document.getElementById('uploadArea');
    const photoInput = document.getElementById('photoInput');
    const photoPreview = document.getElementById('photoPreview');
    
    // Gestion du drag & drop pour les photos
    uploadArea.addEventListener('click', () => photoInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--color-blue)';
        uploadArea.style.background = 'rgba(26,35,126,0.02)';
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--color-grey)';
        uploadArea.style.background = 'transparent';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--color-grey)';
        uploadArea.style.background = 'transparent';
        
        const files = e.dataTransfer.files;
        handlePhotoFiles(files);
    });
    
    photoInput.addEventListener('change', (e) => {
        handlePhotoFiles(e.target.files);
    });
    
    // Gestion des fichiers photos
    function handlePhotoFiles(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    addPhotoPreview(e.target.result, file.name);
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Ajouter une prévisualisation de photo
    function addPhotoPreview(src, filename) {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `
            <img src="${src}" alt="${filename}">
            <button type="button" class="remove-photo" onclick="removePhoto(this)">
                <i class="fa-solid fa-times"></i>
            </button>
        `;
        photoPreview.appendChild(photoItem);
    }
    
    // Supprimer une photo
    window.removePhoto = function(button) {
        button.parentElement.remove();
    };
    
    // Validation du formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Validation des champs
    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        // Réinitialiser les erreurs
        clearErrors();
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showError(field, 'Ce champ est obligatoire');
                isValid = false;
            }
        });
        
        // Validation spécifique
        const email = document.getElementById('registerEmail');
        if (email && email.value) {
            if (!isValidEmail(email.value)) {
                showError(email, 'Adresse e-mail invalide');
                isValid = false;
            }
        }
        
        const phone = document.getElementById('phone');
        if (phone && phone.value) {
            if (!isValidPhone(phone.value)) {
                showError(phone, 'Numéro de téléphone invalide');
                isValid = false;
            }
        }
        
        const rentAmount = document.getElementById('rentAmount');
        if (rentAmount && rentAmount.value) {
            if (parseFloat(rentAmount.value) <= 0) {
                showError(rentAmount, 'Le montant du loyer doit être positif');
                isValid = false;
            }
        }
        
        const surface = document.getElementById('surface');
        if (surface && surface.value) {
            if (parseFloat(surface.value) <= 0) {
                showError(surface, 'La surface doit être positive');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Afficher une erreur
    function showError(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }
    
    // Effacer les erreurs
    function clearErrors() {
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const errorFields = form.querySelectorAll('.form-group.error');
        errorFields.forEach(field => field.classList.remove('error'));
    }
    
    // Validation email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Validation téléphone
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    // Soumission du formulaire
    function submitForm() {
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simuler l'envoi (remplacer par votre API)
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Afficher un message de succès
            showSuccessMessage('Bien ajouté avec succès !');
            
            // Rediriger vers la liste des biens
            setTimeout(() => {
                window.location.href = 'bailleur.html';
            }, 2000);
        }, 2000);
    }
    
    // Afficher un message de succès
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success';
        successDiv.innerHTML = `
            <i class="fa-solid fa-check-circle"></i>
            <div class="alert-content">
                <h4>Succès</h4>
                <p>${message}</p>
            </div>
        `;
        
        const header = document.querySelector('.dashboard-header');
        header.parentNode.insertBefore(successDiv, header.nextSibling);
    }
    
    // Sauvegarder en brouillon
    window.saveDraft = function() {
        const formData = new FormData(form);
        const draftData = {};
        
        for (let [key, value] of formData.entries()) {
            draftData[key] = value;
        }
        
        // Sauvegarder dans le localStorage
        localStorage.setItem('propertyDraft', JSON.stringify(draftData));
        
        // Afficher un message
        showSuccessMessage('Brouillon sauvegardé');
    };
    
    // Charger le brouillon au chargement de la page
    function loadDraft() {
        const draftData = localStorage.getItem('propertyDraft');
        if (draftData) {
            const data = JSON.parse(draftData);
            
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    field.value = data[key];
                }
            });
        }
    }
    
    // Auto-complétion pour le code postal
    const postalCodeField = document.getElementById('postalCode');
    if (postalCodeField) {
        postalCodeField.addEventListener('blur', function() {
            const postalCode = this.value.trim();
            if (postalCode.length === 5) {
                // Simuler une recherche de ville (remplacer par votre API)
                setTimeout(() => {
                    const cityField = document.getElementById('city');
                    if (cityField && !cityField.value) {
                        // Exemple d'auto-complétion
                        const cityMap = {
                            '75001': 'Paris',
                            '75002': 'Paris',
                            '75003': 'Paris',
                            '69001': 'Lyon',
                            '13001': 'Marseille'
                        };
                        
                        if (cityMap[postalCode]) {
                            cityField.value = cityMap[postalCode];
                        }
                    }
                }, 500);
            }
        });
    }
    
    // Calcul automatique du dépôt de garantie
    const rentAmountField = document.getElementById('rentAmount');
    const depositField = document.getElementById('deposit');
    
    if (rentAmountField && depositField) {
        rentAmountField.addEventListener('input', function() {
            const rentAmount = parseFloat(this.value) || 0;
            if (rentAmount > 0 && !depositField.value) {
                depositField.value = rentAmount.toFixed(2);
            }
        });
    }
    
    // Charger le brouillon au démarrage
    loadDraft();
    
    // Nettoyer le brouillon après soumission réussie
    form.addEventListener('submit', function() {
        localStorage.removeItem('propertyDraft');
    });
});

// Fonctions utilitaires globales
function formatCurrency(amount) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

function formatNumber(number) {
    return new Intl.NumberFormat('fr-FR').format(number);
} 