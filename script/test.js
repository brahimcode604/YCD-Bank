
// function genererRIB(cin) {


//     const cinNettoye = cin.replace(/\D/g, '');
 
//     if (cinNettoye.length < 6) {
//         throw new Error('Le CIN doit contenir au moins 6 chiffres');
//     }
//     const sixChiffresCIN = cinNettoye.substring(0, 6);
    
//     const rib = `312134${sixChiffresCIN}55`;
    
//     return rib;
// }

 
// function genererRIBFormate(cin) {
//     const ribBrut = genererRIB(cin);
    
//     // Formater avec des espaces: 31213 4XXX XXX 55
//     const partie1 = ribBrut.substring(0, 5); // 31213
//     const partie2 = ribBrut.substring(5, 9); // 4XXX
//     const partie3 = ribBrut.substring(9, 12); // XXX
//     const partie4 = ribBrut.substring(12); // 55
    
//     return `${partie1} ${partie2} ${partie3} ${partie4}`;
// }

// function verifierRIB(rib) {
     
//     const ribNettoye = rib.replace(/\s/g, '');
    
 
//     if (ribNettoye.length !== 14) {
//         return false;
//     }
    
//     if (!ribNettoye.startsWith('312134') || !ribNettoye.endsWith('55')) {
//         return false;
//     }
    
//     // Vérifier que les 6 caractères du milieu sont des chiffres
//     const partieCentrale = ribNettoye.substring(6, 12);
//     if (!/^\d{6}$/.test(partieCentrale)) {
//         return false;
//     }
    
//     return true;
// }

// /**
//  * Extrait le CIN à partir d'un RIB
//  * @param {string} rib - RIB bancaire
//  * @returns {string} CIN extrait
//  */
// function extraireCINDuRIB(rib) {
//     if (!verifierRIB(rib)) {
//         throw new Error('RIB invalide');
//     }
    
//     const ribNettoye = rib.replace(/\s/g, '');
//     // Les 6 chiffres après "312134" correspondent aux 6 premiers chiffres du CIN
//     const sixChiffresCIN = ribNettoye.substring(6, 12);
    
//     return sixChiffresCIN;
// }

// // ==================================================
// // FONCTION POUR GÉNÉRER UN NUMÉRO DE COMPTE
// // ==================================================

// /**
//  * Génère un numéro de compte bancaire unique
//  * @param {string} cin - Numéro CIN
//  * @returns {string} Numéro de compte généré
//  */
// function genererNumeroCompte(cin) {
//     const timestamp = Date.now().toString();
//     const random = Math.random().toString(36).substr(2, 6).toUpperCase();
//     const sixChiffresCIN = cin.replace(/\D/g, '').substring(0, 6);
    
//     return `YCD${sixChiffresCIN}${timestamp.substr(-4)}${random}`;
// }

// // ==================================================
// // INTÉGRATION AVEC LE FORMULAIRE
// // ==================================================

// /**
//  * Met à jour l'aperçu du RIB dans le formulaire
//  */
// function mettreAJourApercuRIB() {
//     const cin = document.getElementById('cin')?.value;
    
//     if (cin && cin.length >= 6) {
//         try {
//             const rib = genererRIB(cin);
//             const ribFormate = genererRIBFormate(cin);
//             const numeroCompte = genererNumeroCompte(cin);
            
//             // Mettre à jour l'aperçu dans l'étape 4
//             const apercuElement = document.getElementById('account-preview');
//             const previewRIBElement = document.getElementById('preview-rib');
            
//             if (apercuElement && previewRIBElement) {
//                 apercuElement.classList.remove('hidden');
//                 previewRIBElement.innerHTML = `
//                     <strong>RIB:</strong> ${ribFormate}<br>
//                     <strong>Numéro de compte:</strong> ${numeroCompte}<br>
//                     <strong>Banque:</strong> YCD Bank (312)
//                 `;
//             }
            
//             // Stocker le RIB généré pour utilisation ultérieure
//             sessionStorage.setItem('rib_genere', rib);
            
//         } catch (error) {
//             console.error('Erreur lors de la génération du RIB:', error);
//         }
//     }
// }

// /**
//  * Récupère le RIB généré pour l'utilisateur connecté
//  * @returns {string|null} RIB de l'utilisateur ou null
//  */
// function getRIBUtilisateurConnecte() {
//     const userData = localStorage.getItem('ycd_current_user');
//     if (userData) {
//         const user = JSON.parse(userData);
//         return genererRIB(user.cin);
//     }
//     return null;
// }

// // ==================================================
// // FONCTIONS DE VALIDATION AVANCÉE
// // ==================================================

// /**
//  * Valide le format du CIN
//  * @param {string} cin - Numéro CIN à valider
//  * @returns {Object} Résultat de la validation
//  */
// function validerCIN(cin) {
//     const resultat = {
//         valide: false,
//         message: '',
//         cinNettoye: ''
//     };
    
//     // Nettoyer le CIN
//     resultat.cinNettoye = cin.replace(/\D/g, '');
    
