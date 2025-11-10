// ferst



 // --- Gestion Popup ---
   
     const Barre_virticale = document.getElementById("barre_verticale");

    


     const popup = document.getElementById("popup");
    const openBtn = document.getElementById("create_compte");
    const closeBtn = document.getElementById("close_popup");
    const nextBtn = document.getElementById("next_step");
    const prevBtn = document.getElementById("prev_step");
    const steps = document.querySelectorAll(".step");
    const circles = [step1, step2, step3, step4];
    let current = 0;

    openBtn.onclick = () => {popup.classList.remove("hidden");Barre_virticale.classList.add("hidden");};
    closeBtn.onclick = () => popup.classList.add("hidden");

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

    nextBtn.onclick = () => {
      if (current < steps.length - 1) current++;
      else popup.classList.add("hidden"); // ferme à la fin
      showStep(current);
    };

    prevBtn.onclick = () => {
      if (current > 0) current--;
      showStep(current);
    };

    showStep(current);