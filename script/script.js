// Éléments DOM
const Barre_virticale = document.getElementById("barre_verticale");
const popup = document.getElementById("popup");
const openBtn = document.getElementById("create_compte");
const closeBtn = document.getElementById("close_popup");
const nextBtn = document.getElementById("next_step");
const prevBtn = document.getElementById("prev_step");
const dash = document.getElementById("dash");
const index = document.getElementById("in");
const steps = document.querySelectorAll(".step");
const circles = [
    document.getElementById("step1"),
    document.getElementById("step2"), 
    document.getElementById("step3"),
    document.getElementById("step4")
];

// Variables globales
let currentStep = 0;
let comptes = JSON.parse(localStorage.getItem("ycd_bank_accounts")) || [];

// Initialisation
document.addEventListener("DOMContentLoaded", function() {
    initNavigation();
    initFormValidation();
    checkExistingAccounts();
    loadFormDraft();
});

// Navigation et affichage
function initNavigation() {
    // Ouvrir popup
    openBtn.addEventListener("click", openPopup);
    
    // Fermer popup
    closeBtn.addEventListener("click", closePopup);
    
    // Navigation étapes
    nextBtn.addEventListener("click", nextStep);
    prevBtn.addEventListener("click", prevStep);
    
    // Fermer en cliquant à l'extérieur
    popup.addEventListener("click", function(e) {
        if (e.target === popup) closePopup();
    });
}

function openPopup() {
    popup.classList.remove("hidden");
    if (Barre_virticale) Barre_virticale.classList.add("hidden");
    document.body.style.overflow = "hidden";
}

function closePopup() {
    popup.classList.add("hidden");
    if (Barre_virticale) Barre_virticale.classList.remove("hidden");
    document.body.style.overflow = "auto";
    resetFormProgress();
}

function showStep(stepIndex) {
    // Masquer toutes les étapes
    steps.forEach((step, index) => {
        step.classList.toggle("hidden", index !== stepIndex);
    });
    
    // Mettre à jour les cercles d'étape
    circles.forEach((circle, index) => {
        if (index === stepIndex) {
            circle.classList.replace("bg-gray-300", "bg-blue-600");
            circle.classList.replace("text-gray-600", "text-white");
        } else {
            circle.classList.replace("bg-blue-600", "bg-gray-300");
            circle.classList.replace("text-white", "text-gray-600");
        }
    });
    
    // Gérer les boutons de navigation
    prevBtn.classList.toggle("hidden", stepIndex === 0);
    
    if (stepIndex === steps.length - 1) {
        nextBtn.textContent = "Créer le Compte";
        nextBtn.classList.replace("bg-blue-600", "bg-green-600");
        nextBtn.classList.replace("hover:bg-blue-700", "hover:bg-green-700");
    } else {
        nextBtn.textContent = "Suivant";
        nextBtn.classList.replace("bg-green-600", "bg-blue-600");
        nextBtn.classList.replace("hover:bg-green-700", "hover:bg-blue-700");
    }
    
    currentStep = stepIndex;
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        } else {
            createAccount();
        }
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}

function resetFormProgress() {
    currentStep = 0;
    showStep(currentStep);
}

// Validation du formulaire
function initFormValidation() {
    const password = document.getElementById("password");
    const password_v = document.getElementById("password_v");
    
    // Validation en temps réel du mot de passe
    if (password && password_v) {
        password.addEventListener("input", validatePassword);
        password_v.addEventListener("input", validatePassword);
    }
    
    // Sauvegarde automatique des modifications
    document.querySelectorAll("#compteForm input, #compteForm select").forEach(input => {
        input.addEventListener("change", saveFormDraft);
    });
}

function validateCurrentStep() {
    switch(currentStep) {
        case 0: return validateStep1();
        case 1: return validateStep2();
        case 2: return validateStep3();
        case 3: return validateStep4();
        default: return true;
    }
}

function validateStep1() {
    const required = ['cin', 'nom', 'prenom', 'date_necence'];
    for (let field of required) {
        const element = document.getElementById(field);
        if (!element || !element.value.trim()) {
            showError(`Le champ ${getFieldLabel(field)} est obligatoire`);
            element?.focus();
            return false;
        }
    }
    return true;
}

function validateStep2() {
    const email = document.getElementById("email");
    const telephone = document.getElementById("Telephone");
    const password = document.getElementById("password");
    const password_v = document.getElementById("password_v");
    
    // Validation email
    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showError("Veuillez entrer une adresse email valide");
        email.focus();
        return false;
    }
    
    // Validation téléphone
    if (!telephone.value.match(/^\+?[\d\s-]{10,}$/)) {
        showError("Veuillez entrer un numéro de téléphone valide");
        telephone.focus();
        return false;
    }
    
    // Validation mot de passe
    if (!validatePassword()) {
        showError("Le mot de passe ne respecte pas les critères de sécurité");
        password.focus();
        return false;
    }
    
    return true;
}

function validateStep3() {
    const typeCompte = document.getElementById("Type_de_Compte");
    if (!typeCompte.value) {
        showError("Veuillez sélectionner un type de compte");
        typeCompte.focus();
        return false;
    }
    return true;
}

function validateStep4() {
    return validateStep1() && validateStep2() && validateStep3();
}

