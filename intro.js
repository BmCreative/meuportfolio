(() => {
  const intro = document.getElementById("intro");
  const wordEl = document.getElementById("introWord");
  if (!intro || !wordEl) return;

  const text = "Olá,";
  const letterDelay = 220;
  const afterPause = 520;
  const maxWait = 3500; // fail-safe: nunca trava branco

  let totalWidth = 0;
  let i = 0;
  let done = false;

  function finish() {
    if (done) return;
    done = true;
    intro.classList.add("out");
    setTimeout(() => intro.remove(), 850);
  }

  function addLetter(char) {
    const span = document.createElement("span");
    span.className = "ch";
    span.textContent = char;
    wordEl.appendChild(span);

    // empurra a palavra pra esquerda conforme entra letra nova (nascimento no centro)
    const w = span.getBoundingClientRect().width;
    totalWidth += w;
    const shift = totalWidth / 2;
    wordEl.style.transition = "transform 420ms cubic-bezier(.2,.9,.2,1)";
    wordEl.style.transform = `translateX(${-shift}px)`;

    requestAnimationFrame(() => span.classList.add("in"));
  }

  function tick() {
    if (i < text.length) {
      addLetter(text[i]);
      i++;
      setTimeout(tick, letterDelay);
    } else {
      setTimeout(finish, afterPause);
    }
  }

  setTimeout(finish, maxWait);
  tick();
})();
