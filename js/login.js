// Login Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Profile selection
    const profileOptions = document.querySelectorAll('.profile-option');
    let selectedProfile = 'locataire';

    profileOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            profileOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
            selectedProfile = this.dataset.profile;
        });
    });

    // Password toggle
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    // Show/Hide register form
    const showRegisterBtn = document.getElementById('showRegister');
    const registerForm = document.getElementById('registerForm');
    const closeRegisterBtn = document.getElementById('closeRegister');

    if (showRegisterBtn && registerForm) {
        showRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            registerForm.classList.remove('hidden');
        });
    }

    if (closeRegisterBtn && registerForm) {
        closeRegisterBtn.addEventListener('click', function() {
            registerForm.classList.add('hidden');
        });
    }

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Suppression de la validation pour forcer la connexion
            // Redirection immédiate selon le profil sélectionné
            switch(selectedProfile) {
                case 'locataire':
                    window.location.href = './locataire/locataire.html';
                    break;
                case 'bailleur':
                    window.location.href = './bailleur/bailleur.html';
                    break;
                case 'admin':
                    window.location.href = './backoffice/backoffice.html';
                    break;
                default:
                    window.location.href = './locataire/locataire.html';
            }
        });
    }

    // Register form submission
    const registerFormElement = document.getElementById('registerForm');
    if (registerFormElement) {
        registerFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('registerEmail').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;

            // Validation
            if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
                showNotification('Veuillez remplir tous les champs', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showNotification('Les mots de passe ne correspondent pas', 'error');
                return;
            }

            if (!terms) {
                showNotification('Veuillez accepter les conditions d\'utilisation', 'error');
                return;
            }

            // Simulate registration process
            showNotification('Création du compte en cours...', 'info');
            
            setTimeout(() => {
                showNotification('Compte créé avec succès ! Vous pouvez maintenant vous connecter.', 'success');
                registerForm.classList.add('hidden');
                // Clear form
                registerFormElement.reset();
            }, 2000);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fa-solid ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fa-solid fa-times"></i>
            </button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 1rem;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
    }

    function getNotificationIcon(type) {
        switch(type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }

    function getNotificationColor(type) {
        switch(type) {
            case 'success': return '#388E3C';
            case 'error': return '#d32f2f';
            case 'warning': return '#f57c00';
            default: return '#1A237E';
        }
    }

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}); 