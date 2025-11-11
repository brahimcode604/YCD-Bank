

// --- Gestion Popup ---
const Barre_virticale = document.getElementById("barre_verticale");
const popup = document.getElementById("popup");
const openBtn = document.getElementById("create_compte");
const closeBtn = document.getElementById("close_popup");
const nextBtn = document.getElementById("next_step");
const prevBtn = document.getElementById("prev_step");
const dash=document.getElementById("dash");
const index=document.getElementById("in");
const steps = document.querySelectorAll(".step");
const circles = [step1, step2, step3, step4];
let current = 0;

let valid=0;
 

// --- Ouvrir / Fermer la popup ---
openBtn.onclick = () => {
  popup.classList.remove("hidden");
  if (Barre_virticale) Barre_virticale.classList.add("hidden");
};
closeBtn.onclick = () => popup.classList.add("hidden");

// --- Afficher les étapes ---
function showStep(index) {
  steps.forEach((s, i) => s.classList.toggle("hidden", i !== index));
  circles.forEach((c, i) => {
    if (i === index) {
      c.classList.replace("bg-gray-300", "bg-blue-600");
      c.classList.replace("text-gray-600", "text-white");
    } else {
      c.classList.replace("bg-blue-600", "bg-gray-300");
      c.classList.replace("text-white", "text-gray-600");
    }
  });
  prevBtn.classList.toggle("hidden", index === 0);
  nextBtn.textContent = index === steps.length - 1 ? "Terminer" : "Suivant →";
}

// --- Navigation étapes ---
nextBtn.onclick = () => {
  if (current < steps.length - 1) {
    current++;
    showStep(current);
  } else {
    // Étape finale → Sauvegarder et fermer
    saveAccount();
    window.location.href = "../html/dashboard.html";
     dash.classList.remove("hidden");
      index.classList.remove("hidden");
     valid=1;
  }
};




// if(valid===1){

//     dash.classList.remove("hidden");
//       index.classList.remove("hidden");
// }


document.addEventListener("DOMContentLoaded", () => {
  const dashboardLink = document.getElementById("dashboard_link");

  const comptes = JSON.parse(localStorage.getItem("comptes")) || [];
       

  // ✅ Vérifier si un compte existe
  if (comptes.length > 0) {
    // S'il y a au moins un compte → afficher le lien
      dash.classList.remove("hidden");
      index.classList.remove("hidden");
  } else {
    // Sinon → le cacher
    
    dash.classList.add("hidden");
      index.classList.add("hidden");

  }
});


prevBtn.onclick = () => {
  if (current > 0) current--;
  showStep(current);
};

showStep(current);

// ==================================================
// 🔹 Stockage des comptes dans localStorage
// ==================================================

let comptes = JSON.parse(localStorage.getItem("comptes")) || [];

// --- Récupération des données du formulaire ---
function getFormData() {
  return {
    cin: document.getElementById("cin")?.value || "",
    cin_date: document.getElementById("cin_date")?.value || "",
    nom: document.getElementById("nom")?.value || "",
    prenom: document.getElementById("prenom")?.value || "",
    date_necence: document.getElementById("date_necence")?.value || "",
    Lieu_de_naissance: document.getElementById("nesence_date")?.value || "",
    Nationalite: document.getElementById("Nationalite")?.value || "",
    Civilite: document.getElementById("Civilite")?.value || "",
    email: document.getElementById("email")?.value || "",
    telephone: document.getElementById("Telephone")?.value || "",
    Type_de_Compte: document.getElementById("Type_de_Compte")?.value || "",
    dateCreation: new Date().toLocaleString(),
    principal: "10000",
    epargne: "0"
  };
}

// --- Sauvegarde du compte ---
function saveAccount() {
  const nouveauCompte = getFormData();

  // Vérification minimale
  if (!nouveauCompte.cin || !nouveauCompte.nom || !nouveauCompte.prenom) {
    alert("⚠️ Veuillez remplir les champs obligatoires (CIN, Nom, Prénom)");
    return;
  }

  comptes.push(nouveauCompte);
  localStorage.setItem("comptes", JSON.stringify(comptes, null, 2));
    

  alert("✅ Compte créé et enregistré localement !");
  resetForm(); // réinitialiser les champs
  popup.classList.add("hidden"); // fermer la popup
  current = 0; // revenir à la première étape
  showStep(current);
}

// --- Réinitialisation des champs du formulaire ---
function resetForm() {
  document.querySelectorAll("input, select").forEach(el => {
    el.value = "";
  });
}

// ==================================================
// 🔹 Bouton pour exporter les comptes en JSON
// ==================================================

function telechargerJSON() {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(comptes, null, 2));
  const a = document.createElement("a");
  a.href = dataStr;
  a.download = "comptes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// const exportBtn = document.createElement("button");
// exportBtn.textContent = "📂 Télécharger comptes.json";
// exportBtn.className =
//   "mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800";
// exportBtn.onclick = telechargerJSON;
// document.body.appendChild(exportBtn);
