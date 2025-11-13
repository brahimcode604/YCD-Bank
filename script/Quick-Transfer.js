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

// const addUserForm = document.getElementById("addUserForm");

addUserForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page reload

  const username = document.getElementById("transfuser").value;
  const cardNumber = document.getElementById("transfcard").value;

  console.log("User added:", username, cardNumber);

  // Reset form
  addUserForm.reset();
  usedpopup.classList.add("hidden"); // close popup
});