function validatePassword() {
    const password = document.getElementById("password");
    const password_v = document.getElementById("password_v");
    
    if (!password || !password_v) return true;
    
    const pwd = password.value;
    const pwd_v = password_v.value;
    
    // Regex : au moins 8 caractères, une lettre et un chiffre
    const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    
    // Validation du mot de passe principal
    if (pwd && !regex.test(pwd)) {
        password.style.borderColor = "red";
        return false;
    } else if (pwd) {
        password.style.borderColor = "green";
    }
    
    // Validation de la confirmation
    if (pwd_v && pwd_v !== pwd) {
        password_v.style.borderColor = "red";
        return false;
    } else if (pwd_v) {
        password_v.style.borderColor = "green";
    }
    
    return pwd && pwd_v && pwd === pwd_v && regex.test(pwd);
}

function getFieldLabel(fieldId) {
    const labels = {
        'cin': 'CIN',
        'nom': 'Nom',
        'prenom': 'Prénom',
        'date_necence': 'Date de naissance'
    };
    return labels[fieldId] || fieldId;
}

// Gestion des comptes
function getFormData() {
    return {
        id: generateAccountId(),
        cin: document.getElementById("cin")?.value || "",
        cin_date: document.getElementById("cin_date")?.value || "",
        nom: document.getElementById("nom")?.value || "",
        prenom: document.getElementById("prenom")?.value || "",
        date_necence: document.getElementById("date_necence")?.value || "",
        lieu_naissance: document.getElementById("nesence_date")?.value || "",
        nationalite: document.getElementById("Nationalite")?.value || "",
        civilite: document.getElementById("Civilite")?.value || "",
        email: document.getElementById("email")?.value || "",
        telephone: document.getElementById("Telephone")?.value || "",
        type_compte: document.getElementById("Type_de_Compte")?.value || "",
        password: document.getElementById("password")?.value || "",
        date_creation: new Date().toISOString(),
        solde_principal: "10000",
        solde_epargne: "0",
        numero_compte: generateAccountNumber(),
        statut: "actif"
    };
}

function generateAccountId() {
    return 'acc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateAccountNumber() {
    return 'YCD' + Date.now().toString().substr(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
}

function createAccount() {
    const nouveauCompte = getFormData();
    
    // Validation finale
    if (!validateStep4()) {
        showError("Veuillez corriger les erreurs avant de créer le compte");
        return;
    }
    
    // Vérifier si le CIN existe déjà
    const compteExistant = comptes.find(compte => compte.cin === nouveauCompte.cin);
    if (compteExistant) {
        showError("Un compte avec ce numéro CIN existe déjà");
        return;
    }
    
    // Ajouter le compte
    comptes.push(nouveauCompte);
    localStorage.setItem("ycd_bank_accounts", JSON.stringify(comptes));
    
    // Nettoyer le brouillon
    localStorage.removeItem("ycd_bank_account_draft");
    
    showSuccess(`Compte créé avec succès! Votre numéro de compte est: ${nouveauCompte.numero_compte}`);
    
    // Mettre à jour la navigation
    updateNavigation();
    
    // Fermer le popup et rediriger après délai
    setTimeout(() => {
        closePopup();
        resetForm();
        window.location.href = "html/dashboard.html";
    }, 2000);
}

function resetForm() {
    document.getElementById("compteForm").reset();
    resetFormProgress();
    
    // Réinitialiser les bordures des mots de passe
    const password = document.getElementById("password");
    const password_v = document.getElementById("password_v");
    if (password) password.style.borderColor = "";
    if (password_v) password_v.style.borderColor = "";
}

// Gestion des brouillons
function saveFormDraft() {
    const formData = getFormData();
    localStorage.setItem("ycd_bank_account_draft", JSON.stringify({
        ...formData,
        lastSaved: new Date().toISOString()
    }));
}

function loadFormDraft() {
    const draft = localStorage.getItem("ycd_bank_account_draft");
    if (draft) {
        try {
            const data = JSON.parse(draft);
            Object.keys(data).forEach(key => {
                const element = document.getElementById(key);
                if (element && data[key] && typeof data[key] === 'string') {
                    element.value = data[key];
                }
            });
            
            // Re-valider les mots de passe
            validatePassword();
        } catch (error) {
            console.error("Erreur lors du chargement du brouillon:", error);
        }
    }
}

// Gestion de la navigation
function checkExistingAccounts() {
    updateNavigation();
}

function updateNavigation() {
    const hasAccounts = comptes.length > 0;
    
    if (dash) dash.style.display = hasAccounts ? "block" : "none";
    if (index) index.style.display = hasAccounts ? "block" : "none";
}

// Messages utilisateur
function showError(message) {
    // Créer un toast d'erreur
    const toast = document.createElement("div");
    toast.className = "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in";
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

function showSuccess(message) {
    // Créer un toast de succès
    const toast = document.createElement("div");
    toast.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in";
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Export des données (pour debug)
function exportAccounts() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(comptes, null, 2));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = "ycd_bank_accounts.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Initialiser l'interface
showStep(currentStep);

// Ajouter le bouton d'export en développement
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    const exportBtn = document.createElement("button");
    exportBtn.textContent = "📂 Export Accounts";
    exportBtn.className = "fixed bottom-4 right-4 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm z-40";
    exportBtn.onclick = exportAccounts;
    document.body.appendChild(exportBtn);
}