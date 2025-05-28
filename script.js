let palabraSecreta = "";
let letrasCorrectas = [];
let errores = 0;
const maxErrores = 6;

function iniciarJuego() {
  const input = document.getElementById("palabraInput");
  palabraSecreta = input.value.toUpperCase().trim();
  if (!palabraSecreta || palabraSecreta.length < 2) return alert("Ingresa una palabra válida.");

  letrasCorrectas = [];
  errores = 0;

  document.getElementById("inicio").style.display = "none";
  document.getElementById("juego").style.display = "block";
  document.getElementById("mensajeFinal").textContent = "";
  document.getElementById("intentos").textContent = `Errores: 0/${maxErrores}`;

  mostrarPalabra();
  generarTeclado();
}

function mostrarPalabra() {
  const display = palabraSecreta
    .split("")
    .map(letra => (letrasCorrectas.includes(letra) ? letra : "_"))
    .join(" ");
  document.getElementById("palabra").textContent = display;
}

function generarTeclado() {
  const teclado = document.getElementById("teclado");
  teclado.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const letra = String.fromCharCode(i);
    const boton = document.createElement("button");
    boton.textContent = letra;
    boton.onclick = () => verificarLetra(letra, boton);
    teclado.appendChild(boton);
  }
}

function verificarLetra(letra, boton) {
  boton.disabled = true;
  if (palabraSecreta.includes(letra)) {
    letrasCorrectas.push(letra);
    mostrarPalabra();
    if (!document.getElementById("palabra").textContent.includes("_")) {
      document.getElementById("mensajeFinal").textContent = "¡Ganaste!";
    }
  } else {
    errores++;
    document.getElementById("intentos").textContent = `Errores: ${errores}/${maxErrores}`;
    if (errores >= maxErrores) {
      document.getElementById("mensajeFinal").textContent = `¡Perdiste! La palabra era: ${palabraSecreta}`;
      document.querySelectorAll("#teclado button").forEach(btn => btn.disabled = true);
    }
  }
}

function reiniciar() {
  document.getElementById("inicio").style.display = "block";
  document.getElementById("juego").style.display = "none";
  document.getElementById("palabraInput").value = "";
}
