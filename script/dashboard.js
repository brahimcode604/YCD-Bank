// local storge
let comptes = JSON.parse(localStorage.getItem("ycd_bank_accounts")) || [];

console.log(comptes)
let Principalbalance = parseInt(comptes[2].solde_principal)
let Savingbalance = parseInt(comptes[2].solde_epargne)

//Accounts RIB :
const prancipalrib = document.getElementById('prancipalrib')
    prancipalrib.innerHTML = 'Account: ' + comptes[2].rep_principal;

const epargnerib = document.getElementById('epargnerib')
    epargnerib.innerHTML = 'Account: ' + comptes[2].rep_epargne;

const fullname = document.getElementById('fullname')
    fullname.innerHTML = comptes[2].nom + ' ' + comptes[2].prenom
 
console.log(Principalbalance)

// Dyal Principal Account text Show

const showbtn = document.getElementById('showbtn');
const openimg = document.getElementById('openimg');
const closeimg = document.getElementById('closeimg');
const h1 = document.getElementById('passwtext');
    
      h1.innerHTML = '*'.repeat(h1.textContent.length);
      closeimg.style.display = 'flex';
      openimg.style.display = 'none';

showbtn.addEventListener('click', () =>{
      
      if(openimg.style.display === 'none'){
      closeimg.style.display = 'none'
      openimg.style.display = 'flex';
      h1.innerHTML = Principalbalance + ' DH';
      }
      else if( closeimg.style.display === 'none'){
      closeimg.style.display = 'flex'
      openimg.style.display = 'none';
      h1.innerHTML = '*'.repeat(h1.textContent.length);
      }
})

// Dyal Saving Account text Show

const showbtn1 = document.getElementById('showbtn1');
const openimg1 = document.getElementById('openimg1');
const closeimg1 = document.getElementById('closeimg1');
const h11 = document.getElementById('passwtext1');
    
      h11.innerHTML = '*'.repeat(h11.textContent.length);
      closeimg1.style.display = 'flex';
      openimg1.style.display = 'none';

showbtn1.addEventListener('click', () =>{
      
      if(openimg1.style.display === 'none'){
      closeimg1.style.display = 'none'
      openimg1.style.display = 'flex';
      h11.innerHTML = Savingbalance + 'DH';
      }
      else if( closeimg1.style.display === 'none'){
      closeimg1.style.display = 'flex'
      openimg1.style.display = 'none';
      h11.innerHTML = '*'.repeat(h11.textContent.length);
      }
      let test = 30;
})

// dyal Recharge 

    const popup = document.getElementById("popup");
    const openPopup = document.getElementById("openPopup");
    const closePopup = document.getElementById("closePopup");
    const cancelBtn = document.getElementById("cancelBtn");

    openPopup.addEventListener("click", () => {
        
        popup.classList.remove("hidden")
    });
    cancelBtn.addEventListener("click", () => {
        
        popup.classList.add("hidden")
    });

    // Close fash kn clicki outside
    popup.addEventListener("click", (e) => {
      
        if (e.target === popup) {
          popup.classList.add("hidden");
        }
    });

  // Rechargeamount dyal recharge ID amount
const recharge = document.getElementById('recharge');
recharge.addEventListener('submit', (e)=>{
  e.preventDefault();
  const amount = parseFloat(document.getElementById('Rechargeamount').value);
  const phonenumber = document.getElementById('phonenumber').value
 
    if( phonenumber.length === 10){
      if(amount <= Principalbalance){
        Principalbalance = Principalbalance - amount;

        h1.innerHTML = Principalbalance + ' DH'

        recharge.reset();
        popup.classList.add("hidden")
        alert(`Payment successful!`)
        comptes[2].solde_principal = Principalbalance;
        localStorage.setItem("ycd_bank_accounts", JSON.stringify(comptes));
      } else {
        alert('Update Your Balance')
      }
    }
    else {
      alert('Your Number is Invalid Must be 10 Numbers')
    }
})

  // dyal invoises

