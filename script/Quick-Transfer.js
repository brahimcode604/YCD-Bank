const transfUser = document.getElementById('transfuser');
const transfCard = document.getElementById('transfcard');
const usedPopup = document.getElementById('usedpopup');
const addBtnTransfer = document.getElementById('addbtntransfer');
const removeBtnTransfer = document.getElementById('removebtntransfer');
const Qtransfer = document.getElementById('Qtransfer');
const addBtn = document.getElementById('addbtn');

// if(addbtn){


//   alert("test");
// }
// console.log(addBtn);
const addUserForm = document.getElementById("addUserForm");

// Variables globales
let count = 0;
const MAX_USERS = 5;
 comptes = JSON.parse(localStorage.getItem("ycd_bank_accounts")) || [];
const index_couent_user = localStorage.getItem("ycd_bank_index");

// alert("courant:"+index_couent_user);



let currentUser = comptes[index_couent_user] || null;

// === Popup de transfert ===
function createTransferPopup(fromUser, toUser) {
    // Supprimer l'ancien popup s'il existe
    const existingPopup = document.getElementById('transferAmountPopup');
    if (existingPopup) {
        existingPopup.remove();
    }

    const popupHTML = `
        <div id="transferAmountPopup" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div class="bg-white rounded-2xl shadow-2xl w-96 p-6 relative animate-fadeIn border border-blue-100">
                <h1 class="text-2xl font-semibold text-gray-800 mb-4 text-center">Effectuer un Transfert</h1>
                
                <div class="mb-4 p-3 bg-gray-100 rounded-lg">
                    <p class="text-sm text-gray-600">De:</p>
                    <p class="font-semibold">${fromUser.nom} ${fromUser.prenom}</p>
                    <p class="text-xs text-gray-500">${fromUser.rep_principal}</p>
                </div>

                <div class="mb-4 p-3 bg-gray-100 rounded-lg">
                    <p class="text-sm text-gray-600">À:</p>
                    <p class="font-semibold">${toUser.username}</p>
                    <p class="text-xs text-gray-500">${toUser.cardNumber}</p>
                </div>

                <form id="transferForm" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">Montant (DH)</label>
                        <input 
                            type="number" 
                            id="transferAmount" 
                            min="5" 
                            step="5" 
                            placeholder="Montant à transférer"
                            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                    </div>

                    <div class="flex justify-between mt-6">
                        <button 
                            type="submit"
                            class="flex-1 mr-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-2 rounded-lg hover:from-blue-700 hover:to-blue-800"
                        >
                            Transférer
                        </button>
                        <button 
                            type="button"
                            id="cancelTransfer"
                            class="flex-1 ml-2 bg-gray-200 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-300"
                        >
                            Annuler
                        </button>
                    </div>
                </form>

                <div id="transferMessage" class="mt-3 text-center hidden"></div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // Gestion des événements du nouveau popup
    const transferPopup = document.getElementById('transferAmountPopup');
    const cancelBtn = document.getElementById('cancelTransfer');
    const transferForm = document.getElementById('transferForm');

    // Fermer le popup
    cancelBtn.addEventListener('click', () => {
        transferPopup.remove();
    });

    // Soumission du formulaire de transfert
    transferForm.addEventListener('submit', (e) => {
        e.preventDefault();
        processTransfer(fromUser, toUser);
    });

    // Fermer en cliquant à l'extérieur
    transferPopup.addEventListener('click', (e) => {
        if (e.target === transferPopup) {
            transferPopup.remove();
        }
    });
}

// === Traitement du transfert ===
function processTransfer(fromUser, toUser) {
    const amountInput = document.getElementById('transferAmount');
    const amount = parseFloat(amountInput.value);
    const messageDiv = document.getElementById('transferMessage');

    // Validation du montant
    if (!amount || amount < 5) {
        showMessage(messageDiv, "Le montant minimum est de 5 DH", "error");
        return;
    }

    if (amount % 5 !== 0) {
        showMessage(messageDiv, "Le montant doit être un multiple de 5", "error");
        return;
    }

    // Vérifier le solde
    const soldeActuel = parseFloat(fromUser.solde_principal);
    if (soldeActuel < amount) {
        showMessage(messageDiv, "Solde insuffisant", "error");
        return;
    }

    // Effectuer le transfert
    fromUser.solde_principal = (soldeActuel - amount).toFixed(2);
    
    // Mettre à jour le localStorage
    comptes[index_couent_user] = fromUser;
    localStorage.setItem("ycd_bank_accounts", JSON.stringify(comptes));

    // Ajouter à l'historique des transactions
    addTransactionToHistory(fromUser, toUser, amount);

    showMessage(messageDiv, `Transfert de ${amount} DH effectué avec succès!`, "success");

    // Fermer le popup après succès
    setTimeout(() => {
        document.getElementById('transferAmountPopup').remove();
        updateUI(); // Mettre à jour l'interface
    }, 2000);
}

// === Ajouter une transaction à l'historique ===
function addTransactionToHistory(fromUser, toUser, amount) {
    let transactions = JSON.parse(localStorage.getItem("ycd_bank_transactions")) || [];
    
    const newTransaction = {
        id: 'trans_' + Date.now(),
        date: new Date().toISOString(),
        type: "Transfert",
        from: `${fromUser.nom} ${fromUser.prenom}`,
        to: toUser.username,
        amount: -amount, // Montant négatif pour les débits
        balance: parseFloat(fromUser.solde_principal),
        reference: `TRF${Date.now().toString().substr(-6)}`
    };

    transactions.unshift(newTransaction); // Ajouter au début
    localStorage.setItem("ycd_bank_transactions", JSON.stringify(transactions));
}

// === Afficher les messages ===
function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `mt-3 text-center ${type === 'success' ? 'text-green-600' : 'text-red-600'}`;
    element.classList.remove('hidden');
}

// === Mettre à jour l'interface ===
function updateUI() {
    // Mettre à jour l'affichage du solde
    if (currentUser) {
        const soldeElement = document.getElementById('passwtext');
        if (soldeElement) {
            soldeElement.textContent = `${parseFloat(currentUser.solde_principal).toFixed(2)} DH`;
        }
        
        // Mettre à jour les RIB dans les sélecteurs
    }
}

// === Mettre à jour les sélecteurs de RIB ===
function updateRIBSelectors() {
    const ribSelectors = [
        document.getElementById('RIB1'),
        document.getElementById('RIB2'),
        document.getElementById('RIB3'),
        document.getElementById('RIB4')
    ];

    ribSelectors.forEach(selector => {
        if (selector && currentUser) {
            selector.textContent = currentUser.rep_principal;
            selector.value = currentUser.rep_principal;
        }
    });
}

// === Gestion de la popup d'ajout d'utilisateur ===

// Ouvrir la popup
addBtn.addEventListener('click', () => {

     console.log("addbtn");
    usedPopup.classList.remove('hidden');
    usedPopup.style.display = 'flex';

});



 
// Fermer la popup
removeBtnTransfer.addEventListener('click', () => {
      usedPopup.style.display="none";
    //  usedPopup.classList.add('hidden');
    
});

// === Ajouter un nouvel utilisateur ===
addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = transfUser.value.trim();
    const cardNumber = transfCard.value.trim();

    if (!username || !cardNumber) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    if (count >= MAX_USERS) {
        alert("Vous ne pouvez pas ajouter plus de 5 utilisateurs.");
        return;
    }

    count++;

    // Créer l'objet utilisateur
    const userData = {
        id: `user_${Date.now()}`,
        username: username,
        cardNumber: cardNumber,
        addedDate: new Date().toISOString()
    };

    // Sauvegarder dans le localStorage
    saveUserToLocalStorage(userData);

    // Création d'une carte utilisateur
    const card = document.createElement('div');
    card.className = 'w-10 flex flex-col items-center gap-1';
    card.id = `user_${count}`;
    card.innerHTML = `
        <button class="btng user-transfer-btn" data-user='${JSON.stringify(userData).replace(/'/g, "&#39;")}'>
            <img class="rounded-full w-10 h-10 hover:scale-110 transition-transform duration-300"
                 src="../imge/face.jpg" alt="${username}">
        </button>
        <p class="text-sm">${username}</p>
        <button class="remove-user text-red-500 text-xs hover:text-red-700">X</button>
    `;

    // Ajout au DOM
    Qtransfer.insertBefore(card, addBtn);
    
    // Réinitialiser et fermer la popup
    addUserForm.reset();
    usedPopup.classList.add('hidden');

    console.log("Utilisateur ajouté :", userData);
});

// === Sauvegarder l'utilisateur dans le localStorage ===
function saveUserToLocalStorage(userData) {
    let savedUsers = JSON.parse(localStorage.getItem("ycd_bank_saved_users")) || [];
    
    // Vérifier si l'utilisateur existe déjà
    const userExists = savedUsers.some(user => 
        user.username === userData.username || user.cardNumber === userData.cardNumber
    );
    
    if (!userExists) {
        savedUsers.push(userData);
        localStorage.setItem("ycd_bank_saved_users", JSON.stringify(savedUsers));
    }
}

// === Charger les utilisateurs sauvegardés au démarrage ===
function loadSavedUsers() {
    const savedUsers = JSON.parse(localStorage.getItem("ycd_bank_saved_users")) || [];
    
    savedUsers.forEach((user, index) => {
        count++;
        
        const card = document.createElement('div');
        card.className = 'w-10 flex flex-col items-center gap-1';
        card.id = `user_${count}`;
        card.innerHTML = `
            <button class="btng user-transfer-btn" data-user='${JSON.stringify(user).replace(/'/g, "&#39;")}'>
                <img class="rounded-full w-10 h-10 hover:scale-110 transition-transform duration-300"
                     src="../imge/face.jpg" alt="${user.username}">
            </button>
            <p class="text-sm">${user.username}</p>
            <button class="remove-user text-red-500 text-xs hover:text-red-700">X</button>
        `;

        Qtransfer.insertBefore(card, addBtn);
    });
}

// === Gestion des événements globaux ===
document.addEventListener('click', (e) => {
    const target = e.target;

    // Supprimer un utilisateur
    if (target.classList.contains('remove-user')) {
        const userCard = target.closest('div');
        const username = userCard.querySelector('p').textContent;
        
        // Supprimer du localStorage
        removeUserFromLocalStorage(username);
        
        userCard.remove();
        count--;
    }

    // Clic sur un utilisateur pour transfert
    if (target.closest('.user-transfer-btn')) {
        const btn = target.closest('.user-transfer-btn');
        const userData = JSON.parse(btn.getAttribute('data-user'));
        
        if (currentUser) {
            createTransferPopup(currentUser, userData);
        } else {
            alert("Erreur: Utilisateur courant non trouvé");
        }
    }
});

// === Supprimer un utilisateur du localStorage ===
function removeUserFromLocalStorage(username) {
    let savedUsers = JSON.parse(localStorage.getItem("ycd_bank_saved_users")) || [];
    savedUsers = savedUsers.filter(user => user.username !== username);
    localStorage.setItem("ycd_bank_saved_users", JSON.stringify(savedUsers));
}

// === Initialisation au chargement ===
document.addEventListener('DOMContentLoaded', function() {
    // Charger l'utilisateur courant
    currentUser = comptes[index_couent_user];
    
    if (!currentUser) {
        console.error("Utilisateur courant non trouvé");
        return;
    }

    // Charger les utilisateurs sauvegardés
    loadSavedUsers();
    
    // Mettre à jour l'interface
    updateUI();
    
    console.log("Dashboard initialisé pour:", currentUser.nom, currentUser.prenom);
});

// === Gestion des erreurs ===
function handleTransferError(error) {
    console.error("Erreur lors du transfert:", error);
    alert("Une erreur est survenue lors du transfert. Veuillez réessayer.");
}

// Export pour debug (en développement)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.quickTransfer = {
        getCurrentUser: () => currentUser,
        getSavedUsers: () => JSON.parse(localStorage.getItem("ycd_bank_saved_users")) || [],
        getTransactions: () => JSON.parse(localStorage.getItem("ycd_bank_transactions")) || [],
        resetData: () => {
            localStorage.removeItem("ycd_bank_saved_users");
            localStorage.removeItem("ycd_bank_transactions");
            location.reload();
        }
    };
}