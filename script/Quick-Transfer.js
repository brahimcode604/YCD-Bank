/* 
<div class="w-10">
    <img class="rounded-full" src="../imge/face.jpg" alt="random woman face">
</div>
*/
// for Quick Transfer


let count = 0;
const transfuser = document.getElementById('transfuser');
const transfcard = document.getElementById('transfcard');
const usedpopup = document.getElementById('usedpopup');
const addbtntransfer = document.getElementById('addbtntransfer');
const removebtntransfer = document.getElementById('removebtntransfer');
const Qtransfer = document.getElementById('Qtransfer');
const addbtn = document.getElementById('addbtn');

// open popup
addbtn.addEventListener('click', () => {
  usedpopup.style.display = 'flex';
});

// close popup
removebtntransfer.addEventListener('click', () => {
  usedpopup.style.display = 'none';
});

// new transfer card
addbtntransfer.addEventListener('click', () => {
  if (count < 5) {
    count++;
    const newdiv = document.createElement('div');
    newdiv.classList = 'w-10 flex flex-col items-center gap-1';
    newdiv.id = `face${count}`;
    newdiv.innerHTML = `
      <img class="rounded-full w-10 h-10" src="../imge/face.jpg" alt="random Cartoon face">
      <p class="text-sm">${transfuser.value}</p>
      <button id="remove${count}" class="text-red-500 text-xs">X</button>
    `;
    Qtransfer.prepend(newdiv);

    // remove card
    const remove = document.getElementById('remove' + count);
    remove.addEventListener('click', (e) => {
      e.target.parentElement.remove();
      count--;
    });

  } else {
    alert("You can't add more than 5 users");
  }
});


// Dyal Principal Account text Show

const holder = comptes[0].solde_principal + 'DH';
const holder2 = comptes[0].solde_epargne + 'DH';
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
    
      h11.innerHTML = '*'.repeat(h1.textContent.length);
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
      h11.innerHTML = '*'.repeat(h1.textContent.length);
      }
})

// 