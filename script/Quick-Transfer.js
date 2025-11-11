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

const usedpopup = document.getElementById('usedpopup');
const addbtntransfer = document.getElementById('addbtntransfer');

usedpopup.style.display = 'flex' //teban l popup dyal bash n addi l user o RIB dyalo

addbtntransfer.addEventListener('click', ()=>{
const transfuser = document.getElementById('transfuser').value;
const transfcard = document.getElementById('transfcard').value;

if(count < 5 ){
    count++
    console.log(transfuser)
    console.log(transfcard)
   const newdiv = document.createElement('div');
   newdiv.classList = 'w-10';
   newdiv.id = `face${count}`
   newdiv.innerHTML = `
   <img class="rounded-full" src="../imge/face.jpg" alt="random Cartoon face">
   <p>${transfuser}</p>
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

})

// for saving Account text Show

const holder = '10000.00 DH';
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

// for Normal Account text Show

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
      h11.innerHTML = holder;
      }
      else if( closeimg1.style.display === 'none'){
      closeimg1.style.display = 'flex'
      openimg1.style.display = 'none';
      h11.innerHTML = '*'.repeat(h1.textContent.length);
      }
})

// 