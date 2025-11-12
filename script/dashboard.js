// Function to Convert 
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

let comptes = JSON.parse(localStorage.getItem("ycd_bank_accounts")) || [];
console.log(comptes);
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

// 