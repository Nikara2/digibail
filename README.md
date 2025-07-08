# Digibail - Documentation

## 📋 Vue d'ensemble

**Digibail** est une plateforme de gestion locative qui permet aux bailleurs et locataires de gérer leurs biens immobiliers, contrats, paiements et quittances. Le site est développé en HTML, CSS et JavaScript vanilla.

## 🚀 Fonctionnalités principales

- **Authentification** : Système de connexion multi-profils
- **Dashboard** : Tableaux de bord personnalisés par profil
- **Gestion des contrats** : Visualisation et téléchargement des contrats
- **Paiements** : Suivi des loyers et charges
- **Quittances** : Génération et consultation des quittances
- **Interface responsive** : Compatible mobile et desktop

---

## 🔐 Système d'authentification

### Connexion simplifiée (sans base de données)

Le système de connexion fonctionne **sans validation** des identifiants. Cela permet de tester rapidement l'interface :

#### Comment se connecter :
1. **Ouvrir** `login.html`
2. **Choisir un profil** :
   - 🏠 **Locataire** (par défaut)
   - 🏢 **Bailleur** 
   - 🏛️ **Administration**
3. **Saisir n'importe quels identifiants** :
   - Email : `test@example.com`
   - Mot de passe : `123456` (ou n'importe quoi)
4. **Cliquer sur "Se connecter"**

#### Redirection automatique :
- **Locataire** → `locataire/locataire.html`
- **Bailleur** → `bailleur/bailleur.html`
- **Administration** → `admin.html` (à créer)

---

## 👥 Profils utilisateurs

### 1. **Locataire** (`locataire/`)

#### Pages disponibles :
- **Dashboard** (`locataire.html`) : Vue d'ensemble des paiements et contrats
- **Mes contrats** (`contrats.html`) : Liste des contrats actifs et passés
- **Paiements** (`paiements.html`) : Historique des paiements
- **Payer mon loyer** (`paiement.html`) : Formulaire de paiement
- **Quittances** (`quittances.html`) : Consultation des quittances

#### Fonctionnalités :
- ✅ Visualisation des loyers à payer
- ✅ Historique des paiements
- ✅ Téléchargement des contrats
- ✅ Paiement en ligne (Orange Money, Moov Money, Wave)
- ✅ Consultation des quittances

### 2. **Bailleur** (`bailleur/`)

#### Pages disponibles :
- **Dashboard** (`bailleur.html`) : Vue d'ensemble des biens et loyers
- **Mes biens** (`mes-biens.html`) : Gestion des propriétés
- **Contrats** (`contrats.html`) : Gestion des contrats de location
- **Loyers** (`loyers.html`) : Suivi des paiements
- **Ajouter un bien** (`ajouter-bien.html`) : Enregistrement de nouveaux biens
- **Nouveau locataire** (`nouveau-client.html`) : Création de comptes locataires

#### Fonctionnalités :
- ✅ Gestion des biens immobiliers
- ✅ Suivi des loyers et charges
- ✅ Gestion des contrats
- ✅ Ajout de nouveaux biens
- ✅ Création de comptes locataires

---

## 💰 Système de paiement

### Devise utilisée
- **Franc CFA (Fcfa)** - Devise du Burkina Faso

### Montants types :
- **Loyer principal** : 50 000 Fcfa/mois
- **Charges** : 7 500 Fcfa/mois
- **Studio** : 30 000 Fcfa/mois
- **Maison T4** : 75 000 Fcfa/mois

### Méthodes de paiement :
- 🟠 **Orange Money**
- 🔵 **Moov Money**
- 🟡 **Wave**
- 💳 **Carte bancaire**
- 🏦 **Virement bancaire**

---

## 🏠 Adresses et localisation

### Villes utilisées :
- **Ouagadougou** (capitale)
- **Bobo-Dioulasso** (2ème ville)

### Exemples d'adresses :
- `12 rue des Lilas, Ouagadougou`
- `Avenue Kwame Nkrumah, Ouagadougou`
- `Boulevard Central, Ouagadougou`
- `Rue du Parc, Bobo-Dioulasso`
- `Place de la Nation, Ouagadougou`

---

## 🎨 Interface utilisateur

### Design system :
- **Couleurs principales** : Bleu (#1A237E)
- **Police** : Poppins (Google Fonts)
- **Icônes** : Font Awesome 6.4.0
- **Style** : Moderne et épuré

### Composants réutilisables :
- **Sidebar** : Navigation principale
- **Cards** : Conteneurs d'information
- **Buttons** : Actions principales et secondaires
- **Tables** : Affichage des données
- **Forms** : Saisie d'informations

---

## 📁 Structure des fichiers

```
digibail/
├── index.html                 # Page d'accueil
├── login.html                 # Page de connexion
├── css/
│   ├── style.css             # Styles globaux
│   ├── login.css             # Styles de connexion
│   ├── dashboard.css         # Styles du dashboard
│   ├── bailleur.css          # Styles spécifiques bailleur
│   └── paiements.css         # Styles des paiements
├── js/
│   ├── login.js              # Logique de connexion
│   ├── dashboard.js          # Logique du dashboard
│   └── bailleur.js           # Logique bailleur
├── locataire/
│   ├── locataire.html        # Dashboard locataire
│   ├── contrats.html         # Contrats locataire
│   ├── paiements.html        # Historique paiements
│   ├── paiement.html         # Paiement en ligne
│   └── quittances.html       # Quittances
├── bailleur/
│   ├── bailleur.html         # Dashboard bailleur
│   ├── mes-biens.html        # Gestion des biens
│   ├── contrats.html         # Contrats bailleur
│   ├── loyers.html           # Suivi des loyers
│   ├── ajouter-bien.html     # Ajout de biens
│   └── nouveau-client.html   # Nouveaux locataires
└── assets/
    └── hero-illu.svg         # Illustrations
```

---

## 🚀 Comment démarrer

### 1. **Ouvrir le projet**
```bash
# Ouvrir le dossier dans un éditeur
cd digibail
```

### 2. **Lancer un serveur local** (recommandé)
```bash
# Avec Python
python -m http.server 8000

# Avec Node.js
npx serve .

# Avec PHP
php -S localhost:8000
```

### 3. **Accéder au site**
- Ouvrir `http://localhost:8000` dans le navigateur
- Ou ouvrir directement `login.html` (attention aux chemins relatifs)

---

## 🔧 Personnalisation

### Modifier les montants :
- Remplacer les valeurs en Fcfa dans les fichiers HTML
- Exemple : `50000 Fcfa` → `75000 Fcfa`

### Ajouter des adresses :
- Modifier les adresses dans les sections appropriées
- Utiliser des noms de rues burkinabés

### Changer les couleurs :
- Modifier les variables CSS dans `css/style.css`
- Exemple : `--color-blue: #1A237E;`

---

## 📱 Responsive design

Le site est optimisé pour :
- **Desktop** : 1024px et plus
- **Tablet** : 768px - 1023px
- **Mobile** : 480px - 767px
- **Small mobile** : Moins de 480px

---

## 🔮 Évolutions futures

### Fonctionnalités à ajouter :
- [ ] Base de données réelle
- [ ] Authentification sécurisée
- [ ] Système de notifications
- [ ] Génération de rapports PDF
- [ ] Application mobile
- [ ] Paiements en ligne réels
- [ ] Messagerie interne
- [ ] Gestion des sinistres

### Améliorations techniques :
- [ ] Framework JavaScript (React/Vue.js)
- [ ] API REST
- [ ] Base de données (MySQL/PostgreSQL)
- [ ] Authentification JWT
- [ ] Tests automatisés

---

## 📞 Support

Pour toute question ou problème :
- **Email** : support@digibail.bf
- **Téléphone** : +226 XX XX XX XX
- **Adresse** : Ouagadougou, Burkina Faso

---

## 📄 Licence

Ce projet est développé pour **Digibail** - Plateforme de gestion locative au Burkina Faso.

---

*Documentation mise à jour le : Janvier 2024* 