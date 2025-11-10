/* 
<div class="w-10">
    <img class="rounded-full" src="../imge/face.jpg" alt="random woman face">
</div>
*/
// for Quick Transfer

const Qtransfer = document.getElementById('Qtransfer');
const addbtn = document.getElementById('addbtn');
let count = 0 ;
addbtn.addEventListener('click', () => {

if(count < 5 ){
    count++
   const newdiv = document.createElement('div');
   newdiv.classList = 'w-10';
   newdiv.id = `face${count}`
   newdiv.innerHTML = `
   <img class="rounded-full" src="../imge/face.jpg" alt="random woman face">
   <button id="remove${count}">X</button>`
   Qtransfer.prepend(newdiv);
        const remove = document.getElementById('remove'+count);
        remove.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        count--
        })

   }
   else{
    alert("u can't add more than 5")
   }
    
})

// for Cards
/*
const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');
const card3 = document.getElementById('card3');
const card4 = document.getElementById('card4');

const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');

function showCard(cardToShow, cardToHide) {

  cardToHide.classList.remove('show');
  setTimeout(() => {
    cardToHide.classList.add('hidden');
  }, 500);

  cardToShow.classList.remove('hidden');
  setTimeout(() => {
    cardToShow.classList.add('show');
  }, 50);
}

btn1.addEventListener('click', () => showCard(card2, card1));
btn2.addEventListener('click', () => showCard(card1, card2));
*/