// JavaScript pour la page Nouveau client

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('clientForm');
    
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
        const email = document.getElementById('email');
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
        
        const emergencyPhone = document.getElementById('emergencyPhone');
        if (emergencyPhone && emergencyPhone.value) {
            if (!isValidPhone(emergencyPhone.value)) {
                showError(emergencyPhone, 'Numéro de téléphone d\'urgence invalide');
                isValid = false;
            }
        }
        
        const guarantorPhone = document.getElementById('guarantorPhone');
        if (guarantorPhone && guarantorPhone.value) {
            if (!isValidPhone(guarantorPhone.value)) {
                showError(guarantorPhone, 'Numéro de téléphone du garant invalide');
                isValid = false;
            }
        }
        
        const iban = document.getElementById('iban');
        if (iban && iban.value) {
            if (!isValidIBAN(iban.value)) {
                showError(iban, 'IBAN invalide');
                isValid = false;
            }
        }
        
        const birthDate = document.getElementById('birthDate');
        if (birthDate && birthDate.value) {
            if (!isValidBirthDate(birthDate.value)) {
                showError(birthDate, 'Date de naissance invalide');
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
    
    // Validation IBAN
    function isValidIBAN(iban) {
        const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/;
        return ibanRegex.test(iban.replace(/\s/g, ''));
    }
    
    // Validation date de naissance
    function isValidBirthDate(birthDate) {
        const date = new Date(birthDate);
        const today = new Date();
        const age = today.getFullYear() - date.getFullYear();
        return age >= 18 && age <= 120;
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
            showSuccessMessage('Locataire ajouté avec succès !');
            
            // Rediriger vers la liste des locataires
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
        localStorage.setItem('clientDraft', JSON.stringify(draftData));
        
        // Afficher un message
        showSuccessMessage('Brouillon sauvegardé');
    };
    
    // Charger le brouillon au chargement de la page
    function loadDraft() {
        const draftData = localStorage.getItem('clientDraft');
        if (draftData) {
            const data = JSON.parse(draftData);
            
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    if (field.type === 'checkbox') {
                        field.checked = data[key] === 'on';
                    } else {
                        field.value = data[key];
                    }
                }
            });
        }
    }
    
    // Formatage automatique du téléphone
    const phoneFields = ['phone', 'emergencyPhone', 'guarantorPhone', 'workPhone'];
    phoneFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', function() {
                let value = this.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value.startsWith('33')) {
                        value = value.substring(2);
                    }
                    if (value.length === 10) {
                        value = value.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
                    } else if (value.length === 9) {
                        value = value.replace(/(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
                    }
                }
                this.value = value;
            });
        }
    });
    
    // Formatage automatique de l'IBAN
    const ibanField = document.getElementById('iban');
    if (ibanField) {
        ibanField.addEventListener('input', function() {
            let value = this.value.replace(/\s/g, '').toUpperCase();
            if (value.length > 0) {
                value = value.replace(/(.{4})/g, '$1 ').trim();
            }
            this.value = value;
        });
    }
    
    // Calcul automatique de l'âge
    const birthDateField = document.getElementById('birthDate');
    if (birthDateField) {
        birthDateField.addEventListener('change', function() {
            if (this.value) {
                const birthDate = new Date(this.value);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                
                // Afficher l'âge dans un champ caché ou dans une note
                const ageNote = document.createElement('div');
                ageNote.className = 'success-message';
                ageNote.textContent = `Âge calculé : ${age} ans`;
                
                const formGroup = this.closest('.form-group');
                const existingNote = formGroup.querySelector('.success-message');
                if (existingNote) {
                    existingNote.remove();
                }
                formGroup.appendChild(ageNote);
            }
        });
    }
    
    // Auto-complétion pour les villes
    const cityFields = ['preferredAreas'];
    cityFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', function() {
                const value = this.value.toLowerCase();
                if (value.length > 2) {
                    // Simuler une recherche de villes (remplacer par votre API)
                    const cities = [
                        'Paris 11e', 'Paris 12e', 'Paris 20e', 'Lyon 1er', 'Lyon 2e',
                        'Marseille 1er', 'Marseille 2e', 'Toulouse', 'Bordeaux', 'Nantes'
                    ];
                    
                    const suggestions = cities.filter(city => 
                        city.toLowerCase().includes(value)
                    );
                    
                    showSuggestions(this, suggestions);
                }
            });
        }
    });
    
    // Afficher les suggestions
    function showSuggestions(field, suggestions) {
        // Supprimer les suggestions existantes
        const existingSuggestions = document.querySelector('.suggestions');
        if (existingSuggestions) {
            existingSuggestions.remove();
        }
        
        if (suggestions.length === 0) return;
        
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'suggestions';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.textContent = suggestion;
            item.addEventListener('click', () => {
                field.value = suggestion;
                suggestionsDiv.remove();
            });
            suggestionsDiv.appendChild(item);
        });
        
        const formGroup = field.closest('.form-group');
        formGroup.style.position = 'relative';
        formGroup.appendChild(suggestionsDiv);
    }
    
    // Fermer les suggestions en cliquant ailleurs
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.suggestions') && !e.target.closest('input')) {
            const suggestions = document.querySelector('.suggestions');
            if (suggestions) {
                suggestions.remove();
            }
        }
    });
    
    // Validation en temps réel
    const fieldsToValidate = form.querySelectorAll('input[type="email"], input[type="tel"], input[type="date"]');
    fieldsToValidate.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    function validateField(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('valid', 'invalid');
        
        if (!field.value.trim()) return;
        
        let isValid = true;
        
        if (field.type === 'email') {
            isValid = isValidEmail(field.value);
        } else if (field.type === 'tel') {
            isValid = isValidPhone(field.value);
        } else if (field.type === 'date' && field.id === 'birthDate') {
            isValid = isValidBirthDate(field.value);
        }
        
        if (isValid) {
            formGroup.classList.add('valid');
        } else {
            formGroup.classList.add('invalid');
        }
    }
    
    // Charger le brouillon au démarrage
    loadDraft();
    
    // Nettoyer le brouillon après soumission réussie
    form.addEventListener('submit', function() {
        localStorage.removeItem('clientDraft');
    });
    
    // Gestion des documents requis
    const documentCheckboxes = form.querySelectorAll('input[name="documents"]');
    documentCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateDocumentProgress();
        });
    });
    
    function updateDocumentProgress() {
        const totalDocuments = documentCheckboxes.length;
        const checkedDocuments = Array.from(documentCheckboxes).filter(cb => cb.checked).length;
        const progress = (checkedDocuments / totalDocuments) * 100;
        
        // Créer ou mettre à jour la barre de progression
        let progressBar = document.querySelector('.progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            const documentsSection = document.querySelector('.documents-grid').parentElement;
            documentsSection.insertBefore(progressBar, documentsSection.querySelector('.form-group'));
        }
        
        progressBar.innerHTML = `
            <div class="progress-fill" style="width: ${progress}%"></div>
        `;
        
        // Afficher le pourcentage
        const progressText = document.createElement('div');
        progressText.className = 'success-message';
        progressText.textContent = `${checkedDocuments}/${totalDocuments} documents sélectionnés (${Math.round(progress)}%)`;
        
        const existingText = progressBar.parentElement.querySelector('.success-message');
        if (existingText) {
            existingText.remove();
        }
        progressBar.parentElement.appendChild(progressText);
    }
});

// Fonctions utilitaires globales
function formatPhoneNumber(phone) {
    return phone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
}

function formatIBAN(iban) {
    return iban.replace(/(.{4})/g, '$1 ').trim();
}

function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
} 