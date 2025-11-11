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

// for Accounts text

const h1 = document.getElementById('passwtext');
h1.textContent = '*'.repeat(h1.textContent.length);