const activeBtn = document.getElementById('activeBtn');
const invoicePopup = document.getElementById('invoicePopup');
const closeInvoiceBtn = document.getElementById('closeInvoice');
const cancelInvoiceBtn = document.getElementById('cancelInvoice');
const invoiceForm = document.getElementById('invoiceForm');
const currentBalanceEl = document.getElementById('currentBalance');
const paymentSuccess = document.getElementById('paymentSuccess');
const paymentError = document.getElementById('paymentError');

currentBalanceEl.textContent = Principalbalance + 'DH'

// Open popup when Active button clicked
activeBtn.addEventListener('click', () => {
  invoicePopup.classList.remove('hidden');
  paymentSuccess.classList.add('hidden');
  paymentError.classList.add('hidden');
});

// Close popup
closeInvoiceBtn.addEventListener('click', () => {
  invoicePopup.classList.add('hidden');
  invoiceForm.reset();
});
cancelInvoiceBtn.addEventListener('click', () => {
  invoicePopup.classList.add('hidden');
  invoiceForm.reset();
});

// Click outside content to close
invoicePopup.addEventListener('click', (e) => {
  if(e.target === invoicePopup) {
    invoicePopup.classList.add('hidden');
  }
});

// Form submission
invoiceForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = parseFloat(document.getElementById('invoiceAmount').value);

  if(amount <= Principalbalance){
    Principalbalance -= amount;
    currentBalanceEl.textContent = Principalbalance + ' DH';
    h1.innerHTML = Principalbalance + 'DH'
    paymentSuccess.classList.remove('hidden');
    paymentError.classList.add('hidden');
    invoiceForm.reset();
  } else {
    paymentError.classList.remove('hidden');
    paymentSuccess.classList.add('hidden');
  }
});


//

// Static rates
const rates = {
  MAD: { MAD: 1, EUR: 0.09, USD: 0.10 },
  EUR: { MAD: 11.0, EUR: 1, USD: 1.1 },
  USD: { MAD: 10.0, EUR: 0.91, USD: 1 }
};

const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const resultEl = document.getElementById('result');

convertBtn.addEventListener('click', () => {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    resultEl.textContent = "Enter a valid amount";
    resultEl.classList.remove('text-green-700');
    resultEl.classList.add('text-red-600');
    return;
  }

  const rate = rates[from][to];
  const converted = (amount * rate).toFixed(2);

  resultEl.textContent = `${amount} ${from} = ${converted} ${to}`;
  resultEl.classList.remove('text-red-600');
  resultEl.classList.add('text-green-700');
});


// dyal transfer men Principal account l Saving

    const popuptr = document.getElementById("popuptr");
    const openPopuptr = document.getElementById("openPopuptr");
    const closePopuptr = document.getElementById("closePopuptr");
    const cancelBtntr = document.getElementById("cancelBtntr");

    const RIB1 = document.getElementById('RIB1');
    const RIB2 = document.getElementById('RIB2');
    const RIB3 = document.getElementById('RIB3');
    const RIB4 = document.getElementById('RIB4');
    const RIB1to = document.getElementById('RIB1to');
    const RIB2to = document.getElementById('RIB2to');
    const RIB1value = document.getElementById('RIB1value');
    const RIB2value = document.getElementById('RIB2value');

    RIB1.innerHTML ='Principal Account ' + comptes[2].rep_principal;
    RIB2.innerHTML ='Saving Account ' + comptes[2].rep_epargne;
    RIB3.innerHTML ='Saving Account ' + comptes[2].rep_epargne;
    RIB4.innerHTML ='Principal Account ' + comptes[2].rep_principal;
    
    openPopuptr.addEventListener("click", () => {
        
        popuptr.classList.remove("hidden")
        RIB1to.innerHTML = RIB1value.value;
        RIB2to.innerHTML = RIB2value.value;
        if(RIB1value.value === RIB2value.value){
          alert("hey");
          popuptr.classList.add("hidden")
        }
    });
    cancelBtntr.addEventListener("click", () => {
        
        popuptr.classList.add("hidden")
    });

    // Close fash kn clicki outside
    popuptr.addEventListener("click", (e) => {
      
        if (e.target === popup) {
          popuptr.classList.add("hidden");
        }
    });



// 
