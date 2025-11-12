// local storge
let comptes = JSON.parse(localStorage.getItem("ycd_bank_accounts")) || [];

console.log(comptes)
console.log(comptes[0].cin)

const Principalsold = comptes[1].solde_principal ;

//Account RIB : 6666 6666 6666 6666
    const prancipalrib = document.getElementById('prancipalrib')
      prancipalrib.innerHTML = 'Account: ' + comptes[1].rep;




// Dyal Principal Account text Show

const holder = comptes[1].solde_principal + ' DH';
const holder2 = comptes[1].solde_epargne + ' DH';
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
      h1.innerHTML = holder;
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
      h11.innerHTML = holder2;
      }
      else if( closeimg1.style.display === 'none'){
      closeimg1.style.display = 'flex'
      openimg1.style.display = 'none';
      h11.innerHTML = '*'.repeat(h11.textContent.length);
      }
      let test = 30;
})

// 




// Function dyal Convert 
async function convertCurrency(base = "USD", target = "EUR", amount = 1) {
    const res = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_ng8ycrK7cBYMMvT1QiT6nAIZK8SIvb5lZtglD4n3&base_currency=${base}`);
    const data = await res.json();
    
    const rate = data.data[target];
    const result = amount * rate;
    
    console.log(`1 ${base} = ${rate} ${target}`);
    console.log(`${amount} ${base} = ${result.toFixed(2)} ${target}`);
    
    return result.toFixed(2);
}


const convertbtn = document.getElementById('convertbtn');
const converttxt = document.getElementById('converttxt');


convertbtn.addEventListener('mouseover', () => {
    converttxt.style.display = 'block';
});
convertbtn.addEventListener('mouseout', () => {
    converttxt.style.display = 'none';
});


convertbtn.addEventListener('click', async () => {
    const base = document.getElementById('inputcurrnsi1').value;
    const target = document.getElementById('inputcurrnsi2').value;
    const amountInput = document.querySelector('input[type="number"]');
    const resultDisplay = document.getElementById('convrs');
    
    const amount = parseFloat(amountInput.value);
    
    if (isNaN(amount) || amount <= 0) {
        resultDisplay.textContent = "Enter a valid amount";
        return;
    }

    const result = await convertCurrency(base, target, amount);
    resultDisplay.textContent = result;
});

// dyal Recharge 

    const popup = document.getElementById("popup");
    const phonenumber = document.getElementById('phonenumber').value
    const openPopup = document.getElementById("openPopup");
    const closePopup = document.getElementById("closePopup");
    const cancelBtn = document.getElementById("cancelBtn");

    openPopup.addEventListener("click", () => {
        
        popup.classList.remove("hidden")
    });
    cancelBtn.addEventListener("click", () => {
        
        popup.classList.add("hidden")
    });

    // Close when clicking outside
    popup.addEventListener("click", (e) => {
      
        if (e.target === popup) popup.classList.add("hidden");
    });

    let sent = 600 ; 

  //

  const activeBtn = document.getElementById('activeBtn');
const invoicePopup = document.getElementById('invoicePopup');
const closeInvoiceBtn = document.getElementById('closeInvoice');
const cancelInvoiceBtn = document.getElementById('cancelInvoice');
const invoiceForm = document.getElementById('invoiceForm');
const currentBalanceEl = document.getElementById('currentBalance');
const paymentSuccess = document.getElementById('paymentSuccess');
const paymentError = document.getElementById('paymentError');

let currentBalance = 1000;

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
  if(e.target === invoicePopup) invoicePopup.classList.add('hidden');
});

// Form submission
invoiceForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = parseFloat(document.getElementById('invoiceAmount').value);

  if(amount <= currentBalance){
    currentBalance -= amount;
    currentBalanceEl.textContent = currentBalance + ' DH';
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