//     // Vérifications
//     if (resultat.cinNettoye.length === 0) {
//         resultat.message = 'Le CIN est requis';
//     } else if (resultat.cinNettoye.length < 6) {
//         resultat.message = 'Le CIN doit contenir au moins 6 chiffres';
//     } else if (resultat.cinNettoye.length > 12) {
//         resultat.message = 'Le CIN ne peut pas dépasser 12 chiffres';
//     } else {
//         resultat.valide = true;
//         resultat.message = 'CIN valide';
//     }
    
//     return resultat;
// }

// /**
//  * Vérifie si un CIN est déjà utilisé
//  * @param {string} cin - CIN à vérifier
//  * @returns



// ==================================================
// GESTIONNAIRE D'AUTHENTIFICATION
// ==================================================

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.comptes = JSON.parse(localStorage.getItem("ycd_bank_accounts")) || [];
        this.init();
    }



    init() {
        this.checkAuthentication();
        this.bindAuthEvents();
    }

    



    checkAuthentication() {
        const userData = localStorage.getItem('ycd_current_user');
        if (userData) {
            this.currentUser = JSON.parse(userData);
            this.showAuthenticatedUI();
        } else {
            this.showLoginUI();
        }
    }

    bindAuthEvents() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Logout buttons
        document.querySelectorAll('#mobile-logout, #logout-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleLogout(e));
        });

        // Show create account from login
        const showCreateAccount = document.getElementById('show-create-account');
        if (showCreateAccount) {
            showCreateAccount.addEventListener('click', () => {
                this.hideLoginUI();
                openPopup();
            });
        }

        // Mobile login
        const mobileLogin = document.getElementById('mobile-login');
        if (mobileLogin) {
            mobileLogin.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLoginUI();
            });
        }
    }

    handleLogin(e) {
        e.preventDefault();
        
        const rip = document.getElementById('rip').value;
        const password = document.getElementById('login_password').value;
        
        // Validation basique
        if (!rip || !password) {
            this.showError('Veuillez remplir tous les champs');
            return;
        }

        // Vérification des comptes existants
        const userAccount = this.comptes.find(acc => 
            this.generateRIB(acc) === rip && acc.password === password
        );

        if (userAccount) {
            this.currentUser = userAccount;
            localStorage.setItem('ycd_current_user', JSON.stringify(userAccount));
            this.showAuthenticatedUI();
            this.showSuccess('Connexion réussie!');
        } else {
            this.showError('RIB ou mot de passe incorrect');
        }
    }

    handleLogout(e) {
        if (e) e.preventDefault();
        this.currentUser = null;
        localStorage.removeItem('ycd_current_user');
        this.showLoginUI();
        this.showSuccess('Déconnexion réussie');
    }

    generateRIB(account) {
        // Format: 312134 + 6 premiers chiffres du CIN + 55
        const cinPart = account.cin.replace(/\D/g, '').substring(0, 6);
        return `312134${cinPart}55`;
    }

    showAuthenticatedUI() {
        // Cacher le formulaire de login
        this.hideLoginUI();

        // Mettre à jour le header
        const welcomeText = document.getElementById('welcome-text');
        if (welcomeText && this.currentUser) {
            welcomeText.textContent = `WELCOME BACK, ${this.currentUser.prenom?.toUpperCase()}!`;
        }

        // Mettre à jour le statut de connexion
        const loginStatus = document.getElementById('login-status');
        if (loginStatus) {
            loginStatus.classList.remove('bg-red-500');
            loginStatus.classList.add('bg-green-500');
        }

        // Afficher les liens de navigation
        document.getElementById('dash')?.classList.remove('hidden');
        document.getElementById('in')?.classList.remove('hidden');
        document.getElementById('mobile-dash')?.classList.remove('hidden');
        
        // Gérer les boutons login/logout mobile
        document.getElementById('mobile-login')?.classList.add('hidden');
        document.getElementById('mobile-logout')?.classList.remove('hidden');
    }

    showLoginUI() {
        const loginSection = document.getElementById('log_in');
        if (loginSection) loginSection.classList.remove('hidden');

        // Mettre à jour le statut de connexion
        const loginStatus = document.getElementById('login-status');
        if (loginStatus) {
            loginStatus.classList.remove('bg-green-500');
            loginStatus.classList.add('bg-red-500');
        }

        // Cacher les liens de navigation
        document.getElementById('dash')?.classList.add('hidden');
        document.getElementById('in')?.classList.add('hidden');
        document.getElementById('mobile-dash')?.classList.add('hidden');
        
        // Gérer les boutons login/logout mobile
        document.getElementById('mobile-login')?.classList.remove('hidden');
        document.getElementById('mobile-logout')?.classList.add('hidden');

        // Mettre à jour le message de bienvenue
        const welcomeText = document.getElementById('welcome-text');
        if (welcomeText) {
            welcomeText.textContent = 'WELCOME BACK!';
        }
    }

    hideLoginUI() {
        const loginSection = document.getElementById('log_in');
        if (loginSection) loginSection.classList.add('hidden');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showNotification(message, type) {
        const toast = document.createElement("div");
        toast.className = `fixed top-4 right-4 ${
            type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in`;
        toast.textContent = message;
    }
}